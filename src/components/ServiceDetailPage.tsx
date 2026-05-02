"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { serviceCategories, serviceDetails } from "@/lib/services-data";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedImage from "@/components/anim/AnimatedImage";
import AnimatedText from "@/components/anim/AnimatedText";
import { useAnimeStagger, prefersReducedMotion, EASE_OUT } from "@/lib/anime";

interface FaqItemProps {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}

function FaqItem({ question, answer, open, onToggle, index }: FaqItemProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const chevronRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const chevron = chevronRef.current;
    if (!panel) return;

    if (prefersReducedMotion()) {
      panel.style.height = open ? "auto" : "0px";
      panel.style.opacity = open ? "1" : "0";
      if (chevron) chevron.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
      return;
    }

    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !panelRef.current) return;
      const target = panelRef.current;
      const fullHeight = target.scrollHeight;
      animate(target, {
        height: open ? [target.offsetHeight, fullHeight] : [target.offsetHeight, 0],
        opacity: open ? [target.style.opacity || 0, 1] : [1, 0],
        duration: 350,
        ease: EASE_OUT,
        onComplete: () => {
          if (open && panelRef.current) {
            panelRef.current.style.height = "auto";
          }
        },
      });
      if (chevron) {
        animate(chevron, {
          rotate: open ? 180 : 0,
          duration: 350,
          ease: EASE_OUT,
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [open]);

  return (
    <AnimatedSection delay={index * 0.06}>
      <div className="bg-white border border-[var(--c-line)] rounded-[var(--r-md)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-4 sm:px-6 py-4 text-left hover:bg-[var(--c-primary-soft)]/40 transition-colors"
        >
          <span className="text-sm sm:text-base font-semibold text-[var(--c-ink)] pr-4">
            {question}
          </span>
          <ChevronDown
            ref={chevronRef}
            className="w-5 h-5 text-[var(--c-primary)] flex-shrink-0"
          />
        </button>
        <div
          ref={panelRef}
          style={{ height: 0, opacity: 0, overflow: "hidden" }}
          aria-hidden={!open}
        >
          <p className="px-4 sm:px-6 pb-4 text-[var(--c-muted)] text-sm sm:text-base leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function ServiceDetailPage({ serviceId }: { serviceId: string }) {
  const service = serviceDetails[serviceId];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tabsRef = useAnimeStagger<HTMLDivElement>(
    "[data-tab]",
    { opacity: [0, 1], translateY: [-10, 0], duration: 500 },
    90,
    { rootMargin: "0px" }
  );
  const benefitsRef = useAnimeStagger<HTMLDivElement>(
    "[data-benefit]",
    { opacity: [0, 1], translateX: [-30, 0], duration: 500 },
    70
  );
  const coverageRef = useAnimeStagger<HTMLDivElement>(
    "[data-coverage]",
    { opacity: [0, 1], scale: [0.9, 1], duration: 500 },
    50
  );
  const sidebarNavRef = useAnimeStagger<HTMLUListElement>(
    "[data-side-nav]",
    { opacity: [0, 1], translateX: [20, 0], duration: 500 },
    80
  );

  if (!service) return null;

  return (
    <>
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[200px] sm:h-[280px] md:h-[360px]">
          <Image
            src={service.bannerImg}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60 flex flex-col items-center justify-center text-center px-4">
            <span className="eyebrow bg-white/15 text-white border border-white/20 backdrop-blur-sm">
              Banshidhar Infratech Services
            </span>
            <AnimatedText
              text={service.title}
              as="h1"
              className="t-display text-white mt-3 leading-tight"
              effect="blur"
              immediate
              staggerMs={50}
            />
          </div>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="bg-[var(--c-primary)] border-b-4 border-[var(--c-accent)]">
        <div ref={tabsRef} className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {serviceCategories.map((cat) => (
              <div key={cat.id} data-tab style={{ opacity: 0 }}>
                <Link
                  href={`/services/${cat.id}`}
                  className={`block py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm md:text-base font-semibold text-center transition-all duration-300 ${
                    serviceId === cat.id
                      ? "bg-white text-[var(--c-primary)] border-b-4 border-[var(--c-accent)] -mb-[4px]"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative bg-[var(--c-surface-2)] py-10 sm:py-16">
        <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* LEFT */}
            <div className="w-full lg:w-[70%]">
              <AnimatedSection>
                <h2 className="t-h1 text-[var(--c-primary)] mb-5 sm:mb-6">
                  {service.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <p className="body-lg mb-8 sm:mb-10 text-justify">{service.intro}</p>
              </AnimatedSection>

              {service.sections.map((section, index) => (
                <div key={index} className="mb-10 sm:mb-14">
                  <AnimatedSection delay={0.05}>
                    <h3 className="t-h2 text-[var(--c-primary)] mb-4 sm:mb-5">
                      {section.heading}
                    </h3>
                  </AnimatedSection>

                  {section.img && (
                    <AnimatedImage
                      src={section.img}
                      alt={section.imgAlt || section.heading}
                      className="relative w-full h-[220px] sm:h-[300px] md:h-[380px] rounded-[var(--r-md)] overflow-hidden shadow-[var(--shadow-soft)] mb-5 sm:mb-6"
                      delay={0.1}
                    />
                  )}

                  <AnimatedSection delay={0.15}>
                    {Array.isArray(section.content) ? (
                      section.content.map((para, pi) => (
                        <p
                          key={pi}
                          className="text-[var(--c-muted)] text-sm sm:text-base md:text-[17px] leading-relaxed mb-4 text-justify"
                        >
                          {para}
                        </p>
                      ))
                    ) : (
                      <p className="text-[var(--c-muted)] text-sm sm:text-base md:text-[17px] leading-relaxed text-justify">
                        {section.content}
                      </p>
                    )}
                  </AnimatedSection>
                </div>
              ))}

              {/* Why Choose Us */}
              <AnimatedSection>
                <div className="glass-card p-6 sm:p-8 mb-10">
                  <h3 className="t-h2 text-[var(--c-primary)] mb-5 sm:mb-6">
                    Why Choose Banshidhar Infratech?
                  </h3>
                  <div
                    ref={benefitsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                  >
                    {service.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        data-benefit
                        style={{ opacity: 0, transform: "translateX(-30px)" }}
                        className="flex items-start gap-3 p-3 rounded-md hover:bg-[var(--c-primary-soft)]/60 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span className="text-[var(--c-ink-2)] text-sm sm:text-base">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Service Coverage */}
              <AnimatedSection>
                <div className="rounded-[var(--r-lg)] gradient-mesh p-6 sm:p-8 mb-10 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative">
                    <h3 className="t-h2 text-white mb-5 sm:mb-6 flex items-center gap-2">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--c-accent-2)]" />
                      Our Service Coverage
                    </h3>
                    <div
                      ref={coverageRef}
                      className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
                    >
                      {service.coverage.map((loc, i) => (
                        <div
                          key={i}
                          data-coverage
                          style={{ opacity: 0, transform: "scale(0.9)" }}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-md px-3 py-2.5 border border-white/10"
                        >
                          <ArrowRight className="w-4 h-4 text-[var(--c-accent-2)] flex-shrink-0" />
                          <span className="text-white text-sm sm:text-base">{loc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* FAQ */}
              {service.faqs && service.faqs.length > 0 && (
                <AnimatedSection>
                  <div className="mb-10">
                    <h3 className="t-h2 text-[var(--c-primary)] mb-5 sm:mb-6">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-3">
                      {service.faqs.map((faq, i) => (
                        <FaqItem
                          key={i}
                          index={i}
                          question={faq.question}
                          answer={faq.answer}
                          open={openFaq === i}
                          onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                        />
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <AnimatedSection
              direction="right"
              delay={0.3}
              className="w-full lg:w-[30%] lg:sticky lg:top-24 lg:self-start"
            >
              {/* Service Nav */}
              <div className="bg-white rounded-[var(--r-md)] border border-[var(--c-line)] shadow-[var(--shadow-soft)] overflow-hidden mb-6">
                <h3 className="bg-[var(--c-primary)] text-white py-4 px-5 text-base sm:text-lg font-bold">
                  Our Services
                </h3>
                <ul ref={sidebarNavRef}>
                  {serviceCategories.map((cat, i) => (
                    <li
                      key={cat.id}
                      data-side-nav
                      style={{ opacity: 0, transform: "translateX(20px)" }}
                      className={
                        i !== serviceCategories.length - 1
                          ? "border-b border-[var(--c-line)]"
                          : ""
                      }
                    >
                      <Link
                        href={`/services/${cat.id}`}
                        className={`flex items-center justify-between px-5 py-3.5 text-sm sm:text-base transition-all duration-200 group ${
                          serviceId === cat.id
                            ? "bg-[var(--c-primary)] text-white font-semibold"
                            : "text-[var(--c-ink-2)] hover:bg-[var(--c-primary)] hover:text-white"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enquiry Form */}
              <AnimatedSection delay={0.4} direction="right">
                <div className="bg-white rounded-[var(--r-md)] border border-[var(--c-line)] shadow-[var(--shadow-soft)] overflow-hidden mb-6">
                  <h3 className="bg-[var(--c-accent)] text-white py-4 px-5 text-base sm:text-lg font-bold">
                    Send Enquiry
                  </h3>
                  <form className="p-5 space-y-3">
                    <select className="w-full border border-[var(--c-line)] rounded-md p-3 text-sm text-[var(--c-ink-2)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] bg-white transition-shadow">
                      <option value="">Select Service</option>
                      {serviceCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full border border-[var(--c-line)] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full border border-[var(--c-line)] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full border border-[var(--c-line)] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={4}
                      className="w-full border border-[var(--c-line)] rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] resize-none"
                    />
                    <button type="submit" className="btn-glow w-full justify-center">
                      Send Enquiry
                    </button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Contact Info Card */}
              <AnimatedSection delay={0.5} direction="right">
                <div className="rounded-[var(--r-md)] gradient-mesh p-5 text-white mb-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative">
                    <h3 className="text-base sm:text-lg font-bold mb-4">Need Help?</h3>
                    <div className="space-y-4">
                      <a
                        href="tel:+916202557765"
                        className="flex items-center gap-3 group"
                      >
                        <div className="bg-[var(--c-accent)] p-2.5 rounded-full group-hover:bg-[var(--c-accent-2)] transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/60">Call Us</p>
                          <p className="font-bold text-sm sm:text-base">+91 6202557765</p>
                        </div>
                      </a>
                      <a
                        href="mailto:enquiry@banshidharinfratech.com"
                        className="flex items-center gap-3 group"
                      >
                        <div className="bg-[var(--c-accent)] p-2.5 rounded-full group-hover:bg-[var(--c-accent-2)] transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/60">Email Us</p>
                          <p className="font-semibold text-xs sm:text-sm break-all">
                            enquiry@banshidharinfratech.com
                          </p>
                        </div>
                      </a>
                      <div className="flex items-start gap-3">
                        <div className="bg-[var(--c-accent)] p-2.5 rounded-full flex-shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs text-white/60">Address</p>
                          <p className="font-semibold text-xs sm:text-sm">
                            Station Road, Gurudwara Gali, Opposite Budha Park, Patna —
                            800001
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Hours */}
              <AnimatedSection delay={0.6} direction="right">
                <div className="bg-white rounded-[var(--r-md)] border border-[var(--c-line)] shadow-[var(--shadow-soft)] p-5">
                  <h3 className="text-base font-bold text-[var(--c-primary)] mb-3">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-sm text-[var(--c-muted)]">
                    <div className="flex justify-between">
                      <span>Monday – Friday</span>
                      <span className="font-semibold text-[var(--c-ink)]">
                        9:00 AM – 6:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span className="font-semibold text-[var(--c-ink)]">
                        9:00 AM – 2:00 PM
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span className="font-semibold text-[var(--c-accent)]">Closed</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative gradient-mesh py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection delay={0.05}>
            <h2 className="t-h1 text-white mb-3 sm:mb-4">
              Looking for Professional {service.title}?
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-6">
              Contact Banshidhar Infratech today for a free consultation and competitive
              quote.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.25}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:+916202557765" className="btn-glow">
                <Phone className="w-4 h-4" />
                Call: +91 6202557765
              </a>
              <Link href="/contact" className="btn-ghost">
                Get Free Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
