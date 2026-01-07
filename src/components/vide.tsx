"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import SidebarButtons from "./SidebarButtons";

export default function Vide() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const videoPath = "/assets/videos/video.mp4";

 
 
 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name || !email || !phone || !message) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      message: message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus("error");
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white">
      {/* Background Image Section */}
      <div className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between p-6 bg-[url('/assets/images/baneq.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Left Content */}
        <div className="relative z-10 text-left max-w-lg ml-8 md:ml-20">
          <div className="mb-8">
            {/* Video Play Button with Golden Frames */}
            <div className="relative inline-block">
              {/* Outer golden frame */}
              <div className="absolute -inset-2 border-2 border-amber-800/80"></div>
              {/* Middle golden frame */}
              <div className="absolute -inset-1 border-2 border-amber-700/60"></div>
              {/* Red square with play icon */}
              <div
                className="relative w-20 h-20 bg-red-600 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setIsVideoOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.79 5.093 10.5 8l-3.71 2.907V5.093z" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            We&apos;re Building the
            <br />
            Future and
            <br />
            Restoring the Past
          </h1>
        </div>

        {/* Right Form - White Panel */}
        <div className="relative z-10 w-full md:w-auto flex items-center justify-center mr-8 md:mr-20">
          <div className="w-full max-w-md bg-white shadow-2xl p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
              Get a Free Quote
            </h2>
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Write something.."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 text-white py-3 rounded-md font-bold text-lg hover:bg-red-700 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SENDING..." : "REQUEST A QUOTE"}
              </button>
              
              {submitStatus === "success" && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm">
                  ✓ Message sent successfully! We&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                  ✗ Failed to send message. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Sidebar Buttons */}
      <SidebarButtons />

      {/* Scroll to Top Button - Below Sidebar */}
      <button
        onClick={scrollToTop}
        className="fixed top-1/2 translate-y-[120px] right-0 w-10 h-10 flex items-center justify-center bg-red-600 text-white text-xl rounded-full shadow-lg hover:bg-red-700 cursor-pointer transition-all duration-300 z-40"
      >
        ↑
      </button>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold z-10"
            >
              ×
            </button>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
              <video
                src={videoPath}
                controls
                autoPlay
                className="w-full h-full"
                onError={(e) => {
                  console.error("Video load error:", e);
                  alert(
                    "Video file not found. Please add video file at: public/assets/videos/video.mp4"
                  );
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
