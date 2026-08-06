import { FolderOpen, Calendar } from "lucide-react";
import type { Project } from "../../types/project";
import Button from "../common/Button";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <FolderOpen className="text-blue-600" size={32} />

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {project.fileCount} Files
        </span>
      </div>

      <h2 className="mt-5 text-xl font-semibold">
        {project.name}
      </h2>

      <p className="mt-2 text-slate-500">
        {project.description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
        <Calendar size={16} />
        {project.updatedAt.toLocaleDateString()}
      </div>

      <Button className="mt-6 w-full">
        Open Project
      </Button>
    </div>
  );
};

export default ProjectCard;