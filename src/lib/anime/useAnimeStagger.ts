"use client";

import { useEffect, useRef } from "react";
import type { AnimationParams } from "animejs";
import { prefersReducedMotion } from "./animePresets";
import type { InViewOptions } from "./useAnimeInView";

/**
 * Runs a staggered Anime.js animation against descendants matching `childSelector`
 * once the ref enters the viewport.
 */
export function useAnimeStagger<T extends HTMLElement>(
  childSelector: string,
  params: AnimationParams,
  staggerMs = 80,
  options: InViewOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.querySelectorAll<HTMLElement>(childSelector).forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    let cancelled = false;
    let instance: { pause: () => void } | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            import("animejs").then(({ animate, stagger }) => {
              if (cancelled || !ref.current) return;
              const targets = ref.current.querySelectorAll(childSelector);
              if (targets.length === 0) return;
              instance = animate(Array.from(targets), {
                ...params,
                delay: stagger(staggerMs),
              });
            });
            if (once) observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      cancelled = true;
      observer.disconnect();
      instance?.pause?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
