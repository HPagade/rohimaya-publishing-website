# PhoenixForge Deployment Guide
## Production-Ready Next.js 14 Application

This guide will walk you through deploying your PhoenixForge publishing platform to production using free and budget-friendly services.

**Estimated Monthly Cost: $5-20** (vs $100-200 with traditional microservices)

---

## 📋 Prerequisites

Before deploying, ensure you have accounts for:
- [Vercel](https://vercel.com) (Hosting - FREE)
- [Supabase](https://supabase.com) (Database, Auth, Storage - FREE)
- [Stripe](https://stripe.com) (Payments - No monthly fee)
- [OpenAI](https://platform.openai.com) (AI Processing - Pay-as-you-go)

---

## 🗂️ Architecture Overview

```
PhoenixForge
├── Next.js 14 (App Router)    → Frontend + Backend in ONE codebase
├── Supabase                    → Database + Auth + Storage
├── Vercel                      → Hosting + Edge Functions
├── Stripe                      → Subscription payments
└── OpenAI                      → AI text analysis
```

**Tech Stack:**
- **Framework**: Next.js 14 with App Router, Server Components
- **Database**: PostgreSQL via Supabase (with Row Level Security)
- **Authentication**: Supabase Auth (Email + OAuth)
- **Payments**: Stripe Checkout + Webhooks
- **AI**: OpenAI GPT-4 for text analysis
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Edge Network, Serverless Functions)

---

## 🚀 Deployment Steps

### Step 1: Set Up Supabase (Database + Auth)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and region (closest to your users)
   - Set database password (save this!)

2. **Run Database Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents from `database-schema.sql`
   - Execute the SQL to create tables

3. **Enable Authentication Providers**
   - Go to Authentication → Providers
   - Enable Email provider
   - Enable Google OAuth (optional):
     - Get credentials from [Google Cloud Console](https://console.cloud.google.com)
     - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

4. **Configure Row Level Security (RLS)**
   - RLS policies are already in the schema
   - Verify they're enabled in Authentication → Policies

5. **Get API Keys**
   - Go to Settings → API
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

---

### Step 2: Set Up Stripe (Payments)

1. **Create Stripe Account**
   - Sign up at [stripe.com](https://stripe.com)
   - Complete business verification (can test without this)

2. **Create Products & Prices**
   - Go to Products → Add Product
   - Create 2 products:

   **Product 1: Creator Plan**
   - Name: Creator
   - Monthly Price: $29/month
   - Copy Price ID → `STRIPE_PRICE_CREATOR_MONTHLY`
   - Create yearly price: $278/year (20% discount)
   - Copy Price ID → `STRIPE_PRICE_CREATOR_YEARLY`

   **Product 2: Professional Plan**
   - Name: Professional
   - Monthly Price: $79/month
   - Copy Price ID → `STRIPE_PRICE_PROFESSIONAL_MONTHLY`
   - Create yearly price: $758/year (20% discount)
   - Copy Price ID → `STRIPE_PRICE_PROFESSIONAL_YEARLY`

3. **Get API Keys**
   - Go to Developers → API Keys
   - Copy:
     - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - Secret key → `STRIPE_SECRET_KEY`

4. **Set Up Webhook** (After deploying to Vercel)
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-app.vercel.app/api/stripe/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`

---

### Step 3: Set Up OpenAI (AI Processing)

1. **Create OpenAI Account**
   - Sign up at [platform.openai.com](https://platform.openai.com)
   - Add payment method (required for API access)

2. **Get API Key**
   - Go to API Keys
   - Create new secret key
   - Copy → `OPENAI_API_KEY`

3. **Set Usage Limits (Optional)**
   - Go to Settings → Limits
   - Set monthly budget limit (e.g., $50) to avoid surprises

---

### Step 4: Deploy to Vercel

1. **Install Vercel CLI** (Optional - can also deploy via GitHub)
   ```bash
   npm install -g vercel
   ```

2. **Option A: Deploy via GitHub (Recommended)**

   a. **Push code to GitHub:**
   ```bash
   cd /path/to/rohimaya-publishing-website
   git add .
   git commit -m "Production-ready PhoenixForge platform"
   git push origin claude/review-implementation-011CUjdmzNcCcCKKFpcdpnsv
   ```

   b. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select `nextjs-app` as root directory
   - Configure environment variables (see Step 5)
   - Click "Deploy"

3. **Option B: Deploy via CLI**
   ```bash
   cd nextjs-app
   vercel --prod
   ```

---

### Step 5: Configure Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables, add:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=sk-your-key

# Stripe
STRIPE_SECRET_KEY=sk_live_your-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret

# Stripe Price IDs
STRIPE_PRICE_CREATOR_MONTHLY=price_xxxxx
STRIPE_PRICE_CREATOR_YEARLY=price_xxxxx
STRIPE_PRICE_PROFESSIONAL_MONTHLY=price_xxxxx
STRIPE_PRICE_PROFESSIONAL_YEARLY=price_xxxxx

# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NODE_ENV=production
```

**Important:** Use Production values for live deployment, Test values for staging.

---

### Step 6: Finalize Stripe Webhook

1. Get your deployed Vercel URL (e.g., `https://phoenixforge.vercel.app`)
2. Go back to Stripe → Webhooks
3. Update webhook endpoint to: `https://your-app.vercel.app/api/stripe/webhook`
4. Copy new webhook secret and update `STRIPE_WEBHOOK_SECRET` in Vercel

---

### Step 7: Test the Application

1. **Test Authentication**
   - Visit `https://your-app.vercel.app/signup`
   - Create account
   - Verify email confirmation works
   - Test login at `/login`
   - Test Google OAuth (if enabled)

2. **Test Free Tier**
   - Go to `/formatter`
   - Upload a text file
   - Verify analysis works
   - Try to export (should work within limits)

3. **Test Subscription**
   - Go to `/pricing`
   - Click "Start Creating" (Creator plan)
   - Complete Stripe Checkout (use test card: 4242 4242 4242 4242)
   - Verify redirect to dashboard
   - Check Supabase `subscriptions` table for entry

4. **Test Webhook**
   - After subscribing, check Stripe Dashboard → Webhooks
   - Verify events are being received
   - Check Supabase `subscriptions` table for updates

5. **Test Export**
   - Go to `/formatter`
   - Upload manuscript
   - Analyze
   - Download PDF/EPUB
   - Verify format is correct

---

## 🔧 Local Development Setup

To run locally before deploying:

1. **Clone & Install**
   ```bash
   cd nextjs-app
   npm install
   ```

2. **Create `.env.local`**
   ```bash
   cp .env.example .env.local
   ```
   Fill in with your development credentials

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build & Test Production**
   ```bash
   npm run build
   npm start
   ```

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Built-in)
- Go to your project → Analytics
- Track page views, performance, user engagement
- **Cost:** FREE for hobby projects

### Supabase Monitoring
- Database performance
- API usage
- Auth events
- Storage usage

### Stripe Dashboard
- Revenue tracking
- Subscription metrics
- Failed payments
- Customer lifetime value

---

## 💰 Cost Breakdown

### Free Tier (Up to 1,000 users/month)
- **Vercel**: FREE (100GB bandwidth, unlimited requests)
- **Supabase**: FREE (500MB database, 50,000 monthly active users)
- **Stripe**: $0/month (2.9% + 30¢ per transaction)
- **OpenAI**: ~$5-10/month (GPT-4 usage)
- **Total**: ~$5-10/month

### Scaling (10,000+ users/month)
- **Vercel**: Still FREE (Pro plan at $20/month optional for advanced features)
- **Supabase**: $25/month (Pro plan for 8GB database)
- **Stripe**: Still $0/month (same transaction fees)
- **OpenAI**: ~$50-100/month (higher usage)
- **Total**: ~$75-145/month

Compare to traditional microservices: $200-500/month 🎯

---

## 🔒 Security Best Practices

### 1. Environment Variables
- ✅ NEVER commit `.env` files
- ✅ Use Vercel environment variables for production
- ✅ Rotate keys every 90 days

### 2. Database Security
- ✅ Row Level Security (RLS) enabled
- ✅ Service role key only in webhook handler
- ✅ Anon key for client-side operations

### 3. API Security
- ✅ Webhook signature verification
- ✅ Authentication required for all protected routes
- ✅ Rate limiting (via Vercel Edge Config - optional)

### 4. Payment Security
- ✅ Never store credit card data (Stripe handles this)
- ✅ Webhook signature verification
- ✅ Server-side subscription validation

---

## 📈 Scaling Strategies

### Phase 1: 0-1,000 Users (Current)
- ✅ Vercel Free Tier
- ✅ Supabase Free Tier
- ✅ OpenAI pay-as-you-go
- **Cost:** $5-20/month

### Phase 2: 1,000-10,000 Users
- Upgrade to Supabase Pro ($25/month)
- Consider caching with Vercel Edge Config
- Optimize OpenAI usage (cache common analyses)
- **Cost:** $50-100/month

### Phase 3: 10,000+ Users
- Vercel Pro ($20/month)
- Supabase Pro with connection pooling
- Implement Redis caching
- Consider batch processing for AI
- **Cost:** $100-200/month

---

## 🐛 Troubleshooting

### Issue: Supabase Auth Not Working
**Solution:**
- Check Site URL in Supabase → Authentication → URL Configuration
- Should match your Vercel domain: `https://your-app.vercel.app`
- Add redirect URLs for OAuth

### Issue: Stripe Webhook Failing
**Solution:**
- Verify webhook secret is correct
- Check Stripe → Webhooks → Events for errors
- Ensure `/api/stripe/webhook` route is accessible
- Test with Stripe CLI: `stripe listen --forward-to localhost:3000/api/stripe/webhook`

### Issue: OpenAI Rate Limits
**Solution:**
- Implement exponential backoff
- Cache analysis results
- Consider using GPT-3.5-turbo for non-critical tasks
- Set usage limits in OpenAI dashboard

### Issue: "Module not found" Errors
**Solution:**
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` paths are correct
- Verify import statements use correct aliases (`@/`)

### Issue: Build Failing on Vercel
**Solution:**
- Check build logs for specific errors
- Ensure all environment variables are set
- Verify `package.json` has correct dependencies
- Test build locally: `npm run build`

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Integration Guide](https://stripe.com/docs/payments/checkout)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)

---

## 🎯 Next Steps After Deployment

### Immediate (Week 1)
1. ✅ Test all user flows end-to-end
2. ✅ Set up custom domain (optional)
3. ✅ Configure email templates in Supabase
4. ✅ Add Google Analytics (optional)

### Short-term (Week 2-4)
1. Implement Phase 2 products (Covers, Images)
2. Add usage analytics dashboard
3. Implement email notifications
4. Create admin panel for user management

### Long-term (Month 2+)
1. Implement Phase 3 products (Cookbook, Health, Marketing)
2. Add API access for Professional tier
3. Implement referral program
4. Add white-label options for enterprise

---

## 📞 Support

- **Documentation Issues:** Check this guide first
- **Technical Errors:** Review troubleshooting section
- **Vercel Support:** [vercel.com/support](https://vercel.com/support)
- **Supabase Support:** [supabase.com/support](https://supabase.com/support)
- **Stripe Support:** [support.stripe.com](https://support.stripe.com)

---

## ✅ Deployment Checklist

Before going live, verify:

- [ ] Supabase project created with correct region
- [ ] Database schema migrated successfully
- [ ] Authentication providers enabled (Email + Google)
- [ ] Stripe products and prices created
- [ ] OpenAI API key obtained and funded
- [ ] All environment variables set in Vercel
- [ ] Application deployed to Vercel
- [ ] Stripe webhook configured and tested
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Authentication flow tested (signup, login, logout)
- [ ] Free tier tested (3 formats limit)
- [ ] Paid subscription tested (Stripe Checkout)
- [ ] Export functionality tested (PDF/EPUB download)
- [ ] Dashboard displays correct usage stats
- [ ] Webhook events appear in Stripe dashboard
- [ ] Monitoring set up (Vercel Analytics, Supabase logs)

---

**🎉 Congratulations!** Your PhoenixForge platform is now live and ready to serve customers!

**Monthly Operating Cost:** $5-20 (vs $100-200+ with traditional architecture)

**Time to Deploy:** ~2 hours (vs days with microservices)

**Scalability:** Handles 10,000+ users without infrastructure changes

This is a **production-ready, budget-friendly, scalable** SaaS platform built with modern best practices. 🚀
