"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Play, X } from "lucide-react";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

export default function Vide() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const videoPath = "/assets/videos/video.mp4";

  // Animate status banner in
  useEffect(() => {
    const node = statusRef.current;
    if (!node || !submitStatus) return;
    if (prefersReducedMotion()) {
      node.style.opacity = "1";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !statusRef.current) return;
      animate(statusRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 350,
        ease: EASE_OUT,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [submitStatus]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    const templateParams = {
      from_name: name,
      from_email: email,
      phone,
      message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] md:min-h-screen text-white overflow-hidden">
      <div className="relative w-full min-h-[80vh] md:min-h-screen flex flex-col md:flex-row items-center justify-between px-4 py-10 sm:px-6 md:p-10 bg-[url('/assets/images/baneq.webp')] bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-[#0b1240]/70 to-black/70" />

        {/* Left Content */}
        <div className="relative z-10 text-left max-w-lg mx-auto md:mx-0 md:ml-12 lg:ml-20">
          <AnimatedSection direction="left" className="mb-8">
            <button
              onClick={() => setIsVideoOpen(true)}
              aria-label="Play company video"
              className="group relative inline-flex items-center justify-center"
            >
              {/* Static outer ring */}
              <span className="absolute inset-0 -m-5 rounded-full border-2 border-[var(--c-accent)]/30" />
              {/* Pulsing wave 1 */}
              <span className="absolute inset-0 -m-2 rounded-full border-2 border-[var(--c-accent)] animate-ping" />
              {/* Pulsing wave 2 (delayed for double-ripple effect) */}
              <span
                className="absolute inset-0 -m-2 rounded-full border-2 border-[var(--c-accent)]/70 animate-ping"
                style={{ animationDelay: "0.6s" }}
              />
              <span className="relative w-20 h-20 rounded-full bg-[var(--c-accent)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-[0_20px_40px_-15px_rgba(225,29,72,0.7)]">
                <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
              </span>
            </button>
          </AnimatedSection>
          <AnimatedSection direction="left" delay={0.1}>
            <span className="eyebrow bg-white/10 text-white border border-white/20">
              Banshidhar Infratech
            </span>
          </AnimatedSection>
          <AnimatedText
            text="We're Building the Future and Restoring the Past"
            as="h1"
            className="t-display text-white mt-4"
            effect="blur"
            staggerMs={50}
          />
          <AnimatedSection delay={0.4}>
            <p className="text-white/80 mt-5 max-w-md text-base sm:text-lg">
              Engineered foundations, premium rental fleets, and operational excellence —
              all in one team.
            </p>
          </AnimatedSection>
        </div>

        {/* Right Form */}
        <AnimatedSection
          direction="right"
          delay={0.2}
          className="relative z-10 w-full md:w-auto flex items-center justify-center mt-8 md:mt-0 md:mr-12 lg:mr-20"
        >
          <div className="w-full max-w-md glass-card p-6 sm:p-8 md:p-10">
            <h2 className="t-h2 text-[var(--c-primary)] mb-6">Get a Free Quote</h2>
            <form className="flex flex-col space-y-3.5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 bg-white/80 border border-[var(--c-line)] rounded-md text-[var(--c-ink)] placeholder-[var(--c-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] transition-shadow"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-white/80 border border-[var(--c-line)] rounded-md text-[var(--c-ink)] placeholder-[var(--c-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 bg-white/80 border border-[var(--c-line)] rounded-md text-[var(--c-ink)] placeholder-[var(--c-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
              />
              <textarea
                placeholder="Tell us about your project…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="p-3 bg-white/80 border border-[var(--c-line)] rounded-md text-[var(--c-ink)] placeholder-[var(--c-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] resize-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending…" : "Request a Quote"}
              </button>
              {submitStatus && (
                <div
                  ref={statusRef}
                  style={{ opacity: 0 }}
                  className={`mt-2 p-3 rounded-md text-sm font-medium ${
                    submitStatus === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitStatus === "success"
                    ? "✓ Message sent successfully — we'll be in touch soon."
                    : "✗ Failed to send. Please try again later."}
                </div>
              )}
            </form>
          </div>
        </AnimatedSection>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video"
              className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative w-full aspect-video bg-black rounded-[var(--r-md)] overflow-hidden">
              <video
                src={videoPath}
                controls
                autoPlay
                className="w-full h-full"
                onError={() => {
                  alert(
                    "Video file not found. Please add it at: public/assets/videos/video.mp4"
                  );
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
