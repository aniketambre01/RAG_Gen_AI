import Button from "../components/common/Button";
import ProjectGrid from "../components/projects/ProjectGrid";
import { useProjects } from "../hooks/useProjects";

const Projects = () => {
  const { projects } = useProjects();

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Projects
          </h1>

          <p className="text-slate-500">
            Organize your documents into projects.
          </p>
        </div>

        <Button>
          + New Project
        </Button>

      </div>

      <ProjectGrid projects={projects} />

    </div>
  );
};

export default Projects;