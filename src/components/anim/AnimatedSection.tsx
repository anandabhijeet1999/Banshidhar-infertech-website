"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

type Direction = "up" | "down" | "left" | "right" | "none";

const initialTransform: Record<Direction, string> = {
  up: "translateY(40px)",
  down: "translateY(-30px)",
  left: "translateX(-60px)",
  right: "translateX(60px)",
  none: "none",
};

const animateTo: Record<Direction, Record<string, [number, number]>> = {
  up: { translateY: [40, 0] },
  down: { translateY: [-30, 0] },
  left: { translateX: [-60, 0] },
  right: { translateX: [60, 0] },
  none: {},
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  style?: CSSProperties;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  direction = "up",
  style,
  threshold = 0.15,
}: AnimatedSectionProps) {
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
                ...animateTo[direction],
                duration: duration * 1000,
                delay: delay * 1000,
                ease: EASE_OUT,
              });
            });
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
      instance?.pause?.();
    };
  }, [delay, duration, direction, threshold]);

  const initialStyle: CSSProperties = {
    opacity: 0,
    transform: initialTransform[direction],
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <div ref={ref} className={className} style={initialStyle}>
      {children}
    </div>
  );
}
