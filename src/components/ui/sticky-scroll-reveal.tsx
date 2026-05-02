"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardLength = content.length;

  const backgroundColors = useMemo(() => ["#0f172a", "#000000", "#171717"], []);
  const linearGradients = useMemo(
    () => [
      "linear-gradient(to bottom right, #06b6d4, #10b981)",
      "linear-gradient(to bottom right, #ec4899, #6366f1)",
      "linear-gradient(to bottom right, #f97316, #eab308)",
    ],
    []
  );

  // Track scroll progress with rAF throttling
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollHeight = node.scrollHeight - node.clientHeight;
        if (scrollHeight <= 0) return;
        const progress = node.scrollTop / scrollHeight;
        const breakpoints = content.map((_, i) => i / cardLength);
        let closest = 0;
        let closestDistance = Math.abs(progress - breakpoints[0]);
        for (let i = 1; i < breakpoints.length; i++) {
          const d = Math.abs(progress - breakpoints[i]);
          if (d < closestDistance) {
            closest = i;
            closestDistance = d;
          }
        }
        setActiveCard(closest);
      });
    };

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      node.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [cardLength, content]);

  // Animate the active card visuals
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.backgroundColor = backgroundColors[activeCard % backgroundColors.length];
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !containerRef.current) return;
      animate(containerRef.current, {
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        duration: 350,
        ease: EASE_OUT,
      });
      const titles = containerRef.current.querySelectorAll<HTMLElement>(
        "[data-card-title]"
      );
      const paras = containerRef.current.querySelectorAll<HTMLElement>(
        "[data-card-para]"
      );
      titles.forEach((el, i) => {
        animate(el, {
          opacity: i === activeCard ? 1 : 0.3,
          duration: 350,
          ease: EASE_OUT,
        });
      });
      paras.forEach((el, i) => {
        animate(el, {
          opacity: i === activeCard ? 1 : 0.3,
          duration: 350,
          ease: EASE_OUT,
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, [activeCard, backgroundColors]);

  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: backgroundColors[0] }}
      className="relative flex flex-col lg:flex-row h-[25rem] sm:h-[30rem] justify-center space-y-6 lg:space-y-0 lg:space-x-10 overflow-y-auto rounded-md p-4 sm:p-6 md:p-8 lg:p-10"
    >
      <div className="relative flex items-start px-2 sm:px-4">
        <div className="max-w-2xl w-full">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              className="my-8 sm:my-12 md:my-16 lg:my-20"
            >
              <h2
                data-card-title
                style={{ opacity: index === 0 ? 1 : 0.3 }}
                className="text-xl sm:text-2xl font-bold text-slate-100"
              >
                {item.title}
              </h2>
              <p
                data-card-para
                style={{ opacity: index === 0 ? 1 : 0.3 }}
                className="text-sm sm:text-base md:text-lg mt-4 sm:mt-6 md:mt-8 lg:mt-10 max-w-sm text-slate-300"
              >
                {item.description}
              </p>
            </div>
          ))}
          <div className="h-20 sm:h-32 md:h-40" />
        </div>
      </div>
      <div
        style={{
          background: linearGradients[activeCard % linearGradients.length],
          transition: "background 350ms ease-out",
        }}
        className={cn(
          "sticky top-4 sm:top-6 lg:top-10 mx-auto lg:mx-0 h-48 w-full sm:h-56 sm:w-96 lg:h-60 lg:w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
