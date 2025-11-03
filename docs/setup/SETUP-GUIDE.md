# 🚀 PhoenixForge AI - Complete Setup Guide

This guide will walk you through setting up your complete SaaS platform from scratch. Follow each step carefully.

---

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] GitHub account (for code hosting)
- [ ] Credit card (for third-party services - many have free tiers)
- [ ] Cloudflare account (you already have this!)
- [ ] ~2-3 hours for initial setup

---

## 🎯 Phase 1: Third-Party Service Setup (45 minutes)

### 1. Clerk Authentication (15 minutes)

**What it does:** Handles user login, signup, and authentication

1. Go to https://clerk.com
2. Click "Start Building for Free"
3. Create a new application:
   - Name: "PhoenixForge AI"
   - Enable: Email/Password + Google OAuth (recommended)
4. **Copy these values** (you'll need them later):
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
5. Configure allowed redirect URLs:
   - Development: `http://localhost:3000`
   - Production: (add after deploying frontend)

**Free Tier:** 10,000 monthly active users

---

### 2. Stripe Payment Processing (15 minutes)

**What it does:** Handles subscription payments and billing

1. Go to https://stripe.com
2. Create account
3. Complete business verification (can skip for now, use test mode)
4. **Get API Keys:**
   - Go to Developers → API Keys
   - Copy "Secret key" (starts with `sk_test_`)
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

5. **Create Products:**
   - Go to Products → Add Product
   - Create 3 products:

   **Product 1: Author Plan**
   - Name: Author
   - Price: $29/month (recurring)
   - After saving, copy the Price ID: `price_...`

   **Product 2: Publisher Plan**
   - Name: Publisher
   - Price: $99/month (recurring)
   - Copy Price ID: `price_...`

   **Product 3: Enterprise Plan**
   - Name: Enterprise
   - Price: $299/month (recurring)
   - Copy Price ID: `price_...`

6. **Save these Price IDs:**
   ```
   STRIPE_PRICE_AUTHOR=price_...
   STRIPE_PRICE_PUBLISHER=price_...
   STRIPE_PRICE_ENTERPRISE=price_...
   ```

**Free Until You Earn:** No fees until you make money

---

### 3. OpenAI API (5 minutes)

**What it does:** Powers all AI features (cover generation, formatting, etc.)

1. Go to https://platform.openai.com
2. Sign up/Sign in
3. Go to API Keys
4. Create new secret key
5. **Copy the key** (shows only once!):
   ```
   OPENAI_API_KEY=sk-...
   ```

**Pricing:** Pay as you go (~$0.04 per AI generation)
**Budget Tip:** Set usage limits in OpenAI dashboard ($10/month is good to start)

---

### 4. PostgreSQL Database (10 minutes)

**Option A: Railway (Recommended - Easiest)**

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Provision PostgreSQL"
4. Click on the PostgreSQL service
5. Go to "Variables" tab
6. **Copy DATABASE_URL:**
   ```
   DATABASE_URL=postgresql://...
   ```

**Free Tier:** $5 credit/month (enough for 500MB database)

**Option B: Supabase (Alternative)**

1. Go to https://supabase.com
2. Create new project
3. Wait for database to provision (~2 min)
4. Go to Project Settings → Database
5. Copy "Connection string" (use Transaction mode)
6. Replace `[YOUR-PASSWORD]` with your password

**Free Tier:** 500MB database, unlimited API requests

---

## 🔧 Phase 2: Code Configuration (30 minutes)

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install stripe@^14.10.0 @clerk/clerk-sdk-node@^4.13.14 pg@^8.11.3
```

**Frontend:**
```bash
cd .. # back to root
npm install @clerk/clerk-react@^4.30.0
```

---

### 2. Setup Environment Variables

**Backend (.env file in `/server` directory):**

```bash
cd server
cp .env.template .env
nano .env  # or use any text editor
```

Fill in all the values you copied from services above:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# Database (from Railway or Supabase)
DATABASE_URL=postgresql://...

# Clerk (from Clerk dashboard)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe (from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_AUTHOR=price_...
STRIPE_PRICE_PUBLISHER=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# OpenAI
OPENAI_API_KEY=sk-...
```

**Frontend (.env file in root directory):**

```bash
cd ..  # back to root
cp .env.template .env
nano .env
```

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...
```

---

### 3. Initialize Database

**Run the SQL schema:**

```bash
cd server

# If using Railway:
# 1. Go to Railway dashboard
# 2. Click on PostgreSQL service
# 3. Click "Query" tab
# 4. Copy contents of src/database/schema.sql
# 5. Paste and execute

# If using Supabase:
# 1. Go to Supabase dashboard
# 2. Click "SQL Editor"
# 3. Copy contents of src/database/schema.sql
# 4. Paste and execute
```

---

### 4. Wrap Frontend with Clerk Provider

Update `/src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import './index.css';
import App from './App';

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
```

---

## 🧪 Phase 3: Test Locally (15 minutes)

### 1. Start Backend Server

```bash
cd server
npm run dev
```

Should see:
```
🔥 PhoenixForge AI API Server
🚀 Server running on port 5000
```

### 2. Start Frontend

```bash
# In a new terminal
cd ..  # root directory
npm start
```

Should open browser to `http://localhost:3000`

### 3. Test the Flow

1. **Visit Pricing Page:** `http://localhost:3000/pricing`
2. **Click "Start Free Trial" on Author plan**
3. **Sign up with Clerk** (create test account)
4. **You'll be redirected to Stripe Checkout**
5. **Use Stripe Test Card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
6. **Complete checkout**
7. **Visit Dashboard:** `http://localhost:3000/dashboard`
8. **Should see your subscription and usage limits!**

---

## 🚀 Phase 4: Deploy to Production (45 minutes)

### 1. Deploy Backend to Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your repository
5. Railway will auto-detect Node.js
6. **Add Environment Variables:**
   - Click on your service
   - Go to "Variables" tab
   - Add ALL variables from your `server/.env` file
   - **IMPORTANT:** Change these for production:
     ```
     NODE_ENV=production
     CORS_ORIGIN=https://your-cloudflare-pages-url.pages.dev
     FRONTEND_URL=https://your-cloudflare-pages-url.pages.dev
     ```
7. **Update Root Directory:**
   - Settings → Root Directory: `/server`
   - Start Command: `npm run dev`
8. Deploy!
9. **Copy your Railway URL:** `https://your-app.railway.app`

---

### 2. Deploy Frontend to Cloudflare Pages

1. Go to https://dash.cloudflare.com
2. Click "Workers & Pages" → "Create application" → "Pages"
3. Connect to Git (GitHub)
4. Select your repository
5. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `build`
6. **Environment Variables:**
   - Add `REACT_APP_API_URL` = `https://your-railway-url.railway.app`
   - Add `REACT_APP_CLERK_PUBLISHABLE_KEY` = `pk_live_...` (get from Clerk)
7. Click "Save and Deploy"
8. Wait 2-3 minutes for build
9. **Copy your Cloudflare Pages URL**

---

### 3. Update Configuration for Production

**A. Update Clerk Allowed URLs:**
1. Go to Clerk dashboard
2. Click your app → "Paths"
3. Add your Cloudflare Pages URL to allowed redirects

**B. Update Stripe Webhook (for production payments):**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://your-railway-url.railway.app/api/subscription/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. **Copy Webhook Secret:** `whsec_YOUR_SECRET_HERE`
6. Add to Railway environment variables:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
   ```

**C. Update Railway CORS:**
Update in Railway variables:
```
CORS_ORIGIN=https://your-cloudflare-pages-url.pages.dev
FRONTEND_URL=https://your-cloudflare-pages-url.pages.dev
```

**D. Test Production:**
1. Visit your Cloudflare Pages URL
2. Go to `/pricing`
3. Try subscribing with test card
4. Check dashboard

---

## 💰 Phase 5: Go Live & Make Money (15 minutes)

### 1. Switch Stripe to Live Mode

1. Complete Stripe verification (if not done)
2. Go to Stripe Dashboard
3. Toggle from "Test mode" to "Live mode" (top right)
4. **Get new live API keys:**
   - Developers → API Keys
   - Copy new `sk_live_...` key
5. **Update Railway variable:**
   ```
   STRIPE_SECRET_KEY=sk_live_...
   ```
6. **Create live mode webhook** (same steps as before, but in live mode)
7. **Note:** Your Price IDs will change in live mode - create products again

### 2. Switch Clerk to Production

1. Clerk dashboard → API Keys
2. Switch to "Production" keys
3. Update Railway:
   ```
   CLERK_SECRET_KEY=sk_live_...
   ```
4. Update Cloudflare Pages:
   ```
   REACT_APP_CLERK_PUBLISHABLE_KEY=pk_live_...
   ```

### 3. Set Up Custom Domain (Optional)

**Use your Rohimaya domain:**
1. Cloudflare Pages → Custom domains
2. Add your domain (e.g., `app.rohimayapublishing.com`)
3. Cloudflare will auto-configure DNS
4. Update all redirect URLs in Clerk, Stripe, and environment variables

---

## ✅ Final Checklist

Before going live, verify:

- [ ] All environment variables set in Railway
- [ ] All environment variables set in Cloudflare Pages
- [ ] Database initialized with schema
- [ ] Stripe in live mode with live keys
- [ ] Stripe webhook configured for production
- [ ] Clerk in production mode
- [ ] Test signup flow works
- [ ] Test subscription flow works
- [ ] Test all 4 AI apps work
- [ ] Dashboard shows usage correctly
- [ ] Can access customer portal
- [ ] Test card actually charges (use your own card!)

---

## 💸 Monthly Costs Breakdown

**Starting Out (First Month):**
- Clerk: **FREE** (up to 10K users)
- Stripe: **FREE** (2.9% + $0.30 per transaction)
- Railway: **$5** (includes database + backend)
- Cloudflare Pages: **FREE**
- Cloudflare R2: **~$1** (file storage)
- OpenAI: **Variable** (~$10-50 depending on usage)

**Total: ~$15-55/month**

**Break-even: 1-2 Author subscribers**

---

## 🆘 Troubleshooting

### "Database connection failed"
- Check DATABASE_URL is correct in Railway
- Verify database is running in Railway/Supabase dashboard

### "Clerk authentication error"
- Verify CLERK_PUBLISHABLE_KEY matches in frontend and backend
- Check allowed redirect URLs in Clerk dashboard

### "Stripe checkout not working"
- Verify Price IDs are correct
- Check Stripe is in correct mode (test vs live)
- Verify FRONTEND_URL is set correctly for redirects

### "CORS error"
- Update CORS_ORIGIN in Railway to match your Cloudflare Pages URL
- Redeploy backend after changing

---

## 🎉 You're Done!

Your complete SaaS platform is now live and ready to make money!

**Next Steps:**
1. Share on LinkedIn
2. Post on ProductHunt
3. Share in author communities
4. Set up email marketing (ConvertKit)
5. Enable affiliate program (Rewardful)

**Need help?** Contact me or check the documentation.

---

**Built with ❤️ using PhoenixForge AI**
