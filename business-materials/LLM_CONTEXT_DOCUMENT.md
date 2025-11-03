# PhoenixForge AI - LLM Context Document

**Purpose:** This document provides complete context for AI assistants (LLMs) working on the PhoenixForge AI project.

---

## 🎯 Project Identity

**Project Name:** PhoenixForge AI  
**Previous Name:** Rohimaya Publishing  
**Company:** Rohimaya Publishing, LLC  
**Tagline:** Where Stories Take Shape  
**Domain:** Self-publishing technology, AI-powered creative tools  

---

## 📚 What Are We Building?

PhoenixForge AI is a **complete AI-powered creative suite for authors and publishers**. Think "Canva + Adobe Creative Suite for book publishing" powered by AI.

### The Core Value Proposition

**One sentence:** Professional book production in minutes at 10% of traditional costs.

**The problem we solve:**
- Authors spend $5,000-17,000 per book on professional services
- Wait 4-8 weeks for results
- Many skip essential elements due to cost
- Results are inconsistent

**Our solution:**
- $49/month for unlimited professional assets
- 2-10 minutes for complete results
- AI ensures consistent professional quality
- All-in-one platform

---

## 🎨 Product Suite (5 Products)

### 1. PhoenixForge Format
- **What:** AI manuscript formatter
- **Input:** Raw manuscript (.docx, .txt, .pdf)
- **Output:** Professional ePub, PDF, MOBI (print-ready)
- **Time:** 2-5 minutes
- **Technology:** GPT-4 for structure analysis, custom formatters
- **Key Feature:** Auto chapter detection, smart image placement

### 2. PhoenixForge Covers ⭐ FLAGSHIP
- **What:** AI book cover generator
- **Input:** Title, author, genre, description
- **Output:** 6 professional cover variations
- **Time:** 2 minutes
- **Technology:** DALL-E 3 + custom typography AI
- **Key Feature:** UNLIMITED on BLAZE tier ($49/month)

### 3. PhoenixForge Images
- **What:** AI image creator for books
- **Input:** Text description or scene
- **Output:** High-res images (up to 2048px)
- **Time:** 30 seconds per image
- **Technology:** DALL-E 3, Stable Diffusion, Leonardo.ai
- **Key Feature:** Character memory for consistency

### 4. PhoenixForge Videos
- **What:** AI book trailer creator
- **Input:** Book description, target length
- **Output:** Professional video trailer
- **Time:** 10 minutes
- **Technology:** Runway ML, ElevenLabs voice, FFmpeg
- **Key Feature:** AI script generation + voiceover

### 5. PhoenixForge Voice (Coming Q2 2025)
- **What:** AI audiobook narrator
- **Input:** Manuscript text
- **Output:** Professional audiobook (ACX-compliant)
- **Time:** 1 hour per 10,000 words
- **Technology:** ElevenLabs, Google TTS, Azure Neural
- **Key Feature:** 50+ voices with emotional range

---

## 💰 Pricing & Business Model

### Subscription Tiers

**SPARK - $29/month** (Starter)
- 3 formats/month
- 5 covers/month
- 20 images/month
- 1 video/month (30s)
- Target: New authors testing platform

**BLAZE - $49/month** (Most Popular) ⭐
- 10 formats/month
- **UNLIMITED covers** ← This is the hook!
- 100 images/month
- 3 videos/month (60s)
- Brand kit, A/B testing
- Target: Active authors (2-3 books/year)

**INFERNO - $99/month** (Power Users)
- **UNLIMITED everything**
- API access (5,000 calls/month)
- Team accounts (10 users)
- White-label option
- Priority support
- Target: Publishers, agencies

**PAY-AS-YOU-GO** (No subscription)
- Format: $29/book
- Cover: $19 each
- Image: $3 each
- Video: $49-149 based on length

### Why This Pricing Works

**Value comparison:**
- Traditional cover: $300-800
- Our cover: $19 or unlimited for $49/month
- **Savings: 90%+**

**Psychology:**
- SPARK gets users in the door
- BLAZE unlimited covers = irresistible upgrade
- INFERNO for power users who need everything

**Unit economics:**
- AI costs: ~$5/user/month
- Infrastructure: ~$2/user/month
- Gross margin: **85%**
- LTV:CAC = **20:1**

---

## 🎯 Target Market

### Primary Audience (70%): Solo Self-Published Authors

**Demographics:**
- Age: 25-65
- Gender: 70% female
- Location: US, UK, Canada, Australia
- Income: $30k-100k
- Books/year: 2-3

**Psychographics:**
- Passionate about writing
- Limited technical skills
- Budget-conscious
- Time-starved
- Quality-conscious

**Pain Points:**
- Can't afford professional services ($5k+/book)
- Don't have design skills
- DIY results look unprofessional
- Time-consuming manual work

**Jobs to Be Done:**
1. Make my book look professional
2. Save money on production costs
3. Publish faster
4. Compete with traditionally published books

---

### Secondary Audience (20%): Small Publishers

**Profile:**
- 1-20 titles per year
- 1-5 employees
- Genre specialists (romance, fantasy, etc.)

**Needs:**
- Scalable production workflow
- Consistent brand across titles
- Bulk processing
- Team collaboration

**Our Solution:**
- INFERNO tier with unlimited usage
- API for automation
- Team accounts
- White-label option

---

### Tertiary Audience (10%): Content Creators

**Profile:**
- Social media marketers
- Book coaches
- Author service providers
- Course creators

**Needs:**
- Marketing graphics
- Social media content
- Client deliverables

**Our Solution:**
- Image generation for marketing
- Video trailers for promotion
- Brand consistency tools

---

## 🏗️ Technical Architecture

### Frontend Stack

```
Next.js 14 (React 18)
├── TypeScript for type safety
├── TailwindCSS for styling
├── Shadcn/ui components
├── Zustand (state management)
├── React Query (data fetching)
└── Framer Motion (animations)
```

**Why Next.js:**
- SEO-friendly (SSR/SSG)
- Fast page loads
- API routes built-in
- Vercel deployment

---

### Backend Stack

```
Node.js 20 + Express.js
├── PostgreSQL 15 (primary database)
├── Redis 7 (caching + job queues)
├── Bull (background jobs)
├── Prisma (ORM)
├── Express middleware:
│   ├── Helmet (security)
│   ├── CORS
│   ├── Rate limiting
│   └── Request validation
└── JWT authentication
```

**Why Node.js:**
- JavaScript everywhere (same language as frontend)
- Great AI library ecosystem
- Async processing for AI jobs
- Easy scaling

---

### AI Service Architecture

```
AI Service Layer
├── OpenAI GPT-4 Turbo
│   └── Text analysis, chapter detection, descriptions
├── DALL-E 3
│   └── High-quality image generation
├── Stable Diffusion XL (via Replicate)
│   └── Cost-effective bulk images
├── Leonardo.ai
│   └── Style-consistent images
├── Runway ML Gen-2
│   └── Video generation
├── ElevenLabs
│   └── Premium voice synthesis
├── Google Cloud TTS
│   └── Backup voice synthesis
└── Custom ML Models
    └── Character memory, style matching
```

**Provider Strategy:**
- Primary + backup for reliability
- Cost optimization (DALL-E for quality, SD for volume)
- Multi-provider prevents vendor lock-in

---

### Infrastructure

```
Deployment
├── Frontend: Vercel (Next.js optimal)
├── Backend: Railway (Node.js hosting)
├── Database: Supabase (managed Postgres)
├── Redis: Upstash (serverless Redis)
├── File Storage: AWS S3
├── CDN: CloudFront
├── CI/CD: GitHub Actions
└── Monitoring:
    ├── Sentry (errors)
    ├── LogRocket (sessions)
    └── Mixpanel (analytics)
```

---

### Key API Integrations

**Payment:**
- Stripe (subscriptions, one-time payments)
- Webhooks for subscription events

**Authentication:**
- Clerk (user management, OAuth)
- Google, GitHub OAuth

**Email:**
- Resend (transactional emails)

**Analytics:**
- Google Analytics
- Mixpanel
- PostHog

---

## 📁 Repository Structure

```
/
├── README.md                   # Main overview
├── QUICKSTART.md              # 10-minute setup
├── package.json               # Root dependencies
├── .env.example              # Environment template
│
├── /website/                  # Next.js frontend
│   ├── /src/
│   │   ├── /app/             # Next.js 14 app router
│   │   ├── /components/      # React components
│   │   ├── /lib/            # Utilities
│   │   └── /types/          # TypeScript types
│   ├── /public/             # Static assets
│   └── package.json
│
├── /backend/                  # Express.js API
│   ├── /src/
│   │   ├── /controllers/    # API controllers
│   │   ├── /services/       # Business logic
│   │   │   ├── openai.service.js
│   │   │   ├── cover.generator.service.js
│   │   │   ├── image.processing.service.js
│   │   │   ├── video.generator.service.js
│   │   │   ├── audiobook.service.js
│   │   │   └── stripe.service.js
│   │   ├── /middleware/     # Express middleware
│   │   ├── /routes/        # API routes
│   │   └── /interfaces/    # TypeScript interfaces
│   └── package.json
│
├── /mobile-apps/              # React Native
│   ├── App.tsx
│   └── /src/
│
├── /automation/              # n8n workflows
│   └── /workflows/
│       ├── formatter-workflow.json
│       ├── cover-generator-workflow.json
│       └── image-generator-workflow.json
│
├── /demos/                   # Streamlit demos
│   └── /streamlit/
│       └── main_demo.py
│
├── /docs/                    # Documentation
│   ├── INDEX.md             # Doc hub
│   ├── /planning/           # Business plans
│   │   ├── AI_CREATIVE_SUITE_MASTER_PLAN.md
│   │   ├── ROHIMAYA_PUBLISHING_MASTER_PLAN.md
│   │   ├── GLOBAL_PUBLISHING_VENTURE_PLAN.md
│   │   └── COMPLETE_TIMELINE_COSTS_REVENUE.md
│   └── /setup/              # Setup guides
│
├── /business-materials/      # NEW - Business docs
│   ├── PROJECT_OVERVIEW.md
│   ├── LLM_CONTEXT_DOCUMENT.md
│   ├── /pitch-decks/
│   ├── /wireframes/
│   ├── /tech-stack/
│   └── /business-plan/
│
└── /deployment/              # Deploy configs
    ├── /docker/
    └── /scripts/
```

---

## 🔑 Environment Variables

### Required Services & Keys

**AI Services:**
```bash
OPENAI_API_KEY="sk-..."           # GPT-4, DALL-E 3
ANTHROPIC_API_KEY="sk-ant-..."    # Claude (backup)
REPLICATE_API_TOKEN="r8_..."      # Stable Diffusion
RUNWAY_API_KEY="..."              # Video generation
ELEVENLABS_API_KEY="..."          # Voice synthesis
```

**Infrastructure:**
```bash
DATABASE_URL="postgresql://..."   # PostgreSQL
REDIS_URL="redis://..."           # Redis cache
AWS_ACCESS_KEY_ID="AKIA..."       # S3 storage
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="phoenixforge-files"
```

**Authentication:**
```bash
NEXTAUTH_SECRET="..."             # Min 32 chars
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

**Payments:**
```bash
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_SPARK="price_..."    # Price IDs for tiers
STRIPE_PRICE_BLAZE="price_..."
STRIPE_PRICE_INFERNO="price_..."
```

**Optional:**
```bash
SENTRY_DSN="..."                  # Error tracking
GOOGLE_ANALYTICS_ID="G-..."       # Analytics
MIXPANEL_TOKEN="..."              # Product analytics
RESEND_API_KEY="re_..."          # Email
```

---

## 🚀 Development Workflow

### Local Setup

```bash
# Clone repo
git clone https://github.com/HPagade/rohimaya-publishing-website.git
cd rohimaya-publishing-website

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your API keys

# Start database (if using Docker)
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate

# Start development servers
npm run dev              # Starts all services
# OR individually:
cd website && npm run dev       # Frontend on :3000
cd backend && npm run dev       # Backend on :5000
```

### Key Commands

```bash
# Development
npm run dev                # Start all services
npm run build             # Build for production
npm run test              # Run tests
npm run lint              # Lint code

# Database
npm run db:migrate        # Run migrations
npm run db:seed           # Seed test data
npm run db:reset          # Reset database

# Deployment
npm run deploy:web        # Deploy frontend
npm run deploy:api        # Deploy backend
```

---

## 🎨 Design System

### Brand Colors

**Primary (Fire/Phoenix theme):**
```
Primary:   #FF6B35  (Vibrant Orange)
Secondary: #F7931E  (Golden Orange)
Accent:    #9B59B6  (Purple - mystery/magic)
Dark:      #1A1A1D  (Almost black)
Light:     #F5F5F5  (Off-white)
```

**Usage:**
- Primary: CTAs, highlights, brand moments
- Secondary: Hover states, accents
- Accent: Special features, premium elements
- Dark: Text, backgrounds (dark mode)
- Light: Backgrounds (light mode)

### Typography

**Primary Font:** Inter (Sans-serif)
- Modern, clean, highly readable
- Used for: UI, body text, headings

**Accent Font:** Playfair Display (Serif)
- Elegant, literary feel
- Used for: Hero text, special headings, quotes

### Component Library

We use **Shadcn/ui** - a collection of re-usable components:
- Button, Card, Dialog, Form, Input, Select
- All customizable with TailwindCSS
- Accessible (ARIA compliant)
- Dark mode ready

---

## 📊 Data Models

### Core Entities

**User**
```typescript
{
  id: string
  email: string
  name: string
  subscriptionTier: 'spark' | 'blaze' | 'inferno' | 'enterprise'
  subscriptionStatus: 'active' | 'canceled' | 'past_due'
  usageThisMonth: {
    formats: number
    covers: number
    images: number
    videos: number
  }
  createdAt: Date
  updatedAt: Date
}
```

**Book Project**
```typescript
{
  id: string
  userId: string
  title: string
  author: string
  genre: string
  description: string
  status: 'draft' | 'in_progress' | 'completed'
  assets: {
    manuscripts: string[]  // File URLs
    covers: string[]
    images: string[]
    videos: string[]
  }
  createdAt: Date
  updatedAt: Date
}
```

**Job (AI Generation)**
```typescript
{
  id: string
  userId: string
  projectId: string
  type: 'format' | 'cover' | 'image' | 'video' | 'voice'
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number  // 0-100
  input: object     // Request parameters
  output: object    // Generated assets
  error?: string
  createdAt: Date
  completedAt?: Date
}
```

---

## 🔄 Key User Flows

### Flow 1: Generate a Book Cover (Most Common)

```
User Journey:
1. User logs in / signs up
2. Clicks "Create New Cover"
3. Enters:
   - Title
   - Author name
   - Genre (dropdown with 30+ options)
   - Brief description
   - Optional: Style preferences, colors
4. Clicks "Generate"
5. System:
   - Validates inputs
   - Creates job in queue
   - Calls DALL-E 3 with optimized prompt
   - Generates 6 variations
   - Saves to S3
   - Updates job status
6. User sees 6 cover options
7. User can:
   - Download favorites
   - Regenerate with tweaks
   - A/B test with audience
   - Save to project
```

**Technical Flow:**
```
Frontend → API → Job Queue → AI Service → Storage → Database → Webhook → Frontend Update
```

---

### Flow 2: Format a Manuscript

```
User Journey:
1. User clicks "Format Manuscript"
2. Uploads file (.docx, .txt, .pdf)
3. Selects:
   - Genre/template
   - Output formats (ePub, PDF, MOBI)
   - Optional: Custom styling
4. Clicks "Format"
5. System:
   - Parses document
   - Uses GPT-4 to detect structure
   - Applies genre template
   - Generates all formats
   - Creates download package
6. User downloads formatted files
```

**Magic Moment:** 
- Author uploads 300-page manuscript
- 5 minutes later: Professional ePub, PDF, MOBI ready
- Would take 8+ hours manually or $1,000 freelancer

---

## 💡 Core Features

### 1. Character Memory (Images)

**Problem:** Authors need consistent character appearance across 100+ images

**Solution:**
```typescript
// When user generates first image of a character
const character = {
  name: "Phoenix Warrior",
  appearance: "tall, golden armor, red phoenix emblem",
  style: "fantasy-art",
  seedImage: "first_generated_image.png"
}

// Store in database linked to user + project
// Future generations reference this character:
generateImage({
  prompt: "Phoenix Warrior fighting dragon",
  characterRef: character.id,  // Links to stored appearance
  maintainStyle: true
})
```

**Result:** All images of Phoenix Warrior look like same character

---

### 2. Brand Kit

**Problem:** Authors need consistent branding across series

**Solution:**
```typescript
const brandKit = {
  colors: ["#FF6B35", "#1A1A1D"],
  fonts: ["Cinzel", "Open Sans"],
  logo: "author_logo.png",
  style: "dark-fantasy"
}

// Applied automatically to all covers/images for series
```

---

### 3. A/B Testing

**Problem:** Authors don't know which cover sells better

**Solution:**
- Generate multiple variations
- Track clicks/conversions
- Show data: "Cover A: 3.2% CTR, Cover B: 5.7% CTR"
- Recommend best performer

---

### 4. Batch Processing

**Problem:** Publishers need to create 10+ covers at once

**Solution:**
```typescript
// Upload CSV with book data
[
  { title: "Book 1", author: "Author", genre: "fantasy" },
  { title: "Book 2", author: "Author", genre: "fantasy" },
  // ... 10 more
]

// System processes all in background
// Sends email when complete with download link
```

---

## 🎯 Success Metrics

### North Star Metric
**Books Created Per Month** - Measures real value delivered

**Current:** 150 books/month (50 users × 3 books)  
**Target:** 6,000 books/month (2,000 users × 3 books) by Q4 2025

---

### Product Metrics

**Engagement:**
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- DAU/MAU ratio (target: 40%+)

**Usage:**
- Covers generated/user/month (target: 6)
- Formats completed/user/month (target: 2)
- Images created/user/month (target: 20)

**Quality:**
- AI success rate (target: 95%+)
- User edits per generation (target: <2)
- Downloads per generation (target: 80%+)

**Satisfaction:**
- NPS Score (target: 50+)
- Customer satisfaction (target: 4.5/5)
- Retention rate (target: 90%+ monthly)

---

### Business Metrics

**Acquisition:**
- New signups/month (target: 200 by Q4 2025)
- Activation rate (target: 70%)
- CAC (target: $30)

**Revenue:**
- MRR (target: $100k by Q4 2025)
- ARPU (target: $50/month)
- LTV (target: $600)
- LTV:CAC ratio (target: 20:1)

**Retention:**
- Monthly churn (target: <3%)
- Annual churn (target: <30%)
- Expansion revenue (upgrades)

---

## 🚨 Common Issues & Solutions

### Issue 1: AI Generation Fails

**Symptoms:**
- Error message: "Generation failed"
- User doesn't get output

**Causes:**
1. API key invalid/expired
2. API rate limit hit
3. Prompt triggers content policy
4. Service downtime

**Solutions:**
1. Check API key in .env
2. Implement exponential backoff
3. Sanitize prompts, add fallbacks
4. Multi-provider failover

**Prevention:**
- Monitor API health
- Queue system with retries
- Alert on failures >5%

---

### Issue 2: Slow Generation Times

**Symptoms:**
- Users wait 5+ minutes
- Complaints about speed

**Causes:**
1. Cold starts on serverless
2. Large files
3. Complex prompts
4. Peak usage times

**Solutions:**
1. Keep functions warm
2. Optimize file size before processing
3. Optimize prompts for speed
4. Scale infrastructure during peaks

---

### Issue 3: Quality Issues

**Symptoms:**
- Generated covers look unprofessional
- Images don't match description
- Formatting has errors

**Causes:**
1. Poor prompts
2. Wrong AI model
3. Bad templates
4. User input unclear

**Solutions:**
1. Improve prompt engineering
2. Use better models (GPT-4 vs GPT-3.5)
3. Refine templates with user feedback
4. Better UI for clear inputs

---

## 🔐 Security & Compliance

### Data Protection

**User Data:**
- Encrypted at rest (AES-256)
- Encrypted in transit (TLS 1.3)
- No data retention after export (delete after 30 days)

**API Keys:**
- Stored in encrypted environment variables
- Never exposed to frontend
- Rotated quarterly

**File Storage:**
- Private S3 buckets
- Signed URLs with expiration
- Virus scanning on upload

---

### Compliance

**GDPR (Europe):**
- User data export available
- Right to deletion
- Clear consent for data use
- Privacy policy

**CCPA (California):**
- Do Not Sell option
- Data disclosure
- Opt-out available

**PCI DSS (Payments):**
- Stripe handles card data (we never touch it)
- Webhook verification
- Secure API communication

---

## 📈 Growth Strategy

### Phase 1: Product-Led Growth (Current)

**Tactics:**
1. **Free tier** (coming Q1 2025)
   - 1 cover, 5 images, 1 format/month
   - No credit card required
   - 15% convert to paid

2. **Viral loops**
   - "Made with PhoenixForge" watermark (removable on paid)
   - Share to social media button
   - Referral program (both get $10 credit)

3. **Content marketing**
   - Blog: "How to Self-Publish" guides
   - YouTube: Tutorials and demos
   - SEO: Target "book cover generator", "format manuscript"

---

### Phase 2: Sales-Led Growth (2026)

**Enterprise sales:**
- Hire 2-3 sales reps
- Target: Publishers with 20+ titles/year
- Custom pricing, white-label, SLA

**Partnerships:**
- Integrate with KDP, IngramSpark
- Partner with author service providers
- Affiliate program with influencers

---

### Phase 3: Ecosystem (2027+)

**Platform plays:**
- Template marketplace (creators earn 70%)
- Plugin marketplace (extend functionality)
- Community features (forums, feedback)
- API ecosystem (3rd party tools)

---

## 🎓 Glossary for LLMs

**Terms you'll encounter:**

**KDP** - Kindle Direct Publishing (Amazon's self-publishing platform)  
**IngramSpark** - Print-on-demand distributor  
**ACX** - Audiobook Creation Exchange (Amazon's audiobook platform)  
**ePub** - eBook format (most common)  
**MOBI** - Amazon Kindle format  
**ISBN** - International Standard Book Number  
**ASIN** - Amazon Standard Identification Number  

**Self-publishing terms:**
- **Backmatter** - Content after main text (author bio, other books)
- **Bleed** - Print area that extends past trim
- **Trim size** - Physical book dimensions
- **Cover reveal** - Marketing event for new cover
- **ARC** - Advanced Reader Copy (pre-release)

**AI terms:**
- **Prompt engineering** - Crafting AI inputs for best results
- **Fine-tuning** - Training model on specific data
- **Inference** - Running AI model to generate output
- **Token** - Unit of text for AI (roughly 4 characters)
- **Temperature** - AI creativity setting (0 = deterministic, 1 = creative)

---

## 💬 Working with This Project

### When Building Features

**Always consider:**
1. **User context** - They're authors, not tech people
2. **Speed** - They value time (busy creating)
3. **Quality** - Professional results or nothing
4. **Cost** - They're budget-conscious
5. **Ease** - Should be obvious, no training needed

**Best practices:**
1. Use genre-specific defaults
2. Provide undo/redo
3. Save drafts automatically
4. Show progress indicators
5. Handle errors gracefully with clear messages

---

### When Debugging

**Check these first:**
1. Environment variables loaded? (`console.log(process.env.OPENAI_API_KEY)`)
2. API keys valid? (test with direct API call)
3. Database connected? (check connection in logs)
4. Redis working? (job queue depends on it)
5. File permissions? (for uploads/downloads)

**Common gotchas:**
- OpenAI rate limits (use exponential backoff)
- CORS issues (check allowed origins)
- File size limits (implement chunking)
- Async race conditions (use proper awaits)

---

### When Improving

**Prioritize:**
1. **Speed improvements** - Users notice every second
2. **Quality improvements** - Directly impacts user success
3. **Cost reductions** - Improves margins
4. **New features** - After core is solid

**Metrics to track:**
- Generation time (aim for <2 min)
- Success rate (aim for >95%)
- User satisfaction (aim for >4.5/5)
- Cost per generation (aim for <$0.50)

---

## 🚀 Next Steps for This Project

### Immediate Priorities (Q1 2025)

1. **Public launch**
   - Polish UI/UX
   - Marketing website
   - Content marketing

2. **Free tier**
   - Implement limits
   - Conversion funnels
   - Onboarding flow

3. **Mobile apps**
   - iOS (React Native)
   - Android (React Native)
   - Progressive Web App

---

### Medium-term (Q2-Q3 2025)

1. **PhoenixForge Voice launch**
   - Integrate ElevenLabs
   - ACX compliance
   - Chapter-by-chapter processing

2. **API v1.0**
   - Public documentation
   - Rate limiting per tier
   - Webhook system

3. **Team features**
   - Workspaces
   - Role-based access
   - Activity logs

---

### Long-term (Q4 2025+)

1. **Marketplace**
   - User-created templates
   - Revenue sharing
   - Quality curation

2. **Integrations**
   - KDP direct publishing
   - IngramSpark connect
   - Scrivener plugin

3. **International**
   - Multi-language support
   - Local payment methods
   - Region-specific templates

---

## 📞 Getting Help

**When working on this project:**

**Technical questions:**
- Check docs/ folder first
- Review relevant service code in backend/src/services/
- Check GitHub issues for similar problems

**Business questions:**
- Review docs/planning/ for strategy
- See this LLM_CONTEXT_DOCUMENT for overview
- Check PROJECT_OVERVIEW.md for details

**Design questions:**
- Follow established patterns in website/src/components/
- Use Shadcn/ui components
- Stick to brand colors defined above

---

## 🎯 Success Criteria for LLM Assistance

**You're doing great if:**
- ✅ Code follows existing patterns
- ✅ Changes are well-documented
- ✅ Features solve real user problems
- ✅ Performance is considered
- ✅ Errors are handled gracefully
- ✅ Tests are included
- ✅ User experience is smooth

**Red flags:**
- ❌ Breaking existing features
- ❌ Exposing API keys
- ❌ Slow performance (>30s)
- ❌ Poor error messages
- ❌ Inconsistent design
- ❌ No input validation
- ❌ Security vulnerabilities

---

## 🔥 The Vision

**Remember why this matters:**

We're not just building software—we're democratizing professional book production. 

Every author who uses PhoenixForge instead of expensive services or giving up entirely is a win. Every book that looks professional because of our tools is a success story.

We're making the self-publishing industry more accessible, more affordable, and more professional.

**Where Stories Take Shape.** 🔥

---

*This document should be updated as the project evolves. Current version reflects Q4 2024 state.*

*Last Updated: November 3, 2025*  
*Maintained by: PhoenixForge AI Team*
