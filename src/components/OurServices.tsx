"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/anim/AnimatedSection";
import { useAnimeStagger } from "@/lib/anime";

interface Service {
  title: string;
  desc: string;
  img: string;
  href: string;
}

const services: Service[] = [
  {
    title: "Piling Foundation Services",
    desc: "Full-spectrum pile foundation services tailored to soil conditions and load requirements.",
    img: "/assets/images/piling3.png",
    href: "/services/piling-foundation",
  },
  {
    title: "Piling Rig Rental Services",
    desc: "Premium hydraulic rotary piling rigs delivered with experienced operators.",
    img: "/assets/images/cnc.jpg",
    href: "/services/piling-rig-rental",
  },
  {
    title: "Boom Lift Rental Services",
    desc: "JLG boom lifts from 40 ft to 210 ft for safe access at height.",
    img: "/assets/images/boomlift.jpg",
    href: "/services/boom-lift",
  },
  {
    title: "Piling Rig Contractor",
    desc: "Turnkey piling contractor services with single-point project accountability.",
    img: "/assets/images/pil-cont.jpg",
    href: "/services/piling-contractor",
  },
];

export default function OurServices() {
  const cardsRef = useAnimeStagger<HTMLDivElement>(
    "[data-os-card]",
    { opacity: [0, 1], translateY: [40, 0], duration: 700 },
    140
  );

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[var(--c-surface-2)] to-white">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4">
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <span className="eyebrow">Services we&apos;re offering</span>
          <h2 className="t-h1 text-[var(--c-primary)] mt-3">Our Services</h2>
          <p className="body-lg max-w-2xl mx-auto mt-3">
            From foundation engineering to elevated-access rentals — engineered execution
            backed by 8+ years of operational experience.
          </p>
        </AnimatedSection>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-os-card
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              <Link
                href={service.href}
                className="group relative block h-full bg-white rounded-[var(--r-lg)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-pop)] transition-all duration-500 overflow-hidden border border-[var(--c-line)] hover:-translate-y-2"
              >
                <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col">
                  <h3 className="t-h3 text-[var(--c-primary)] group-hover:text-[var(--c-accent)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--c-muted)] mt-2 mb-4">
                    {service.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--c-primary)] group-hover:text-[var(--c-accent)] transition-colors mt-auto">
                    Learn more
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
