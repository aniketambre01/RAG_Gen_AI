import type { Project } from "../../types/project";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-slate-500">
        No projects found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;