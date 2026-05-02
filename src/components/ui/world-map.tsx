"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DottedMap from "dotted-map";
import { prefersReducedMotion, EASE_OUT } from "@/lib/anime";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({ dots = [], lineColor = "#0ea5e9" }: MapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<SVGGElement | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<{
    x: number;
    y: number;
    label: string;
  } | null>(null);

  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#00000040",
      shape: "circle",
      backgroundColor: "white",
    });
  }, []);

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

  // Animate path drawing on mount via stroke-dashoffset
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll<SVGPathElement>("[data-map-path]");
    if (paths.length === 0) return;

    if (prefersReducedMotion()) {
      paths.forEach((p) => {
        p.style.strokeDasharray = "none";
        p.style.strokeDashoffset = "0";
      });
      return;
    }

    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    let cancelled = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          import("animejs").then(({ animate, stagger }) => {
            if (cancelled) return;
            animate(Array.from(paths), {
              strokeDashoffset: 0,
              duration: 1100,
              ease: EASE_OUT,
              delay: stagger(420),
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(svg);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [dots.length]);

  // Animate tooltip in/out on hover
  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip || !hoveredPoint) return;
    if (prefersReducedMotion()) {
      tooltip.style.opacity = "1";
      return;
    }
    let cancelled = false;
    import("animejs").then(({ animate }) => {
      if (cancelled || !tooltipRef.current) return;
      animate(tooltipRef.current, {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 180,
        ease: EASE_OUT,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [hoveredPoint]);

  return (
    <div className="w-full aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        loading="lazy"
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
              <path
                data-map-path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                style={{ pointerEvents: "none" }}
              />
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
              {/* Start dot */}
              <g key={`start-${i}`}>
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
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                  onMouseEnter={() => {
                    if (dot.start.label) {
                      setHoveredPoint({
                        x: startPoint.x,
                        y: startPoint.y,
                        label: dot.start.label,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
              {/* End dot */}
              <g key={`end-${i}`}>
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
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="8"
                  fill="transparent"
                  className="cursor-pointer"
                  style={{ pointerEvents: "auto" }}
                  onMouseEnter={() => {
                    if (dot.end.label) {
                      setHoveredPoint({
                        x: endPoint.x,
                        y: endPoint.y,
                        label: dot.end.label,
                      });
                    }
                  }}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            </g>
          );
        })}

        {hoveredPoint && (
          <g
            ref={tooltipRef}
            style={{ pointerEvents: "none", opacity: 0, transformOrigin: "center" }}
          >
            <rect
              x={hoveredPoint.x - Math.max(40, hoveredPoint.label.length * 5)}
              y={hoveredPoint.y - 40}
              width={Math.max(80, hoveredPoint.label.length * 10 + 20)}
              height="24"
              rx="6"
              fill="#ffffff"
              stroke={lineColor}
              strokeWidth="1.5"
              style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
            />
            <text
              x={hoveredPoint.x}
              y={hoveredPoint.y - 24}
              textAnchor="middle"
              fill="#000000"
              fontSize="12"
              fontWeight="600"
            >
              {hoveredPoint.label}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
