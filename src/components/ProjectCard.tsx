import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <div className="group bg-white rounded-[var(--r-md)] border border-[var(--c-line)] shadow-[var(--shadow-soft)] overflow-hidden hover:shadow-[var(--shadow-pop)] hover:-translate-y-1 transition-all duration-500">
      <div className="relative h-[180px] sm:h-[220px] overflow-hidden">
        <Image
          src={image}
          alt={company}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 right-3 bg-white text-[var(--c-primary)] text-xs font-bold px-3 py-2 text-center shadow rounded-md">
          <div>{date.day}</div>
          <div className="text-[10px] tracking-wider">{date.month}</div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="t-h3 text-[var(--c-primary)] group-hover:text-[var(--c-accent)] transition-colors">
          {company}
        </h3>
        <h4 className="font-semibold mt-2 text-sm uppercase tracking-wider text-[var(--c-muted)]">
          Project Details
        </h4>
        <ul className="text-[var(--c-ink-2)] text-sm mt-2 space-y-1">
          <li>• Location: {location}</li>
          <li>• {equipment}</li>
        </ul>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 text-[var(--c-primary)] font-semibold text-sm hover:text-[var(--c-accent)] transition-colors"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
