"use client";
import { cn } from "@/lib/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

export const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}: {
  images: string[];
  children?: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  autoplay?: boolean;
  direction?: "up" | "down";
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const currentRef = useRef<HTMLImageElement | null>(null);
  const previousRef = useRef<HTMLImageElement | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setPreviousIndex(prevIndex);
      return prevIndex + 1 === images.length ? 0 : prevIndex + 1;
    });
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      setPreviousIndex(prevIndex);
      return prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1;
    });
  }, [images.length]);

  // Preload first image
  useEffect(() => {
    const img = new window.Image();
    img.src = images[0];
    img.onload = () => setReady(true);
    img.onerror = () => setReady(true);
  }, [images]);

  // Keyboard + autoplay
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") handleNext();
      if (event.key === "ArrowLeft") handlePrevious();
    };
    window.addEventListener("keydown", handleKeyDown);

    let interval: ReturnType<typeof setInterval> | undefined;
    if (autoplay) interval = setInterval(handleNext, 5000);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (interval) clearInterval(interval);
    };
  }, [autoplay, handleNext, handlePrevious]);

  // Animate slide transition
  useEffect(() => {
    if (previousIndex === null) return;
    const cur = currentRef.current;
    const prev = previousRef.current;
    if (!cur || !prev) return;

    if (prefersReducedMotion()) {
      cur.style.opacity = "1";
      cur.style.transform = "none";
      prev.style.opacity = "0";
      setPreviousIndex(null);
      return;
    }

    const exitY = direction === "up" ? -100 : 100;
    let cancelled = false;

    import("animejs").then(({ animate, createTimeline }) => {
      if (cancelled) return;
      const tl = createTimeline({
        defaults: { duration: 700, ease: EASE_OUT },
        onComplete: () => setPreviousIndex(null),
      });
      tl.add(cur, {
        opacity: [0, 1],
        translateY: [direction === "up" ? "100%" : "-100%", "0%"],
      }, 0);
      tl.add(prev, {
        opacity: [1, 0],
        translateY: ["0%", `${exitY}%`],
      }, 0);
      // Pulse children fade-in
      animate(cur, {
        scale: [1.05, 1],
        duration: 1200,
        ease: EASE_OUT,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [currentIndex, previousIndex, direction]);

  return (
    <div
      className={cn(
        "overflow-hidden h-full w-full relative flex items-center justify-center",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {ready && children}
      {ready && overlay && (
        <div className={cn("absolute inset-0 bg-black/60 z-40", overlayClassName)} />
      )}

      {ready && previousIndex !== null && (
        // Direct <img> needed: we animate raw DOM nodes during slide transitions.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={previousRef}
          key={`prev-${previousIndex}`}
          src={images[previousIndex]}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />
      )}
      {ready && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={currentRef}
          key={`cur-${currentIndex}`}
          src={images[currentIndex]}
          alt=""
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
        />
      )}
    </div>
  );
};
