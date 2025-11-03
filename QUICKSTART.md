# 🚀 PhoenixForge AI - Quick Start Guide

Get up and running with PhoenixForge AI in under 10 minutes!

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Setup](#quick-setup)
3. [Running Components](#running-components)
4. [Testing](#testing)
5. [Next Steps](#next-steps)

---

## Prerequisites

### Required
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm** or **yarn**
- **Git**

### Optional (for specific components)
- **Python 3.9+** - For Streamlit demos
- **Docker** - For containerized deployment
- **Expo Go App** - For mobile app testing (iOS/Android)

### Check Installation
```bash
node --version  # Should be v18+
npm --version
git --version
python --version  # For demos only
```

---

## Quick Setup

### 1. Clone Repository

```bash
git clone https://github.com/HPagade/rohimaya-publishing-website.git
cd rohimaya-publishing-website
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit with your API keys (optional for demo mode)
nano .env  # or use your preferred editor
```

**Minimal .env for testing:**
```bash
# Leave empty for demo mode, or add real keys for live API calls
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
API_URL=http://localhost:3001
```

---

## Running Components

### 🌐 Option 1: Website (Next.js)

**Best for: Testing the main web application**

```bash
cd website
npm install
npm run dev
```

✅ **Access at:** http://localhost:3000

**What you'll see:**
- Landing page
- All product interfaces (Formatter, Covers, Images, etc.)
- Dashboard
- Pricing page

---

### 🎨 Option 2: Streamlit Demo (Fastest!)

**Best for: Quick demo, presentations, showing to clients**

```bash
cd demos/streamlit
pip install -r requirements.txt
streamlit run main_demo.py
```

✅ **Access at:** http://localhost:8501

**What you'll see:**
- Interactive demos of all features
- Mock data (no API keys needed!)
- Professional presentation interface
- Pricing calculator

**Perfect for:**
- Investor pitches
- Client demonstrations
- Team showcases
- Testing UX without APIs

---

### 📱 Option 3: Mobile App

**Best for: Testing mobile experience**

```bash
cd mobile-apps
npm install
npm start
```

**On your phone:**
1. Install **Expo Go** app ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
2. Scan the QR code shown in terminal
3. App loads on your device!

**What you'll see:**
- Mobile-optimized interface
- All features accessible
- Native app feel

---

### 🔄 Option 4: n8n Workflows

**Best for: Testing automation, API integration**

```bash
cd automation
npx n8n
```

✅ **Access at:** http://localhost:5678

**To import workflows:**
1. Click "Workflows" → "Import from File"
2. Select workflow from `automation/workflows/`
3. Configure credentials (OpenAI, etc.)
4. Click "Execute Workflow" to test

**Available workflows:**
- `formatter-workflow.json` - Format manuscripts
- `cover-generator-workflow.json` - Generate covers
- `image-generator-workflow.json` - Create images
- `complete-pipeline-workflow.json` - Full book pipeline

---

### 🔧 Option 5: Backend API

**Best for: API development, integration testing**

```bash
cd backend
npm install
npm run dev
```

✅ **API at:** http://localhost:3001

**Test endpoints:**
```bash
# Health check
curl http://localhost:3001/api/health

# (Add more endpoints as they're implemented)
```

---

## Testing

### Quick Tests

**1. Streamlit Demo** (No setup required!)
```bash
cd demos/streamlit
pip install -r requirements.txt
streamlit run main_demo.py
# Navigate through all demos
```

**2. Mobile App** (Requires Expo Go)
```bash
cd mobile-apps
npm install
npm start
# Scan QR code with Expo Go
```

**3. n8n Workflows** (Requires API keys for live testing)
```bash
cd automation
npx n8n
# Import and test workflows
```

### What to Test

#### Website
- [ ] Landing page loads
- [ ] Can navigate to all product pages
- [ ] Forms are responsive
- [ ] Dashboard displays correctly

#### Streamlit Demo
- [ ] All demos load without errors
- [ ] Can navigate between sections
- [ ] Mock data displays correctly
- [ ] Download buttons work

#### Mobile App
- [ ] App loads on Expo Go
- [ ] All features are accessible
- [ ] Navigation works smoothly
- [ ] UI renders correctly

#### n8n Workflows
- [ ] Workflows import successfully
- [ ] Can view workflow structure
- [ ] Test mode works (with mock data)
- [ ] (With API keys) Live execution works

---

## Common Issues & Solutions

### "Command not found: npm"
```bash
# Install Node.js from https://nodejs.org/
# Or use nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
```

### "Port already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### "Module not found"
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Python/Streamlit issues
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Mobile app won't load
```bash
# Clear cache
npm start -- --clear

# Restart bundler
npm start -- --reset-cache
```

---

## Next Steps

### For Developers

1. **Read the docs:**
   - [Development Guide](../docs/DEVELOPMENT-GUIDE.md)
   - [API Documentation](../docs/api/)
   - [Contributing Guide](../docs/CONTRIBUTING.md)

2. **Set up development environment:**
   ```bash
   # Install dev dependencies
   npm install
   
   # Run tests
   npm test
   ```

3. **Start coding:**
   - Pick a feature from issues
   - Create a branch
   - Submit PR

### For Product Demos

1. **Use Streamlit demo:**
   ```bash
   cd demos/streamlit
   streamlit run main_demo.py
   ```

2. **Customize for your audience:**
   - Edit demo data in `main_demo.py`
   - Add your branding
   - Focus on features relevant to your audience

3. **Deploy demo:**
   - [Streamlit Cloud](https://streamlit.io/cloud) (Free)
   - Or self-host on your server

### For Testing Automation

1. **Import n8n workflows:**
   ```bash
   cd automation
   npx n8n
   ```

2. **Configure credentials:**
   - OpenAI API key
   - Stripe (for payment testing)
   - Your backend API URL

3. **Test complete pipeline:**
   - Import `complete-pipeline-workflow.json`
   - Execute with sample data
   - Verify all steps complete

### For Production Deployment

1. **Read deployment guides:**
   - [Deployment Guide](../docs/deployment/DEPLOYMENT-GUIDE.md)
   - [Docker Setup](../deployment/docker/README.md)
   - [Production Ready](../docs/PRODUCTION-READY.md)

2. **Choose hosting:**
   - Vercel (website) - Easiest
   - Railway (backend) - Simple
   - AWS/GCP (full stack) - Most control

3. **Deploy:**
   ```bash
   # Website to Vercel
   cd website
   vercel
   
   # Backend to Railway
   cd backend
   railway up
   ```

---

## Support

**Need help?**
- 📧 Email: support@phoenixforge.ai
- 💬 Discord: [Join our community](https://discord.gg/phoenixforge)
- 📚 Docs: [Full documentation](../docs/)
- 🐛 Issues: [GitHub Issues](https://github.com/HPagade/rohimaya-publishing-website/issues)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────┐
│  QUICK REFERENCE - PhoenixForge AI                  │
├─────────────────────────────────────────────────────┤
│                                                      │
│  🌐 Website:       cd website && npm run dev         │
│     → http://localhost:3000                          │
│                                                      │
│  🎨 Demo:          cd demos/streamlit               │
│                    streamlit run main_demo.py        │
│     → http://localhost:8501                          │
│                                                      │
│  📱 Mobile:        cd mobile-apps && npm start      │
│     → Scan QR with Expo Go                          │
│                                                      │
│  🔄 Workflows:     cd automation && npx n8n         │
│     → http://localhost:5678                          │
│                                                      │
│  🔧 Backend:       cd backend && npm run dev        │
│     → http://localhost:3001                          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

**Ready to build?** Pick an option above and get started! 🚀

*Last updated: November 3, 2025*
