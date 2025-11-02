# ✅ ACTION ITEMS - What YOU Need to Do

I've built your complete SaaS monetization system! Here's exactly what you need to do to make it work.

---

## 🎯 PART 1: Get Your API Keys (60 minutes)

These are the things ONLY YOU can do. I can't do them for you because they require your accounts.

### ☐ 1. Create Clerk Account & Get Keys (15 min)

**URL:** https://clerk.com

**Steps:**
1. Sign up for free account
2. Create new application: "PhoenixForge AI"
3. Enable Email/Password + Google OAuth
4. Go to "API Keys"
5. **COPY THESE** (you'll need them):
   ```
   CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

**Why:** This handles user login/signup for your platform

---

### ☐ 2. Create Stripe Account & Products (20 min)

**URL:** https://stripe.com

**Steps:**
1. Create account (use your business info)
2. Stay in "Test Mode" for now
3. Go to Developers → API Keys
4. **COPY THIS:**
   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

5. **Create 3 Products** (Products → Add Product):

   **Product 1:**
   - Name: Author Plan
   - Price: $29.00 USD
   - Billing: Monthly recurring
   - After saving, **COPY THE PRICE ID:** `STRIPE_PRICE_AUTHOR=price_...`

   **Product 2:**
   - Name: Publisher Plan
   - Price: $99.00 USD
   - Billing: Monthly recurring
   - **COPY:** `STRIPE_PRICE_PUBLISHER=price_...`

   **Product 3:**
   - Name: Enterprise Plan
   - Price: $299.00 USD
   - Billing: Monthly recurring
   - **COPY:** `STRIPE_PRICE_ENTERPRISE=price_...`

**Why:** This processes payments and subscriptions

---

### ☐ 3. Get OpenAI API Key (5 min)

**URL:** https://platform.openai.com

**Steps:**
1. Sign in/Sign up
2. Go to API Keys
3. Create new secret key
4. **COPY THIS** (shows only once!):
   ```
   OPENAI_API_KEY=sk-...
   ```
5. **IMPORTANT:** Set spending limit:
   - Go to Settings → Billing → Limits
   - Set monthly limit: $10-20 to start

**Why:** Powers all AI features (covers, formatting, etc.)

---

### ☐ 4. Create PostgreSQL Database (15 min)

**OPTION A: Railway (Recommended)**

**URL:** https://railway.app

**Steps:**
1. Sign up with GitHub
2. Click "New Project"
3. Select "Provision PostgreSQL"
4. Click on the database
5. Go to "Variables" tab
6. **COPY THIS:**
   ```
   DATABASE_URL=postgresql://...
   ```

**Cost:** $5/month (includes 500MB database)

**OPTION B: Supabase (Free Alternative)**

**URL:** https://supabase.com

**Steps:**
1. Create new project
2. Wait ~2 minutes for setup
3. Go to Project Settings → Database
4. Copy "Connection String" (Transaction mode)
5. Replace `[YOUR-PASSWORD]` with your password

**Cost:** FREE up to 500MB

---

## 🔧 PART 2: Configure Your Code (30 minutes)

### ☐ 5. Install New Dependencies

**Backend:**
```bash
cd server
npm install stripe@^14.10.0 @clerk/clerk-sdk-node@^4.13.14 pg@^8.11.3
```

**Frontend:**
```bash
cd ..
npm install @clerk/clerk-react@^4.30.0
```

---

### ☐ 6. Create Environment Files

**Backend (.env in `/server` folder):**

```bash
cd server
cp .env.template .env
nano .env  # or open in any editor
```

**Fill in these values** (from steps above):

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
FRONTEND_URL=http://localhost:3000

# From Step 4 (Database)
DATABASE_URL=postgresql://...

# From Step 1 (Clerk)
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# From Step 2 (Stripe)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_AUTHOR=price_...
STRIPE_PRICE_PUBLISHER=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# From Step 3 (OpenAI)
OPENAI_API_KEY=sk-...
```

**Frontend (.env in root folder):**

```bash
cd ..
cp .env.template .env
nano .env
```

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_...
```

---

### ☐ 7. Initialize Database

**If using Railway:**
1. Go to Railway dashboard
2. Click your PostgreSQL service
3. Click "Query" tab
4. Open `server/src/database/schema.sql` in your code editor
5. Copy ALL the SQL
6. Paste into Railway Query tab
7. Click "Run"

**If using Supabase:**
1. Go to Supabase dashboard
2. Click "SQL Editor"
3. Copy contents of `server/src/database/schema.sql`
4. Paste and click "Run"

---

### ☐ 8. Update Frontend index.js

**File:** `/src/index.js`

Replace the entire file with:

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

## 🧪 PART 3: Test Everything (20 minutes)

### ☐ 9. Start Servers

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

Should see:
```
🔥 PhoenixForge AI API Server
🚀 Server running on port 5000
```

**Terminal 2 (Frontend):**
```bash
# In root directory
npm start
```

Browser opens to `http://localhost:3000`

---

### ☐ 10. Test the Complete Flow

1. **Go to Pricing:** http://localhost:3000/pricing

2. **Click "Upgrade" on Author Plan ($29/month)**

3. **Sign Up** (Clerk will show signup form)
   - Use your real email
   - Create account

4. **You'll be redirected to Stripe Checkout**

5. **Use Stripe Test Card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25` (any future date)
   - CVC: `123` (any 3 digits)
   - ZIP: `12345` (any 5 digits)

6. **Complete Payment**

7. **You should be redirected back to Dashboard**

8. **Check Dashboard:** http://localhost:3000/dashboard
   - Should show "Author" plan
   - Should show usage limits (10 formatter, 5 covers, etc.)
   - Should show 0 usage

9. **Test an App:**
   - Click "AI Formatter" from dashboard
   - Upload a test document
   - Process it
   - Go back to dashboard
   - Usage should increase by 1!

10. **Test Customer Portal:**
    - Dashboard → "Manage Subscription"
    - Should open Stripe portal
    - You can see invoices, update payment, cancel

---

## 🚀 PART 4: Deploy (Optional - for going live)

For detailed deployment instructions, see: **SETUP-GUIDE.md**

Quick version:

### ☐ Deploy Backend to Railway:
1. Push code to GitHub
2. Railway → New Project → Deploy from GitHub
3. Select your repo
4. Add ALL environment variables
5. Change `NODE_ENV=production`
6. Get Railway URL

### ☐ Deploy Frontend to Cloudflare Pages:
1. Cloudflare Dashboard → Pages → New Project
2. Connect GitHub repo
3. Build command: `npm run build`
4. Build output: `build`
5. Add environment variables
6. Deploy

---

## ✅ Success Criteria

You know it's working when:

- ✅ You can sign up on `/pricing`
- ✅ Stripe checkout appears
- ✅ Test payment goes through
- ✅ Dashboard shows your subscription
- ✅ Usage counters update when you use apps
- ✅ You can access Stripe customer portal
- ✅ When you hit usage limit, app shows upgrade prompt

---

## 🆘 If Something Doesn't Work

### Database Connection Error
- Check DATABASE_URL is correct in `.env`
- Make sure you ran the schema.sql

### Clerk Error
- Verify CLERK_PUBLISHABLE_KEY matches in both frontend and backend `.env`
- Check you added Clerk to `index.js`

### Stripe Checkout Doesn't Open
- Verify all 3 STRIPE_PRICE_* variables are set
- Check STRIPE_SECRET_KEY is test mode key
- Make sure you created products in Stripe dashboard

### "Module not found" Errors
- Run `npm install` in both root and `/server` folders
- Restart both servers

---

## 📊 What You've Built

Your platform now has:

✅ **4 AI Apps** - Formatter, Covers, Images, Videos
✅ **Authentication** - Clerk login/signup
✅ **Payments** - Stripe subscriptions
✅ **4 Pricing Tiers** - Free, Author ($29), Publisher ($99), Enterprise ($299)
✅ **Usage Tracking** - Limits based on tier
✅ **User Dashboard** - See subscription & usage
✅ **Customer Portal** - Users manage their own billing
✅ **Automated Billing** - Recurring monthly charges
✅ **Professional UI** - Pricing page, dashboard, etc.

---

## 💰 Revenue Potential

**Month 1:** 50 Author subs = $1,450/mo
**Month 3:** 200 Author subs = $5,800/mo
**Month 6:** 500 Author subs = $14,500/mo

**Your costs:** ~$50/mo (infrastructure + OpenAI)

**Profit margin:** ~70%

---

## 📝 Final Notes

1. **Start in Test Mode** - Don't switch Stripe to live mode until you've tested everything

2. **Set OpenAI Limits** - Protect yourself from runaway costs

3. **Monitor Usage** - Check your OpenAI and Railway dashboards weekly

4. **Customer Support** - When you go live, be ready to help users (email support is included in paid tiers)

5. **LinkedIn Post** - After testing, share your achievement! Tag me if you want.

---

## 🎯 Next Steps After Testing

1. ☐ Follow full deployment guide in `SETUP-GUIDE.md`
2. ☐ Switch Stripe to live mode
3. ☐ Launch on ProductHunt
4. ☐ Share on LinkedIn
5. ☐ Post in author/publisher communities
6. ☐ Set up email marketing (ConvertKit free tier)

---

**Questions?** Review the `SETUP-GUIDE.md` for detailed troubleshooting.

**Ready to make money!** 🚀💰
