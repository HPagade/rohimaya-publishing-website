# 🛠️ PRASAD'S CTO TASK LIST
## Rohimaya Publishing / PhoenixForge AI

**Your Role:** CTO & Co-Founder - Technical Architecture, Development, Infrastructure
**Timeline:** Week 1 Launch → Month 1 Stability → Year 1 Scale
**Goal:** Build fast, deploy faster, scale smart! ⚡

---

## 🚀 WEEK 1: DEPLOY TO PRODUCTION (Days 1-7)

### Day 1: Infrastructure Setup ⚡ CRITICAL
**Time: 4-6 hours**

#### Environment Setup (Morning)
- [ ] **Cloudflare Pages Setup**
  - Log into Cloudflare account (Himani will give you access)
  - Connect GitHub repository
  - Set build command: `npm run build`
  - Set output directory: `.next` or `build`
  - Add custom domain: phoenixforge.ai

- [ ] **Vercel Setup (Alternative/Backup)**
  - Create Vercel account (vercel.com)
  - Import GitHub repository
  - Configure environment variables (see list below)
  - Deploy with one click!

- [ ] **Environment Variables Checklist**
  ```bash
  # Database
  DATABASE_URL=postgresql://...
  SUPABASE_URL=https://...
  SUPABASE_ANON_KEY=...
  SUPABASE_SERVICE_KEY=...

  # Authentication
  NEXTAUTH_SECRET=... (generate: `openssl rand -base64 32`)
  NEXTAUTH_URL=https://phoenixforge.ai

  # AI APIs
  OPENAI_API_KEY=sk-...
  ANTHROPIC_API_KEY=sk-ant-...
  INWORLD_API_KEY=... (for audiobooks)

  # Payments
  STRIPE_SECRET_KEY=sk_live_...
  STRIPE_PUBLISHABLE_KEY=pk_live_...
  STRIPE_WEBHOOK_SECRET=whsec_...

  # Email (Optional - use Supabase for now)
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=...
  SMTP_PASSWORD=...
  ```

#### Afternoon: Database & Auth
- [ ] **Supabase Database Setup**
  ```sql
  -- Run this in Supabase SQL Editor
  -- Tables already defined in database-schema.sql!
  -- Just need to enable Row Level Security (RLS)

  -- Enable RLS on all tables
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE generations ENABLE ROW LEVEL SECURITY;

  -- RLS Policies (users can only see their own data)
  CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

  CREATE POLICY "Users can view own subs" ON subscriptions
    FOR SELECT USING (auth.uid() = user_id);

  CREATE POLICY "Users can view own generations" ON generations
    FOR SELECT USING (auth.uid() = user_id);
  ```

- [ ] **Authentication Configuration**
  - Enable Email provider in Supabase Auth settings
  - Enable Google OAuth (get credentials from Google Cloud Console)
  - Configure redirect URLs
  - Test signup/login flow

---

### Day 2: Core API Development 💻
**Time: 6-8 hours**

#### Formatter API (Priority 1)
- [ ] **Manuscript Analysis Endpoint**
  ```typescript
  // File: /app/api/format/analyze/route.ts
  // Already exists! Just need to test and optimize

  // Test with curl:
  curl -X POST https://phoenixforge.ai/api/format/analyze \
    -H "Content-Type: application/json" \
    -d '{"text": "Chapter 1...", "genre": "fantasy"}'
  ```

- [ ] **Export Endpoint (PDF/EPUB)**
  ```typescript
  // File: /app/api/format/export/route.ts
  // Implement using pdf-lib for PDF, epub-gen for EPUB
  ```

#### Covers API (Priority 2)
- [ ] **DALL-E Integration**
  ```typescript
  // File: /app/api/covers/generate/route.ts

  import OpenAI from 'openai';

  export async function POST(request: Request) {
    const { prompt, style, genre } = await request.json();

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Professional book cover for ${genre}: ${prompt}. ${style} style.`,
      n: 1,
      size: "1024x1792", // Book cover aspect ratio
      quality: "hd"
    });

    return Response.json({ image_url: response.data[0].url });
  }
  ```

#### Images API (Priority 3)
- [ ] **Multi-Model Image Generation**
  ```typescript
  // File: /app/api/images/generate/route.ts
  // Support DALL-E 3 (quality) + Stable Diffusion (cost)
  ```

---

### Day 3: Payment Integration 💳
**Time: 4-6 hours**

#### Stripe Setup
- [ ] **Create Products in Stripe Dashboard**
  ```
  SPARK Tier:
  - Price: $29/month
  - Features: 3 formats, 5 covers, 20 images

  BLAZE Tier:
  - Price: $49/month
  - Features: 10 formats, UNLIMITED covers, 100 images

  INFERNO Tier:
  - Price: $99/month
  - Features: UNLIMITED everything + API access
  ```

- [ ] **Checkout Session API**
  ```typescript
  // File: /app/api/stripe/create-checkout/route.ts
  import Stripe from 'stripe';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  export async function POST(request: Request) {
    const { priceId, userId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      client_reference_id: userId,
    });

    return Response.json({ sessionId: session.id });
  }
  ```

- [ ] **Webhook Handler**
  ```typescript
  // File: /app/api/stripe/webhook/route.ts
  // Handle: checkout.session.completed, customer.subscription.updated, etc.
  // Update database subscription status
  ```

- [ ] **Test with Stripe CLI**
  ```bash
  # Install Stripe CLI
  brew install stripe/stripe-cli/stripe

  # Login
  stripe login

  # Forward webhooks to local
  stripe listen --forward-to localhost:3000/api/stripe/webhook

  # Test a payment
  stripe trigger checkout.session.completed
  ```

---

### Day 4: Audiobook Integration 🎙️
**Time: 6-8 hours**

#### Python Engine Integration
- [ ] **Deploy audiobook-producer to Cloud Function**
  ```bash
  # Option 1: Cloudflare Workers (Recommended - Free tier!)
  cd audiobook-producer
  wrangler init
  wrangler publish

  # Option 2: Railway (Easiest - $5/month)
  railway login
  railway init
  railway up

  # Option 3: Google Cloud Functions
  gcloud functions deploy audiobook-generator \
    --runtime python310 \
    --trigger-http \
    --entry-point generate_audiobook
  ```

- [ ] **Next.js API Proxy**
  ```typescript
  // File: /app/api/voice/generate/route.ts

  export async function POST(request: Request) {
    const { text, voice } = await request.json();

    // Call Python audiobook-producer
    const response = await fetch(process.env.AUDIOBOOK_API_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice })
    });

    const audioUrl = await response.json();
    return Response.json({ audio_url: audioUrl });
  }
  ```

- [ ] **Job Queue for Long Audio**
  ```typescript
  // Use Upstash Redis + BullMQ
  // For books > 50k words, process in background
  ```

---

### Day 5: n8n Automation Workflows 🤖
**Time: 4-6 hours**

#### Setup n8n Cloud
- [ ] **Create n8n account** (n8n.io)
- [ ] **Get webhook URL**
- [ ] **Import existing workflows** from `/audiobook-website/`

#### Key Workflows to Build

**Workflow 1: New User Onboarding**
```
Trigger: Supabase new user webhook
→ Send welcome email
→ Add to ConvertKit email list
→ Create user record in database
→ Send Slack notification
```

**Workflow 2: Stripe Payment Success**
```
Trigger: Stripe webhook (checkout.session.completed)
→ Update user subscription in database
→ Send confirmation email
→ Grant access to features
→ Send thank you + onboarding email series
```

**Workflow 3: Audiobook Generation**
```
Trigger: HTTP webhook from Next.js
→ Call Python audiobook-producer API
→ Upload to AWS S3
→ Update generation status in database
→ Send email when complete
```

**Workflow 4: Lead Magnet Delivery**
```
Trigger: Form submission (email signup)
→ Send PDF guide
→ Add to email sequence
→ Tag as "cold lead"
```

**Workflow 5: Customer Support**
```
Trigger: Support ticket submission
→ Create Notion task
→ Send auto-reply
→ Notify team in Slack
→ Track response time
```

- [ ] **Test each workflow thoroughly**
- [ ] **Document webhook URLs for Himani**

---

### Day 6: Mobile App Preparation 📱
**Time: 4-6 hours**

#### React Native Setup
- [ ] **Initialize Expo project**
  ```bash
  cd mobile-apps
  npm install
  npx expo start
  ```

- [ ] **Update app.json with branding**
  ```json
  {
    "expo": {
      "name": "PhoenixForge AI",
      "slug": "phoenixforge",
      "icon": "./assets/icon.png",
      "splash": {
        "image": "./assets/splash.png",
        "backgroundColor": "#FF6B35"
      }
    }
  }
  ```

- [ ] **API Integration**
  ```typescript
  // File: /src/services/api.ts
  const API_URL = 'https://phoenixforge.ai/api';

  export const formatManuscript = async (text: string) => {
    const response = await fetch(`${API_URL}/format/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return response.json();
  };
  ```

- [ ] **Build for testing**
  ```bash
  # iOS (Mac only)
  npm run ios

  # Android
  npm run android

  # Web preview
  npm run web
  ```

#### App Store Prep (Don't submit yet!)
- [ ] Create Apple Developer account ($99/year)
- [ ] Create Google Play Developer account ($25 one-time)
- [ ] Prepare screenshots (use simulator)
- [ ] Write app descriptions
- [ ] Get privacy policy ready

---

### Day 7: Testing & Launch Prep ✅
**Time: 6-8 hours**

#### Comprehensive Testing
- [ ] **Functionality Tests**
  - [ ] Sign up new account
  - [ ] Log in / log out
  - [ ] Create formatted document
  - [ ] Generate book cover
  - [ ] Generate images
  - [ ] Subscribe to plan
  - [ ] Cancel subscription
  - [ ] Download exports

- [ ] **Load Testing**
  ```bash
  # Use k6 for load testing
  npm install -g k6

  # Test with 100 virtual users
  k6 run --vus 100 --duration 30s load-test.js
  ```

- [ ] **Security Checks**
  - [ ] HTTPS everywhere
  - [ ] Environment variables not exposed
  - [ ] API rate limiting enabled
  - [ ] SQL injection prevented (use Supabase queries)
  - [ ] XSS protection (Next.js handles this)

- [ ] **Performance Optimization**
  - [ ] Enable Next.js caching
  - [ ] Add Cloudflare CDN
  - [ ] Optimize images (next/image)
  - [ ] Lazy load components
  - [ ] Code splitting

#### Launch Checklist
- [ ] All environment variables set in production
- [ ] Database migrations run
- [ ] Stripe webhook configured
- [ ] DNS pointing to Cloudflare/Vercel
- [ ] SSL certificate active
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Google Analytics) configured
- [ ] Monitoring (UptimeRobot) set up

---

## 📈 WEEKS 2-4: OPTIMIZATION & FEATURES

### Week 2: Performance & Reliability
**Time: 20-25 hours**

#### Database Optimization
- [ ] **Add Indexes**
  ```sql
  CREATE INDEX idx_users_email ON users(email);
  CREATE INDEX idx_subs_user_id ON subscriptions(user_id);
  CREATE INDEX idx_gens_user_id ON generations(user_id);
  CREATE INDEX idx_gens_created ON generations(created_at DESC);
  ```

- [ ] **Query Optimization**
  - Use database query analyzer
  - Cache frequent queries (Redis)
  - Implement pagination

#### API Rate Limiting
```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
});

export async function middleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response("Too many requests", { status: 429 });
  }
}
```

#### Error Tracking
- [ ] **Set up Sentry**
  ```bash
  npm install @sentry/nextjs
  npx @sentry/wizard@latest -i nextjs
  ```

- [ ] **Custom error pages**
  - 404.tsx
  - 500.tsx
  - error.tsx

### Week 3: Feature Completeness
**Time: 25-30 hours**

#### Dashboard Enhancements
- [ ] **Usage Analytics**
  ```typescript
  // Show user:
  // - Total generations this month
  // - Credits remaining
  // - Most used features
  // - Recent history
  ```

- [ ] **Generation History**
  - List all past generations
  - Download previous exports
  - Regenerate with same settings

#### Video Trailer Creator
- [ ] **Remotion Setup**
  ```bash
  npm install remotion
  ```

- [ ] **API Endpoint**
  ```typescript
  // /app/api/videos/generate/route.ts
  // Use Remotion to render video
  // Or integrate Runway ML API
  ```

#### Blog System
- [ ] **Simple MDX Blog**
  ```typescript
  // /app/blog/[slug]/page.tsx
  // Use next-mdx-remote
  // Store blog posts in /content/blog/
  ```

- [ ] **Admin Panel (Simple)**
  - Create new post form
  - Only accessible to Himani (check user role)

### Week 4: Mobile App Launch
**Time: 20-25 hours**

#### iOS Submission
- [ ] **Build for production**
  ```bash
  npx expo build:ios
  ```

- [ ] **Test on TestFlight**
  - Upload to App Store Connect
  - Add internal testers
  - Fix any crashes

- [ ] **Submit for review**
  - Fill out app information
  - Upload screenshots
  - Submit!

#### Android Submission
- [ ] **Build for production**
  ```bash
  npx expo build:android --type app-bundle
  ```

- [ ] **Internal testing**
  - Upload to Google Play Console
  - Create internal test track
  - Test on multiple devices

- [ ] **Submit for review**
  - Fill out store listing
  - Upload screenshots
  - Publish!

---

## 🛠️ TOOLS & STACK REFERENCE

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Authentication:** NextAuth.js + Supabase Auth
- **Payments:** Stripe
- **File Storage:** AWS S3 or Cloudflare R2

### AI/ML
- **Text:** OpenAI GPT-4, Claude 3
- **Images:** DALL-E 3, Stable Diffusion
- **Voice:** Inworld TTS (from audiobook-producer)
- **Video:** Remotion or Runway ML

### DevOps
- **Hosting:** Cloudflare Pages or Vercel
- **CI/CD:** GitHub Actions
- **Monitoring:** Sentry + UptimeRobot
- **Analytics:** Google Analytics + Mixpanel

### Automation
- **n8n:** Workflow automation
- **Zapier:** Backup automation (if needed)

---

## 📊 YOUR KEY METRICS (Monitor Daily)

### Performance
- [ ] API response time < 500ms
- [ ] Page load time < 2 seconds
- [ ] Time to First Byte (TTFB) < 200ms
- [ ] Lighthouse score > 90

### Reliability
- [ ] Uptime > 99.9%
- [ ] Error rate < 0.1%
- [ ] Failed payments < 2%

### Scale
- [ ] Database size
- [ ] API calls per day
- [ ] Bandwidth usage
- [ ] Storage usage

**Use:** Vercel Analytics, Cloudflare Analytics, Sentry Dashboard

---

## 💰 MONTHLY COST BREAKDOWN

### Free Tier
- Cloudflare Pages: FREE
- Vercel: FREE (Hobby tier)
- Supabase: FREE (up to 500MB)
- GitHub: FREE

### Paid Services
- Domain: $12/year = $1/month
- n8n Cloud: €20/month = $22/month
- Upstash Redis: $10/month (for rate limiting)
- AWS S3: ~$5/month (for file storage)
- Stripe: $0 (pay 2.9% + 30¢ per transaction)

### Variable Costs (Scale with Usage)
- OpenAI API: ~$50-200/month (depends on usage)
- Inworld TTS: ~$50-150/month
- Total: **$100-400/month** initially

### App Store Fees
- Apple Developer: $99/year
- Google Play: $25 one-time

**Total First Month: ~$250**
**Total Monthly After: ~$150-400**

---

## 🚨 WHEN THINGS GO WRONG

### Emergency Procedures

#### Site Down
1. Check Vercel/Cloudflare status page
2. Check DNS settings
3. Check environment variables
4. Roll back to previous deployment
5. Check Sentry for errors

#### API Errors
1. Check Sentry error logs
2. Check API rate limits
3. Check third-party API status (OpenAI, Stripe)
4. Check database connection
5. Check environment variables

#### Payment Issues
1. Check Stripe dashboard
2. Check webhook logs
3. Verify webhook secret
4. Test in Stripe CLI
5. Contact Stripe support

#### Database Issues
1. Check Supabase dashboard
2. Check connection limits
3. Check query performance
4. Add indexes if slow
5. Scale up if needed

---

## 🤝 WORKING WITH HIMANI

### Your Weekly Sync (30 minutes)
- Review metrics (performance, uptime, costs)
- Discuss technical roadmap
- Prioritize features based on customer feedback
- Plan infrastructure scaling

### What You Own
✅ All technical infrastructure
✅ API development
✅ Database management
✅ Security & performance
✅ Mobile app development
✅ DevOps & deployment

### What Himani Owns
✅ Marketing & sales
✅ Customer support
✅ Content creation
✅ Business development

### Together You Own
✅ Product decisions
✅ Feature prioritization
✅ Budget allocation
✅ Hiring decisions

---

## 🎯 YOUR SUCCESS MILESTONES

### Week 1
- [ ] Site live on production
- [ ] All APIs working
- [ ] Payments configured
- [ ] Zero critical bugs

### Month 1
- [ ] 99.9% uptime
- [ ] < 500ms avg response time
- [ ] All features stable
- [ ] Mobile apps in beta

### Month 3
- [ ] Mobile apps in stores
- [ ] 1000+ API calls/day
- [ ] 100+ paying users
- [ ] Full monitoring

### Month 6
- [ ] Auto-scaling configured
- [ ] Public API launched
- [ ] 500+ paying users
- [ ] Team dashboard

---

## 💡 CLAUDE PROMPTS FOR YOU (Save These!)

### Debugging
```
"I'm getting this error: [paste error]. I'm using Next.js 14, Supabase, and Stripe.
What's causing it and how do I fix it? Give me the exact code."
```

### Feature Development
```
"I need to build [feature description] for PhoenixForge AI. We use Next.js 14,
TypeScript, and Supabase. Give me the complete implementation with best practices."
```

### Performance Optimization
```
"My API endpoint [describe endpoint] is slow. Here's the code: [paste code].
How can I optimize it? Consider caching, database queries, and async operations."
```

### Infrastructure
```
"I need to deploy [service/feature] to [platform]. Walk me through the exact steps,
including environment variables, configuration, and testing."
```

---

## 🎓 LEARNING RESOURCES

### Next.js
- [ ] Next.js docs (nextjs.org/docs)
- [ ] Lee Robinson's YouTube channel
- [ ] Next.js Conf talks

### n8n
- [ ] n8n docs (docs.n8n.io)
- [ ] n8n YouTube channel
- [ ] n8n community forum

### Performance
- [ ] Web.dev (web.dev)
- [ ] Chrome DevTools docs
- [ ] Lighthouse CI

### System Design
- [ ] "Designing Data-Intensive Applications" book
- [ ] System Design Primer (GitHub)
- [ ] AWS Architecture Center

---

## 🔥 YOUR MANTRA

**"Build it simple. Ship it fast. Scale it smart."**

Don't over-engineer. Get it working, get it deployed, then optimize.
Your job is to make Himani's vision real - quickly and reliably.

You've got this, Prasad! ⚡

---

## 📞 NEXT STEPS RIGHT NOW

1. **Today:** Set up all accounts (Vercel, Supabase, Stripe)
2. **This week:** Deploy MVP to production
3. **This month:** Zero downtime, all features working
4. **This quarter:** Scale to handle 1000+ users

Let's build something amazing! 🚀

---

**Last Updated:** November 4, 2025
**Created by:** Claude (your AI pair programmer! 🤖)
**Questions?** Feed this back into Claude Chat: "I'm on Day X of my CTO task list.
I'm stuck on [specific issue]. Help me debug/implement this."

---

## 🔧 QUICK REFERENCE COMMANDS

```bash
# Development
npm run dev                    # Start local dev server
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npx supabase init             # Initialize Supabase locally
npx supabase db push          # Push schema changes
npx supabase db reset         # Reset database

# Deployment
vercel --prod                 # Deploy to production
git push origin main          # Trigger CI/CD

# Testing
npm test                      # Run tests
npm run test:e2e              # End-to-end tests
k6 run load-test.js           # Load testing

# Mobile
npm run ios                   # Run on iOS
npm run android               # Run on Android
npx expo build:ios            # Build for App Store
npx expo build:android        # Build for Play Store

# Monitoring
stripe listen --forward-to localhost:3000/api/stripe/webhook
npx sentry-cli               # Sentry CLI
```
