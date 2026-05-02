"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";

export default function SidebarButtons() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-px">
      <a
        href="#enquiry"
        title="Enquiry"
        className="group bg-[var(--c-accent)] text-white px-1.5 py-4 sm:px-2 sm:py-6 rounded-tl-md flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-lg w-10 sm:w-14 transition-all duration-300 hover:w-12 sm:hover:w-16 hover:bg-[var(--c-accent-2)] hover:-translate-x-0.5"
      >
        <Mail className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        <span
          className="text-[8px] sm:text-[10px] font-medium tracking-wider"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Enquiry
        </span>
      </a>

      <a
        href="https://wa.me/916202557765"
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="group bg-emerald-600 text-white px-1.5 py-4 sm:px-2 sm:py-6 flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-lg w-10 sm:w-14 transition-all duration-300 hover:w-12 sm:hover:w-16 hover:bg-emerald-700 hover:-translate-x-0.5"
      >
        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        <span
          className="text-[8px] sm:text-[10px] font-medium tracking-wider"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          WhatsApp
        </span>
      </a>

      <a
        href="tel:+916202557765"
        title="Phone"
        className="group bg-sky-500 text-white px-1.5 py-4 sm:px-2 sm:py-6 rounded-bl-md flex flex-col items-center justify-center gap-1.5 sm:gap-2 shadow-lg w-10 sm:w-14 transition-all duration-300 hover:w-12 sm:hover:w-16 hover:bg-sky-600 hover:-translate-x-0.5"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
        <span
          className="text-[8px] sm:text-[10px] font-medium tracking-wider"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Phone
        </span>
      </a>
    </div>
  );
}
