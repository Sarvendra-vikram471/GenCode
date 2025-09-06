import React, { useState } from 'react';
import { Header } from './Header';

interface ProjectStarterProps {
  onStartProject: (prompt: string) => void;
  onBack: () => void;
}

export const ProjectStarter: React.FC<ProjectStarterProps> = ({
  onStartProject,
  onBack
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates');

  const templates = [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      description: 'Professional portfolio with animations and contact form',
      icon: '🎨',
      prompt: 'Create a modern portfolio website with dark mode toggle, smooth animations, contact form, and responsive design. Include sections for about, skills, projects, and contact.',
      category: 'Personal'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Store',
      description: 'Complete online store with shopping cart and payment',
      icon: '🛒',
      prompt: 'Build a modern e-commerce website with product catalog, shopping cart, user authentication, payment integration, and responsive design. Include product details, search, and checkout flow.',
      category: 'Business'
    },
    {
      id: 'restaurant',
      name: 'Restaurant Website',
      description: 'Elegant restaurant site with menu and online ordering',
      icon: '🍽️',
      prompt: 'Create a beautiful restaurant website with menu display, online ordering system, reservation booking, about section, and contact information. Include food images and customer reviews.',
      category: 'Business'
    },
    {
      id: 'saas',
      name: 'SaaS Landing Page',
      description: 'Modern SaaS product landing page with features',
      icon: '🚀',
      prompt: 'Design a modern SaaS landing page with hero section, feature highlights, pricing plans, testimonials, and signup form. Include call-to-action buttons and responsive design.',
      category: 'Business'
    },
    {
      id: 'blog',
      name: 'Blog Platform',
      description: 'Full-featured blog with dark mode and search',
      icon: '📝',
      prompt: 'Build a modern blog platform with article listing, individual post pages, search functionality, categories, dark mode toggle, and responsive design. Include author profiles and social sharing.',
      category: 'Content'
    },
    {
      id: 'dashboard',
      name: 'Analytics Dashboard',
      description: 'Data visualization dashboard with charts',
      icon: '📊',
      prompt: 'Create an analytics dashboard with data visualization charts, metrics cards, user statistics, and interactive graphs. Include sidebar navigation, responsive design, and dark theme.',
      category: 'Admin'
    }
  ];

  const handleStartProject = () => {
    const prompt = selectedTemplate 
      ? templates.find(t => t.id === selectedTemplate)?.prompt || customPrompt
      : customPrompt;
    
    if (prompt.trim()) {
      onStartProject(prompt);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header title="Start New Project" showBackButton onBack={onBack} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Project
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select a template to get started quickly, or create something custom from scratch
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-brand-surface/50 backdrop-blur-sm rounded-lg p-1">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-brand-primary text-white'
                  : 'text-brand-subtle-text hover:text-brand-text'
              }`}
            >
              📋 Templates
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                activeTab === 'custom'
                  ? 'bg-brand-primary text-white'
                  : 'text-brand-subtle-text hover:text-brand-text'
              }`}
            >
              ✨ Custom
            </button>
          </div>
        </div>

        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    selectedTemplate === template.id
                      ? 'border-brand-primary bg-brand-primary/10'
                      : 'border-gray-700 hover:border-brand-primary/50'
                  }`}
                >
                  <div className="text-4xl mb-4">{template.icon}</div>
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-brand-secondary rounded text-xs text-brand-text">
                      {template.category}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">{template.name}</h3>
                  <p className="text-brand-subtle-text text-sm mb-4">{template.description}</p>
                  {selectedTemplate === template.id && (
                    <div className="text-brand-primary text-sm font-medium">
                      ✓ Selected
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-semibold text-lg mb-4">Selected Template</h3>
                <div className="bg-brand-background/50 rounded-lg p-4">
                  <p className="text-brand-text text-sm leading-relaxed">
                    {templates.find(t => t.id === selectedTemplate)?.prompt}
                  </p>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleStartProject}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🚀 Start Building
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-surface/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-white font-semibold text-xl mb-4">Describe Your Project</h3>
              <p className="text-brand-subtle-text mb-6">
                Tell us what you want to build. Be as detailed as possible for better results!
              </p>
              
              <div className="space-y-4">
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g., Create a modern portfolio website with dark mode toggle, smooth animations, contact form, and responsive design. Include sections for about, skills, projects, and contact..."
                  className="w-full h-32 px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text placeholder-brand-subtle-text focus:border-brand-primary focus:outline-none transition-colors resize-none"
                />
                
                <div className="bg-brand-background/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">💡 Tips for better results:</h4>
                  <ul className="text-brand-subtle-text text-sm space-y-1">
                    <li>• Be specific about features and functionality</li>
                    <li>• Mention design preferences (modern, minimal, colorful, etc.)</li>
                    <li>• Include any specific sections or pages you want</li>
                    <li>• Mention if you need responsive design or mobile-first approach</li>
                    <li>• Specify any integrations (forms, maps, social media, etc.)</li>
                  </ul>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleStartProject}
                    disabled={!customPrompt.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    🚀 Start Building
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
