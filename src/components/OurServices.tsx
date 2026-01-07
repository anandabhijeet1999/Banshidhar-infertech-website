"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface Service {
  title: string;
  desc: string;
  img: string;
  color: string;
}

const services: Service[] = [
  {
    title: "Piling Foundation Services",
    desc: "We provide an entire range of Pile Foundation Services keep innovating them based.....",
    img: "/assets/images/piling3.png",
    color: "text-blue-900",
  },
  {
    title: "Piling Rig Rental Services",
    desc: "We deliver your products around the globe as and wherever required. The quality we.....",
    img: "/assets/images/cnc.jpg",
    color: "text-blue-900",
  },
  {
    title: "Boom Lift Rental Services",
    desc: "We are the leading prominent boom lift on hire service provider in India. Also, We provide.....",
    img: "/assets/images/boomlift.jpg",
    color: "text-blue-900",
  },
  {
    title: "Piling Rig Contractor",
    desc: "We deal in providing the service of Piling Contractors Services on hire and on a rental basis. Our organization has.....",
    img: "/assets/images/pil-cont.jpg",
    color: "text-blue-900",
  },
];

export default function OurServices() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <p className="uppercase text-gray-500 tracking-wide text-xs sm:text-sm">
          — Services we&apos;re offering
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 mt-2">
          Our Services
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg shadow-md 
                       hover:shadow-xl transition-all duration-300 
                       overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-48 sm:h-56 w-full">
              <Image
                src={service.img}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[180px] sm:h-48">
              {/* Title */}
              <h3
                className={`text-base sm:text-lg font-bold 
                ${service.color} 
                group-hover:text-red-600 
                transition-colors duration-300`}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p
                className="text-gray-600 text-xs sm:text-sm mt-2 mb-4
                           group-hover:text-red-600 
                           transition-colors duration-300"
              >
                {service.desc}
              </p>

              {/* Icon */}
              <ArrowRight
                size={18}
                className={`${service.color} 
                            group-hover:text-red-600 
                            transition-colors duration-300 
                            sm:w-5 sm:h-5`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
