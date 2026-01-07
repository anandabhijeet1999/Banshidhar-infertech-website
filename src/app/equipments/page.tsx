import Image from "next/image";

export default function EquipmentsPage() {
  return (
    <main className="relative bg-white">
      {/* Top Banner */}
      <section
      className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/images/sanward-sa210.jpg')", // replace with your image path
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
          Equipment Details
        </h1>
      </div>
    </section>

      {/* Equipment Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 space-y-8 sm:space-y-12 md:space-y-16">
        {equipmentItems.map((item, index) => (
          <article
            key={item.title + index}
            className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center"
          >
            {/* Image */}
            <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="relative group bg-gray-100 rounded-xl shadow-xl overflow-hidden">
                <Image
                  src={item.imageSrc}
                  width={1200}
                  height={800}
                  alt={item.imageAlt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0  bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Specs */}
            <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1E237E] mb-3 sm:mb-4 uppercase">
                {item.title}
              </h2>
              <dl className="space-y-2 sm:space-y-3">
                {item.specs.map((spec) => (
                  <div key={spec.label} className="grid grid-cols-12 gap-2">
                    <dt className="col-span-6 md:col-span-5 font-semibold text-gray-800 text-sm sm:text-base">
                      {spec.label}
                    </dt>
                    <dd className="col-span-6 md:col-span-7 text-[#D91F26] font-semibold text-sm sm:text-base">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>
        ))}

        {/* Enquiry anchor target */}
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
    title: "PILING RIGS",
    imageSrc: "/assets/images/eq1.jpg",
    imageAlt: "Sanny SR215 piling rig",
    specs: [
      { label: "Name:", value: "MAIT" },
      { label: "Model:", value: "HR180" },
      { label: "TORQUE KN.m:", value: "180" },
    ],
  },
  {
    title: "PILING RIGS",
    imageSrc: "/assets/images/eq2.jpg",
    imageAlt: "Sanny SR215 piling rig",
    specs: [
      { label: "Name:", value: "SUNWARD" },
      { label: "Model:", value: "SA210" },
      { label: "TORQUE KN.m:", value: "205" },
    ],
  },
  {
    title: "Boomlift Machine",
    imageSrc: "/assets/images/eq3.jpg",
    imageAlt: "JLG boomlift",
    specs: [
      { label: "Name:", value: "JLG" },
      { label: "Model:", value: "1200SJP" },
      { label: "TORQUE KN.m:", value: "120 Feet" },
    ],
  },
  {
    title: "Piling Rig Machine",
    imageSrc: "/assets/images/sanward-sa210.jpg",
    imageAlt: "Sunward SA210 piling rig",
    specs: [
      { label: "Name:", value: "Sunward" },
      { label: "Model:", value: "SA210" },
      { label: "TORQUE KN.m:", value: "205Knm" },
      { label: "Minimum Drilling Diameter:", value: "600mm" },
      { label: "Maximum Drilling Diameter:", value: "2000mm" },
      { label: "Availability:", value: "02 Nos" },
    ],
  },
  {
    title: "Piling Rig Machine",
    imageSrc: "/assets/images/sanward-sa250.jpg",
    imageAlt: "Sanward SA250 piling rig",
    specs: [
      { label: "Name:", value: "Sanward" },
      { label: "Model:", value: "SA250" },
      { label: "TORQUE KN.m:", value: "250Knm" },
      { label: "Minimum Drilling Diameter:", value: "600mm" },
      { label: "Maximum Drilling Diameter:", value: "2500mm" },
      { label: "Availability:", value: "04 Nos" },
    ],
  },
  {
    title: "Piling Rig Machine",
    imageSrc: "/assets/images/sanny-sr215.jpg",
    imageAlt: "Sanny SR185 piling rig",
    specs: [
      { label: "Name:", value: "Sanny" },
      { label: "Model:", value: "SR185" },
      { label: "TORQUE KN.m:", value: "185Knm" },
      { label: "Minimum Drilling Diameter:", value: "600mm" },
      { label: "Maximum Drilling Diameter:", value: "2000mm" },
      { label: "Availability:", value: "02 Nos" },
    ],
  },
  {
    title: "Piling Rig Machine",
    imageSrc: "/assets/images/sanny-sr215.jpg",
    imageAlt: "Sanny SR215 piling rig",
    specs: [
      { label: "Name:", value: "Sanny" },
      { label: "Model:", value: "SR215" },
      { label: "TORQUE KN.m:", value: "215Knm" },
      { label: "Minimum Drilling Diameter:", value: "600mm" },
      { label: "Maximum Drilling Diameter:", value: "2000mm" },
      { label: "Availability:", value: "02 Nos" },
    ],
  },
  {
    title: "Boomlift",
    imageSrc: "/assets/images/boomlift-jlg.jpg",
    imageAlt: "JLG Boomlift",
    specs: [
      { label: "Name:", value: "JLG" },
      { label: "Minimum Height:", value: "80 FT" },
      { label: "Maximum Height:", value: "250 FT" },
      { label: "Availability:", value: "50 Nos" },
    ],
  },
];
