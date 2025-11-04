# 📂 PhoenixForge AI - Repository Structure

Complete guide to the repository organization and file structure.

---

## 🗂️ Root Directory

```
/
├── README.md                      # Project overview and main documentation
├── QUICKSTART.md                  # Get started in 10 minutes
├── CONTRIBUTING.md                # Contribution guidelines
├── LICENSE                        # MIT License
├── REPOSITORY-STRUCTURE.md        # This file
├── .gitignore                     # Git ignore rules
├── .env.example                   # Environment variables template
├── .env.template                  # Alternative env template
├── package.json                   # Node.js dependencies
├── package-lock.json              # Dependency lock file
├── package.production.json        # Production dependencies
├── database-schema.sql            # Database structure
├── database-updates.sql           # Database migrations
├── verify-setup.sh                # Setup verification script
├── railway.json                   # Railway deployment config
├── vercel.json                    # Vercel deployment config
└── wrangler.toml                  # Cloudflare Workers config
```

---

## 📚 Documentation (`/docs`)

Complete business plans, setup guides, and technical documentation.

```
/docs/
├── INDEX.md                       # Complete documentation index
│
├── /planning/                     # Business & product planning
│   ├── AI_CREATIVE_SUITE_MASTER_PLAN.md
│   ├── AI_FORMATTER_INTEGRATED_PLAN.md
│   ├── COMPLETE_BRAND_NAMING_GUIDE.md
│   ├── COMPLETE_TIMELINE_COSTS_REVENUE.md
│   ├── GLOBAL_PUBLISHING_VENTURE_PLAN.md
│   ├── PHOENIXFORGE_VOICE_INTEGRATION.md
│   ├── ROHIMAYA_PUBLISHING_MASTER_PLAN.md
│   └── QUICK_REFERENCE_COSTS.txt
│
├── /setup/                        # Setup & installation guides
│   ├── DELIVERY-SUMMARY.md
│   └── /guides/
│       ├── BEGINNER-CHECKLIST.md
│       └── YOUR-SETUP-GUIDE.md
│
└── /api/                          # API documentation
    └── (API docs to be added)
```

### Planning Documents

**Business Strategy:**
- `AI_CREATIVE_SUITE_MASTER_PLAN.md` - Complete PhoenixForge AI product strategy, pricing tiers, revenue projections, and 5-year roadmap
- `ROHIMAYA_PUBLISHING_MASTER_PLAN.md` - Website master plan with 20 approved features and implementation details
- `GLOBAL_PUBLISHING_VENTURE_PLAN.md` - Multi-author publishing business model and international expansion

**Financial Planning:**
- `COMPLETE_TIMELINE_COSTS_REVENUE.md` - Detailed 5-year financial projections with month-by-month breakdown
- `QUICK_REFERENCE_COSTS.txt` - Quick reference for essential costs

**Product Strategy:**
- `COMPLETE_BRAND_NAMING_GUIDE.md` - Brand naming options and visual identity
- `AI_FORMATTER_INTEGRATED_PLAN.md` - AI manuscript formatting specifications
- `PHOENIXFORGE_VOICE_INTEGRATION.md` - Audiobook and narration features

### Setup Guides

- `BEGINNER-CHECKLIST.md` - Complete step-by-step setup (3-6 hours)
- `YOUR-SETUP-GUIDE.md` - Detailed technical setup guide
- `DELIVERY-SUMMARY.md` - What's included and how to use it

---

## 🌐 Website (`/website`)

Next.js website and frontend application.

```
/website/
├── README.md                      # Website documentation
├── package.json                   # Website dependencies
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # TailwindCSS configuration
│
├── /src/                          # Source code
│   ├── /app/                      # Next.js app directory
│   ├── /components/               # React components
│   ├── /lib/                      # Utility libraries
│   ├── /styles/                   # Global styles
│   └── /types/                    # TypeScript types
│
├── /public/                       # Static assets
│   ├── /images/
│   ├── /fonts/
│   └── /icons/
│
└── /tests/                        # Website tests
```

**Key Features:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes
- Responsive design
- Dark mode support

---

## 🔧 Backend (`/backend`)

Express.js API server and backend services.

```
/backend/
├── README.md                      # Backend documentation
├── package.json                   # Backend dependencies
├── tsconfig.json                  # TypeScript configuration
│
├── /src/                          # Source code
│   ├── /api/                      # API routes
│   ├── /services/                 # Business logic
│   ├── /models/                   # Data models
│   ├── /middleware/               # Express middleware
│   ├── /utils/                    # Utilities
│   └── server.ts                  # Main server file
│
├── /config/                       # Configuration files
└── /tests/                        # Backend tests
```

**Key Services:**
- OpenAI integration
- Stripe payment processing
- Supabase database
- File storage (AWS S3)
- Email services

---

## 📱 Mobile Apps (`/mobile-apps`)

React Native mobile applications for iOS and Android.

```
/mobile-apps/
├── README.md                      # Mobile app documentation
├── package.json                   # Mobile dependencies
├── app.json                       # Expo configuration
│
├── /src/                          # Source code
│   ├── /screens/                  # App screens
│   ├── /components/               # React Native components
│   ├── /navigation/               # Navigation setup
│   ├── /services/                 # API services
│   └── /utils/                    # Utilities
│
└── /assets/                       # App assets
    ├── /images/
    ├── /fonts/
    └── /icons/
```

**Features:**
- Cross-platform (iOS & Android)
- Expo managed workflow
- Push notifications
- Offline support
- Native performance

---

## 🔄 Automation (`/automation`)

n8n workflows for automated publishing processes.

```
/automation/
├── README.md                      # Automation documentation
│
└── /workflows/                    # n8n workflow JSON files
    ├── formatter-workflow.json
    ├── cover-generator-workflow.json
    ├── image-generator-workflow.json
    └── complete-pipeline-workflow.json
```

**Workflows:**
- Manuscript formatting automation
- Book cover generation
- AI image creation
- Complete end-to-end pipeline

---

## 🎨 Demos (`/demos`)

Interactive demo applications and prototypes.

```
/demos/
├── README.md                      # Demos documentation
│
└── /streamlit/                    # Streamlit demos
    ├── main_demo.py               # Main demo application
    ├── requirements.txt           # Python dependencies
    ├── /pages/                    # Demo pages
    ├── /components/               # Streamlit components
    └── /utils/                    # Demo utilities
```

**Demos Include:**
- All 7 PhoenixForge products
- Interactive UI
- Mock data for testing
- Optional real AI integration

---

## 🚀 Deployment (`/deployment`)

Infrastructure configuration and deployment scripts.

```
/deployment/
├── README.md                      # Deployment documentation
│
├── /docker/                       # Docker configurations
│   ├── Dockerfile.web
│   ├── Dockerfile.api
│   └── docker-compose.yml
│
└── /scripts/                      # Deployment scripts
    ├── deploy-web.sh
    ├── deploy-api.sh
    └── setup-database.sh
```

**Deployment Targets:**
- Vercel (website)
- Railway (backend)
- Supabase (database)
- App Store (iOS)
- Play Store (Android)

---

## 🗃️ Database

### Schema Files

- `database-schema.sql` - Complete database structure
- `database-updates.sql` - Migration scripts

### Structure

```sql
Tables:
├── users                          # User accounts
├── subscriptions                  # Stripe subscriptions
├── books                          # Book metadata
├── orders                         # Order history
├── usage                          # API usage tracking
├── webhooks                       # Webhook logs
└── settings                       # User preferences
```

---

## ⚙️ Configuration Files

### Environment Variables

```bash
# .env.example - Template with all required variables
OPENAI_API_KEY=                    # OpenAI API key
STRIPE_SECRET_KEY=                 # Stripe secret key
STRIPE_PUBLISHABLE_KEY=            # Stripe public key
NEXT_PUBLIC_SUPABASE_URL=          # Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # Supabase anon key
DATABASE_URL=                      # Database connection
AWS_S3_BUCKET=                     # S3 bucket name
```

### Package Management

- `package.json` - Root dependencies and scripts
- `package.production.json` - Production-only dependencies
- `package.additions.json` - Additional packages

---

## 🧪 Testing

Tests are located within each component directory:

```
/website/tests/                    # Website tests
/backend/tests/                    # Backend tests
/mobile-apps/__tests__/            # Mobile app tests
```

**Test Commands:**
```bash
npm test                           # Run all tests
npm run test:watch                 # Watch mode
npm run test:coverage              # Coverage report
```

---

## 📝 Scripts

### Root Scripts

```bash
npm run dev                        # Start development
npm run build                      # Build all components
npm run test                       # Run all tests
npm run lint                       # Lint all code
npm run format                     # Format code
```

### Component-Specific

```bash
cd website && npm run dev          # Website dev server
cd backend && npm run dev          # Backend dev server
cd mobile-apps && npm start        # Mobile app
cd demos/streamlit && streamlit run main_demo.py
```

### Utilities

```bash
./verify-setup.sh                  # Verify installation
npm run db:migrate                 # Run migrations
npm run db:seed                    # Seed database
```

---

## 🔐 Security

### Protected Files

**Never commit:**
- `.env` - Contains API keys
- `.env.local` - Local environment
- `node_modules/` - Dependencies
- `dist/` - Build output
- `.DS_Store` - macOS files

**Git Ignore:**
All sensitive files are listed in `.gitignore`

---

## 📊 File Statistics

```
Total Files: 500+
Total Lines: 50,000+
Languages:
  - TypeScript: 60%
  - JavaScript: 25%
  - Python: 10%
  - SQL: 3%
  - Other: 2%

Documentation: 7 major planning docs
Setup Guides: 3 comprehensive guides
Code Components: 4 major systems
```

---

## 🎯 Quick Reference

### Find Something?

| I want to...                     | Go to...                           |
|----------------------------------|-------------------------------------|
| Understand the business          | `docs/planning/`                   |
| Set up the platform              | `docs/setup/guides/`               |
| Deploy to production             | `deployment/`                      |
| See all documentation            | `docs/INDEX.md`                    |
| Run the website                  | `website/`                         |
| Test the API                     | `backend/`                         |
| Use the mobile app               | `mobile-apps/`                     |
| See automation workflows         | `automation/workflows/`            |
| Run demos                        | `demos/streamlit/`                 |
| Check database structure         | `database-schema.sql`              |

---

## 🔄 Repository Maintenance

### Keeping Organized

1. **Planning docs** → `docs/planning/`
2. **Setup guides** → `docs/setup/`
3. **Code** → Component directories
4. **Config** → Root or component-specific
5. **Assets** → `public/` or `assets/`

### Adding New Features

1. Update relevant planning doc
2. Add code to appropriate component
3. Update component README
4. Add tests
5. Update `docs/INDEX.md`

---

## 📞 Support

**Questions about structure?**
- Check `docs/INDEX.md` for complete navigation
- Read component READMEs for specific details
- Create GitHub issue for suggestions

---

*Last updated: November 3, 2025*
*PhoenixForge AI - Where Stories Take Shape* 🔥
