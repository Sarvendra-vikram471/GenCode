import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { ProjectStarter } from './components/ProjectStarter';
import { ChatView } from './components/EditorView';
import SettingModal from './components/SettingModal';
import { authService } from './services/authService';
import { projectService } from './services/projectService';
import type { AuthState, ChatMessage, GeneratedCode, ChatFile } from './types';
import { sendMessage, parseCodeResponse } from './services/geminiService';
import JSZip from 'jszip';
import confetti from 'canvas-confetti';

// Navigation wrapper components
const DashboardWrapper: React.FC<{ 
  user: any; 
  onOpenSettings: () => void; 
  onLogout: () => void; 
}> = ({ user, onOpenSettings, onLogout }) => {
  const navigate = useNavigate();
  
  const handleStartNewProject = () => {
    navigate('/project-starter');
  };

  return (
    <Dashboard
      user={user}
      onStartNewProject={handleStartNewProject}
      onOpenSettings={onOpenSettings}
      onLogout={onLogout}
    />
  );
};

const ProjectStarterWrapper: React.FC<{ 
  onStartProject: (prompt: string) => void; 
}> = ({ onStartProject }) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleStartProject = (prompt: string) => {
    onStartProject(prompt);
    navigate('/editor');
  };

  return (
    <ProjectStarter
      onStartProject={handleStartProject}
      onBack={handleBack}
    />
  );
};

const ChatViewWrapper: React.FC<{
  messages: ChatMessage[];
  onSendMessage: (text: string, files: File[]) => void;
  isLoading: boolean;
  error: string | null;
  generatedCode: GeneratedCode | null;
  onDownload: () => void;
}> = ({ messages, onSendMessage, isLoading, error, generatedCode, onDownload }) => {
  const navigate = useNavigate();
  
  const handleNewChat = () => {
    navigate('/project-starter');
  };

  return (
    <ChatView
      messages={messages}
      onSendMessage={onSendMessage}
      isLoading={isLoading}
      error={error}
      generatedCode={generatedCode}
      onNewChat={handleNewChat}
      onDownload={onDownload}
    />
  );
};

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    name: string;
    description: string;
    prompt: string;
  } | null>(null);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      const authData = authService.getAuthData();
      if (authData) {
        setAuthState({
          user: authData.user,
          token: authData.token,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    checkAuth();
  }, []);

  const handleAuthenticated = (newAuthState: AuthState) => {
    setAuthState(newAuthState);
  };

  const handleLogout = () => {
    authService.logout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
    setMessages([]);
    setGeneratedCode(null);
    setCurrentProject(null);
  };

  const handleStartProject = (prompt: string) => {
    // Extract project name from prompt
    const projectName = prompt.split(' ').slice(0, 4).join(' ') + '...';
    const projectDescription = prompt.length > 100 ? prompt.substring(0, 100) + '...' : prompt;
    
    setCurrentProject({
      name: projectName,
      description: projectDescription,
      prompt: prompt
    });
    
    // Start the project with the given prompt
    handleSendMessage(prompt, []);
  };

  const handleSendMessage = async (text: string, files: File[]) => {
    if (!text.trim() && files.length === 0) return;

    // Convert files to ChatFile format
    const chatFiles: ChatFile[] = await Promise.all(
      files.map(async (file) => {
        const base64Data = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.readAsDataURL(file);
        });

        return {
          name: file.name,
          type: file.type,
          data: base64Data
        };
      })
    );

    const userMessage: ChatMessage = {
      role: 'user',
      text: text.trim(),
      files: files.length > 0 ? files.map(f => ({ name: f.name, type: f.type, data: '' })) : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await sendMessage(text, chatFiles);
      const code = parseCodeResponse(responseText);
      
      const modelMessage: ChatMessage = {
        role: 'model',
        text: code ? "I've generated the project files as you requested. You can browse the code and see the preview in the workspace." : responseText,
        isCode: !!code
      };

      setMessages(prev => [...prev, modelMessage]);
      if (code) {
        setGeneratedCode(code);
        
        // Save project when code is generated
        if (currentProject && authState.user) {
          try {
            projectService.saveProject({
              name: currentProject.name,
              description: currentProject.description,
              prompt: currentProject.prompt,
              status: 'completed',
              filesCount: Object.keys(code).length,
              userId: authState.user.id
            });
          } catch (error) {
            console.error('Failed to save project:', error);
          }
        }
      }
      
      // Trigger confetti for successful generation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to generate code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedCode || Object.keys(generatedCode).length === 0) return;

    const zip = new JSZip();
    
    Object.entries(generatedCode).forEach(([filename, content]) => {
      zip.file(filename, content as string);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentProject ? `${currentProject.name.replace(/\s+/g, '-').toLowerCase()}.zip` : 'zerocode-project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Show loading screen while checking authentication
  if (authState.isLoading) {
    return (
      <div className="min-h-screen bg-brand-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-brand-text text-lg">Loading ZeroCode...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route 
          path="/" 
          element={
            authState.isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LandingPage onAuthenticated={handleAuthenticated} />
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            authState.isAuthenticated ? (
              <DashboardWrapper
                user={authState.user!}
                onOpenSettings={() => setShowSettings(true)}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/project-starter" 
          element={
            authState.isAuthenticated ? (
              <ProjectStarterWrapper onStartProject={handleStartProject} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        <Route 
          path="/editor" 
          element={
            authState.isAuthenticated ? (
              <div className="h-screen bg-brand-background">
                <ChatViewWrapper
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  error={error}
                  generatedCode={generatedCode}
                  onDownload={handleDownload}
                />
                
                <SettingModal
                  open={showSettings}
                  onClose={() => setShowSettings(false)}
                />
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
