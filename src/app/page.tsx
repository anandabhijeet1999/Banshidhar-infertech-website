import dynamic from "next/dynamic";
import { ImagesSliderDemo } from "@/components/ImagesSliderDemo";
import HeroSection from "@/components/HeroSection";
import OurServices from "@/components/OurServices";
import VisionTabs from "@/components/VisionTabs";

const Vide = dynamic(() => import("@/components/vide"), {
  loading: () => <div className="min-h-[80vh]" />,
});
const MachinesCarousel = dynamic(() => import("@/components/MachinesCarousel"), {
  loading: () => <div className="py-12" />,
});
const WorldMapDemo = dynamic(
  () => import("@/components/WorldMapDemo").then(mod => ({ default: mod.WorldMapDemo })),
  { loading: () => <div className="py-20" /> }
);

export default function Home() {
  return (
    <>
      <ImagesSliderDemo />
      <HeroSection />
      <OurServices />
      <VisionTabs />
      <Vide />
      <MachinesCarousel />
      <WorldMapDemo />
    </>
  );
}
