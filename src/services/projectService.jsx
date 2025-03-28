import api from './api';

const projectService = {
  getAllProjects: async () => {
    try {
      const response = await api.get('/projects');
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await api.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  updateProject: async (id, projectData) => {
    try {
      const response = await api.put(`/projects/${id}`, projectData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await api.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProjectDocuments: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/documents`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getProjectMembers: async (projectId) => {
    try {
      const response = await api.get(`/projects/${projectId}/members`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  addProjectMember: async (projectId, userId, role) => {
    try {
      const response = await api.post(`/projects/${projectId}/members`, { userId, role });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  removeProjectMember: async (projectId, userId) => {
    try {
      const response = await api.delete(`/projects/${projectId}/members/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default projectService;