"use client";
import React from "react";
import Image from "next/image";

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const isOpen = active === item;
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <p className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white transition-opacity">
        {item}
      </p>
      <div
        className={`absolute top-[calc(100%+1.2rem)] left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-[0.85] translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
          <div className="w-max h-full p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: React.Dispatch<React.SetStateAction<string | null>>;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        loading="lazy"
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">{title}</h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) => {
  return (
    <a {...rest} className="text-neutral-700 dark:text-neutral-200 hover:text-black">
      {children}
    </a>
  );
};
