# PhoenixForge Platform - User Action Checklist

This checklist outlines what YOU need to complete that cannot be done automatically. Complete these items to make the platform fully operational.

## 🔑 Required API Keys & Environment Variables

### OpenAI API Key (CRITICAL - Required for ALL apps)
- [ ] Sign up at https://platform.openai.com/
- [ ] Generate API key from API Keys section
- [ ] Add to Vercel environment variables: `OPENAI_API_KEY=sk-...`
- [ ] Estimate monthly cost: $50-500 depending on usage
- [ ] Set up billing alerts in OpenAI dashboard
- **Used by:** All 7 products (AI Formatter, Audiobook, Book Covers, Images, Cookbook, Health, Marketing)

### Supabase Configuration (CRITICAL - Required for auth/database)
- [ ] Project already set up at: https://supabase.com
- [ ] Verify these environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Verify database tables exist: `users`, `subscriptions`, `usage`
- [ ] Verify Storage bucket exists: `files`
- [ ] Test authentication flow

### Stripe Configuration (Required for payments)
- [ ] Get API keys from https://dashboard.stripe.com/apikeys
- [ ] Add to Vercel:
  - `STRIPE_SECRET_KEY=sk_test_...` (or sk_live_...)
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...` (or pk_live_...)
  - `STRIPE_WEBHOOK_SECRET=whsec_...`
- [ ] Create 3 subscription products in Stripe:
  - Creator Plan: $29/month
  - Professional Plan: $79/month
  - Enterprise Plan: Custom pricing
- [ ] Set up webhook endpoint: `https://yoursite.com/api/webhooks/stripe`
- [ ] Test payment flow in test mode before going live

## 🚀 Deployment Tasks

### Vercel Deployment
- [ ] Connect GitHub repo to Vercel
- [ ] Configure environment variables (see above)
- [ ] Set Node.js version to 18.x or higher
- [ ] Deploy and verify build succeeds
- [ ] Test all 7 product pages:
  - https://yoursite.com/format
  - https://yoursite.com/audiobook
  - https://yoursite.com/covers
  - https://yoursite.com/images
  - https://yoursite.com/cookbook
  - https://yoursite.com/health
  - https://yoursite.com/marketing
- [ ] Set up custom domain (optional)
- [ ] Configure CORS if needed

### Database Setup
- [ ] Run SQL migrations in Supabase if not already done
- [ ] Verify RLS (Row Level Security) policies are active
- [ ] Test `increment_usage` RPC function exists
- [ ] Create test user account
- [ ] Test subscription assignment

## 💳 Payment & Subscription Setup

### Stripe Configuration
- [ ] Create products and prices in Stripe Dashboard
- [ ] Copy price IDs and update them in code if needed
- [ ] Set up tax collection (if required by jurisdiction)
- [ ] Configure billing portal
- [ ] Test subscription flow end-to-end:
  1. Create account
  2. Subscribe to Creator plan
  3. Verify usage limits apply
  4. Cancel subscription
  5. Verify limits revert to free tier

### Usage Limits Testing
- [ ] Free tier limits work correctly (5 formats, 2 audiobooks, etc.)
- [ ] Creator tier limits work (50 formats, 10 audiobooks, etc.)
- [ ] Professional tier limits work (unlimited/high limits)
- [ ] Usage resets monthly
- [ ] Error messages display when limits reached

## 📱 Mobile App Deployment (Optional - Future Phase)

### iOS App Store
- [ ] Enroll in Apple Developer Program ($99/year)
- [ ] Set up Expo project following COMPLETE-PLATFORM-GUIDE.md
- [ ] Create app icons (1024x1024px)
- [ ] Create screenshots for all iPhone sizes
- [ ] Write App Store description
- [ ] Set up In-App Purchases in App Store Connect
- [ ] Submit for review (7-14 day approval time)

### Google Play Store
- [ ] Pay Google Play registration fee ($25 one-time)
- [ ] Set up Expo project following COMPLETE-PLATFORM-GUIDE.md
- [ ] Create feature graphic (1024x500px)
- [ ] Create screenshots for various Android sizes
- [ ] Write Play Store description
- [ ] Set up In-App Products in Play Console
- [ ] Submit for review (1-7 day approval time)

## 🧪 Testing Checklist

### Test Each Product Individually

#### 1. AI Formatter (/format)
- [ ] Upload a manuscript file (DOCX/PDF/TXT)
- [ ] Select output format (trade paperback, ebook, etc.)
- [ ] Click "Format My Book"
- [ ] Verify formatted PDF downloads
- [ ] Check usage counter increments

#### 2. Audiobook Generator (/audiobook)
- [ ] Paste text or upload file
- [ ] Select voice (alloy, echo, fable, onyx, nova, shimmer)
- [ ] Generate audiobook
- [ ] Verify MP3 downloads
- [ ] Check audio quality (HD)
- [ ] Verify usage counter increments

#### 3. Book Cover Creator (/covers)
- [ ] Fill in title, author, subtitle
- [ ] Upload front cover image
- [ ] Upload back cover image
- [ ] Add back cover text
- [ ] Click "Optimize Copy" to test AI enhancement
- [ ] Generate complete book wrap
- [ ] Verify PDF downloads with front/back/spine
- [ ] Check usage counter increments

#### 4. AI Images Generator (/images)
- [ ] Add multiple image slots
- [ ] Enter descriptions
- [ ] Click "Enhance Prompt" to test AI enhancement
- [ ] Select style (photorealistic, illustration, etc.)
- [ ] Select size (square, portrait, landscape)
- [ ] Generate images
- [ ] Verify images display
- [ ] Download all images
- [ ] Check usage counter increments by number of images

#### 5. Cookbook Formatter (/cookbook)
- [ ] Add a recipe manually
- [ ] Fill in title, servings, times, ingredients, instructions
- [ ] Add dietary tags
- [ ] Test "Parse Recipe" feature with pasted text
- [ ] Add multiple recipes
- [ ] Select layout style
- [ ] Generate cookbook
- [ ] Verify PDF downloads with all recipes
- [ ] Check usage counter increments

#### 6. Health Content Generator (/health)
- [ ] Test Workout Plan generation
  - Select level (beginner/intermediate/advanced)
  - Select type (weight loss, muscle gain, etc.)
  - Generate and verify content
- [ ] Test Meal Plan generation
  - Enter calorie target
  - Select goal
  - Generate and verify content includes recipes
- [ ] Test Health Article generation
  - Enter topic
  - Generate and verify SEO-optimized article
- [ ] Check usage counter increments

#### 7. Marketing Suite (/marketing)
- [ ] Test Social Media Post
  - Select platform (Twitter/Facebook/Instagram/LinkedIn)
  - Enter topic
  - Select tone
  - Generate 3 variations
  - Verify character counts for Twitter
  - Test copy-to-clipboard
- [ ] Test Email Campaign
  - Select format
  - Enter topic
  - Generate subject + body
- [ ] Test Ad Copy
  - Select platform
  - Generate compelling ad copy
- [ ] Test Book Description
  - Select style (Amazon/Goodreads)
  - Generate 3 variations
- [ ] Check usage counter increments by 3 (for variations)

### Cross-Functional Testing
- [ ] Test authentication (sign up, login, logout)
- [ ] Test subscription upgrade flow
- [ ] Test subscription cancellation
- [ ] Test usage limit enforcement
- [ ] Test error messages display properly
- [ ] Test mobile responsiveness on phone
- [ ] Test tablet responsiveness
- [ ] Test on different browsers (Chrome, Safari, Firefox)

## 🎨 Branding & Content

### Assets to Create
- [ ] Logo (SVG format, transparent background)
- [ ] Favicon (32x32, 192x192, 512x512)
- [ ] Social media preview image (1200x630)
- [ ] Demo videos for each product
- [ ] Tutorial documentation
- [ ] FAQ page content
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] GDPR compliance if targeting EU users

### Marketing Content
- [ ] Landing page hero section
- [ ] Product feature descriptions
- [ ] Customer testimonials (after launch)
- [ ] Case studies (after users)
- [ ] Blog content for SEO
- [ ] Social media posts for launch
- [ ] Email templates for onboarding
- [ ] Press release

## 📊 Analytics & Monitoring

### Set Up Tracking
- [ ] Add Google Analytics or Plausible
- [ ] Set up conversion tracking
- [ ] Track key events:
  - Sign ups
  - Subscription purchases
  - Product usage by type
  - Cancellations
- [ ] Set up error monitoring (Sentry or similar)
- [ ] Set up uptime monitoring
- [ ] Create dashboard for key metrics

### Monitor Usage
- [ ] Daily active users
- [ ] Monthly recurring revenue (MRR)
- [ ] Churn rate
- [ ] Most popular products
- [ ] API costs (OpenAI usage)
- [ ] Server costs
- [ ] Customer support tickets

## 🔒 Security & Compliance

### Security Checklist
- [ ] Enable 2FA on all admin accounts
- [ ] Review Supabase RLS policies
- [ ] Set up rate limiting
- [ ] Enable HTTPS only
- [ ] Configure security headers
- [ ] Set up DDoS protection (Cloudflare)
- [ ] Regular security audits
- [ ] Backup database daily

### Legal Compliance
- [ ] Terms of Service written and published
- [ ] Privacy Policy written and published
- [ ] Cookie consent banner (if needed)
- [ ] GDPR compliance (if EU users)
- [ ] CCPA compliance (if California users)
- [ ] Data retention policy
- [ ] User data export capability
- [ ] User data deletion capability

## 💰 Financial Setup

### Revenue Tracking
- [ ] Set up business bank account
- [ ] Connect Stripe payouts
- [ ] Set up accounting software (QuickBooks, etc.)
- [ ] Create revenue projections
- [ ] Set up budget for expenses:
  - OpenAI API costs
  - Vercel hosting
  - Supabase database
  - Stripe fees (2.9% + 30¢)
  - Apple Developer ($99/year)
  - Google Play ($25 one-time)
  - Domain registration
  - Email service
  - Customer support tools

### Pricing Validation
- [ ] Research competitor pricing
- [ ] Test pricing with beta users
- [ ] Consider annual discount options
- [ ] Set up coupon codes for launch
- [ ] Create affiliate program (optional)

## 🎯 Launch Checklist

### Pre-Launch (1-2 weeks before)
- [ ] All tests passing
- [ ] All environment variables configured
- [ ] Payment processing working
- [ ] Email notifications working
- [ ] Error handling tested
- [ ] Mobile responsive verified
- [ ] Browser compatibility verified
- [ ] Load testing completed
- [ ] Backup systems in place
- [ ] Support email configured

### Launch Day
- [ ] Switch Stripe to live mode
- [ ] Deploy to production
- [ ] Announce on social media
- [ ] Email existing waitlist (if any)
- [ ] Post on Product Hunt
- [ ] Post on relevant subreddits
- [ ] Reach out to tech bloggers
- [ ] Monitor for errors/issues
- [ ] Respond to user feedback

### Post-Launch (First 30 days)
- [ ] Daily monitoring of metrics
- [ ] Fix bugs as reported
- [ ] Collect user feedback
- [ ] Make UX improvements
- [ ] Create tutorial content
- [ ] Build case studies
- [ ] Optimize conversion funnel
- [ ] Plan feature roadmap

## 🆘 Support & Maintenance

### Customer Support Setup
- [ ] Set up support email (support@yoursite.com)
- [ ] Create help documentation
- [ ] Set up live chat (optional)
- [ ] Create ticket system
- [ ] Define SLA (Service Level Agreement)
- [ ] Train support team (if applicable)

### Maintenance Schedule
- [ ] Weekly: Review error logs
- [ ] Weekly: Check API usage and costs
- [ ] Monthly: Review analytics
- [ ] Monthly: User feedback review
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance optimization
- [ ] Annually: Technology stack review

## 📝 Notes

**Estimated Time to Complete All Tasks:** 40-80 hours

**Estimated Costs (First Year):**
- OpenAI API: $600-6,000/year (usage-based)
- Vercel: $0-$240/year (Pro plan if needed)
- Supabase: $0-$300/year (free tier often sufficient initially)
- Stripe fees: 2.9% of revenue
- Apple Developer: $99/year
- Google Play: $25 one-time
- Domain: $12-20/year
- **Total:** ~$750-7,000/year depending on usage

**Revenue Potential (Year 1):**
- Conservative: $3,000-10,000/month after 6 months
- Moderate: $10,000-30,000/month after 12 months
- Optimistic: $30,000-100,000/month with good marketing

See COMPLETE-PLATFORM-GUIDE.md for detailed deployment instructions and revenue projections.

---

## ✅ Quick Start Priority Order

If you want to launch quickly, complete tasks in this order:

1. **Week 1: Core Setup**
   - Set up OpenAI API key
   - Configure all Vercel environment variables
   - Deploy to Vercel
   - Test all 7 products work

2. **Week 2: Payments**
   - Create Stripe products
   - Test subscription flow
   - Verify usage limits work

3. **Week 3: Polish**
   - Add Terms of Service & Privacy Policy
   - Set up analytics
   - Create help documentation

4. **Week 4: Launch**
   - Final testing
   - Social media announcement
   - Monitor and respond to users

Good luck with your launch! 🚀
