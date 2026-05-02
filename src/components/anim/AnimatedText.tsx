"use client";

import { useEffect, useMemo, useRef, type ElementType } from "react";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay between word animations, in ms */
  staggerMs?: number;
  /** Effect: blur-in (default), fade-up, or rise. */
  effect?: "blur" | "fadeUp" | "rise";
  /** Trigger immediately on mount instead of on scroll-in. */
  immediate?: boolean;
  /** Initial delay before the first word, in ms */
  delayMs?: number;
}

export default function AnimatedText({
  text,
  as: Tag = "h2",
  className = "",
  staggerMs = 50,
  effect = "blur",
  immediate = false,
  delayMs = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const words = useMemo(() => text.split(" "), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const wordEls = node.querySelectorAll<HTMLElement>("[data-aw]");
    if (prefersReducedMotion()) {
      wordEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    let cancelled = false;
    let instance: { pause: () => void } | null = null;

    const fire = () => {
      import("animejs").then(({ animate, stagger }) => {
        if (cancelled || !ref.current) return;
        const params: Record<string, unknown> = {
          opacity: [0, 1],
          duration: 700,
          delay: stagger(staggerMs, { start: delayMs }),
          ease: EASE_OUT,
        };
        if (effect === "blur") {
          params.filter = ["blur(10px)", "blur(0px)"];
          params.translateY = [10, 0];
        } else if (effect === "fadeUp") {
          params.translateY = [20, 0];
        } else {
          params.translateY = [40, 0];
        }
        instance = animate(Array.from(wordEls), params);
      });
    };

    if (immediate) {
      fire();
      return () => {
        cancelled = true;
        instance?.pause?.();
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fire();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      instance?.pause?.();
    };
  }, [staggerMs, effect, immediate, delayMs]);

  const initialStyle =
    effect === "blur"
      ? { opacity: 0, filter: "blur(10px)", transform: "translateY(10px)" }
      : effect === "fadeUp"
        ? { opacity: 0, transform: "translateY(20px)" }
        : { opacity: 0, transform: "translateY(40px)" };

  const Element = Tag as ElementType;

  return (
    <Element ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          data-aw
          className="inline-block"
          style={{
            ...initialStyle,
            whiteSpace: "pre",
            willChange: "opacity, transform, filter",
          }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Element>
  );
}
