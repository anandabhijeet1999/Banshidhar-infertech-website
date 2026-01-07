"use client";

import Image from "next/image";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <>
      {/* Banner */}
      <section className="relative w-full">
        <div className="relative h-[220px] sm:h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/Project.jpg"
            alt="Projects"
            fill
            className="object-cover object-[50%_30%]"
            priority
          />
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <ProjectCard
              image="/assets/images/pro2.jpg"
              company="Larsen & Toubro Limited,Construction"
              location="Patna"
              equipment="80 Feet JLG Boomlift - 1 No"
            />

            <ProjectCard
              image="/assets/images/pro3.jpg"
              company="Earthcon Services & Trading Pvt. Ltd."
              location="Nepal"
              equipment="125 Feet JLG Boomlift - 1 No"
            />

            <ProjectCard
              image="/assets/images/cnc.jpg"
              company="Ess Technofabs Pvt. Ltd."
              location="Bhubaneswar, Odisha"
              equipment="150 Feet JLG Boomlift - 1 No"
            />

          </div>
        </div>
      </section>
    </>
  );
}
