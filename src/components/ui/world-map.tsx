"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg  relative font-sans">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 select-none"
        style={{ pointerEvents: "auto" }}
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
                style={{ pointerEvents: "none" }}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`points-group-${i}`}>
              <g key={`start-${i}`}>
                {/* Visible circles */}
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2"
                  fill={lineColor}
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                  style={{ pointerEvents: "none" }}
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Interactive hover area */}
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    if (dot.start.label) {
                      setHoveredPoint({
                        x: startPoint.x,
                        y: startPoint.y,
                        label: dot.start.label,
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoveredPoint(null);
                  }}
                />
              </g>
              <g key={`end-${i}`}>
                {/* Visible circles */}
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2"
                  fill={lineColor}
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                  style={{ pointerEvents: "none" }}
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
                {/* Interactive hover area */}
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    if (dot.end.label) {
                      setHoveredPoint({
                        x: endPoint.x,
                        y: endPoint.y,
                        label: dot.end.label,
                      });
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.stopPropagation();
                    setHoveredPoint(null);
                  }}
                />
              </g>
            </g>
          );
        })}
        
        {/* Tooltip */}
        {hoveredPoint && (
          <g style={{ pointerEvents: "none" }}>
            <motion.rect
              x={hoveredPoint.x - Math.max(40, hoveredPoint.label.length * 5)}
              y={hoveredPoint.y - 40}
              width={Math.max(80, hoveredPoint.label.length * 10 + 20)}
              height="24"
              rx="6"
              fill={theme === "dark" ? "#1f1f1f" : "#ffffff"}
              stroke={lineColor}
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.15 }}
              style={{ 
                filter: theme === "dark" 
                  ? "drop-shadow(0 2px 8px rgba(255,255,255,0.1))" 
                  : "drop-shadow(0 2px 8px rgba(0,0,0,0.15))"
              }}
            />
            <motion.text
              x={hoveredPoint.x}
              y={hoveredPoint.y - 24}
              textAnchor="middle"
              fill={theme === "dark" ? "#ffffff" : "#000000"}
              fontSize="12"
              fontWeight="600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
            >
              {hoveredPoint.label}
            </motion.text>
          </g>
        )}
      </svg>
    </div>
  );
}
