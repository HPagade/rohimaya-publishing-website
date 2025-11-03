# 🚀 Your Complete Setup Guide - PhoenixForge AI

**Welcome!** This is your personal guide to get PhoenixForge AI up and running. Everything you need is right here with direct links and step-by-step instructions.

> **⏱️ Time Required:** 1-2 hours total  
> **💰 Cost:** $0-15/month to start (mostly free tiers)  
> **📋 What You'll Have:** A fully working AI platform for authors

---

## ✅ Quick Checklist

Use this to track your progress:

- [ ] Get Clerk authentication keys
- [ ] Set up Stripe payment processing
- [ ] Get OpenAI API key
- [ ] Set up database (Railway or Supabase)
- [ ] Configure environment variables
- [ ] Test the demo locally
- [ ] (Optional) Deploy to production

---

## 📝 STEP 1: Create Accounts & Get API Keys

### 1.1 Clerk (User Authentication) - 15 minutes

**🔗 Sign up:** [https://clerk.com](https://clerk.com)

**What to do:**
1. Click "Start building for free"
2. Sign up with your email or GitHub
3. Create a new application:
   - Name: `PhoenixForge AI`
   - Select template: `Next.js` or `React`
4. Enable authentication methods:
   - ✅ Email/Password
   - ✅ Google OAuth (recommended)
5. Go to **"API Keys"** in the left sidebar
6. Copy these values (keep them safe!):
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
   CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
   ```

**💡 Why?** Clerk handles all user login, signup, and account management.

**💰 Cost:** FREE for up to 10,000 users/month

---

### 1.2 Stripe (Payment Processing) - 20 minutes

**🔗 Sign up:** [https://stripe.com](https://stripe.com)

**What to do:**

**Part A: Get API Keys**
1. Create your account (business or personal)
2. Make sure you're in **"Test Mode"** (toggle in top right)
3. Go to **Developers → API Keys**
4. Copy this key:
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
   ```

**Part B: Create Your Pricing Plans**
1. Go to **Products** in the left sidebar
2. Click **"+ Add Product"**

**Create 3 Products:**

**📦 Product 1: Author Plan**
- Name: `Author Plan`
- Description: `Perfect for individual authors`
- Pricing: `$29.00` USD
- Billing: `Recurring` → `Monthly`
- Click **Save Product**
- **IMPORTANT:** After saving, click on the price and copy:
  ```
  STRIPE_PRICE_AUTHOR=price_xxxxxxxxxxxx
  ```

**📦 Product 2: Publisher Plan**
- Name: `Publisher Plan`
- Description: `For small publishing houses`
- Pricing: `$99.00` USD
- Billing: `Recurring` → `Monthly`
- Click **Save Product**
- Copy the price ID:
  ```
  STRIPE_PRICE_PUBLISHER=price_xxxxxxxxxxxx
  ```

**📦 Product 3: Enterprise Plan**
- Name: `Enterprise Plan`
- Description: `For large publishing operations`
- Pricing: `$299.00` USD
- Billing: `Recurring` → `Monthly`
- Click **Save Product**
- Copy the price ID:
  ```
  STRIPE_PRICE_ENTERPRISE=price_xxxxxxxxxxxx
  ```

**💡 Why?** Stripe processes all payments and manages subscriptions automatically.

**💰 Cost:** FREE (only pay 2.9% + $0.30 per successful transaction)

---

### 1.3 OpenAI (AI Features) - 10 minutes

**🔗 Sign up:** [https://platform.openai.com](https://platform.openai.com)

**What to do:**
1. Sign in with your account (or create one)
2. Click on your profile icon (top right)
3. Select **"View API keys"** or go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
4. Click **"+ Create new secret key"**
5. Name it: `PhoenixForge AI`
6. **IMPORTANT:** Copy the key immediately (it only shows once!):
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxx
   ```

**Set Spending Limit (IMPORTANT!):**
1. Go to **Settings → Billing → Limits**
2. Set **Monthly budget**: `$20.00` (recommended to start)
3. Enable email alerts at 75% and 100%

**💡 Why?** OpenAI powers all AI features: manuscript formatting, cover generation, audiobook narration, etc.

**💰 Cost:** Pay-as-you-go, ~$10-50/month depending on usage. Start with $20 limit for safety.

---

### 1.4 Database - Choose One Option - 15 minutes

You need a PostgreSQL database. Pick **ONE** option:

#### ⭐ OPTION A: Railway (Recommended - Simplest)

**🔗 Sign up:** [https://railway.app](https://railway.app)

**What to do:**
1. Click "Start a New Project"
2. Sign up with GitHub
3. Click **"New Project"**
4. Select **"Provision PostgreSQL"**
5. Wait ~1 minute for setup
6. Click on the PostgreSQL service
7. Go to **"Variables"** tab
8. Find and copy the **DATABASE_URL**:
   ```
   DATABASE_URL=postgresql://postgres:xxxxxxx@containers-us-west-xx.railway.app:xxxx/railway
   ```

**💰 Cost:** $5/month (includes 1GB database)

#### OPTION B: Supabase (Free Alternative)

**🔗 Sign up:** [https://supabase.com](https://supabase.com)

**What to do:**
1. Click "Start your project"
2. Sign up with GitHub
3. Click **"New Project"**
4. Fill in:
   - Name: `PhoenixForge AI`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest to you
5. Click **"Create new project"**
6. Wait ~2 minutes for setup
7. Go to **Project Settings** → **Database**
8. Scroll to **"Connection string"**
9. Select **"Transaction"** mode
10. Copy the connection string and replace `[YOUR-PASSWORD]` with your password:
    ```
    DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxx.supabase.co:5432/postgres
    ```

**💰 Cost:** FREE up to 500MB database

---

## 🔧 STEP 2: Configure Your Project - 20 minutes

### 2.1 Create Your Environment File

1. Open your project folder in a code editor (VS Code recommended)
2. Find the file `.env.example` in the root folder
3. Make a copy and rename it to `.env`

**OR using terminal:**
```bash
# In your project root folder
cp .env.example .env
```

### 2.2 Fill In Your Environment Variables

Open the `.env` file and add all your keys:

```bash
# ==============================================
# AUTHENTICATION - CLERK
# ==============================================
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# ==============================================
# DATABASE
# ==============================================
DATABASE_URL=postgresql://your-database-url-here

# ==============================================
# AI - OPENAI
# ==============================================
OPENAI_API_KEY=sk-xxxxxxxxxxxx

# ==============================================
# PAYMENTS - STRIPE
# ==============================================
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx

# Stripe Price IDs
STRIPE_PRICE_AUTHOR=price_xxxxxxxxxxxx
STRIPE_PRICE_PUBLISHER=price_xxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE=price_xxxxxxxxxxxx

# Stripe Webhook (for local testing)
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# ==============================================
# APPLICATION
# ==============================================
NODE_ENV=development
PORT=3000
REACT_APP_API_URL=http://localhost:5000

# ==============================================
# OPTIONAL (Can add later)
# ==============================================
# Add these if you want email functionality
# RESEND_API_KEY=re_xxxxxxxxxxxx
# FROM_EMAIL=noreply@yourdomain.com
```

**✅ Save the file!**

---

## 🧪 STEP 3: Test Everything Locally - 15 minutes

### 3.1 Test the Streamlit Demo (Easiest!)

This demo shows all 5 author-focused products without needing full setup:

```bash
# Navigate to the demo folder
cd demos/streamlit

# Install dependencies (first time only)
pip install streamlit openai python-dotenv

# Run the demo
streamlit run main_demo.py
```

**What you'll see:**
- Your browser opens to http://localhost:8501
- Interactive demo with all 5 products:
  - 📄 Manuscript Formatter
  - 🎙️ Audiobook Narrator
  - 🎨 Cover Generator
  - 🖼️ Image Creator
  - 🎬 Book Trailer Creator
  - 📱 Marketing Suite

**Try clicking through all the features!**

---

### 3.2 Test the Website (Full Experience)

```bash
# Go back to root folder
cd ../..

# Navigate to website folder
cd website

# Install dependencies (first time only)
npm install

# Start the website
npm run dev
```

**Open:** http://localhost:3000

**You should see:**
- PhoenixForge AI homepage
- All features working
- User can sign up (via Clerk)
- Full web application

---

### 3.3 Test the Mobile App (Optional)

```bash
# From root folder
cd mobile-apps

# Install dependencies (first time only)
npm install

# Install Expo CLI globally (if not already)
npm install -g expo-cli

# Start the app
npm start
```

**What you'll see:**
- QR code in terminal
- Download "Expo Go" app on your phone (iOS or Android)
- Scan the QR code
- App runs on your phone!

---

## 🗄️ STEP 4: Set Up Your Database Schema - 5 minutes

Your database needs tables for users, books, subscriptions, etc.

```bash
# From root folder
cd backend

# Install the PostgreSQL client
npm install -g pgcli

# Connect to your database (use your DATABASE_URL)
pgcli "postgresql://your-database-url-here"

# Or use the SQL file directly
psql "postgresql://your-database-url-here" < ../database-schema.sql
```

**Alternative:** Most database services (Railway, Supabase) have a SQL editor in their web interface. You can paste the contents of `database-schema.sql` there.

---

## 🚀 STEP 5: Deploy to Production (Optional)

When you're ready to go live:

### Website → Vercel (Easiest)

**🔗 Sign up:** [https://vercel.com](https://vercel.com)

```bash
# Install Vercel CLI
npm install -g vercel

# From your website folder
cd website
vercel

# Follow the prompts
# Add your environment variables in Vercel dashboard
```

**Free:** 100GB bandwidth/month

---

### Backend → Railway

**🔗 Dashboard:** [https://railway.app](https://railway.app)

1. Create new project
2. Connect your GitHub repo
3. Select `backend` folder
4. Add all environment variables
5. Deploy!

**Cost:** ~$5-10/month

---

### Mobile Apps → App Stores

**iOS App Store:**
1. Join Apple Developer Program ($99/year)
2. Follow: `docs/deployment/APP-STORE-DEPLOYMENT.md`

**Google Play Store:**
1. One-time fee: $25
2. Follow: `docs/deployment/APP-STORE-DEPLOYMENT.md`

---

## 📚 Additional Resources

### Documentation Files
- **BEGINNER-CHECKLIST.md** - Alternative beginner guide
- **QUICKSTART.md** - Super quick 10-minute start
- **docs/ACTION-ITEMS.md** - Detailed action items
- **docs/setup/SETUP-GUIDE.md** - Comprehensive setup
- **docs/deployment/** - All deployment guides

### Need Help?
1. Check the `docs/` folder for detailed guides
2. Review `DELIVERY-SUMMARY.md` for what's included
3. Read `README.md` for technical overview

---

## 🎯 Quick Reference - All Links

| Service | Purpose | URL | Cost |
|---------|---------|-----|------|
| Clerk | Authentication | [clerk.com](https://clerk.com) | Free (10K users) |
| Stripe | Payments | [stripe.com](https://stripe.com) | Free + 2.9% per transaction |
| OpenAI | AI Features | [platform.openai.com](https://platform.openai.com) | $10-50/month |
| Railway | Database & Hosting | [railway.app](https://railway.app) | $5-10/month |
| Supabase | Database (Free) | [supabase.com](https://supabase.com) | Free (500MB) |
| Vercel | Website Hosting | [vercel.com](https://vercel.com) | Free |

---

## ✅ Your Checklist Summary

**Phase 1: Accounts (60 min)**
- [ ] Clerk account + keys
- [ ] Stripe account + 3 products
- [ ] OpenAI API key
- [ ] Database (Railway or Supabase)

**Phase 2: Configuration (20 min)**
- [ ] Create `.env` file
- [ ] Add all keys to `.env`
- [ ] Set up database schema

**Phase 3: Testing (15 min)**
- [ ] Run Streamlit demo
- [ ] Test website locally
- [ ] (Optional) Test mobile app

**Phase 4: Deploy (Optional)**
- [ ] Deploy website to Vercel
- [ ] Deploy backend to Railway
- [ ] (Optional) Submit apps to stores

---

## 🎉 You're Done!

Once you complete the steps above, you'll have:
- ✅ A working AI platform for authors
- ✅ User authentication
- ✅ Payment processing
- ✅ All 5 core AI products functional
- ✅ Web, mobile, and demo versions

**Questions?** Check the `docs/` folder for more detailed guides!

---

**Created:** November 3, 2025  
**For:** PhoenixForge AI Platform  
**Version:** 1.0
