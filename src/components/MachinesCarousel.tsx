"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/anim/AnimatedSection";
import "swiper/css";
import "swiper/css/pagination";

interface Machine {
  image: string;
  name: string;
  details?: string;
}

const machines: Machine[] = [
  { image: "/assets/images/boomlift.jpg", name: "JLG 800AJ — 80 ft", details: "Boom Lift" },
  { image: "/assets/images/mach12.jpg", name: "Piling Rig", details: "Heavy Machinery" },
  {
    image: "/assets/images/mach13.jpg",
    name: "Construction Equipment",
    details: "Heavy Machinery",
  },
  {
    image: "/assets/images/pili.png",
    name: "Piling Machine",
    details: "Foundation Equipment",
  },
];

const MachinesCarousel: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white to-[var(--c-surface-2)]">
      <div className="absolute inset-0 gradient-mesh-soft pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <AnimatedSection className="mb-10 sm:mb-14">
          <span className="eyebrow">Our Fleet</span>
          <h2 className="t-h1 text-[var(--c-primary)] mt-3">Machines</h2>
          <p className="body-lg max-w-2xl mx-auto mt-3">
            Modern, well-maintained equipment ready to mobilize across India.
          </p>
        </AnimatedSection>

        <AnimatedSection>
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={28}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {machines.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center">
                  <div className="relative w-full h-64 md:h-72 rounded-[var(--r-md)] overflow-hidden shadow-[var(--shadow-soft)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[var(--shadow-pop)] group cursor-pointer">
                    <Image
                      src={item.image}
                      alt={`Machine ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-0 left-0 p-4 sm:p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-bold text-base sm:text-lg drop-shadow-lg text-left">
                        {item.name}
                      </h3>
                      {item.details && (
                        <p className="text-white/90 text-xs sm:text-sm mt-1 drop-shadow-md text-left">
                          {item.details}
                        </p>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                      <div className="bg-[var(--c-accent)] hover:bg-[var(--c-accent-2)] w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-md shadow-lg transition-colors duration-300">
                        <ArrowRight className="text-white w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MachinesCarousel;
