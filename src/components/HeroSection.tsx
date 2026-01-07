"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [count, setCount] = useState(1);
  const [isBlue, setIsBlue] = useState(false);

  // Counter
  useEffect(() => {
    if (count >= 20) return;
    const t = setInterval(() => setCount((p) => p + 1), 60);
    return () => clearInterval(t);
  }, [count]);

  // Icon toggle
  useEffect(() => {
    const t = setInterval(() => setIsBlue((p) => !p), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-10 lg:py-20">
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row items-center">

        {/* 🔴 Red Vertical Strip */}
        <div className="absolute left-0 top-0 h-full w-3 bg-red-600" />

        {/* LEFT IMAGE */}
        <div className="relative w-full lg:w-1/2 h-[360px] sm:h-[420px] lg:h-[480px] flex justify-center">
          <Image
            src="/assets/images/pilingside11.png"
            alt="Heavy machinery"
            fill
            className="object-contain"
            priority
          />

          {/* ✅ Floating Stats Card (Screenshot Style) */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 bg-white rounded-xl shadow-md p-4 flex items-center gap-4 z-10 max-w-[90%]">
            <Image
              src={
                isBlue
                  ? "/assets/icons/Inde.png"
                  : "/assets/icons/sp.png"
              }
              alt="Industry Icon"
              width={60}
              height={60}
              className="w-14 h-14 sm:w-16 sm:h-16 transition-all duration-500"
            />

            <div>
              <p className="text-blue-900 font-bold text-xl">
                {count}{" "}
                <span className="text-gray-600 font-medium">
                  Industry
                </span>
              </p>
              <p className="text-gray-600 text-lg leading-tight">
                Projects Completed
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 py-8 lg:py-12 text-center lg:text-left space-y-5">
          <h4 className="uppercase text-gray-500 tracking-wide">
            — Welcome to company
          </h4>

          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-blue-900">
            Banshidhar Infratech
          </h1>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            We like to introduce ourselves as an organization solely dedicated
            into Rental service of medium to large sized heavy-duty hydraulic
            telescopic, Crawler Cranes and Tower Cranes with capacity ranging from
            20 Ton to 450 Ton & Boomlifts ranging from 40 Feet to 210 Feet.
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            The company has a registered office in Patna having above 8 years of
            experience and more than 5 operational sites across India.
          </p>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            The company provides crane rental services to major heavy industries
            in sectors like Power, Cement, Steel Refinery, and Metro projects.
            <b>
              {" "}
              Today, Banshidhar Infratech is a major player in heavy lift projects.
            </b>
          </p>
        </div>
      </div>
    </section>
  );
}
