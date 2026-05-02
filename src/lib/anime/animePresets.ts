import type { AnimationParams } from "animejs";

export const EASE_OUT = "cubicBezier(0.25, 0.46, 0.45, 0.94)";
export const EASE_IN_OUT = "cubicBezier(0.4, 0, 0.2, 1)";

export const fadeUp: AnimationParams = {
  opacity: [0, 1],
  translateY: [40, 0],
  duration: 700,
  ease: EASE_OUT,
};

export const fadeIn: AnimationParams = {
  opacity: [0, 1],
  duration: 600,
  ease: EASE_OUT,
};

export const slideLeft: AnimationParams = {
  opacity: [0, 1],
  translateX: [-60, 0],
  duration: 700,
  ease: EASE_OUT,
};

export const slideRight: AnimationParams = {
  opacity: [0, 1],
  translateX: [60, 0],
  duration: 700,
  ease: EASE_OUT,
};

export const scaleIn: AnimationParams = {
  opacity: [0, 1],
  scale: [0.92, 1],
  duration: 700,
  ease: EASE_OUT,
};

export const blurIn: AnimationParams = {
  opacity: [0, 1],
  filter: ["blur(10px)", "blur(0px)"],
  translateY: [10, 0],
  duration: 700,
  ease: EASE_OUT,
};

export const fadeUpInitial = { opacity: 0, transform: "translateY(40px)" };
export const slideLeftInitial = { opacity: 0, transform: "translateX(-60px)" };
export const slideRightInitial = { opacity: 0, transform: "translateX(60px)" };
export const fadeInInitial = { opacity: 0 };
export const scaleInInitial = { opacity: 0, transform: "scale(0.92)" };
export const blurInInitial = {
  opacity: 0,
  filter: "blur(10px)",
  transform: "translateY(10px)",
};

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}
