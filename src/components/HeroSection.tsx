"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";

export default function HeroSection() {
  const [isBlue, setIsBlue] = useState(false);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  // Counter animation via Anime.js (in-view)
  useEffect(() => {
    const node = counterRef.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.textContent = "20";
      return;
    }
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          import("animejs").then(({ animate }) => {
            if (cancelled || !counterRef.current) return;
            const obj = { v: 0 };
            animate(obj, {
              v: 20,
              duration: 1600,
              ease: EASE_OUT,
              onUpdate: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = String(Math.round(obj.v));
                }
              },
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  // Icon toggle
  useEffect(() => {
    const t = setInterval(() => setIsBlue((p) => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-20">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none -z-10" />
      <div className="relative bg-white rounded-[var(--r-lg)] shadow-[var(--shadow-soft)] overflow-hidden flex flex-col lg:flex-row items-center border border-[var(--c-line)]">
        {/* Accent strip */}
        <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[var(--c-accent)] to-[var(--c-primary)]" />

        {/* LEFT IMAGE */}
        <div className="relative w-full lg:w-1/2 h-[360px] sm:h-[420px] lg:h-[480px] flex justify-center">
          <Image
            src="/assets/images/pilingside11.webp"
            alt="Heavy machinery"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />

          {/* Floating Stats Card */}
          <AnimatedSection
            delay={0.2}
            direction="up"
            className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 max-w-[90%]"
          >
            <div className="glass-card p-4 flex items-center gap-4">
              <Image
                src={isBlue ? "/assets/icons/Inde.webp" : "/assets/icons/sp.webp"}
                alt="Industry Icon"
                width={60}
                height={60}
                loading="lazy"
                className="w-14 h-14 sm:w-16 sm:h-16 transition-all duration-500"
              />
              <div>
                <p className="text-[var(--c-primary)] font-bold text-xl">
                  <span ref={counterRef}>0</span>+{" "}
                  <span className="text-[var(--c-muted)] font-medium">Industries</span>
                </p>
                <p className="text-[var(--c-muted)] text-base leading-tight">
                  Projects Completed
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 py-8 lg:py-12 text-center lg:text-left space-y-5">
          <AnimatedSection>
            <span className="eyebrow">Welcome to the company</span>
          </AnimatedSection>
          <AnimatedText
            text="Banshidhar Infratech"
            as="h1"
            className="t-h1 text-[var(--c-primary)]"
            effect="fadeUp"
            staggerMs={50}
          />
          <AnimatedSection delay={0.15}>
            <p className="body-lg">
              We are an organization solely dedicated to rental services for medium and
              large heavy-duty hydraulic telescopic, crawler cranes, and tower cranes —
              capacity 20T to 450T, plus boom lifts from 40 to 210 ft.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.25}>
            <p className="body-lg">
              The company has a registered office in Patna, with 8+ years of experience
              and 5+ operational sites across India.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.35}>
            <p className="body-lg">
              We provide rental services to major heavy industries — Power, Cement,
              Steel, Refinery, and Metro projects.{" "}
              <strong className="text-[var(--c-primary)]">
                Today, Banshidhar Infratech is a major player in heavy lift projects.
              </strong>
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
