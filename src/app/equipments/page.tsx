"use client";
import Image from "next/image";
import AnimatedSection from "@/components/anim/AnimatedSection";
import AnimatedText from "@/components/anim/AnimatedText";

export default function EquipmentsPage() {
  return (
    <main className="relative bg-white">
      {/* Banner */}
      <section className="relative w-full overflow-hidden">
        <div
          className="relative h-[260px] md:h-[400px] flex items-center justify-center text-center bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/images/sanward-sa210.webp')" }}
        >
          <div className="absolute inset-0 gradient-mesh opacity-90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b1240]/85 via-[#1A237E]/70 to-black/60" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
            <span className="eyebrow bg-white/15 text-white border border-white/20 backdrop-blur-sm">
              Our Fleet
            </span>
            <AnimatedText
              text="Equipment Details"
              as="h1"
              className="t-display text-white mt-3"
              effect="blur"
              immediate
              staggerMs={70}
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 space-y-12 sm:space-y-16">
        {equipmentItems.map((item, index) => (
          <AnimatedSection
            key={item.title + index}
            direction={index % 2 === 1 ? "right" : "left"}
            delay={0.05}
          >
            <article className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center">
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="relative group bg-[var(--c-surface-2)] rounded-[var(--r-lg)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-pop)] overflow-hidden transition-shadow duration-500">
                  <Image
                    src={item.imageSrc}
                    width={1200}
                    height={800}
                    alt={item.imageAlt}
                    loading={index === 0 ? undefined : "lazy"}
                    priority={index === 0}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <h2 className="t-h2 text-[var(--c-primary)] mb-4 uppercase tracking-wide">
                  {item.title}
                </h2>
                <dl className="space-y-3">
                  {item.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="grid grid-cols-12 gap-2 pb-2 border-b border-[var(--c-line)]"
                    >
                      <dt className="col-span-6 md:col-span-5 font-semibold text-[var(--c-ink-2)] text-sm sm:text-base">
                        {spec.label}
                      </dt>
                      <dd className="col-span-6 md:col-span-7 text-[var(--c-accent)] font-semibold text-sm sm:text-base">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </AnimatedSection>
        ))}

        <div id="enquiry" className="pt-4" />
      </section>
    </main>
  );
}

type Spec = { label: string; value: string };
type EquipmentItem = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  specs: Spec[];
};

const equipmentItems: EquipmentItem[] = [
  {
    title: "Piling Rigs — MAIT HR180",
    imageSrc: "/assets/images/eq1.webp",
    imageAlt: "MAIT HR180 piling rig",
    specs: [
      { label: "Name", value: "MAIT" },
      { label: "Model", value: "HR180" },
      { label: "Torque", value: "180 KN.m" },
    ],
  },
  {
    title: "Piling Rigs — Sunward SA210",
    imageSrc: "/assets/images/eq2.webp",
    imageAlt: "Sunward SA210 piling rig",
    specs: [
      { label: "Name", value: "SUNWARD" },
      { label: "Model", value: "SA210" },
      { label: "Torque", value: "205 KN.m" },
    ],
  },
  {
    title: "Boomlift — JLG 1200SJP",
    imageSrc: "/assets/images/eq3.webp",
    imageAlt: "JLG 1200SJP boomlift",
    specs: [
      { label: "Name", value: "JLG" },
      { label: "Model", value: "1200SJP" },
      { label: "Reach", value: "120 Feet" },
    ],
  },
  {
    title: "Piling Rig — Sunward SA210",
    imageSrc: "/assets/images/sanward-sa210.webp",
    imageAlt: "Sunward SA210 piling rig",
    specs: [
      { label: "Name", value: "Sunward" },
      { label: "Model", value: "SA210" },
      { label: "Torque", value: "205 KN.m" },
      { label: "Min. Drilling Diameter", value: "600 mm" },
      { label: "Max. Drilling Diameter", value: "2000 mm" },
      { label: "Availability", value: "02 Nos" },
    ],
  },
  {
    title: "Piling Rig — Sanward SA250",
    imageSrc: "/assets/images/sanward-sa250.webp",
    imageAlt: "Sanward SA250 piling rig",
    specs: [
      { label: "Name", value: "Sanward" },
      { label: "Model", value: "SA250" },
      { label: "Torque", value: "250 KN.m" },
      { label: "Min. Drilling Diameter", value: "600 mm" },
      { label: "Max. Drilling Diameter", value: "2500 mm" },
      { label: "Availability", value: "04 Nos" },
    ],
  },
  {
    title: "Piling Rig — Sanny SR185",
    imageSrc: "/assets/images/sanny-sr215.webp",
    imageAlt: "Sanny SR185 piling rig",
    specs: [
      { label: "Name", value: "Sanny" },
      { label: "Model", value: "SR185" },
      { label: "Torque", value: "185 KN.m" },
      { label: "Min. Drilling Diameter", value: "600 mm" },
      { label: "Max. Drilling Diameter", value: "2000 mm" },
      { label: "Availability", value: "02 Nos" },
    ],
  },
  {
    title: "Piling Rig — Sanny SR215",
    imageSrc: "/assets/images/sanny-sr215.webp",
    imageAlt: "Sanny SR215 piling rig",
    specs: [
      { label: "Name", value: "Sanny" },
      { label: "Model", value: "SR215" },
      { label: "Torque", value: "215 KN.m" },
      { label: "Min. Drilling Diameter", value: "600 mm" },
      { label: "Max. Drilling Diameter", value: "2000 mm" },
      { label: "Availability", value: "02 Nos" },
    ],
  },
  {
    title: "Boomlift — JLG",
    imageSrc: "/assets/images/boomlift-jlg.webp",
    imageAlt: "JLG Boomlift",
    specs: [
      { label: "Name", value: "JLG" },
      { label: "Min. Height", value: "80 ft" },
      { label: "Max. Height", value: "250 ft" },
      { label: "Availability", value: "50 Nos" },
    ],
  },
];
