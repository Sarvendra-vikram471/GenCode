# ZeroCode Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Add `VITE_GOOGLE_API_KEY` with your Gemini API key

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Drag and drop** the `dist` folder to [Netlify](https://netlify.com)

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add `VITE_GOOGLE_API_KEY` with your Gemini API key

### Option 3: GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings > Pages
   - Select source: "GitHub Actions"

3. **Set Environment Variables**
   - Go to repository Settings > Secrets and variables > Actions
   - Add `VITE_GOOGLE_API_KEY` with your Gemini API key

### Option 4: Static Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload** the `dist` folder to any static hosting service:
   - AWS S3
   - Firebase Hosting
   - Surge.sh
   - Any web server

## 🔧 Environment Variables

Make sure to set your Gemini API key in your hosting platform:

```
VITE_GOOGLE_API_KEY=your_gemini_api_key_here
```

## 📝 Important Notes

- The app requires a Gemini API key to function
- Users can also set their API key through the app's settings modal
- The app is fully client-side and doesn't require a backend server
- All generated code is downloaded as ZIP files

## 🎯 Ready to Deploy!

Your ZeroCode app is now ready for deployment. Choose any of the options above and your AI-powered web development platform will be live!
