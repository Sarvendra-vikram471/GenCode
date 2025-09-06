import type { User } from '../types';

export interface Project {
  id: string;
  name: string;
  description: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  status: 'completed' | 'in-progress';
  filesCount: number;
  userId: string;
}

// Simple project management service
class ProjectService {
  private readonly STORAGE_KEY = 'zerocode_projects';

  // Get all projects for a user
  getUserProjects(userId: string): Project[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const allProjects: Project[] = JSON.parse(data);
      return allProjects.filter(project => project.userId === userId);
    } catch (error) {
      console.error('Failed to get user projects:', error);
      return [];
    }
  }

  // Save a new project
  saveProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project {
    try {
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingProjects = this.getAllProjects();
      existingProjects.push(newProject);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(existingProjects));
      return newProject;
    } catch (error) {
      console.error('Failed to save project:', error);
      throw new Error('Failed to save project');
    }
  }

  // Update project
  updateProject(projectId: string, updates: Partial<Project>): Project | null {
    try {
      const projects = this.getAllProjects();
      const projectIndex = projects.findIndex(p => p.id === projectId);
      
      if (projectIndex === -1) return null;

      projects[projectIndex] = {
        ...projects[projectIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(projects));
      return projects[projectIndex];
    } catch (error) {
      console.error('Failed to update project:', error);
      return null;
    }
  }

  // Delete project
  deleteProject(projectId: string): boolean {
    try {
      const projects = this.getAllProjects();
      const filteredProjects = projects.filter(p => p.id !== projectId);
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredProjects));
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error);
      return false;
    }
  }

  // Get project by ID
  getProject(projectId: string): Project | null {
    try {
      const projects = this.getAllProjects();
      return projects.find(p => p.id === projectId) || null;
    } catch (error) {
      console.error('Failed to get project:', error);
      return null;
    }
  }

  // Get all projects (internal method)
  private getAllProjects(): Project[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to get all projects:', error);
      return [];
    }
  }

  // Get project statistics
  getProjectStats(userId: string) {
    const projects = this.getUserProjects(userId);
    
    return {
      total: projects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      inProgress: projects.filter(p => p.status === 'in-progress').length,
      recentProjects: projects
        .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
        .slice(0, 5)
    };
  }
}

export const projectService = new ProjectService();
