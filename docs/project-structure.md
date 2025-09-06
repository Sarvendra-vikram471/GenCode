# ZeroCode Project Structure & Architecture

## 🏗️ **Project Overview**

ZeroCode is an AI-powered web development platform that allows users to build complete websites by describing their requirements in natural language. The application uses Google's Gemini AI to generate code and provides a comprehensive development environment.

## 📁 **Directory Structure**

```
thrive/
├── 📁 components/           # React UI Components
│   ├── 🎨 LandingPage.tsx   # Landing page with authentication
│   ├── 🏠 Dashboard.tsx     # User dashboard after login
│   ├── 🚀 ProjectStarter.tsx # Project creation interface
│   ├── 💬 EditorView.tsx    # Main AI chat & code editor
│   ├── 👤 UserProfile.tsx   # User profile management
│   ├── 🔐 AuthModal.tsx     # Login/Signup modal
│   ├── ⚙️ SettingModal.tsx  # API settings modal
│   ├── 📄 CodeOutput.tsx    # Code display component
│   └── 🎯 Header.tsx        # Application header
├── 📁 services/             # Business Logic & API Services
│   ├── 🔑 authService.ts    # JWT Authentication service
│   └── 🤖 geminiService.ts  # Google Gemini AI integration
├── 📁 store/               # State management (future use)
├── 📁 docs/                # Documentation
├── 📁 images/              # Static assets
├── 🎯 App.tsx              # Main application component
├── 📝 types.ts             # TypeScript type definitions
├── ⚙️ constants.ts         # Application constants
└── 📦 package.json         # Dependencies & scripts
```

## 🔄 **Application Flow**

### **1. Authentication Flow**
```
Landing Page → Auth Modal → Dashboard → Project Creation → Editor
     ↓              ↓           ↓            ↓            ↓
   Public      Login/Signup   Protected   Template     AI Chat
   Access      JWT Token      Routes      Selection    Interface
```

### **2. User Journey**
1. **Landing Page**: Public access, showcases features
2. **Authentication**: Login/Signup with JWT tokens
3. **Dashboard**: Protected route, project management
4. **Project Starter**: Choose templates or custom projects
5. **Editor**: AI-powered code generation interface
6. **User Profile**: Account management and settings

### **3. State Management Flow**
```
App State → View State → Component State → Local Storage
    ↓           ↓            ↓              ↓
Auth State  Current View  UI State     Persistence
User Data   Navigation    Forms        JWT Tokens
```

## 🏛️ **Architecture Patterns**

### **1. Component Architecture**
- **Container Components**: App.tsx, Dashboard.tsx
- **Presentational Components**: AuthModal.tsx, CodeOutput.tsx
- **Layout Components**: Header.tsx, LandingPage.tsx

### **2. Service Layer**
- **Authentication Service**: JWT token management
- **AI Service**: Gemini API integration with rate limiting
- **Storage Service**: Local storage management

### **3. Type Safety**
- **TypeScript Interfaces**: Strong typing for all data structures
- **API Contracts**: Defined request/response types
- **Component Props**: Strict prop validation

## 🔐 **Authentication System**

### **JWT Token Flow**
```
1. User Login → 2. Generate JWT → 3. Store in localStorage → 4. Verify on requests
     ↓              ↓                    ↓                      ↓
Credentials   Mock Token          Persistent Session      Protected Routes
Validation    Base64 Encoded      Auto-refresh           Token Validation
```

### **Security Features**
- **Token Expiration**: Automatic token validation
- **Session Persistence**: localStorage with encryption
- **Route Protection**: Conditional rendering based on auth state
- **Secure Logout**: Token cleanup and state reset

### **Mock Implementation**
```typescript
// Current: Mock JWT for development
// Future: Real backend integration
const token = btoa(JSON.stringify({
  userId: user.id,
  exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
}));
```

## 🤖 **AI Integration**

### **Gemini API Integration**
- **Rate Limiting**: Built-in retry logic and delays
- **Error Handling**: Graceful fallbacks for API failures
- **Code Parsing**: Automatic extraction of generated code
- **File Management**: ZIP download of complete projects

### **AI Workflow**
```
User Prompt → Gemini API → Code Generation → File Structure → Preview
     ↓            ↓            ↓              ↓              ↓
Natural      AI Processing   HTML/CSS/JS    Organized     Live Preview
Language     Rate Limited    Generation     Files         iframe Display
```

## 🎨 **UI/UX Design System**

### **Color Scheme**
- **Primary**: Teal (#14b8a6)
- **Secondary**: Purple (#8b5cf6)
- **Background**: Dark gradient (slate-900 to purple-900)
- **Surface**: Semi-transparent overlays

### **Component Patterns**
- **Glassmorphism**: Backdrop blur effects
- **Gradient Buttons**: Teal to purple gradients
- **Card Layouts**: Rounded corners with borders
- **Responsive Design**: Mobile-first approach

### **Animation System**
- **Page Transitions**: Smooth view changes
- **Loading States**: Spinners and skeleton screens
- **Hover Effects**: Scale and color transitions
- **Confetti**: Success celebrations

## 📊 **Data Flow**

### **State Management**
```typescript
// Global App State
interface AppState {
  auth: AuthState;           // User authentication
  view: AppView;            // Current page/view
  messages: ChatMessage[];   // AI conversation history
  generatedCode: GeneratedCode | null; // Generated files
  isLoading: boolean;       // Loading states
  error: string | null;     // Error handling
}
```

### **Data Persistence**
- **JWT Tokens**: localStorage for session management
- **API Keys**: Environment variables + localStorage
- **User Preferences**: localStorage for settings
- **Chat History**: In-memory (not persisted)

## 🚀 **Deployment Architecture**

### **Build Process**
```
Source Code → TypeScript Compilation → Vite Build → Static Files
     ↓              ↓                    ↓            ↓
React/TSX      Type Checking        Optimization    HTML/CSS/JS
Components     Error Prevention     Tree Shaking    Production Ready
```

### **Environment Configuration**
- **Development**: Hot reload, debug tools
- **Production**: Optimized bundles, environment variables
- **API Keys**: Secure storage and validation

## 🔧 **Development Workflow**

### **Code Organization**
1. **Components**: Reusable UI elements
2. **Services**: Business logic and API calls
3. **Types**: TypeScript definitions
4. **Constants**: Application configuration
5. **Utils**: Helper functions

### **Best Practices**
- **Type Safety**: Strict TypeScript configuration
- **Component Composition**: Reusable component patterns
- **Error Boundaries**: Graceful error handling
- **Performance**: Lazy loading and optimization
- **Accessibility**: ARIA labels and keyboard navigation

## 📈 **Future Enhancements**

### **Planned Features**
- **Real Backend**: Replace mock authentication
- **Database**: User projects and history
- **Collaboration**: Team project sharing
- **Templates**: Pre-built project templates
- **Analytics**: Usage tracking and insights
- **Mobile App**: React Native version

### **Scalability Considerations**
- **Microservices**: Separate auth and AI services
- **CDN**: Static asset optimization
- **Caching**: API response caching
- **Monitoring**: Error tracking and performance
- **Security**: Rate limiting and validation

## 🎯 **Key Technologies**

### **Frontend Stack**
- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Vite**: Fast build tool and dev server

### **AI & APIs**
- **Google Gemini**: AI code generation
- **JWT**: Authentication tokens
- **localStorage**: Client-side persistence

### **Development Tools**
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Git**: Version control
- **npm**: Package management

This architecture provides a solid foundation for a professional AI-powered web development platform with room for future growth and enhancement.
