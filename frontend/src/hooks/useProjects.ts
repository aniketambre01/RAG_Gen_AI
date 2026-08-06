import { useState } from "react";
import type { Project } from "../types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: crypto.randomUUID(),
      name: "AI Research",
      description: "Research papers and notes",
      fileCount: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: crypto.randomUUID(),
      name: "Python Source",
      description: "Code repository",
      fileCount: 34,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const addProject = (name: string, description: string) => {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      description,
      fileCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProjects((prev) => [project, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    projects,
    addProject,
    deleteProject,
  };
}