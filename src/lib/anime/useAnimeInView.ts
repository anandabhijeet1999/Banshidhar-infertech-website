"use client";

import { useEffect, useRef } from "react";
import type { AnimationParams } from "animejs";
import { prefersReducedMotion } from "./animePresets";

export interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

/**
 * Triggers an Anime.js animation when the ref enters the viewport.
 * Defaults: threshold 0.15, rootMargin "0px 0px -60px 0px", once: true.
 */
export function useAnimeInView<T extends HTMLElement>(
  params: AnimationParams,
  options: InViewOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      node.style.transform = "none";
      node.style.filter = "none";
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
              instance = animate(ref.current, params);
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
