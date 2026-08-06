export interface Project {
  id: string;
  name: string;
  description: string;
  fileCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
}

export interface ProjectResponse {
  success: boolean;
  message: string;
  project: Project;
}