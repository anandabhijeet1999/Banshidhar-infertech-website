"use client";

import { useEffect, useRef } from "react";
import type { AnimationParams } from "animejs";
import { prefersReducedMotion } from "./animePresets";

/**
 * Attaches mouse-enter / mouse-leave listeners that play the given Anime.js params.
 * Cancels any in-flight tween before starting a new one.
 */
export function useAnimeHover<T extends HTMLElement>(
  enterParams: AnimationParams,
  leaveParams: AnimationParams
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    let current: { pause: () => void } | null = null;

    const handleEnter = async () => {
      const { animate } = await import("animejs");
      if (!ref.current) return;
      current?.pause?.();
      current = animate(ref.current, enterParams);
    };

    const handleLeave = async () => {
      const { animate } = await import("animejs");
      if (!ref.current) return;
      current?.pause?.();
      current = animate(ref.current, leaveParams);
    };

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);
    node.addEventListener("focus", handleEnter);
    node.addEventListener("blur", handleLeave);

    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
      node.removeEventListener("focus", handleEnter);
      node.removeEventListener("blur", handleLeave);
      current?.pause?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
