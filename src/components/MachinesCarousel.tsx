"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

interface Machine {
  image: string;
  name: string;
  details?: string;
}

const machines: Machine[] = [
  { image: "/assets/images/boomlift.jpg", name: "JLG 80Feet 800AJ", details: "Boom Lift" },
  { image: "/assets/images/mach12.jpg", name: "Piling Rig", details: "Heavy Machinery" },
  { image: "/assets/images/mach13.jpg", name: "Construction Equipment", details: "Heavy Machinery" },
  { image: "/assets/images/pili.png", name: "Piling Machine", details: "Foundation Equipment" },
];

const MachinesCarousel: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1D257A] mb-10 tracking-wide drop-shadow-md">
          MACHINES
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-8"
        >
          {machines.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center">
                {/* parent must have position:relative and a defined height for Image fill */}
                <div className="relative w-full h-64 md:h-72 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 group cursor-pointer">
                  <Image
                    src={item.image}
                    alt={`Machine ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Dark Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300"></div>
                  
                  {/* Machine Name Overlay - Bottom Left */}
                  <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-bold text-sm sm:text-base md:text-lg drop-shadow-lg">
                      {item.name}
                    </h3>
                    {item.details && (
                      <p className="text-white/90 text-xs sm:text-sm mt-1 drop-shadow-md">
                        {item.details}
                      </p>
                    )}
                  </div>
                  
                  {/* Arrow Button - Top Right */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <div className="bg-red-600 hover:bg-red-700 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded shadow-lg transition-colors duration-300">
                      <ArrowRight className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MachinesCarousel;
