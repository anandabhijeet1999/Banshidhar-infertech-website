"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [servicesOpenMobile, setServicesOpenMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/assets/icons/logo.png"
              alt="Logo"
              width={80}
              height={48}
              className="w-16 h-auto sm:w-20 md:w-24"
            />
          </Link>
        </div>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-2 lg:gap-3 text-gray-700 font-medium text-sm lg:text-base">
          <li>
            <Link
              href="/"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/about"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              About Us
            </Link>
          </li>
          {/* Services with hover dropdown */}
          <div
            className="relative h-fit w-fit"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link
              href="/services"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/services"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              Services
            </Link>
            {isDropdownOpen && (
              <div className="absolute mt-2 w-56 bg-white  rounded-md shadow-xl z-10">
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-700"
                >
                  Piling Foundation Services
                </Link>

                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-700"
                >
                  Piling Rig Rental Services
                </Link>
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-700"
                >
                  Boom lift Rental Services
                </Link>
                <Link
                  href=""
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-700"
                >
                  Piling Contractor
                </Link>
              </div>
            )}
          </div>

          <li>
            <Link
              href="/equipments"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/equipments"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              Equipments
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/projects"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={cn(
                "px-3 py-1 transition-all duration-300 ease-in-out rounded-xl",
                pathname === "/contact"
                  ? "text-[#2e02b3] bg-gray-200 shadow-2xl text-xl font-bold"
                  : "hover:text-[#2e02b3] hover:bg-gray-200 hover:shadow-2xl hover:rounded-xl hover:text-xl hover:font-bold"
              )}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Contact Section */}
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[#1E237E] font-bold text-sm xl:text-base">
            +91 6202557765
          </span>
          <span className="text-gray-500 text-xs">
            Mon to Fri: 9:00am - 12:00pm
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-[#1E237E]"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white border-t flex flex-col items-center gap-2 sm:gap-3 py-4 px-4">
          <Link
            href="/"
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 text-sm sm:text-base",
              pathname === "/"
                ? "text-[#ED4200] bg-gray-100 shadow-xl rounded-xl"
                : "hover:text-[#ED4200]"
            )}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 text-sm sm:text-base",
              pathname === "/about"
                ? "text-[#ED4200] bg-gray-100 shadow-xl rounded-xl"
                : "hover:text-[#ED4200]"
            )}
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>
          {/* Mobile Services collapsible */}
          <button
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 border rounded-xl text-sm sm:text-base",
              pathname === "/services" && "text-[#ED4200] bg-gray-100 shadow-xl"
            )}
            onClick={() => setServicesOpenMobile(!servicesOpenMobile)}
          >
            Services
          </button>
          {servicesOpenMobile && (
            <div className="w-full max-w-xs flex flex-col gap-1">
              <Link
                href="/services"
                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                All Services
              </Link>
              <Link
                href="/equipments"
                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                Equipments
              </Link>
              <Link
                href="/projects"
                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-left rounded-lg hover:bg-gray-100 text-sm sm:text-base"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          )}

          <Link
            href="/equipments"
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 text-sm sm:text-base",
              pathname === "/equipments"
                ? "text-[#ED4200] bg-gray-100 shadow-xl rounded-xl"
                : "hover:text-[#ED4200]"
            )}
            onClick={() => setOpen(false)}
          >
            Equipments
          </Link>
          <Link
            href="/projects"
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 text-sm sm:text-base",
              pathname === "/projects"
                ? "text-[#ED4200] bg-gray-100 shadow-xl rounded-xl"
                : "hover:text-[#ED4200]"
            )}
            onClick={() => setOpen(false)}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={cn(
              "w-full max-w-xs text-center px-4 py-2.5 text-gray-700 text-sm sm:text-base",
              pathname === "/contact"
                ? "text-[#ED4200] bg-gray-100 shadow-xl rounded-xl"
                : "hover:text-[#ED4200]"
            )}
            onClick={() => setOpen(false)}
          >
            Contact Us
          </Link>
          <div className="text-center mt-2">
            <p className="text-[#1E237E] font-semibold text-sm sm:text-base">+91 8591540170</p>
            <p className="text-gray-500 text-xs mt-1">
              Mon to Fri: 9:00am - 12:00pm
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
