# ZeroCode - AI-Powered Web Development Platform

Transform your ideas into stunning websites instantly with ZeroCode. No coding required - just describe what you want and watch it come to life!

## ✨ Features

- **🚀 Instant Development**: Build complete web applications in minutes, not hours
- **🎨 Beautiful Design**: AI-generated modern, responsive designs that look professional
- **⚡ Real-time Preview**: See your changes instantly with live preview and hot reload
- **📱 Mobile Ready**: All generated code is mobile-responsive by default
- **🔧 Full Control**: Download and customize your code however you want
- **🛡️ Secure & Private**: Your data stays private with enterprise-grade security
- **🔐 JWT Authentication**: Secure user accounts with JWT token-based authentication

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd zerocode
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   
   **Option A: Environment Variable (Recommended)**
   ```bash
   # Create .env file
   echo "VITE_GOOGLE_API_KEY=your_gemini_api_key_here" > .env
   ```
   
   **Option B: In-App Settings**
   - Run the app and click "API Settings" in the header
   - Enter your Gemini API key
   - Click "Save & Restart"

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔐 Authentication

ZeroCode now includes a complete authentication system:

### Demo Account
- **Email**: `demo@zerocode.com`
- **Password**: `demo123`

### Features
- **JWT Token Management**: Secure authentication with automatic token refresh
- **User Profiles**: Personalized experience with user avatars and settings
- **Session Persistence**: Stay logged in across browser sessions
- **Secure Logout**: Proper session cleanup and token invalidation

### Getting Started with Authentication
1. Click "Get Started" on the landing page
2. Use the demo account or create a new account
3. Start building your projects!

## 🎨 New Landing Page

The redesigned landing page features:
- **Modern Gradient Design**: Beautiful purple-to-teal gradient background
- **Animated Elements**: Floating blob animations and smooth transitions
- **Feature Showcase**: Highlighting key capabilities with icons and descriptions
- **Example Prompts**: Clickable examples to inspire your projects
- **Statistics**: Social proof with usage statistics
- **Responsive Design**: Looks great on all devices

## 🛠️ Usage

### 1. **Authentication**
- Sign up for a new account or use the demo account
- Your session will be automatically saved

### 2. **Start Building**
- Describe what you want to build in natural language
- Examples:
  - "Create a modern e-commerce website with shopping cart"
  - "Build a portfolio website with animations and contact form"
  - "Design a restaurant website with menu and online ordering"

### 3. **Customize & Download**
- Preview your generated website in real-time
- Browse the generated code files
- Download the complete project as a ZIP file

## 🔧 Development

### Project Structure
```
thrive/
├── components/          # React components
│   ├── AuthModal.tsx   # Authentication modal
│   ├── LandingPage.tsx # New landing page
│   ├── EditorView.tsx  # Main chat interface
│   └── ...
├── services/           # API services
│   ├── authService.ts  # JWT authentication
│   ├── geminiService.ts # Gemini AI integration
│   └── ...
├── types.ts           # TypeScript type definitions
└── ...
```

### Key Technologies
- **Frontend**: React 19, TypeScript, Tailwind CSS
- **AI Integration**: Google Gemini API
- **Authentication**: JWT tokens with localStorage
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🎯 What You Can Build

ZeroCode can generate various types of websites:

- **E-commerce Sites**: Shopping carts, product catalogs, payment integration
- **Portfolio Websites**: Professional portfolios with animations
- **Business Websites**: Company sites, landing pages, contact forms
- **Blogs**: Content management with search and categories
- **Dashboards**: Data visualization and admin panels
- **Restaurant Sites**: Menus, online ordering, reservations
- **SaaS Landing Pages**: Product showcases and signup flows

## 🔑 API Key Setup

### Get Your Gemini API Key
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key

### Rate Limits
- **Free Tier**: 15 requests per minute
- **Paid Tier**: Higher limits available
- **Handling**: Built-in rate limiting and retry logic

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Environment Variables
Set these in your deployment platform:
- `VITE_GOOGLE_API_KEY`: Your Gemini API key
ho want to build faster with ZeroCode**

