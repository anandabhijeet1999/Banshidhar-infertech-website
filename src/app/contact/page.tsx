"use client";
import Image from "next/image";
import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [equipment, setEquipment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | { type: "success" | "error"; msg: string }>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!equipment || !name || !email || !phone || !message) {
      setStatus({ type: "error", msg: "Please fill all fields before submitting." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service is not configured.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          equipment,
          name,
          email,
          phone,
          message,
        },
        {
          publicKey,
        }
      );

      setStatus({ type: "success", msg: "Your message has been sent successfully." });
      setEquipment("");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("EmailJS error", error);
      setStatus({
        type: "error",
        msg: "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative w-full h-auto flex flex-col items-center justify-center text-center bg-white">
        {/* Image Section */}
        <div className="w-full relative h-[300px] md:h-[400px]">
          <Image
            src="/assets/images/contact.jpg"
            alt="contact page "
            fill
            className="object-cover object-[50%_30%]"
            priority
          />
        </div>
      </section>
      <div className="bg-gray-100 py-8 px-4">
        {/* Header Section */}

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6">
            <p className="text-sm md:text-base w-full text-black ">
              At <strong>Banshidhar Infratech</strong>, new talent,
              associations, and partnerships are always welcomed. We appreciate
              the interest potential clients show in our business and are ready
              to forge new and fruitful relations with them at any point in
              time.
            </p>
            <h3 className="text-lg font-bold text-green-700 mb-4 mt-16">
              LEAVE YOUR QUERY HERE
            </h3>
            <p className="text-red-600">Error: Contact form not found.</p>
          </div>

          {/* Contact Details */}
          <div>
            {/* Corporate Office */}
            <div className="bg-white p-6   mb-4">
              <h4 className="text-lg font-semibold text-green-700 mb-2">
                CORPORATE OFFICE
              </h4>
              <p className="text-gray-700 text-sm">
                <strong>Banshidhar Infratech</strong>
                <br />
                Station Road, Gurudwara Gali, Opposite Budha Park, Patna —
                800001
                <br />
                <strong>Phone:</strong> +91 - 9431067101
                <br />
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:enquiry@banshidharinfratech.com"
                  className="text-blue-600"
                >
                  enquiry@banshidharinfratech.com
                </a>
                <br />
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.banshidharinfratech.com"
                  className="text-blue-600"
                >
                  www.banshidharinfratech.com
                </a>
              </p>
            </div>

            {/* Registered Office */}
            <div className="bg-white p-6 ">
              <h4 className="text-lg font-semibold text-green-700 mb-2">
                REGISTERED OFFICE
              </h4>
              <p className="text-gray-700 text-sm">
                <strong>Banshidhar Infratech</strong>
                <br />
                BARHI TOLA , ISOPUR , PHULWARISHARIF , PATNA – 801505, BIHAR ,
                India
                <br />
                <strong>Phone:</strong> +91 – 6202557765
                <br />
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:banshidharinfratech@gmail.com"
                  className="text-blue-600"
                >
                  banshidharinfratech@gmail.com
                </a>
                <br />
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.banshidharinfratech.com"
                  className="text-blue-600"
                >
                  www.banshidharinfratech.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 md:p-10">
          {/* Heading */}
          <h2 className="text-center text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            Feel Free to Contact
          </h2>

          {status && (
            <p
              className={`mb-4 text-center text-sm ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.msg}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Dropdown */}
            <select
              className="w-full border rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            >
              <option value="">Please Choose Equipment</option>
              <option value="Equipment Rental Service">Equipment Rental Service</option>
              <option value="Piling Rig Contractor">Piling Rig Contractor</option>
            </select>

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {/* Message */}
            <textarea
              placeholder="Write Message"
              className="w-full border rounded-md p-3 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-900"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-blue-900 text-white py-3 rounded-md font-semibold hover:bg-red-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "SEND A MESSAGE"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <div className="w-full h-[300px] md:h-[500px] rounded-lg overflow-hidden shadow-md">
          <iframe
            src="https://www.google.com/maps?q=Patna%20Bihar&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
