# 🔥 PhoenixForge AI - Complete Platform

**Where Stories Take Shape**

A revolutionary AI-powered creative suite for authors and publishers. Professional-grade tools for manuscript formatting, cover design, image creation, video production, and audiobook narration—all powered by cutting-edge artificial intelligence.

---

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Repository Structure](#-repository-structure)
- [Features](#-features)
- [Running the Platform](#-running-the-platform)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Contributing](#-contributing)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+ (for demos)
- Git

### Clone and Setup

```bash
# Clone repository
git clone https://github.com/HPagade/rohimaya-publishing-website.git
cd rohimaya-publishing-website

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys

# Install dependencies for all packages
npm install
```

### Run Locally

**Website (Next.js):**
```bash
cd website
npm install
npm run dev
# Open http://localhost:3000
```

**Backend API:**
```bash
cd backend
npm install
npm run dev
# API at http://localhost:3001
```

**Streamlit Demos:**
```bash
cd demos/streamlit
pip install -r requirements.txt
streamlit run main_demo.py
# Demo at http://localhost:8501
```

**Mobile Apps:**
```bash
cd mobile-apps
npm install
npm start
# Scan QR code with Expo Go app
```

**n8n Workflows:**
```bash
cd automation
npx n8n
# Import workflows from automation/workflows/
# n8n at http://localhost:5678
```

---

## 📁 Repository Structure

```
rohimaya-publishing-website/
│
├── 🌐 website/                    # Production-ready Next.js website
│   ├── app/                       # Next.js 14 App Router pages
│   ├── components/                # React components  
│   ├── lib/                       # Utilities and helpers
│   ├── public/                    # Static assets
│   └── package.json               # Website dependencies
│
├── 🔧 backend/                    # Node.js/Express API server
│   ├── src/                       # Server source code
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Business logic
│   │   ├── routes/                # API routes
│   │   ├── middleware/            # Express middleware
│   │   └── config/                # Configuration
│   └── package.json               # Backend dependencies
│
├── 📱 mobile-apps/                # React Native iOS/Android apps
│   ├── App.tsx                    # Main app component
│   ├── app.json                   # Expo configuration
│   └── package.json               # Mobile dependencies
│
├── 🔄 automation/                 # n8n workflows & automation
│   ├── workflows/                 # n8n workflow JSON files
│   │   ├── formatter-workflow.json
│   │   ├── cover-generator-workflow.json
│   │   ├── image-generator-workflow.json
│   │   └── complete-pipeline-workflow.json
│   └── scripts/                   # Automation scripts
│
├── 🎨 demos/                      # Demo applications
│   ├── streamlit/                 # Interactive Streamlit demos
│   │   ├── main_demo.py           # Main demo app
│   │   ├── requirements.txt       # Python dependencies
│   │   └── README.md              # Demo documentation
│   └── static/                    # Static demo utilities
│
├── 📚 docs/                       # Comprehensive documentation
│   ├── setup/                     # Setup guides
│   │   ├── SETUP-GUIDE.md
│   │   └── QUICKSTART.md
│   ├── api/                       # API documentation
│   ├── deployment/                # Deployment guides
│   │   ├── DEPLOYMENT-GUIDE.md
│   │   └── DEPLOYMENT-CHECKLIST.md
│   ├── user-guides/               # End-user documentation
│   │   ├── COMPLETE-PLATFORM-GUIDE.md
│   │   └── SOLID-USAGE-GUIDE.md
│   └── *.md                       # Additional documentation
│
├── 🧪 tests/                      # Test suites
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── e2e/                       # End-to-end tests
│
├── 🚀 deployment/                 # Deployment configurations
│   ├── docker/                    # Docker files
│   ├── kubernetes/                # K8s configurations
│   └── scripts/                   # Deployment scripts
│
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Root package.json
├── database-schema.sql            # Database schema
└── README.md                      # This file
```

See [REPOSITORY_STRUCTURE.md](docs/REPOSITORY_STRUCTURE.md) for detailed information.

---

## ⚡ Features

### 🎯 Core Products

**📄 PhoenixForge Format**
- AI-powered manuscript formatting
- Auto chapter detection with GPT-4
- Export to ePub, PDF, MOBI
- 20+ genre-specific templates
- 2-5 minute processing

**🎨 PhoenixForge Covers**
- AI book cover generation
- 6 variations in 2 minutes
- 30+ genre templates
- Print-ready 300 DPI
- A/B testing built-in

**🖼️ PhoenixForge Images**
- Unlimited AI image generation
- Character consistency
- Style matching
- Batch generation
- Commercial license included

**🎬 PhoenixForge Videos**
- Book trailer creation
- 30-180 second videos
- AI voiceover (50+ voices)
- Music library included
- Multi-platform export

**🎙️ PhoenixForge Voice**
- AI audiobook narration
- 50+ natural voices
- Multiple languages
- ACX-compliant output
- Chapter-by-chapter processing

---

## 🖥️ Running the Platform

### Website Development

```bash
cd website
npm install
npm run dev          # Development mode
npm run build        # Production build
npm start            # Production server
```

Access at: http://localhost:3000

### Backend API

```bash
cd backend
npm install
npm run dev          # Development with hot reload
npm start            # Production mode
```

API available at: http://localhost:3001

**API Endpoints:**
- `POST /api/format` - Format manuscript
- `POST /api/covers/generate` - Generate covers
- `POST /api/images/generate` - Generate images
- `POST /api/videos/generate` - Generate videos
- `GET /api/health` - Health check

### Mobile Apps (iOS/Android)

```bash
cd mobile-apps
npm install

# Development
npm start            # Starts Expo dev server

# Run on devices
npm run ios          # iOS simulator (Mac only)
npm run android      # Android emulator

# Build for production
npm run build:ios    # iOS build
npm run build:android # Android build
```

**App Store Deployment:**
- See [mobile-apps/README.md](mobile-apps/README.md) for detailed instructions
- iOS: Use Xcode or Expo build service
- Android: Use Android Studio or Expo build service

### Streamlit Demos

```bash
cd demos/streamlit
pip install -r requirements.txt
streamlit run main_demo.py
```

Access at: http://localhost:8501

**Available Demos:**
- Complete platform showcase
- Manuscript formatter
- Cover generator
- Image creator
- Audiobook narrator
- Pricing calculator

### n8n Automation

```bash
cd automation
npx n8n
```

Access at: http://localhost:5678

**Import Workflows:**
1. Open n8n
2. Click "Import from File"
3. Select workflow from `automation/workflows/`
4. Configure credentials (OpenAI, Stripe, etc.)
5. Activate workflow

**Available Workflows:**
- `formatter-workflow.json` - Manuscript formatting
- `cover-generator-workflow.json` - Cover generation
- `image-generator-workflow.json` - Image generation
- `complete-pipeline-workflow.json` - Complete book pipeline

---

## 🚀 Deployment

### Website Deployment

**Vercel (Recommended):**
```bash
cd website
vercel
```

**Docker:**
```bash
cd website
docker build -t phoenixforge-web .
docker run -p 3000:3000 phoenixforge-web
```

### Backend Deployment

**Railway:**
```bash
cd backend
# Connect to Railway and deploy
railway up
```

**Docker:**
```bash
cd backend
docker build -t phoenixforge-api .
docker run -p 3001:3001 phoenixforge-api
```

### Mobile App Deployment

**iOS App Store:**
1. Build with Expo: `expo build:ios`
2. Download IPA file
3. Upload to App Store Connect
4. Submit for review

**Google Play Store:**
1. Build with Expo: `expo build:android`
2. Download AAB file
3. Upload to Google Play Console
4. Submit for review

See [mobile-apps/README.md](mobile-apps/README.md) for detailed deployment instructions.

### n8n Automation

**n8n Cloud:**
- Sign up at https://n8n.cloud
- Import workflows
- Configure credentials

**Self-Hosted:**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

---

## 📚 Documentation

### Setup Guides
- [Complete Setup Guide](docs/setup/SETUP-GUIDE.md)
- [Quick Start](docs/setup/QUICKSTART.md)
- [Production Ready](docs/PRODUCTION-READY.md)

### Deployment
- [Deployment Guide](docs/deployment/DEPLOYMENT-GUIDE.md)
- [Deployment Checklist](docs/deployment/DEPLOYMENT-CHECKLIST.md)

### User Guides
- [Complete Platform Guide](docs/user-guides/COMPLETE-PLATFORM-GUIDE.md)
- [SOLID Usage Guide](docs/user-guides/SOLID-USAGE-GUIDE.md)

### Development
- [Development Guide](docs/DEVELOPMENT-GUIDE.md)
- [Contributing Guide](docs/CONTRIBUTING.md)
- [Repository Structure](docs/REPOSITORY_STRUCTURE.md)

### Automation
- [n8n Workflows README](automation/workflows/README.md)

### Mobile Apps
- [Mobile Apps README](mobile-apps/README.md)

### Demos
- [Streamlit Demos README](demos/streamlit/README.md)

---

## 💰 Pricing

### Production Tiers

**Spark - $29/month**
- 3 manuscripts/month
- 5 covers/month
- 20 images/month
- 1 video/month

**Blaze - $49/month** ⭐ Most Popular
- 10 manuscripts/month
- UNLIMITED covers
- 100 images/month
- 3 videos/month

**Inferno - $99/month**
- UNLIMITED everything
- Team accounts (10 users)
- API access (5,000 calls/month)
- Priority support

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TailwindCSS
- TypeScript

**Backend:**
- Node.js 20+
- Express.js
- PostgreSQL
- Redis

**Mobile:**
- React Native 0.72
- Expo
- TypeScript

**AI Services:**
- OpenAI GPT-4 & DALL-E 3
- ElevenLabs (voice)
- Runway ML (video)
- Replicate (Stable Diffusion)

**Automation:**
- n8n (workflow automation)

**Demos:**
- Streamlit (Python)

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Test specific components
cd website && npm test
cd backend && npm test
cd mobile-apps && npm test

# E2E tests
npm run test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md).

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

---

## 📞 Support

- **Email:** support@phoenixforge.ai
- **Documentation:** https://docs.phoenixforge.ai
- **Issues:** GitHub Issues
- **Discord:** https://discord.gg/phoenixforge

---

## 📄 License

Proprietary License - © 2025 Rohimaya Publishing, LLC. All rights reserved.

See [LICENSE](LICENSE) for details.

---

## 👥 Team

**Hannah Pagade** - CEO & Co-Founder
- Healthcare operations leader (15+ years)
- Author (38 books in progress)
- Dual Master's: AI/ML & Computer Science

**Prasad Pagade** - CTO & Co-Founder
- Technical architecture
- AI/ML engineering
- Full-stack development

---

## 🔗 Links

- **Website:** https://phoenixforge.ai
- **Documentation:** https://docs.phoenixforge.ai
- **Blog:** https://blog.phoenixforge.ai
- **Twitter:** [@phoenixforge](https://twitter.com/phoenixforge)
- **LinkedIn:** [PhoenixForge AI](https://linkedin.com/company/phoenixforge-ai)

---

## 🎯 Current Status

✅ **Completed:**
- Core platform architecture
- Website (Next.js)
- Backend API (Node.js/Express)
- Mobile apps (React Native with Expo)
- n8n workflow automation
- Streamlit demo prototypes
- Comprehensive documentation

🚧 **In Progress:**
- Live API integrations
- Payment processing
- User authentication
- Production deployment

📅 **Coming Soon:**
- iOS App Store launch (Q2 2025)
- Android Play Store launch (Q2 2025)
- Public beta launch
- Marketing campaign

---

**Ready to forge your vision?** 🔥

[Get Started](docs/setup/QUICKSTART.md) | [View Docs](docs/) | [Try Demo](demos/streamlit/)

---

*Last Updated: November 3, 2025*
*Version: 2.0.0 (Restructured)*
