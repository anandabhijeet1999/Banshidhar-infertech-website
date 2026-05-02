"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/anime";
import { EASE_OUT } from "@/lib/anime";

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  className = "",
  delay = 0,
  duration = 0.8,
  fill = true,
  width,
  height,
  sizes,
  priority = false,
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    let cancelled = false;
    let instance: { pause: () => void } | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            import("animejs").then(({ animate }) => {
              if (cancelled || !ref.current) return;
              instance = animate(ref.current, {
                opacity: [0, 1],
                scale: [0.92, 1],
                duration: duration * 1000,
                delay: delay * 1000,
                ease: EASE_OUT,
              });
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      instance?.pause?.();
    };
  }, [delay, duration]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "scale(0.92)",
        willChange: "opacity, transform",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="object-cover"
      />
    </div>
  );
}
