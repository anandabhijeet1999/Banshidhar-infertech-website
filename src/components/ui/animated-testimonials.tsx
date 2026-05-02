"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [rotations, setRotations] = useState<number[]>([]);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // randomize rotations once on mount per testimonial set
  useEffect(() => {
    setRotations(testimonials.map(() => Math.floor(Math.random() * 21) - 10));
  }, [testimonials]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  // Animate card stack on active change
  useEffect(() => {
    if (rotations.length === 0) return;
    const reduced = prefersReducedMotion();
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled) return;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const isActive = index === active;
        if (reduced) {
          card.style.opacity = isActive ? "1" : "0.7";
          card.style.transform = isActive
            ? "scale(1) rotate(0deg) translateY(0px)"
            : `scale(0.95) rotate(${rotations[index] || 0}deg)`;
          card.style.zIndex = String(isActive ? 40 : testimonials.length + 2 - index);
          return;
        }
        animate(card, {
          opacity: isActive ? 1 : 0.7,
          scale: isActive ? 1 : 0.95,
          rotate: isActive ? 0 : rotations[index] || 0,
          translateY: isActive ? [0, -40, 0] : 0,
          duration: 600,
          ease: EASE_OUT,
        });
        card.style.zIndex = String(isActive ? 40 : testimonials.length + 2 - index);
      });
    });
    return () => {
      cancelled = true;
    };
  }, [active, rotations, testimonials.length]);

  // Animate words on active change
  useEffect(() => {
    const node = textRef.current;
    if (!node) return;
    const words = node.querySelectorAll<HTMLElement>("[data-word]");
    if (words.length === 0) return;

    if (prefersReducedMotion()) {
      words.forEach((w) => {
        w.style.opacity = "1";
        w.style.filter = "none";
        w.style.transform = "none";
      });
      return;
    }

    let cancelled = false;
    import("animejs").then(({ animate, stagger }) => {
      if (cancelled) return;
      animate(Array.from(words), {
        opacity: [0, 1],
        filter: ["blur(10px)", "blur(0px)"],
        translateY: [5, 0],
        duration: 350,
        ease: EASE_OUT,
        delay: stagger(20),
      });
    });
    return () => {
      cancelled = true;
    };
  }, [active]);

  const currentWords = useMemo(
    () => testimonials[active]?.quote.split(" ") ?? [],
    [active, testimonials]
  );

  return (
    <div className="mx-auto max-w-sm px-4 py-20 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
        {/* Card stack */}
        <div>
          <div className="relative h-80 w-full">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.src + index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{
                  opacity: index === active ? 1 : 0.7,
                  transform: `scale(${index === active ? 1 : 0.95}) rotate(${
                    index === active ? 0 : rotations[index] || 0
                  }deg)`,
                  zIndex: index === active ? 40 : testimonials.length + 2 - index,
                  transformOrigin: "bottom center",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonial.src}
                  alt={testimonial.name}
                  fill
                  loading={index === 0 ? undefined : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-3xl object-cover object-[50%_10%]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Text + controls */}
        <div className="flex flex-col justify-between py-4">
          <div ref={textRef}>
            <h3 className="text-2xl font-bold text-black">
              {testimonials[active]?.name}
            </h3>
            <p className="text-sm text-black">{testimonials[active]?.designation}</p>
            <p className="mt-8 text-lg text-black">
              {currentWords.map((word, i) => (
                <span
                  key={`${active}-${i}`}
                  data-word
                  style={{
                    opacity: 0,
                    filter: "blur(10px)",
                    transform: "translateY(5px)",
                    willChange: "opacity, filter, transform",
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            >
              <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
