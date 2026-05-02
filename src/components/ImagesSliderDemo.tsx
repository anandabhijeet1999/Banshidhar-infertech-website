"use client";
import { ImagesSlider } from "@/components/ui/images-slider";

export function ImagesSliderDemo() {
  const images = [
    "/assets/images/1.jpg",
    "/assets/images/2.jpg",
    "/assets/images/3.jpg",
    "/assets/images/4.jpg",
  ];
  return (
    <ImagesSlider
      className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[40rem]"
      images={images}
      overlay={false}
    />
  );
}
