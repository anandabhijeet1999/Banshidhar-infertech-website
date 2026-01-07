"use client";

import { useState } from "react";
import Image from "next/image";

interface Tab {
  id: string;
  title: string;
  content: string;
  image: string;
}

const tabs: Tab[] = [
  {
    id: "vision",
    title: "VISION",
    content:
      "We are committed to serve the interests of all our clients by being and establishing our position at the top within the country and be among the foremost companies across the India in our core business through exceptional business ethics.",
    image: "/assets/icons/slquality1.png",
  },
  {
    id: "mission",
    title: "MISSION",
    content:
      "To provide our clients with the ability to complete in a safe, economical, timely and efficient manner while ensuring a consistently positive and professional experience.",
    image: "/assets/images/vis2.jpg",
  },
  {
    id: "quality",
    title: "QUALITY POLICY",
    content:
      "We wish to delight our customers and exceeding their expectations by providing maintenance free Crane, Boomlifts. Tower Cranes and prompt service.",
    image: "/assets/icons/slquality.png"
  },
];

export default function VisionTabs() {
  const [activeTab, setActiveTab] = useState<string>("vision");

  const active = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs Header */}
        <div className="flex flex-wrap shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] text-center font-bold py-3 sm:py-4 text-xs sm:text-sm md:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white text-[#1A237E]"
                  : "bg-[#1A237E] text-white"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#FFF8F8] mt-6 rounded-md p-4 sm:p-6 md:px-8 lg:px-12 xl:px-20 flex flex-col sm:flex-row items-center gap-6 sm:gap-10 md:gap-16 lg:gap-20 shadow-sm">
          <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 relative">
            <Image
              src={active?.image || ""}
              alt={active?.title || ""}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed sm:w-2/3 text-center sm:text-left">
            {active?.content}
          </div>
        </div>
      </div>
    </section>
  );
}
