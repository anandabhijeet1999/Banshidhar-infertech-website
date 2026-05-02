"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/equipments", label: "Equipments" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const serviceDropdownItems = [
  { label: "Piling Foundation Services", tab: "piling-foundation" },
  { label: "Piling Rig Rental Services", tab: "piling-rig-rental" },
  { label: "Boom Lift Rental Services", tab: "boom-lift" },
  { label: "Piling Contractor", tab: "piling-contractor" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Sticky shrink-on-scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Animate dropdown panel via Anime.js
  useEffect(() => {
    const panel = dropdownRef.current;
    if (!panel) return;
    if (prefersReducedMotion()) {
      panel.style.opacity = isDropdownOpen ? "1" : "0";
      panel.style.transform = "none";
      panel.style.pointerEvents = isDropdownOpen ? "auto" : "none";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !dropdownRef.current) return;
      animate(dropdownRef.current, {
        opacity: isDropdownOpen ? [0, 1] : [1, 0],
        translateY: isDropdownOpen ? [-8, 0] : [0, -8],
        duration: 220,
        ease: EASE_OUT,
      });
      dropdownRef.current.style.pointerEvents = isDropdownOpen ? "auto" : "none";
    });
    return () => {
      cancelled = true;
    };
  }, [isDropdownOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass = (active: boolean) =>
    cn(
      "relative px-3 py-1.5 rounded-full text-sm xl:text-base font-medium transition-all duration-300",
      active
        ? "text-white bg-[var(--c-primary)] shadow-[0_8px_18px_-8px_rgba(46,63,183,0.6)]"
        : "text-[var(--c-ink-2)] hover:text-[var(--c-primary)] hover:bg-[var(--c-primary-soft)]"
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] border-b border-[var(--c-line)]"
          : "bg-white"
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-300",
          scrolled ? "py-2" : "py-3"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Home">
          <Image
            src="/assets/icons/logo.png"
            alt="Banshidhar Infratech"
            width={96}
            height={56}
            priority
            className={cn(
              "h-auto transition-all duration-300",
              scrolled ? "w-14 sm:w-16 md:w-20" : "w-16 sm:w-20 md:w-24"
            )}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const active = link.hasDropdown
              ? pathname?.startsWith("/services") ?? false
              : pathname === link.href;
            if (link.hasDropdown) {
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link href={link.href} className={navLinkClass(active)}>
                    <span className="inline-flex items-center gap-1">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isDropdownOpen && "rotate-180"
                        )}
                      />
                    </span>
                  </Link>
                  <div
                    ref={dropdownRef}
                    style={{ opacity: 0, pointerEvents: "none" }}
                    className="absolute left-0 top-full pt-3 z-50"
                  >
                    <div className="w-72 glass-card overflow-hidden">
                      {serviceDropdownItems.map((item, i) => (
                        <Link
                          key={item.tab}
                          href={`/services/${item.tab}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-5 py-3 text-sm font-medium group transition-colors",
                            "text-[var(--c-ink-2)] hover:bg-[var(--c-primary)] hover:text-white",
                            i !== serviceDropdownItems.length - 1 &&
                              "border-b border-[var(--c-line)]"
                          )}
                        >
                          <span>{item.label}</span>
                          <svg
                            className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              );
            }
            return (
              <li key={link.href}>
                <Link href={link.href} className={navLinkClass(active)}>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Phone CTA */}
        <a
          href="tel:+916202557765"
          className="hidden lg:inline-flex items-center gap-2 btn-glow !py-2 !px-4 text-sm"
        >
          <Phone className="w-4 h-4" />
          +91 6202557765
        </a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-full text-[var(--c-primary)] hover:bg-[var(--c-primary-soft)] transition-colors"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden absolute inset-x-0 top-full bg-white shadow-xl border-t border-[var(--c-line)] max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col gap-1.5 py-4 px-4">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.href}>
                    <button
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors",
                        pathname?.startsWith("/services")
                          ? "bg-[var(--c-primary)] text-white"
                          : "text-[var(--c-ink-2)] hover:bg-[var(--c-primary-soft)]"
                      )}
                      onClick={() => setServicesOpenMobile(!servicesOpenMobile)}
                    >
                      Services
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          servicesOpenMobile && "rotate-180"
                        )}
                      />
                    </button>
                    {servicesOpenMobile && (
                      <div className="mt-1 rounded-xl border border-[var(--c-line)] overflow-hidden">
                        <Link
                          href="/services"
                          className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--c-primary)] bg-[var(--c-primary-soft)] border-b border-[var(--c-line)]"
                          onClick={() => {
                            setOpen(false);
                            setServicesOpenMobile(false);
                          }}
                        >
                          All Services
                        </Link>
                        {serviceDropdownItems.map((item, i) => (
                          <Link
                            key={item.tab}
                            href={`/services/${item.tab}`}
                            className={cn(
                              "flex items-center justify-between px-4 py-3 text-sm text-[var(--c-ink-2)] active:bg-[var(--c-primary)] active:text-white transition-colors",
                              i !== serviceDropdownItems.length - 1 &&
                                "border-b border-[var(--c-line)]"
                            )}
                            onClick={() => {
                              setOpen(false);
                              setServicesOpenMobile(false);
                            }}
                          >
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[var(--c-primary)] text-white"
                      : "text-[var(--c-ink-2)] hover:bg-[var(--c-primary-soft)]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <a
              href="tel:+916202557765"
              className="btn-glow mt-3 justify-center"
              onClick={() => setOpen(false)}
            >
              <Phone className="w-4 h-4" />
              +91 6202557765
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
