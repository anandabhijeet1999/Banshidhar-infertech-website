"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";
import { useAnimeStagger } from "@/lib/anime";

export default function ProjectsPage() {
  const cardsRef = useAnimeStagger<HTMLDivElement>(
    "[data-project]",
    { opacity: [0, 1], translateY: [30, 0], duration: 600 },
    120
  );

  return (
    <>
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/Project.jpg"
            alt="Projects"
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
            priority
          />
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60 flex flex-col items-center justify-center text-center px-4">
            <span className="eyebrow bg-white/15 text-white border border-white/20 backdrop-blur-sm">
              Our Work
            </span>
            <AnimatedText
              text="Projects"
              as="h1"
              className="t-display text-white"
              effect="blur"
              immediate
              staggerMs={80}
            />
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-20 bg-[var(--c-surface-2)]">
        <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">Featured Work</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">
              Recent Project Highlights
            </h2>
          </AnimatedSection>
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <div data-project style={{ opacity: 0, transform: "translateY(30px)" }}>
              <ProjectCard
                image="/assets/images/pro2.jpg"
                company="Larsen & Toubro Limited, Construction"
                location="Patna"
                equipment="80 ft JLG Boomlift × 1"
              />
            </div>
            <div data-project style={{ opacity: 0, transform: "translateY(30px)" }}>
              <ProjectCard
                image="/assets/images/pro3.jpg"
                company="Earthcon Services & Trading Pvt. Ltd."
                location="Nepal"
                equipment="125 ft JLG Boomlift × 1"
              />
            </div>
            <div data-project style={{ opacity: 0, transform: "translateY(30px)" }}>
              <ProjectCard
                image="/assets/images/cnc.jpg"
                company="Ess Technofabs Pvt. Ltd."
                location="Bhubaneswar, Odisha"
                equipment="150 ft JLG Boomlift × 1"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
