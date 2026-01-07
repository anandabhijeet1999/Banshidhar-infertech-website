"use client";
import Image from "next/image";
import { StickyScrollRevealDemo } from "@/components/StickyScrollRevealDemo";
import Testimonials from "@/components/Testimonials";
import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo";
export default function AboutPage() {
  return (
    <>
      <section className="relative w-full h-auto flex flex-col items-center justify-center text-center bg-white">
        {/* Image Section */}
        <div className="w-full relative h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/About.jpg"
            alt="About Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-10 bg-white">
        {/* Left: Image */}
        <div className="relative w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-0">
          <Image
            src="/assets/images/piling.png"
            alt="Heavy Machine"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 md:pl-6 lg:pl-10 text-gray-700">
          <p className="text-xs sm:text-sm uppercase tracking-widest text-gray-400 font-semibold mb-2">
            — Welcome to Company
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-800 mb-4 sm:mb-6">
            Banshidhar Infratech
          </h2>

          <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            We like to introduce ourselves as an organization solely dedicated
            into rental service of medium to large sized heavy-duty hydraulic
            telescopic, crawler cranes and tower cranes with capacity ranging
            from 20 Ton to 450 Ton & boomlifts ranging from 40 Feet to 210 Feet.
          </p>

          <p className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
            The company has a registered office in Patna having above 8 years
            of experience and more than 15 operational sites across India.
          </p>

          <p className="text-sm sm:text-base leading-relaxed">
            The company provides crane rental services to major heavy industries
            in sectors like Power (Wind, Thermal, Hydro & Nuclear Energy),
            Cement, Steel Refinery and metro projects. Today, S L Infra is a
            major player in supplying heavy duty cranes in heavy lift projects.
          </p>
        </div>
      </section>
      <StickyScrollRevealDemo />
      <Testimonials/>
      <AnimatedTestimonialsDemo/>
    </>
  );
}
