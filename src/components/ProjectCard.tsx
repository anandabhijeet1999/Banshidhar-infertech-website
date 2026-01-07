import Image from "next/image";

interface ProjectCardProps {
  image: string;
  company: string;
  location: string;
  equipment: string;
  date?: {
    day: string;
    month: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  company,
  location,
  equipment,
  date = { day: "27", month: "MAY" },
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      
      {/* Image Section */}
      <div className="relative h-[160px] sm:h-[200px] md:h-[220px]">
        <Image
          src={image}
          alt={company}
          fill
          className="object-cover  transition-transform duration-300 hover:scale-105"
        />

        {/* Date Badge */}
        <div className="absolute bottom-3 right-3 bg-white text-blue-800 text-xs font-semibold px-3 py-2 text-center shadow">
          <div>{date.day}</div>
          <div>{date.month}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-blue-900">
          {company}
        </h3>

        <h4 className="font-semibold mt-2">
          Project Details
        </h4>

        <ul className="text-gray-600 text-sm mt-2 space-y-1">
          <li>• Location: {location}</li>
          <li>• {equipment}</li>
        </ul>

        <button
          type="button"
          className="mt-4 text-blue-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <span className="w-4 h-[2px] bg-blue-800"></span>
          READ MORE
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
