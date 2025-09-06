import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { UserProfile } from './UserProfile';
import { projectService, type Project } from '../services/projectService';
import { Header } from './Header';

interface DashboardProps {
  user: User;
  onStartNewProject: () => void;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onStartNewProject,
  onOpenSettings,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'templates'>('overview');
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    completedProjects: 0,
    inProgressProjects: 0,
    recentProjects: [] as Project[]
  });

  // Load user projects on component mount
  useEffect(() => {
    const userProjects = projectService.getUserProjects(user.id);
    const projectStats = projectService.getProjectStats(user.id);
    
    setProjects(userProjects);
    setStats({
      totalProjects: projectStats.total,
      completedProjects: projectStats.completed,
      inProgressProjects: projectStats.inProgress,
      recentProjects: projectStats.recentProjects
    });
  }, [user.id]);

  const templates = [
    { id: 1, name: 'Modern Portfolio', category: 'Portfolio', description: 'Clean and professional portfolio template', image: '🎨' },
    { id: 2, name: 'E-commerce Store', category: 'E-commerce', description: 'Complete online store with shopping cart', image: '🛒' },
    { id: 3, name: 'Restaurant Website', category: 'Business', description: 'Elegant restaurant site with menu and booking', image: '🍽️' },
    { id: 4, name: 'SaaS Landing', category: 'Business', description: 'Modern SaaS product landing page', image: '🚀' },
    { id: 5, name: 'Blog Platform', category: 'Content', description: 'Full-featured blog with dark mode', image: '📝' },
    { id: 6, name: 'Dashboard', category: 'Admin', description: 'Analytics dashboard with charts', image: '📊' }
  ];

  const quickActions = [
    { name: 'Create New Project', icon: '✨', action: onStartNewProject, color: 'bg-gradient-to-r from-teal-500 to-purple-600' },
    { name: 'Browse Templates', icon: '📋', action: () => setActiveTab('templates'), color: 'bg-gradient-to-r from-blue-500 to-indigo-600' },
    { name: 'View Projects', icon: '📁', action: () => setActiveTab('projects'), color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { name: 'Settings', icon: '⚙️', action: onOpenSettings, color: 'bg-gradient-to-r from-gray-500 to-slate-600' }
  ];

  const handleDeleteProject = (projectId: string) => {
    if (projectService.deleteProject(projectId)) {
      // Refresh projects list
      const userProjects = projectService.getUserProjects(user.id);
      const projectStats = projectService.getProjectStats(user.id);
      
      setProjects(userProjects);
      setStats({
        totalProjects: projectStats.total,
        completedProjects: projectStats.completed,
        inProgressProjects: projectStats.inProgress,
        recentProjects: projectStats.recentProjects
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header title="Dashboard">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm text-brand-subtle-text">Welcome back,</p>
              <p className="text-brand-text font-semibold">{user.name}</p>
            </div>
            <button
              onClick={() => setShowUserProfile(true)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-brand-secondary transition-colors"
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <svg className="w-4 h-4 text-brand-subtle-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </Header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className={`${action.color} p-6 rounded-xl text-white text-left hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <div className="text-3xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-lg">{action.name}</h3>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
              <div className="text-brand-subtle-text">Total Projects</div>
            </div>
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-2">✅</div>
              <div className="text-2xl font-bold text-white">{stats.completedProjects}</div>
              <div className="text-brand-subtle-text">Completed</div>
            </div>
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-2">🔄</div>
              <div className="text-2xl font-bold text-white">{stats.inProgressProjects}</div>
              <div className="text-brand-subtle-text">In Progress</div>
            </div>
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-2xl font-bold text-white">{templates.length}</div>
              <div className="text-brand-subtle-text">Templates</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl border border-gray-700">
          <div className="border-b border-gray-700">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: '📈' },
                { id: 'projects', name: 'My Projects', icon: '📁' },
                { id: 'templates', name: 'Templates', icon: '📋' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-brand-primary text-brand-primary'
                      : 'border-transparent text-brand-subtle-text hover:text-brand-text'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                  {stats.recentProjects.length > 0 ? (
                    <div className="space-y-3">
                      {stats.recentProjects.map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-4 bg-brand-background/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-semibold">
                              {project.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-white font-medium">{project.name}</p>
                              <p className="text-brand-subtle-text text-sm">{project.description} • {new Date(project.updatedAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-yellow-900/50 text-yellow-300'
                          }`}>
                            {project.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-brand-subtle-text">
                      <p>No projects yet. Start building your first project!</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Your Projects</h3>
                  <button
                    onClick={onStartNewProject}
                    className="px-4 py-2 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors"
                  >
                    + New Project
                  </button>
                </div>
                {projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-brand-background/50 rounded-lg p-4 border border-gray-700 hover:border-brand-primary transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-900/50 text-green-300' 
                              : 'bg-yellow-900/50 text-yellow-300'
                          }`}>
                            {project.status}
                          </span>
                          <span className="text-brand-subtle-text text-sm">{new Date(project.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <h4 className="text-white font-semibold mb-1">{project.name}</h4>
                        <p className="text-brand-subtle-text text-sm mb-3">{project.description}</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-1 bg-brand-primary hover:bg-teal-600 text-white rounded text-sm transition-colors">
                            Open
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-brand-subtle-text">
                    <div className="text-6xl mb-4">📁</div>
                    <p className="text-xl mb-2">No projects yet</p>
                    <p className="mb-6">Start building your first website with AI</p>
                    <button
                      onClick={onStartNewProject}
                      className="px-6 py-3 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors"
                    >
                      Create Your First Project
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'templates' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Popular Templates</h3>
                  <button
                    onClick={onStartNewProject}
                    className="px-4 py-2 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors"
                  >
                    Use Template
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-brand-background/50 rounded-lg p-6 border border-gray-700 hover:border-brand-primary transition-all duration-300 hover:scale-105">
                      <div className="text-4xl mb-4">{template.image}</div>
                      <h4 className="text-white font-semibold mb-2">{template.name}</h4>
                      <p className="text-brand-subtle-text text-sm mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-brand-secondary rounded text-xs text-brand-text">
                          {template.category}
                        </span>
                        <button className="px-3 py-1 bg-brand-primary hover:bg-teal-600 text-white rounded text-sm transition-colors">
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfile
          user={user}
          onClose={() => setShowUserProfile(false)}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};
