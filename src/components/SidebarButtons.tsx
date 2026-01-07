"use client";

import { Phone, MessageCircle, Mail } from "lucide-react";

export default function SidebarButtons() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col">
      {/* Enquiry Button - Red */}
      <a
        href="#enquiry"
        className="bg-red-600 text-white px-2 py-6 rounded-tl-md hover:bg-red-700 flex flex-col items-center justify-center gap-2 transition-colors shadow-lg w-14"
        title="Enquiry"
      >
        <Mail className="w-5 h-5" />
        <span className="text-[10px] font-medium" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          Enquiry
        </span>
      </a>

      {/* WhatsApp Button - Green */}
      <a
        href="https://wa.me/916202557765"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-2 py-6 hover:bg-green-700 flex flex-col items-center justify-center gap-2 transition-colors shadow-lg w-14"
        title="WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[10px] font-medium" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          Whatsapp
        </span>
      </a>

      {/* Phone Button - Light Blue */}
      <a
        href="tel:+916202557765"
        className="bg-sky-500 text-white px-2 py-6 rounded-bl-md hover:bg-sky-600 flex flex-col items-center justify-center gap-2 transition-colors shadow-lg w-14"
        title="Phone"
      >
        <Phone className="w-5 h-5" />
        <span className="text-[10px] font-medium" style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}>
          Phone
        </span>
      </a>
    </div>
  );
}
