"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CheckCircle, ArrowRight } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";
import { useAnimeStagger, prefersReducedMotion, EASE_OUT } from "@/lib/anime";

const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-16" />,
});
const AnimatedTestimonialsDemo = dynamic(
  () =>
    import("@/components/AnimatedTestimonialsDemo").then((mod) => ({
      default: mod.AnimatedTestimonialsDemo,
    })),
  { loading: () => <div className="py-20" /> }
);

const tabs = [
  {
    id: "vision",
    title: "VISION",
    content:
      "We are committed to serving the interests of all our clients by establishing our position at the top within the country and being among the foremost companies across India in our core business through exceptional business ethics.",
    image: "/assets/images/vis1.jpg",
  },
  {
    id: "mission",
    title: "MISSION",
    content:
      "To provide our clients with the ability to complete projects in a safe, economical, timely and efficient manner while ensuring a consistently positive and professional experience.",
    image: "/assets/images/vis2.jpg",
  },
  {
    id: "quality",
    title: "QUALITY POLICY",
    content:
      "We delight our customers and exceed their expectations by providing maintenance-free Cranes, Boomlifts, Tower Cranes and prompt service.",
    image: "/assets/images/vis3.jpg",
  },
];

const whyChooseUs = [
  "Extensive experience in commercial construction & infrastructure.",
  "Comprehensive range of piling and equipment-rental services.",
  "Committed to on-time project completion across India.",
  "Specialized in heavy-duty piling and foundation projects.",
];

const team = [
  { name: "Sushil Kumar Yadav", role: "Founder", img: "/assets/icons/yadav.jpeg" },
  {
    name: "Er. Anjani Kumar",
    role: "Project Management Engineer",
    img: "/assets/icons/Er.deepak.jpeg",
  },
  {
    name: "Er. Ranjay Kumar",
    role: "Site Engineer",
    img: "/assets/icons/Er.ranj.jpeg",
  },
  {
    name: "Er. Rahul Kumar",
    role: "Engineering Lead",
    img: "/assets/icons/Rahul.jpeg",
  },
];

const clients = [
  "/assets/images/client1.jpg",
  "/assets/images/client2.jpg",
  "/assets/images/client3.jpg",
  "/assets/images/client4.jpg",
  "/assets/images/client5.jpg",
];

const stats = [
  { value: 8, suffix: "+", label: "Years of Experience" },
  { value: 15, suffix: "+", label: "Active Project Sites" },
  { value: 50, suffix: "+", label: "Equipment Fleet" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.textContent = String(value);
      return;
    }
    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          import("animejs").then(({ animate }) => {
            if (cancelled || !ref.current) return;
            const obj = { v: 0 };
            animate(obj, {
              v: value,
              duration: 1600,
              ease: EASE_OUT,
              onUpdate: () => {
                if (ref.current) ref.current.textContent = String(Math.round(obj.v));
              },
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [value]);
  return (
    <div className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-[var(--c-primary)]">
        <span ref={ref}>0</span>
        {suffix}
      </p>
      <p className="text-sm text-[var(--c-muted)] mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("vision");
  const activeData = tabs.find((t) => t.id === activeTab)!;
  const teamRef = useAnimeStagger<HTMLDivElement>(
    "[data-team-card]",
    { opacity: [0, 1], translateY: [30, 0], duration: 600 },
    100
  );
  const statsRef = useAnimeStagger<HTMLDivElement>(
    "[data-stat]",
    { opacity: [0, 1], translateY: [20, 0], duration: 500 },
    100
  );
  const tabContentRef = useRef<HTMLDivElement | null>(null);

  // Cross-fade tab content
  useEffect(() => {
    const node = tabContentRef.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !tabContentRef.current) return;
      animate(tabContentRef.current, {
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

  return (
    <>
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/About.jpg"
            alt="About Banner"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60 flex flex-col items-center justify-center text-center px-4">
            <AnimatedText
              text="About Us"
              as="h1"
              className="t-display text-white"
              effect="blur"
              immediate
              staggerMs={70}
            />
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-4 sm:px-6 md:px-12 py-14 sm:py-20 bg-white">
        <AnimatedSection direction="left" className="relative w-full md:w-1/2 h-[300px] sm:h-[380px] md:h-[460px] rounded-[var(--r-lg)] overflow-hidden shadow-[var(--shadow-soft)] flex-shrink-0">
          <Image
            src="/assets/images/piling.png"
            alt="Piling Machine"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 glass-card px-5 py-3 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-[var(--c-primary)]">8+</span>
            <span className="text-[var(--c-muted)] text-sm leading-tight">
              Years of
              <br />
              Experience
            </span>
          </div>
        </AnimatedSection>

        <div className="w-full md:w-1/2 text-[var(--c-ink-2)]">
          <AnimatedSection>
            <span className="eyebrow">Welcome to the company</span>
          </AnimatedSection>
          <AnimatedText
            text="Banshidhar Infratech"
            as="h2"
            className="t-h1 text-[var(--c-primary)] mt-3 mb-4 sm:mb-6"
            effect="fadeUp"
          />
          <AnimatedSection delay={0.1}>
            <p className="body-lg mb-4">
              We are an organization solely dedicated to rental services for medium and
              large heavy-duty hydraulic telescopic, crawler cranes, and tower cranes —
              capacity 20T to 450T, plus boom lifts from 40 to 210 ft.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="body-lg mb-4">
              Our registered office is in Patna; we have 8+ years of experience and 15+
              operational sites across India.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="body-lg">
              We provide rental services to major heavy industries — Power (Wind,
              Thermal, Hydro &amp; Nuclear), Cement, Steel Refinery and Metro projects.{" "}
              <strong className="text-[var(--c-primary)]">
                Today, Banshidhar Infratech is a major player in heavy-lift projects.
              </strong>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-white py-10 sm:py-14 border-y border-[var(--c-line)]">
        <div
          ref={statsRef}
          className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              data-stat
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* Vision / Mission / Quality */}
      <section className="bg-[var(--c-surface-2)] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-8">
            <span className="eyebrow">Our Foundation</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">Vision · Mission · Quality</h2>
          </AnimatedSection>

          <div className="flex shadow-[var(--shadow-soft)] rounded-t-[var(--r-md)] overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[100px] text-center font-bold py-4 text-xs sm:text-sm md:text-base transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-[var(--c-primary)]"
                    : "bg-[var(--c-primary)] text-white hover:bg-[var(--c-primary-2)]"
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          <div
            ref={tabContentRef}
            className="bg-white rounded-b-[var(--r-md)] p-6 sm:p-10 md:p-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 md:gap-14 shadow-[var(--shadow-soft)]"
          >
            <div className="flex-shrink-0 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 relative rounded-[var(--r-md)] overflow-hidden shadow-md">
              <Image
                src={activeData.image}
                alt={activeData.title}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="text-[var(--c-ink-2)] text-base sm:text-lg leading-relaxed sm:w-2/3 text-center sm:text-left">
              <h3 className="t-h2 text-[var(--c-primary)] mb-3">{activeData.title}</h3>
              {activeData.content}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA + Why Choose Us */}
      <section
        className="relative w-full py-16 sm:py-24 bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/cta-one-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-[#0b1240]/75 to-black/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
            <AnimatedSection>
              <span className="eyebrow bg-white/15 text-white border border-white/20">
                Our Promise
              </span>
            </AnimatedSection>
            <AnimatedText
              text="We're Building the Future and Restoring the Past"
              as="h2"
              className="t-display text-white mt-4"
              effect="blur"
              staggerMs={50}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <AnimatedSection delay={0.15}>
              <h3 className="t-h2 text-white mb-6">Why Choose Us</h3>
            </AnimatedSection>
            <div className="space-y-4">
              {whyChooseUs.map((item, i) => (
                <AnimatedSection key={i} delay={0.2 + i * 0.08} direction="left">
                  <div className="flex items-start gap-3 glass-card-dark p-4">
                    <CheckCircle className="w-5 h-5 text-[var(--c-accent-2)] mt-0.5 flex-shrink-0" />
                    <span className="text-white text-sm sm:text-base">{item}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <span className="eyebrow">Our Leadership</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">Meet the Management Team</h2>
          </AnimatedSection>

          <div
            ref={teamRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {team.map((member, i) => (
              <div
                key={i}
                data-team-card
                style={{ opacity: 0, transform: "translateY(30px)" }}
                className="group relative bg-white rounded-[var(--r-md)] shadow-[var(--shadow-soft)] overflow-hidden hover:shadow-[var(--shadow-pop)] hover:-translate-y-1 transition-all duration-500 border border-[var(--c-line)]"
              >
                <div className="relative h-48 sm:h-56 md:h-64 w-full bg-[var(--c-surface-2)] overflow-hidden">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-base font-bold text-[var(--c-primary)]">
                    {member.name}
                  </h4>
                  <p className="text-xs text-[var(--c-muted)] mt-1">{member.role}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, idx) => (
                      <a
                        key={idx}
                        href="#"
                        aria-label="Social link"
                        className="w-8 h-8 rounded-full bg-[var(--c-surface-2)] flex items-center justify-center text-[var(--c-muted)] hover:bg-[var(--c-primary)] hover:text-white transition-colors text-xs"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedTestimonialsDemo />

      {/* Client Logos — Marquee */}
      <section className="bg-[var(--c-surface-2)] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-8 sm:mb-12">
            <span className="eyebrow">Trusted by</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">Our Clients</h2>
          </AnimatedSection>

          <div className="overflow-hidden no-scrollbar">
            <div className="flex marquee-track gap-12 sm:gap-16 w-max">
              {[...clients, ...clients].map((logo, i) => (
                <div
                  key={i}
                  className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-28 relative shrink-0 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                >
                  <Image
                    src={logo}
                    alt={`Client ${(i % clients.length) + 1}`}
                    fill
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative gradient-mesh py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="t-h1 text-white mb-6 sm:mb-8">
              Provide Quality Work that Meets Your Expectations
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <Link href="/contact" className="btn-glow">
              Discover More
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
