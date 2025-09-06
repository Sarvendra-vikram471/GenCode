# ZeroCode - Current Structure & Flow

## 🎯 **What ZeroCode Is**

ZeroCode is an **AI-powered web development platform** that:
- Takes natural language descriptions from users
- Uses Google Gemini AI to generate complete website code
- Provides real-time preview and code editing
- Allows downloading of generated projects as ZIP files

## 🔄 **Application Flow**

```
1. Landing Page → 2. Login/Signup → 3. Dashboard → 4. Project Creation → 5. AI Editor → 6. Download
```

### **Step-by-Step Flow:**

1. **Landing Page** - Public page showcasing features
2. **Authentication** - Login with demo account (`demo@zerocode.com` / `demo123`) or create new account
3. **Dashboard** - User sees their projects, stats, and can start new projects
4. **Project Starter** - Choose from templates or write custom prompt
5. **AI Editor** - Chat with AI to generate and modify code
6. **Preview & Download** - See live preview and download complete project

## 🏗️ **Key Components**

### **Main Components:**
- **App.tsx** - Main controller, manages views and state
- **LandingPage.tsx** - Public landing page with authentication
- **Dashboard.tsx** - User dashboard with project management
- **ProjectStarter.tsx** - Template selection and custom prompts
- **EditorView.tsx** - AI chat interface + code preview

### **Services:**
- **authService.ts** - JWT authentication (mock for now)
- **geminiService.ts** - Google Gemini AI integration
- **projectService.ts** - Project history management

## 🔐 **Authentication System**

### **Current Implementation:**
- **Mock JWT Tokens** - Base64 encoded JSON (for development)
- **localStorage** - Token persistence
- **Auto-refresh** - Tokens refresh automatically
- **Route Protection** - Conditional rendering based on auth state

### **Demo Account:**
- **Email**: `demo@zerocode.com`
- **Password**: `demo123`

## 📊 **What's Stored in History**

### **localStorage Data:**
- **JWT Token** - User authentication session
- **API Key** - Gemini API key (from settings)
- **User Projects** - Project history and metadata
- **User Preferences** - Settings and theme

### **In-Memory Data:**
- **Chat Messages** - AI conversation history (not persisted)
- **Generated Code** - Current project files (not persisted)

## 🎨 **UI/UX Features**

### **Design System:**
- **Dark Theme** - Purple-to-teal gradient background
- **Glassmorphism** - Semi-transparent overlays
- **Responsive** - Mobile-first design
- **Animations** - Smooth transitions and hover effects

### **Key Features:**
- **Real-time Preview** - Live iframe preview of generated websites
- **Code Editor** - Syntax-highlighted code viewing
- **File Management** - Organized file tree structure
- **Download System** - ZIP file generation with proper naming

## 🤖 **AI Integration**

### **Gemini API:**
- **Rate Limiting** - Built-in retry logic and delays
- **Error Handling** - Graceful fallbacks for API failures
- **Code Parsing** - Automatic extraction of generated code
- **File Structure** - Organized HTML/CSS/JS files

### **AI Workflow:**
```
User Prompt → Gemini API → Code Generation → File Structure → Live Preview
```

## 📁 **Project Management**

### **Project Data:**
- **Project Name** - Extracted from prompt
- **Description** - Truncated prompt
- **Status** - 'completed' or 'in-progress'
- **File Count** - Number of generated files
- **Timestamps** - Created and updated dates

### **Project History:**
- **Dashboard View** - All user projects
- **Statistics** - Total, completed, in-progress counts
- **Recent Activity** - Latest 5 projects
- **Delete Function** - Remove projects from history

## 🚀 **Deployment Ready**

### **Build Process:**
- **Vite** - Fast build tool
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Static Files** - Ready for any hosting platform

### **Environment Variables:**
- **VITE_GOOGLE_API_KEY** - Gemini API key
- **Development** - Hot reload and debugging
- **Production** - Optimized bundles

## 🎯 **Key Technologies**

### **Frontend:**
- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool

### **AI & APIs:**
- **Google Gemini** - AI code generation
- **JWT** - Authentication tokens
- **localStorage** - Client-side persistence

## 📈 **Future Enhancements**

### **Planned Features:**
- **Real Backend** - Replace mock authentication
- **Database** - Persistent project storage
- **Collaboration** - Team project sharing
- **Templates** - Pre-built project templates

### **Current Status:**
- ✅ **Working Prototype** - Fully functional AI code generation
- ✅ **Professional UI** - Modern, responsive design
- ✅ **Authentication** - JWT-based user management
- ✅ **Project History** - Local storage project tracking
- 🔄 **Ready for Production** - Can be deployed immediately

This structure provides a solid foundation for a professional AI-powered web development platform with room for future growth and enhancement.
