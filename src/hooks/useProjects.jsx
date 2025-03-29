import { useState, useEffect } from 'react';
import api from '../services/api';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/projects');
      console.log('Projects API response:', response.data); // Debug log
      
      // Ensure projects is always an array
      const projectsData = Array.isArray(response.data) ? response.data : [];
      setProjects(projectsData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch projects:', err);
      setProjects([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Function to add a new project
  const addProject = async (newProject) => {
    try {
      const response = await api.post('/projects', newProject);
      setProjects(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Failed to add project:', err);
      throw err;
    }
  };

  // Function to update a project
  const updateProject = async (id, updatedData) => {
    try {
      const response = await api.put(`/projects/${id}`, updatedData);
      setProjects(prev => 
        prev.map(project => project.id === id ? response.data : project)
      );
      return response.data;
    } catch (err) {
      console.error('Failed to update project:', err);
      throw err;
    }
  };

  // Function to delete a project
  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(project => project.id !== id));
    } catch (err) {
      console.error('Failed to delete project:', err);
      throw err;
    }
  };

  // Filter active projects (only if projects is an array)
  const activeProjects = Array.isArray(projects) 
    ? projects.filter(project => project.status === 'active') 
    : [];

  return {
    projects,
    activeProjects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject
  };
};

export { useProjects };