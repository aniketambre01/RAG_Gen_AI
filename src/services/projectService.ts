import api from "./api/axios";
import { ENDPOINTS } from "./api/endpoints";

const projectService = {
  async getProjects() {
    const response = await api.get(ENDPOINTS.PROJECTS);
    return response.data;
  },

  async createProject(data: {
    name: string;
    description: string;
  }) {
    const response = await api.post(
      ENDPOINTS.PROJECTS,
      data
    );

    return response.data;
  },

  async deleteProject(id: string) {
    await api.delete(`${ENDPOINTS.PROJECTS}/${id}`);
  },
};

export default projectService;