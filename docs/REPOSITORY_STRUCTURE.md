# PhoenixForge AI - Repository Structure

This repository is now organized into clear sections for easy navigation and deployment.

## 📁 Directory Structure

```
rohimaya-publishing-website/
├── 🌐 website/                    # Production-ready website (Next.js)
│   ├── app/                       # Next.js 14 App Router
│   ├── components/                # React components
│   ├── lib/                       # Utilities and helpers
│   ├── public/                    # Static assets
│   └── package.json               # Website dependencies
│
├── 📱 mobile-apps/                # Mobile applications
│   ├── ios/                       # iOS app (React Native)
│   ├── android/                   # Android app (React Native)
│   └── shared/                    # Shared code between platforms
│
├── 🔧 backend/                    # Backend API server
│   ├── src/                       # Server source code
│   │   ├── controllers/           # Request handlers
│   │   ├── services/              # Business logic
│   │   ├── routes/                # API routes
│   │   └── config/                # Configuration
│   └── package.json               # Backend dependencies
│
├── 🔄 automation/                 # n8n workflows and automation
│   ├── workflows/                 # n8n workflow JSON files
│   └── scripts/                   # Automation scripts
│
├── 🎨 demos/                      # Demo applications
│   ├── streamlit/                 # Streamlit interactive demos
│   ├── static/                    # Static HTML demos
│   └── jupyter/                   # Jupyter notebook demos
│
├── 📚 docs/                       # Documentation
│   ├── setup/                     # Setup guides
│   ├── api/                       # API documentation
│   ├── deployment/                # Deployment guides
│   └── user-guides/               # End-user documentation
│
├── 🧪 tests/                      # Test suites
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── e2e/                       # End-to-end tests
│
├── 🚀 deployment/                 # Deployment configurations
│   ├── docker/                    # Docker files
│   ├── kubernetes/                # K8s configs
│   ├── terraform/                 # Infrastructure as code
│   └── scripts/                   # Deployment scripts
│
└── 📋 Root Files                  # Project metadata
    ├── package.json               # Root package (workspaces)
    ├── README.md                  # Main documentation
    ├── .env.example               # Environment template
    └── .gitignore                 # Git ignore rules
```

## 🎯 Quick Navigation

### For Developers
- **Website Development:** → `website/`
- **Backend API:** → `backend/`
- **Mobile Apps:** → `mobile-apps/`

### For DevOps
- **Deployment:** → `deployment/`
- **Automation:** → `automation/`
- **Tests:** → `tests/`

### For Demos & Presentations
- **Interactive Demos:** → `demos/streamlit/`
- **Workflow Examples:** → `automation/workflows/`

### For Documentation
- **Setup Guides:** → `docs/setup/`
- **API Docs:** → `docs/api/`
- **User Guides:** → `docs/user-guides/`

## 🔄 Migration Notes

This structure replaces the old organization:
- Old `src/` → Now `website/app/` (Next.js)
- Old `server/` → Now `backend/`
- Old `nextjs-app/` → Merged into `website/`
- Old `demos/` → Now `demos/static/`
- New `n8n-workflows/` → Now `automation/workflows/`
- New `streamlit-demos/` → Now `demos/streamlit/`

## 📦 Running the Applications

### Website (Production)
```bash
cd website
npm install
npm run dev          # Development
npm run build        # Production build
npm start            # Production server
```

### Backend API
```bash
cd backend
npm install
npm run dev          # Development with hot reload
npm start            # Production
```

### Mobile Apps
```bash
cd mobile-apps
npm install

# iOS
npm run ios
# or
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npm run android
```

### Streamlit Demos
```bash
cd demos/streamlit
pip install -r requirements.txt
streamlit run main_demo.py
```

### n8n Automation
```bash
cd automation
npx n8n
# Then import workflows from automation/workflows/
```

## 🧹 Cleanup Scripts

Run these to clean build artifacts:
```bash
# Clean all
npm run clean:all

# Clean specific
npm run clean:website
npm run clean:backend
npm run clean:mobile
```

---

**Last Updated:** 2025-11-03
**Version:** 2.0.0 (Restructured)
