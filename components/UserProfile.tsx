import React, { useState } from 'react';
import type { User } from '../types';

interface UserProfileProps {
  user: User;
  onClose: () => void;
  onLogout: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'activity'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: 'Passionate web developer creating amazing digital experiences with ZeroCode.',
    website: 'https://myportfolio.com',
    location: 'San Francisco, CA'
  });

  const handleSave = () => {
    // In a real app, this would save to the backend
    setIsEditing(false);
  };

  const stats = {
    projectsCreated: 12,
    totalBuildTime: '2.5 hours',
    favoriteTemplates: 3,
    lastActive: '2 hours ago'
  };

  const recentActivity = [
    { id: 1, action: 'Created new project', project: 'E-commerce Store', time: '2 hours ago' },
    { id: 2, action: 'Downloaded project', project: 'Portfolio Website', time: '1 day ago' },
    { id: 3, action: 'Used template', project: 'Restaurant Landing', time: '3 days ago' },
    { id: 4, action: 'Updated profile', project: 'Profile Settings', time: '1 week ago' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-surface rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <img src="/images/ZeroCode_symbol.png" alt="ZeroCode" className="h-8 w-8" />
            <h2 className="text-2xl font-bold text-brand-text">User Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="text-brand-subtle-text hover:text-brand-text transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 bg-brand-background/50 border-r border-gray-700">
            <div className="p-6">
              <div className="text-center mb-6">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-3" />
                ) : (
                  <div className="w-20 h-20 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold text-2xl mx-auto mb-3">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <h3 className="text-white font-semibold text-lg">{user.name}</h3>
                <p className="text-brand-subtle-text text-sm">{user.email}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'profile', name: 'Profile', icon: '👤' },
                  { id: 'settings', name: 'Settings', icon: '⚙️' },
                  { id: 'activity', name: 'Activity', icon: '📊' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-brand-primary text-white'
                        : 'text-brand-subtle-text hover:text-brand-text hover:bg-brand-secondary'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-colors"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'profile' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text">
                        {formData.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">Email</label>
                    <div className="px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text">
                      {formData.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">Website</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text">
                        {formData.website}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-text mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text">
                        {formData.location}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-brand-text mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text focus:border-brand-primary focus:outline-none resize-none"
                      />
                    ) : (
                      <div className="px-4 py-3 bg-brand-background border border-gray-600 rounded-lg text-brand-text">
                        {formData.bio}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-brand-secondary hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div className="bg-brand-background/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Notifications</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-brand-text">Email notifications for new features</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-brand-text">Project completion alerts</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-brand-text">Weekly project summaries</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-brand-background/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">Privacy</h4>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-brand-text">Allow project sharing</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-brand-text">Show profile in community</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-brand-background/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">API Settings</h4>
                    <p className="text-brand-subtle-text text-sm mb-3">
                      Manage your Gemini API key and other integrations
                    </p>
                    <button className="px-4 py-2 bg-brand-primary hover:bg-teal-600 text-white rounded-lg transition-colors">
                      Manage API Keys
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Activity & Statistics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-brand-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.projectsCreated}</div>
                    <div className="text-brand-subtle-text text-sm">Projects Created</div>
                  </div>
                  <div className="bg-brand-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.totalBuildTime}</div>
                    <div className="text-brand-subtle-text text-sm">Total Build Time</div>
                  </div>
                  <div className="bg-brand-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.favoriteTemplates}</div>
                    <div className="text-brand-subtle-text text-sm">Favorite Templates</div>
                  </div>
                  <div className="bg-brand-background/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.lastActive}</div>
                    <div className="text-brand-subtle-text text-sm">Last Active</div>
                  </div>
                </div>

                <div className="bg-brand-background/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-4">Recent Activity</h4>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                        <div>
                          <p className="text-brand-text">{activity.action}</p>
                          <p className="text-brand-subtle-text text-sm">{activity.project}</p>
                        </div>
                        <span className="text-brand-subtle-text text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
