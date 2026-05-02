"use client";

import { useEffect, useRef } from "react";
import type { AnimationParams } from "animejs";
import { prefersReducedMotion } from "./animePresets";

/**
 * Runs an Anime.js animation once on mount against the returned ref.
 * Re-runs when `deps` change.
 */
export function useAnimeOnMount<T extends HTMLElement>(
  params: AnimationParams,
  deps: React.DependencyList = []
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      // Snap to final state without animation
      node.style.opacity = "1";
      node.style.transform = "none";
      node.style.filter = "none";
      return;
    }
    let cancelled = false;
    let instance: { pause: () => void } | null = null;
    import("animejs").then(({ animate }) => {
      if (cancelled || !ref.current) return;
      instance = animate(ref.current, params);
    });
    return () => {
      cancelled = true;
      instance?.pause?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
