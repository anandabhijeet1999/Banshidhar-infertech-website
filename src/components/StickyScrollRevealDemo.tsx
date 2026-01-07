"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "VISION",
    description:
      "We are committed to serve the interests of all our clients by being and establishing our position at the top within the country and be among the foremost companies across the India in our core business through exceptional business ethics.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/images/vis1.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "MISSION",
    description:
      "To provide our clients with the ability to complete in a safe, economical, timely and efficient manner while ensuring a consistently positive and professional experience.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/images/vis2.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "QUALITY POLICY",
    description:
      "We wish to delight our customers and exceeding their expectations by providing maintenance free Crane, Boomlifts. Tower Cranes and prompt service.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <Image
          src="/assets/images/vis3.jpg"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  
];
export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4 sm:py-6 md:py-8 px-2 sm:px-4">
      <StickyScroll content={content} />
    </div>
  );
}
