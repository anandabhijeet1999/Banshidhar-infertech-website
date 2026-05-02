"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";
import AnimatedSection from "@/components/anim/AnimatedSection";

interface Tab {
  id: string;
  title: string;
  content: string;
  image: string;
}

const tabs: Tab[] = [
  {
    id: "vision",
    title: "VISION",
    content:
      "We are committed to serve the interests of all our clients by being and establishing our position at the top within the country and be among the foremost companies across India in our core business through exceptional business ethics.",
    image: "/assets/icons/slquality1.webp",
  },
  {
    id: "mission",
    title: "MISSION",
    content:
      "To provide our clients with the ability to complete projects in a safe, economical, timely and efficient manner while ensuring a consistently positive and professional experience.",
    image: "/assets/images/vis2.webp",
  },
  {
    id: "quality",
    title: "QUALITY POLICY",
    content:
      "We delight our customers and exceed their expectations by providing maintenance-free Cranes, Boomlifts, Tower Cranes and prompt service.",
    image: "/assets/icons/slquality.webp",
  },
];

export default function VisionTabs() {
  const [activeTab, setActiveTab] = useState<string>("vision");
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Slide the indicator under the active tab
  useEffect(() => {
    const header = headerRef.current;
    const indicator = indicatorRef.current;
    if (!header || !indicator) return;
    const activeBtn = header.querySelector<HTMLElement>(
      `[data-tab-id="${activeTab}"]`
    );
    if (!activeBtn) return;

    const targetX = activeBtn.offsetLeft;
    const targetW = activeBtn.offsetWidth;

    if (prefersReducedMotion()) {
      indicator.style.transform = `translateX(${targetX}px)`;
      indicator.style.width = `${targetW}px`;
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !indicatorRef.current) return;
      animate(indicatorRef.current, {
        translateX: targetX,
        width: targetW,
        duration: 400,
        ease: EASE_OUT,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  // Cross-fade content on tab change
  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !contentRef.current) return;
      animate(contentRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 350,
        ease: EASE_OUT,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-14 sm:py-20 bg-[var(--c-surface-2)]">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-8">
          <span className="eyebrow">Who we are</span>
          <h2 className="t-h1 text-[var(--c-primary)] mt-3">Our Foundation</h2>
        </AnimatedSection>

        {/* Tabs Header */}
        <div
          ref={headerRef}
          className="relative flex flex-wrap rounded-t-[var(--r-md)] overflow-hidden bg-[var(--c-primary)]"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 flex-1 min-w-[120px] text-center font-bold py-3 sm:py-4 text-xs sm:text-sm md:text-base transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-[var(--c-primary)]"
                  : "text-white hover:text-white/80"
              }`}
            >
              {tab.title}
            </button>
          ))}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 left-0 top-0 bg-white"
            style={{ width: 0, transform: "translateX(0px)" }}
          />
        </div>

        {/* Tab Content */}
        <div
          ref={contentRef}
          className="bg-white border border-t-0 border-[var(--c-line)] rounded-b-[var(--r-md)] p-5 sm:p-8 md:px-10 lg:px-14 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 md:gap-14 shadow-[var(--shadow-soft)]"
        >
          <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 relative">
            <Image
              src={active?.image || ""}
              alt={active?.title || ""}
              fill
              loading="lazy"
              className="object-contain"
            />
          </div>
          <div className="text-[var(--c-ink-2)] text-base sm:text-lg leading-relaxed sm:w-2/3 text-center sm:text-left">
            {active?.content}
          </div>
        </div>
      </div>
    </section>
  );
}
