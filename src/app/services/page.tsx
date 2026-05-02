"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { serviceCategories, serviceDetails } from "@/lib/services-data";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";
import { useAnimeStagger } from "@/lib/anime";

export default function ServicesPage() {
  const tabsRef = useAnimeStagger<HTMLDivElement>(
    "[data-svc-tab]",
    { opacity: [0, 1], translateY: [-10, 0], duration: 500 },
    90,
    { rootMargin: "0px" }
  );
  const cardsRef = useAnimeStagger<HTMLDivElement>(
    "[data-svc-card]",
    { opacity: [0, 1], translateY: [40, 0], duration: 700 },
    140
  );

  return (
    <>
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[200px] sm:h-[280px] md:h-[360px]">
          <Image
            src="/assets/images/Serv.png"
            alt="Our Services"
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
            priority
          />
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60 flex flex-col items-center justify-center text-center px-4">
            <span className="eyebrow bg-white/15 text-white border border-white/20 backdrop-blur-sm">
              What we deliver
            </span>
            <AnimatedText
              text="Our Services"
              as="h1"
              className="t-display text-white"
              effect="blur"
              immediate
              staggerMs={70}
            />
          </div>
        </div>
      </section>

      {/* Service Nav Tabs */}
      <section className="bg-[var(--c-primary)] border-b-4 border-[var(--c-accent)]">
        <div ref={tabsRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {serviceCategories.map((cat) => (
              <div key={cat.id} data-svc-tab style={{ opacity: 0 }}>
                <Link
                  href={`/services/${cat.id}`}
                  className="block py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-center transition-all duration-300 text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {cat.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="relative py-14 sm:py-20 bg-[var(--c-surface-2)]">
        <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">Explore All Services</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">What We Offer</h2>
            <p className="body-lg max-w-2xl mx-auto mt-3">
              Banshidhar Infratech delivers turnkey foundation, piling, and elevated-access
              solutions backed by modern equipment and a pan-India operations team.
            </p>
          </AnimatedSection>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          >
            {serviceCategories.map((cat) => {
              const detail = serviceDetails[cat.id];
              return (
                <div
                  key={cat.id}
                  data-svc-card
                  style={{ opacity: 0, transform: "translateY(40px)" }}
                  className="h-full"
                >
                  <Link
                    href={`/services/${cat.id}`}
                    className="group relative block h-full overflow-hidden rounded-[var(--r-lg)] bg-white border border-[var(--c-line)] shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-pop)]"
                  >
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={detail.bannerImg}
                        alt={cat.label}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="t-h3 text-[var(--c-primary)] group-hover:text-[var(--c-accent)] transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-[var(--c-muted)] mt-2 line-clamp-3">
                        {detail.intro}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-[var(--c-primary)] group-hover:text-[var(--c-accent)] font-semibold text-sm transition-colors">
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative gradient-mesh py-14 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <span className="eyebrow bg-white/15 text-white border border-white/20">
              Get in touch
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="t-h1 text-white mt-4">
              Need Expert Piling &amp; Foundation Solutions?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mt-4">
              Tell us about your project — we will respond within one business day with a
              tailored proposal and timeline.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <a href="tel:+916202557765" className="btn-glow">
                <Phone className="w-4 h-4" />
                +91 6202557765
              </a>
              <Link href="/contact" className="btn-ghost">
                <Mail className="w-4 h-4" />
                Get Free Quote
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
