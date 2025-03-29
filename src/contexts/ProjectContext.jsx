import React, { createContext, useContext, useState, useEffect } from 'react';
import  {useAuthContext}  from './AuthContext';  // Change useAuth to useAuthContext
import projectService from '../services/projectService';

// Create context
const ProjectContext = createContext();

// Context provider component
export const ProjectProvider = ({ children }) => {
  const { user } = useAuthContext();  // Instead of useAuthContext()
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  // Get project by ID
  const getProjectById = async (id) => {
    try {
      setLoading(true);
      const project = await projectService.getProject(id);
      setCurrentProject(project);
      setError(null);
      return project;
    } catch (err) {
      setError(err.message);
      console.error(`Failed to fetch project ${id}:`, err);
    } finally {
      setLoading(false);
    }
  };

  // Create new project
  const createProject = async (projectData) => {
    try {
      setLoading(true);
      const newProject = await projectService.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
      setCurrentProject(newProject);
      setError(null);
      return newProject;
    } catch (err) {
      setError(err.message);
      console.error('Failed to create project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (id, updateData) => {
    try {
      setLoading(true);
      const updatedProject = await projectService.updateProject(id, updateData);
      setProjects(prev => 
        prev.map(project => project.id === id ? updatedProject : project)
      );
      if (currentProject?.id === id) {
        setCurrentProject(updatedProject);
      }
      setError(null);
      return updatedProject;
    } catch (err) {
      setError(err.message);
      console.error(`Failed to update project ${id}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      setLoading(true);
      await projectService.deleteProject(id);
      setProjects(prev => prev.filter(project => project.id !== id));
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error(`Failed to delete project ${id}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load projects when user changes
  useEffect(() => {
    if (user) {
      fetchProjects();
    } else {
      setProjects([]);
      setCurrentProject(null);
    }
  }, [user]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        loading,
        error,
        fetchProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject,
        setCurrentProject
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook for using the context
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

// Export the context itself for direct access if needed
export default ProjectContext;