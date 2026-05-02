"use client";
import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";
import LazyMap from "@/components/anim/LazyMap";
import { useAnimeStagger, prefersReducedMotion, EASE_OUT } from "@/lib/anime";

export default function ContactPage() {
  const [equipment, setEquipment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<
    null | { type: "success" | "error"; msg: string }
  >(null);

  const formRef = useAnimeStagger<HTMLFormElement>(
    "[data-field]",
    { opacity: [0, 1], translateX: [-30, 0], duration: 500 },
    80
  );
  const statusRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = statusRef.current;
    if (!node || !status) return;
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
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!equipment || !name || !email || !phone || !message) {
      setStatus({ type: "error", msg: "Please fill all fields before submitting." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        { equipment, name, email, phone, message },
        { publicKey }
      );

      setStatus({ type: "success", msg: "Your message has been sent successfully." });
      setEquipment("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS error", error);
      setStatus({
        type: "error",
        msg: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/contact.jpg"
            alt="Contact Banshidhar Infratech"
            fill
            sizes="100vw"
            className="object-cover object-[50%_30%]"
            priority
          />
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60 flex flex-col items-center justify-center text-center px-4">
            <span className="eyebrow bg-white/15 text-white border border-white/20 backdrop-blur-sm">
              Get in touch
            </span>
            <AnimatedText
              text="Contact Us"
              as="h1"
              className="t-display text-white"
              effect="blur"
              immediate
              staggerMs={70}
            />
          </div>
        </div>
      </section>

      {/* Office Details */}
      <section className="bg-[var(--c-surface-2)] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="eyebrow">We&apos;re here to help</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">Reach Our Offices</h2>
            <p className="body-lg max-w-2xl mx-auto mt-3">
              Talk to our team about your project — partnerships, rentals, or contractor
              services. We respond within one business day.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <AnimatedSection direction="left">
              <div className="glass-card h-full p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[var(--c-primary-soft)]">
                    <MapPin className="w-5 h-5 text-[var(--c-primary)]" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--c-primary)]">
                    Corporate Office
                  </h4>
                </div>
                <p className="text-[var(--c-ink-2)] text-sm sm:text-base leading-relaxed">
                  <strong className="text-[var(--c-primary)]">Banshidhar Infratech</strong>
                  <br />
                  Station Road, Gurudwara Gali, Opposite Budha Park, Patna — 800001
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href="tel:+919431067101"
                    className="flex items-center gap-2 text-[var(--c-ink-2)] hover:text-[var(--c-accent)] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 9431067101
                  </a>
                  <a
                    href="mailto:enquiry@banshidharinfratech.com"
                    className="flex items-center gap-2 text-[var(--c-ink-2)] hover:text-[var(--c-accent)] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    enquiry@banshidharinfratech.com
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="glass-card h-full p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-[var(--c-accent-soft)]">
                    <MapPin className="w-5 h-5 text-[var(--c-accent)]" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--c-primary)]">
                    Registered Office
                  </h4>
                </div>
                <p className="text-[var(--c-ink-2)] text-sm sm:text-base leading-relaxed">
                  <strong className="text-[var(--c-primary)]">Banshidhar Infratech</strong>
                  <br />
                  Barhi Tola, Isopur, Phulwarisharif, Patna — 801505, Bihar, India
                </p>
                <div className="mt-4 space-y-2 text-sm">
                  <a
                    href="tel:+916202557765"
                    className="flex items-center gap-2 text-[var(--c-ink-2)] hover:text-[var(--c-accent)] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    +91 6202557765
                  </a>
                  <a
                    href="mailto:banshidharinfratech@gmail.com"
                    className="flex items-center gap-2 text-[var(--c-ink-2)] hover:text-[var(--c-accent)] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    banshidharinfratech@gmail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-10">
            <span className="eyebrow">Drop us a line</span>
            <h2 className="t-h1 text-[var(--c-primary)] mt-3">Feel Free to Contact</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative bg-white rounded-[var(--r-lg)] shadow-[var(--shadow-soft)] border border-[var(--c-line)] p-6 sm:p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 t-h1 bg-gradient-to-r from-[var(--c-primary)] via-[var(--c-primary-2)] to-[var(--c-accent)]" />
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <select
                  data-field
                  style={{ opacity: 0, transform: "translateX(-30px)" }}
                  className="w-full border border-[var(--c-line)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] transition-shadow"
                  value={equipment}
                  onChange={(e) => setEquipment(e.target.value)}
                >
                  <option value="">Please choose service</option>
                  <option value="Equipment Rental Service">Equipment Rental Service</option>
                  <option value="Piling Rig Contractor">Piling Rig Contractor</option>
                  <option value="Piling Foundation Services">
                    Piling Foundation Services
                  </option>
                  <option value="Boom Lift Rental">Boom Lift Rental</option>
                </select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    data-field
                    style={{ opacity: 0, transform: "translateX(-30px)" }}
                    type="text"
                    placeholder="Your Name"
                    className="border border-[var(--c-line)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    data-field
                    style={{ opacity: 0, transform: "translateX(-30px)" }}
                    type="email"
                    placeholder="Email Address"
                    className="border border-[var(--c-line)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  data-field
                  style={{ opacity: 0, transform: "translateX(-30px)" }}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-[var(--c-line)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)]"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <textarea
                  data-field
                  style={{ opacity: 0, transform: "translateX(-30px)" }}
                  placeholder="Write a message…"
                  className="w-full border border-[var(--c-line)] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-primary)] resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />

                <div data-field style={{ opacity: 0, transform: "translateX(-30px)" }}>
                  <button
                    type="submit"
                    className="btn-glow w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? "Sending…" : "Send a Message"}
                  </button>
                </div>

                {status && (
                  <div
                    ref={statusRef}
                    style={{ opacity: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-md text-sm font-medium ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    {status.msg}
                  </div>
                )}
              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[var(--c-surface-2)] py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-8">
            <span className="eyebrow">Visit our location</span>
            <h2 className="t-h2 text-[var(--c-primary)] mt-3">Find Us</h2>
          </AnimatedSection>
          <AnimatedSection>
            <LazyMap
              src="https://www.google.com/maps?q=25.5870,85.0870&z=15&output=embed"
              title="Banshidhar Infratech location"
              height="500px"
              className="rounded-[var(--r-lg)] shadow-[var(--shadow-soft)]"
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
