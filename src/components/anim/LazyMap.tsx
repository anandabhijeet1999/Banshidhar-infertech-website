"use client";

import { useEffect, useRef, useState } from "react";

interface LazyMapProps {
  src: string;
  title: string;
  className?: string;
  height?: string;
}

/**
 * Renders a Google Maps iframe only after the container scrolls into view,
 * preventing the embed from blocking initial page load.
 */
export default function LazyMap({
  src,
  title,
  className = "",
  height = "400px",
}: LazyMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShow(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height }}
    >
      {show ? (
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[var(--c-primary-soft)] to-white">
          <div className="flex flex-col items-center gap-2 text-[var(--c-primary)]">
            <span className="h-10 w-10 rounded-full border-2 border-current border-t-transparent animate-spin" />
            <span className="text-xs font-medium tracking-wider uppercase">
              Loading map…
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
