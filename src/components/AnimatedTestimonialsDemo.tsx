"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The exceptional attention to detail and thoughtfully designed features have significantly improved our operational workflow. This solution aligns perfectly with our business needs and expectations.",
      name: "Sushil Kumar Yadav",
      designation: "Founder, Banshidhar Infratech",
      src: "/assets/icons/yadav.jpeg",
    },
    {
      quote:
        "The implementation process was seamless, and the outcomes exceeded our expectations. The platform’s flexibility and reliability truly stand out.",
      name: "Er. Anjani Kumar",
      designation: "Project Management Engineer",
      src: "/assets/icons/Er.deepak.jpeg",
      
    },
    {
      quote:
        "This solution has significantly enhanced our team’s productivity. Its intuitive interface simplifies even the most complex tasks.",
      name: "Er. Ranjay Kumar",
      designation: "Site Engineer",
      src: "/assets/icons/Er.ranj.jpeg",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Abhijeet",
      designation: "Engineering Lead ",
      src: "/assets/icons/Ab.jpeg",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Er.Rahul kumar",
      designation: "Engineering Lead at DataPro",
      src: "/assets/icons/Rahul.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
