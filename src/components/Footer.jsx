"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Subtle scale-bounce on the scroll-to-top button when it appears
  useEffect(() => {
    const node = buttonRef.current;
    if (!node || !isVisible) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      node.style.opacity = "1";
      node.style.transform = "scale(1)";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !buttonRef.current) return;
      animate(buttonRef.current, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 350,
        ease: "outBack",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div
        className="absolute inset-0 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage: "url('/assets/images/site-footer-mape.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pt-14 pb-10">
        {/* Logo & Social */}
        <div className="flex flex-col items-center sm:items-start space-y-5">
          <Image
            src="/assets/icons/logo.png"
            alt="Banshidhar Infratech"
            width={144}
            height={86}
            loading="lazy"
            className="w-32 sm:w-36 h-auto"
          />
          <p className="text-sm text-white/70 max-w-xs text-center sm:text-left">
            Engineered foundations and premium equipment rentals — pan-India operations
            since 2017.
          </p>
          <div className="flex space-x-3">
            {[
              { icon: FaInstagram, href: "https://www.instagram.com/banshidharinfratech/" },
              { icon: FaTwitter, href: "https://twitter.com" },
              { icon: FaFacebookF, href: "https://www.facebook.com/profile.php?id=61583334338545" },
              { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/banshidhar-infratech/?viewAsMember=true" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social link"
                className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-[var(--c-accent)] backdrop-blur-sm border border-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="text-center sm:text-left">
          <h2 className="text-base font-bold uppercase tracking-wider mb-4 text-white">
            Quick Links
          </h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {[
              { href: "/about", label: "About Us" },
              { href: "/services", label: "Services" },
              { href: "/equipments", label: "Equipments" },
              { href: "/projects", label: "Projects" },
              { href: "/contact", label: "Contact Us" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[var(--c-accent-2)] transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--c-accent)]" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h2 className="text-base font-bold uppercase tracking-wider mb-4">Contact</h2>
          <ul className="space-y-3 text-sm text-white/75">
            <li>
              <a
                href="tel:+916202557765"
                className="hover:text-[var(--c-accent-2)] transition-colors"
              >
                📞 +91 6202557765
              </a>
            </li>
            <li>
              <a
                href="mailto:enquiry@banshidharinfratech.com"
                className="hover:text-[var(--c-accent-2)] transition-colors break-all"
              >
                ✉ enquiry@banshidharinfratech.com
              </a>
            </li>
            <li>
              📍 Station Road, Gurudwara Gali,
              <br />
              Opposite Budha Park, Patna — 800001
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="text-center sm:text-left">
          <h2 className="text-base font-bold uppercase tracking-wider mb-4">Services</h2>
          <ul className="space-y-2.5 text-sm text-white/75">
            {[
              { href: "/services/piling-foundation", label: "Piling Foundation" },
              { href: "/services/piling-rig-rental", label: "Piling Rig Rental" },
              { href: "/services/boom-lift", label: "Boom Lift Rental" },
              { href: "/services/piling-contractor", label: "Piling Contractor" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-[var(--c-accent-2)] transition-colors inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--c-accent)]" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 border-t border-white/10 py-5 text-center">
        <p className="text-sm text-white/65">
          © {new Date().getFullYear()} All rights reserved by{" "}
          <span className="text-[var(--c-accent-2)] font-semibold">
            Banshidhar Infratech
          </span>
        </p>
      </div>

      {isVisible && (
        <button
          ref={buttonRef}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{ opacity: 0 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 grid place-items-center rounded-full bg-[var(--c-accent)] hover:bg-[var(--c-accent-2)] text-white shadow-[0_15px_30px_-10px_rgba(225,29,72,0.7)] cursor-pointer transition-colors duration-300 z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
}
