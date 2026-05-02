export const serviceCategories = [
  { id: "piling-foundation", label: "Piling Foundation Services" },
  { id: "piling-rig-rental", label: "Piling Rig Rental Services" },
  { id: "boom-lift", label: "Boom Lift Rental Services" },
  { id: "piling-contractor", label: "Piling Rig Contractor" },
];

export interface ServiceSection {
  heading: string;
  content: string | string[];
  img?: string;
  imgAlt?: string;
}

export interface ServiceDetail {
  title: string;
  bannerImg: string;
  intro: string;
  sections: ServiceSection[];
  benefits: string[];
  coverage: string[];
  faqs?: { question: string; answer: string }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "piling-foundation": {
    title: "Piling Foundation Services",
    bannerImg: "/assets/images/piling3.png",
    intro:
      "We provide an entire range of Pile Foundation Services and keep innovating them based on the current market trend. Under reamed pilings are bored cast-in-situ concrete piles having one or more mechanically formed enlarged bases. These are best suited for foundations in all types of soil conditions. Banshidhar Infratech is one of the leading piling foundation service providers in India with operations across multiple states.",
    sections: [
      {
        heading: "Pile Foundation Services",
        content: [
          "Pile foundations are deep foundation elements used to transfer loads from structures to stronger subsurface soil or rock layers. At Banshidhar Infratech, we specialize in designing and executing pile foundation solutions tailored to the specific requirements of each project. Our experienced engineers and state-of-the-art equipment ensure precision and reliability in every project we undertake.",
          "We offer comprehensive pile foundation services including site investigation, pile design, installation, and testing. Our team has successfully completed pile foundation projects for residential buildings, commercial complexes, industrial structures, bridges, and infrastructure projects across India.",
        ],
        img: "/assets/images/piling3.png",
        imgAlt: "Pile Foundation Work",
      },
      {
        heading: "Under Reamed Piling",
        content: [
          "Under reamed piles are bored cast-in-situ concrete piles with one or more mechanically formed enlarged bases (bulbs). These are ideal for foundations in expansive soils, loose sandy soils, and filled-up grounds. The enlarged base provides increased bearing capacity and resistance to uplift forces, making them a cost-effective solution for various construction challenges.",
          "Under reamed piles are particularly effective in black cotton soil regions where seasonal swelling and shrinkage of soil can cause significant structural damage. The bulb formation below the active zone ensures stability regardless of moisture content variations in the soil.",
        ],
      },
      {
        heading: "Bored Cast-In-Situ Piles",
        content: [
          "Bored cast-in-situ piles are constructed by drilling a hole into the ground, inserting reinforcement cages, and filling it with concrete. This technique is suitable for sites with restricted access, low headroom conditions, and where vibration and noise need to be minimized. We utilize advanced boring rigs capable of handling various ground conditions.",
          "Our bored piling capabilities include pile diameters from 300mm to 2500mm and depths up to 30 meters depending on soil conditions. We employ bentonite stabilization, casing methods, and continuous flight auger (CFA) techniques as required by site conditions.",
        ],
        img: "/assets/images/piling.png",
        imgAlt: "Bored Piling Machine",
      },
      {
        heading: "Deep Foundation Solutions",
        content:
          "Deep foundations are essential when surface soils are unable to support the structural loads. Our deep foundation solutions include driven piles, bored piles, micropiles, and caisson foundations. We assess soil conditions through detailed geotechnical investigations and recommend the most suitable and cost-effective foundation system for each project. Our approach ensures long-term structural stability and safety.",
      },
    ],
    benefits: [
      "Suitable for all types of soil conditions",
      "High load-bearing capacity",
      "Minimal noise and vibration during installation",
      "Cost-effective foundation solutions",
      "Experienced team with 8+ years of expertise",
      "Advanced machinery and equipment",
      "Long-lasting and durable foundation",
      "Ideal for wetland and challenging terrain projects",
    ],
    coverage: [
      "Patna, Bihar",
      "New Delhi",
      "Bhubaneswar, Odisha",
      "Chennai, Tamil Nadu",
      "Ranchi, Jharkhand",
      "Kolkata, West Bengal",
      "Mumbai, Maharashtra",
      "Nepal",
      "Pan India Operations",
    ],
    faqs: [
      {
        question: "What types of pile foundations do you offer?",
        answer:
          "We offer bored cast-in-situ piles, under reamed piles, driven piles, micropiles, and caisson foundations. Our team recommends the most suitable type based on soil investigation reports and structural load requirements.",
      },
      {
        question: "What is the maximum depth and diameter you can achieve?",
        answer:
          "Our piling rigs can achieve pile diameters from 300mm to 2500mm and depths up to 30 meters. For special projects requiring deeper foundations, we deploy specialized equipment to meet the requirements.",
      },
      {
        question: "Do you provide pile load testing services?",
        answer:
          "Yes, we provide comprehensive pile testing services including initial load tests, routine load tests, and pile integrity tests (PIT) to verify the load-carrying capacity and structural integrity of installed piles.",
      },
      {
        question: "How long does a typical piling project take?",
        answer:
          "Project duration depends on the number of piles, depth, diameter, and soil conditions. A typical project can range from a few days to several weeks. We provide detailed project timelines during the planning phase.",
      },
    ],
  },
  "piling-rig-rental": {
    title: "Piling Rig Rental Services",
    bannerImg: "/assets/images/cnc.jpg",
    intro:
      "We provide an extensive array of premium quality Hydraulic Rotary Piling Rigs on rental basis. Our fleet includes machines from leading manufacturers like Sanny, Sunward, and MAIT with torque capacities ranging from 180 KN.m to 250 KN.m. We deliver your equipment wherever required across India with quick mobilization and experienced operators.",
    sections: [
      {
        heading: "Hydraulic Rotary Piling Rig Rental",
        content: [
          "Banshidhar Infratech offers top-of-the-line hydraulic rotary piling rigs for rent. Our machines are equipped with advanced hydraulic operator controls and loading sensors to ensure safe and efficient operations. Whether you need equipment for a small residential project or a large-scale infrastructure development, we have the right rig for your needs.",
          "All our piling rigs undergo regular maintenance and safety inspections to ensure optimal performance. Each rig comes with trained operators who have extensive experience in handling various soil conditions and project requirements.",
        ],
        img: "/assets/images/cnc.jpg",
        imgAlt: "Piling Rig Machine",
      },
      {
        heading: "Our Piling Rig Fleet",
        content: [
          "Our fleet includes MAIT HR180 (180 KN.m torque), Sunward SA210 (205 KN.m torque), Sunward SA250 (250 KN.m torque), Sanny SR185 (185 KN.m torque), and Sanny SR215 (215 KN.m torque). All rigs are well-maintained and come with experienced operators. Drilling diameters range from 600mm to 2500mm to handle diverse project requirements.",
          "Each machine is equipped with modern features including GPS tracking, real-time monitoring systems, and automatic depth recording. This ensures accurate pile installation and comprehensive documentation for quality assurance.",
        ],
      },
      {
        heading: "Piling Rig Specifications",
        content:
          "Our piling rigs are capable of handling various ground conditions including hard rock, sandy soil, clay, and mixed strata. The rigs feature kelly bar extensions for deep pile installations, powerful rotary drives for efficient drilling, and robust crawler undercarriages for stability on uneven terrain. We also provide auxiliary equipment including mud pumps, casing oscillators, and concrete tremie pipes.",
        img: "/assets/images/sanny-sr215.jpg",
        imgAlt: "Sanny SR215 Piling Rig",
      },
      {
        heading: "Flexible Rental Plans",
        content:
          "We offer flexible rental plans tailored to your project timeline and budget. Whether you need a rig for a few days, weeks, or months, we have competitive rates and quick mobilization capabilities. Our team handles transportation, setup, and provides on-site technical support throughout the rental period. We also offer operator training programs for clients who prefer to use their own crew.",
      },
    ],
    benefits: [
      "Wide range of piling rigs available",
      "Torque capacities from 180 to 250 KN.m",
      "Drilling diameters from 600mm to 2500mm",
      "Well-maintained and regularly serviced equipment",
      "Experienced operators provided",
      "Quick mobilization across India",
      "Flexible daily, weekly, and monthly rental plans",
      "24/7 on-site technical support",
    ],
    coverage: [
      "Patna, Bihar",
      "New Delhi",
      "Bhubaneswar, Odisha",
      "Chennai, Tamil Nadu",
      "Ranchi, Jharkhand",
      "Kolkata, West Bengal",
      "Mumbai, Maharashtra",
      "Nepal",
      "Pan India Operations",
    ],
    faqs: [
      {
        question: "What piling rig models are available for rent?",
        answer:
          "We offer MAIT HR180, Sunward SA210, Sunward SA250, Sanny SR185, and Sanny SR215 models with torque ranging from 180 to 250 KN.m and drilling diameters from 600mm to 2500mm.",
      },
      {
        question: "Do you provide operators with the rental rigs?",
        answer:
          "Yes, all our piling rigs come with experienced and trained operators. We also provide helper staff and can arrange for a full piling crew if required.",
      },
      {
        question: "How quickly can you mobilize equipment to the site?",
        answer:
          "We can typically mobilize equipment within 3-5 business days depending on the location. For urgent requirements, we offer express mobilization services at selected locations across India.",
      },
    ],
  },
  "boom-lift": {
    title: "Boom Lift Rental Services",
    bannerImg: "/assets/images/boomlift.jpg",
    intro:
      "We are the leading prominent boom lift on hire service provider in India. We provide boom lifts ranging from 40 Feet to 210 Feet for various industrial and construction applications. Our machines provide safe access and a secure working platform for elevated positions. Banshidhar Infratech maintains a fleet of 50+ boom lifts ready for deployment across India.",
    sections: [
      {
        heading: "Boom Lift Rental Services",
        content: [
          "Banshidhar Infratech is a premier boom lift rental service provider in India. Our extensive fleet includes JLG boom lifts ranging from 80 Feet to 250 Feet in height. These machines are ideal for construction, maintenance, painting, installation, and inspection work at elevated heights. We ensure all equipment meets the highest safety standards.",
          "Our boom lifts are available in both articulating and telescopic configurations to suit different job requirements. Articulating boom lifts provide excellent maneuverability around obstacles, while telescopic boom lifts offer maximum reach and working height.",
        ],
        img: "/assets/images/boomlift.jpg",
        imgAlt: "JLG Boom Lift",
      },
      {
        heading: "Equipment Range & Specifications",
        content: [
          "Our boom lift fleet includes JLG 800AJ (80 Feet), JLG 1200SJP (120 Feet), and models reaching up to 250 Feet. Each machine is specifically configured for job requirements and comes with comprehensive operational and service documentation. We maintain a fleet of 50+ boom lifts ready for deployment across India.",
          "All our boom lifts feature 360-degree continuous rotation, proportional drive and lift controls, and engine-powered or diesel-electric hybrid drive systems. Platform capacities range from 230 kg to 450 kg depending on the model.",
        ],
      },
      {
        heading: "Industries We Serve",
        content:
          "Our boom lift rental services cater to a wide range of industries including Power (Wind, Thermal, Hydro & Nuclear Energy), Cement, Steel, Refinery, Metro Rail projects, and commercial construction. We provide safe and efficient access solutions for maintenance, construction, and inspection at height. Our experienced operators are trained in industry-specific safety protocols.",
        img: "/assets/images/eq3.jpg",
        imgAlt: "JLG Boomlift at work",
      },
      {
        heading: "Safety Standards & Compliance",
        content:
          "Safety is our top priority. All our boom lifts undergo rigorous pre-delivery inspections and regular maintenance schedules. Our operators are certified and trained in safe working practices at height. We comply with all relevant safety regulations and provide necessary safety equipment including harnesses, helmets, and safety nets. We also conduct site-specific risk assessments before deploying equipment.",
      },
    ],
    benefits: [
      "Fleet of 50+ boom lifts available",
      "Heights from 80 Feet to 250 Feet",
      "JLG branded premium equipment",
      "Certified and trained operators",
      "24/7 technical support",
      "Competitive rental rates",
      "Both articulating and telescopic models",
      "Complete safety compliance",
    ],
    coverage: [
      "Patna, Bihar",
      "New Delhi",
      "Bhubaneswar, Odisha",
      "Chennai, Tamil Nadu",
      "Ranchi, Jharkhand",
      "Kolkata, West Bengal",
      "Mumbai, Maharashtra",
      "Nepal",
      "All Major Cities in India",
    ],
    faqs: [
      {
        question: "What boom lift heights are available for rent?",
        answer:
          "We offer boom lifts ranging from 80 Feet to 250 Feet in height. Our fleet includes both articulating and telescopic models from JLG to suit various project requirements.",
      },
      {
        question: "Do boom lifts come with trained operators?",
        answer:
          "Yes, all our boom lifts are provided with trained and certified operators who have experience working in various industries. We also offer operator training for client teams.",
      },
      {
        question: "What industries do you serve with boom lift rentals?",
        answer:
          "We serve Power (Wind, Thermal, Hydro, Nuclear), Cement, Steel, Refinery, Metro Rail, Telecom, and commercial construction sectors across India.",
      },
    ],
  },
  "piling-contractor": {
    title: "Piling Rig Contractor",
    bannerImg: "/assets/images/pil-cont.jpg",
    intro:
      "We deal in providing the service of Piling Contractors Services on hire and on a rental basis. Our organization has established itself as a reliable piling contractor with over 8 years of experience and 15+ operational sites across India. We undertake turnkey piling projects from design to execution with complete project management support.",
    sections: [
      {
        heading: "Piling Contractor Services",
        content: [
          "Banshidhar Infratech provides comprehensive piling contractor services for all types of construction projects. From initial site investigation to pile load testing, we handle every aspect of the piling process. Our team of experienced engineers ensures that each project is completed safely, on time, and within budget.",
          "As an established piling contractor, we bring extensive project management experience to every job. Our systematic approach includes detailed planning, resource allocation, quality control, and progress monitoring to ensure seamless project execution.",
        ],
        img: "/assets/images/pil-cont.jpg",
        imgAlt: "Piling Contractor at Work",
      },
      {
        heading: "Piling Rig Machine Contractor",
        content: [
          "As a piling rig machine contractor, we provide complete piling solutions including machine operation, skilled manpower, and project management. Our fleet of modern piling rigs can handle drilling diameters from 600mm to 2500mm with depth capabilities suitable for most foundation requirements. We ensure quality construction with minimal environmental impact.",
          "Our piling rig contractor services include mobilization and demobilization, equipment setup and calibration, daily operation and maintenance, and comprehensive reporting. We take full responsibility for equipment performance and operator safety throughout the project duration.",
        ],
      },
      {
        heading: "Turnkey Piling Solutions",
        content: [
          "We offer end-to-end piling solutions including site assessment, pile design, mobilization, installation, pile integrity testing, and load testing. Our turnkey approach ensures seamless project execution and single-point accountability. We have successfully completed projects for major companies like L&T, Earthcon Services, and Ess Technofabs.",
          "Our turnkey services also include preparation of method statements, quality assurance plans, safety plans, and environmental management plans. We maintain detailed records of all piling operations including boring logs, concrete pour records, and cage placement details.",
        ],
        img: "/assets/images/piling.png",
        imgAlt: "Piling Work Site",
      },
      {
        heading: "Micro Piles Service",
        content:
          "We also specialize in micropile installation for projects requiring small-diameter, high-capacity piles. Micropiles are ideal for underpinning existing foundations, sites with limited access, and projects where traditional piling methods are not feasible. Our micropile solutions offer excellent load-bearing capacity with minimal ground disturbance and vibration, making them suitable for urban construction and heritage building renovation projects.",
      },
    ],
    benefits: [
      "8+ years of piling contractor experience",
      "15+ operational sites across India",
      "Turnkey project execution",
      "Certified and experienced engineers",
      "Modern fleet of piling rigs",
      "Proven track record with major clients",
      "Complete quality assurance program",
      "Single-point project accountability",
    ],
    coverage: [
      "Patna, Bihar",
      "New Delhi",
      "Bhubaneswar, Odisha",
      "Chennai, Tamil Nadu",
      "Ranchi, Jharkhand",
      "Kolkata, West Bengal",
      "Mumbai, Maharashtra",
      "Nepal",
      "Pan India Projects",
    ],
    faqs: [
      {
        question: "What types of piling projects do you undertake?",
        answer:
          "We undertake all types of piling projects including bored piling, driven piling, micropiling, and sheet piling for residential, commercial, industrial, and infrastructure projects.",
      },
      {
        question: "Do you provide turnkey piling solutions?",
        answer:
          "Yes, we offer complete turnkey piling solutions from initial site investigation, pile design, mobilization, installation, to pile integrity testing and load testing with single-point accountability.",
      },
      {
        question: "What is your experience as a piling contractor?",
        answer:
          "We have over 8 years of experience as a piling contractor with 15+ operational sites across India. We have successfully completed projects for major companies including L&T, Earthcon Services, and Ess Technofabs.",
      },
    ],
  },
};
