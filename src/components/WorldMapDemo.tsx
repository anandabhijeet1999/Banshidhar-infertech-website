"use client";
import {WorldMap} from "@/components/ui/world-map";
import { motion } from "motion/react";

export function WorldMapDemo() {
  return (
    <div className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 dark:bg-black bg-white w-full px-4 sm:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl dark:text-white text-black">
          Strong Connections{" "}
          <span className="text-neutral-400">
            {"Connectivity".split("").map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </p>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-neutral-500 max-w-2xl mx-auto py-3 sm:py-4 px-4">
          Banshidhar Construction operates at active project sites with strong connectivity and smooth coordination.
        </p>
      </div>
      <div className="px-2 sm:px-4 md:px-6 mt-6 sm:mt-8 md:mt-12">
        <WorldMap
          dots={[
            {
              start: {
                lat: 25.5941,
                lng: -149.4937,
                label: "Patna",
              },
              end: {
                lat: 34.0522,
                lng: -118.2437,
                label: "Kathmandu, Nepal",
              },
            },
            {
              start: { 
                lat: 64.2008, 
                lng: -149.4937,
                label: "Patna",
              },
              end: { 
                lat: -15.7975, 
                lng: -47.8919,
                label: "Chennai, Tamil Nadu",
              },
            },
            {
              start: { 
                lat: -15.7975, 
                lng: -47.8919,
                label: "Chennai, Tamil Nadu",
              },
              end: { 
                lat: 38.7223, 
                lng: -9.1393,
                label: "Bhubaneswar, Odisha",
              },
            },
            {
              start: { 
                lat: 51.5074, 
                lng: -0.1278,
                label: "Bhubaneswar, Odisha",
              },
              end: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi",
              },
            },
            {
              start: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi",
              },
              end: { 
                lat: 43.1332, 
                lng: 131.9113,
                label: "Vladivostok",
              },
            },
            {
              start: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi",
              },
              end: { 
                lat: -1.2921, 
                lng: 36.8219,
                label: "Nairobi",
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
