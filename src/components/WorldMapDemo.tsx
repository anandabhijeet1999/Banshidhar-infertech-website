"use client";
import { WorldMap } from "@/components/ui/world-map";
import AnimatedText from "@/components/anim/AnimatedText";
import AnimatedSection from "@/components/anim/AnimatedSection";

export function WorldMapDemo() {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white w-full px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
      <div className="relative max-w-7xl mx-auto text-center">
        <AnimatedSection className="mb-3">
          <span className="eyebrow">Pan-India Reach</span>
        </AnimatedSection>
        <AnimatedText
          text="Strong Connections Connectivity"
          as="h2"
          className="t-h1 text-[var(--c-ink)] max-w-3xl mx-auto"
          effect="fadeUp"
          staggerMs={45}
        />
        <AnimatedSection delay={0.2}>
          <p className="body-lg max-w-2xl mx-auto mt-4">
            Banshidhar Infratech operates at active project sites across India and Nepal
            with strong on-ground connectivity and seamless coordination between teams.
          </p>
        </AnimatedSection>
      </div>
      <div className="relative px-2 sm:px-4 md:px-6 mt-8 sm:mt-12">
        <WorldMap
          lineColor="#e11d48"
          dots={[
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 27.7172, lng: 85.324, label: "Kathmandu, Nepal" },
            },
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
            },
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 20.2961, lng: 85.8245, label: "Bhubaneswar, Odisha" },
            },
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 13.0827, lng: 80.2707, label: "Chennai, Tamil Nadu" },
            },
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 19.076, lng: 72.8777, label: "Mumbai, Maharashtra" },
            },
            {
              start: { lat: 25.6093, lng: 85.1376, label: "Patna, Bihar" },
              end: { lat: 22.5726, lng: 88.3639, label: "Kolkata, West Bengal" },
            },
          ]}
        />
      </div>
    </section>
  );
}
