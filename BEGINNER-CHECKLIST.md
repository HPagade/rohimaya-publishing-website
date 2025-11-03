# 🚀 Beginner's Step-by-Step Checklist

**Welcome!** This guide will walk you through everything you need to do to get your PhoenixForge AI platform up and running. Follow these steps in order, and check them off as you go.

> **Time to complete:** 3-6 hours total (can be done over multiple sessions)
> 
> **Cost:** $0-35/month to start (mostly free tiers available)

---

## 📌 Before You Start

Make sure you have:
- [ ] A computer (Mac, Windows, or Linux)
- [ ] Internet connection
- [ ] A credit card (for some services, even if using free tiers)
- [ ] An email address
- [ ] Basic ability to copy/paste and follow instructions

**Don't worry if you're not technical!** Each step is explained simply.

---

## Phase 1: Quick Wins (30 minutes)
### Get Your Platform Running Locally

### Step 1: Install Required Software ⏱️ 10 minutes

**What you need:**
- [ ] **Node.js 18+** → Download from [nodejs.org](https://nodejs.org/)
  - Click the big green "Download" button
  - Run the installer
  - Click "Next" through everything
  - To verify: Open terminal/command prompt and type: `node --version`
  - You should see something like `v18.17.0` or higher

- [ ] **Git** → Download from [git-scm.com](https://git-scm.com/)
  - Download for your operating system
  - Run installer with default settings
  - To verify: Type in terminal: `git --version`

- [ ] **Python 3.9+** (optional, only needed for demos) → [python.org](https://python.org/)
  - Only needed if you want to run the Streamlit demos
  - Can skip for now and come back later

**Helpful Tips:**
- On Windows, search for "Command Prompt" or "PowerShell" to use terminal
- On Mac, search for "Terminal" in Spotlight
- If you get stuck, YouTube has great installation tutorials

---

### Step 2: Get the Code ⏱️ 5 minutes

```bash
# Open your terminal and type these commands one at a time:

# Navigate to where you want to store the project (e.g., Desktop)
cd Desktop

# Download the code
git clone https://github.com/HPagade/rohimaya-publishing-website.git

# Go into the folder
cd rohimaya-publishing-website

# Check you're in the right place
ls
```

You should see a list of folders like `website`, `backend`, `docs`, etc.

✅ **Checkpoint:** You now have all the code on your computer!

---

### Step 3: Run Your First Demo ⏱️ 15 minutes

Let's start with the easiest thing - the **Streamlit demo** (now includes ALL 7 products!):

```bash
# Navigate to demos folder
cd demos/streamlit

# Install required packages (first time only)
pip install -r requirements.txt

# Run the complete demo
streamlit run main_demo.py
```

**What should happen:**
- Your web browser will open automatically
- You'll see the PhoenixForge AI demo interface
- You can navigate through all 7 products!

🎉 **Congratulations!** You just ran your first component!

**What you can do now:**
- Try all 7 products: Formatter, Audiobook, Covers, Images, Cookbook, Health, Marketing
- Click through the different demos
- Show it to friends/family
- Use it for presentations
- No API keys needed initially - it uses mock data
- Add your OpenAI API key to see REAL AI generation!

**To enable real AI (optional):**
1. Create a file called `.env` in the `demos/streamlit` folder
2. Add one line: `OPENAI_API_KEY=sk-your-key-here`
3. Restart the demo
4. Now you'll see ACTUAL AI-generated content!

**Close the demo:** Press `Ctrl+C` in the terminal when done

---

## Phase 2: Essential Setup (90 minutes)
### Get Your Accounts & API Keys

Now let's set up the accounts you need to make everything work for real.

### Step 4: OpenAI Account (CRITICAL) ⏱️ 15 minutes

**Why:** Powers all the AI features (this is the brain!)

**Steps:**
1. [ ] Go to [platform.openai.com](https://platform.openai.com/)
2. [ ] Click "Sign Up" (or "Log In" if you have an account)
3. [ ] Complete the signup process
4. [ ] Add payment method (required, but you control spending)
5. [ ] Go to "API Keys" in the left sidebar
6. [ ] Click "Create new secret key"
7. [ ] **IMPORTANT:** Copy it NOW (you won't see it again!)
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
   ```
8. [ ] Save it in a safe place (Notes app, password manager, etc.)

**Set a spending limit to protect yourself:**
- [ ] Click "Settings" → "Billing" → "Usage limits"
- [ ] Set "Hard limit": $20/month (for testing)
- [ ] You can increase this later

**Cost:** ~$5-50/month depending on usage

---

### Step 5: Create Environment File ⏱️ 10 minutes

This tells your platform where to find your API keys.

```bash
# Make sure you're in the main project folder
cd /path/to/rohimaya-publishing-website

# Copy the example file
cp .env.example .env
```

**Now edit the .env file:**
- On Windows: Right-click `.env` → "Open with Notepad"
- On Mac: Right-click `.env` → "Open with TextEdit"
- Or use any text editor you like

**Add your OpenAI key:**
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```
(Use the key you copied in Step 4)

**Save the file!**

✅ **Checkpoint:** Your platform can now use AI!

---

### Step 6: Run the Website ⏱️ 20 minutes

Time to see the actual website!

```bash
# Navigate to website folder
cd website

# Install all the packages the website needs (first time only, takes 5-10 min)
npm install

# Start the website
npm run dev
```

**What should happen:**
- You'll see messages in terminal
- Last line says something like "Ready on http://localhost:3000"
- Open your browser and go to: **http://localhost:3000**

🎉 **You should see your website!**

**Things to try:**
- [ ] Click around the homepage
- [ ] Go to http://localhost:3000/format (manuscript formatter)
- [ ] Go to http://localhost:3000/covers (cover creator)
- [ ] Go to http://localhost:3000/pricing (pricing page)

**Note:** Some features won't fully work yet (that's okay! We're building up to it)

**Keep this running** - Don't close this terminal window

---

### Step 7: Test the Mobile App (Optional) ⏱️ 20 minutes

Want to see it on your phone?

**On your phone:**
- [ ] Download "Expo Go" app
  - iPhone: App Store
  - Android: Google Play Store

**On your computer:**
```bash
# Open a NEW terminal window (keep website running)
# Navigate to mobile-apps folder
cd mobile-apps

# Install packages
npm install

# Start the app
npm start
```

- [ ] A QR code will appear in the terminal
- [ ] Open Expo Go on your phone
- [ ] Scan the QR code
- [ ] The app loads on your phone!

🎉 **You now have the mobile app running!**

---

## Phase 3: Add Payments (90 minutes)
### Enable Subscriptions & Revenue

### Step 8: Stripe Account ⏱️ 30 minutes

**Why:** This handles all payments and subscriptions

**Steps:**
1. [ ] Go to [stripe.com](https://stripe.com/)
2. [ ] Click "Start now" / "Sign up"
3. [ ] Fill in your business information
4. [ ] Verify your email
5. [ ] **Stay in TEST MODE** (toggle in top right should say "Test mode")

**Get your API keys:**
6. [ ] Click "Developers" in top right
7. [ ] Click "API keys"
8. [ ] Copy **Secret key** (starts with `sk_test_`)
   ```
   STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
   ```
9. [ ] Copy **Publishable key** (starts with `pk_test_`)
   ```
   STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
   ```

**Create your subscription plans:**
10. [ ] Click "Products" in left sidebar
11. [ ] Click "+ Add product"
12. [ ] Create these three products:

**Product 1: Creator Plan**
- Name: `Creator Plan`
- Description: `For independent authors`
- Price: `$29.00 USD`
- Billing period: `Monthly`
- [ ] Click "Save product"
- [ ] **Copy the Price ID** (starts with `price_`)

**Product 2: Professional Plan**
- Name: `Professional Plan`
- Description: `For professional authors and small publishers`
- Price: `$79.00 USD`
- Billing period: `Monthly`
- [ ] Click "Save product"
- [ ] **Copy the Price ID**

**Product 3: Enterprise Plan**
- Name: `Enterprise Plan`
- Description: `For publishing companies`
- Price: `$299.00 USD`
- Billing period: `Monthly`
- [ ] Click "Save product"
- [ ] **Copy the Price ID**

**Add to your .env file:**
```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_PRICE_CREATOR=price_xxxxxxxxxxxxx
STRIPE_PRICE_PROFESSIONAL=price_xxxxxxxxxxxxx
STRIPE_PRICE_ENTERPRISE=price_xxxxxxxxxxxxx
```

---

### Step 9: Supabase Database ⏱️ 30 minutes

**Why:** Stores user accounts, subscriptions, and usage data

**Steps:**
1. [ ] Go to [supabase.com](https://supabase.com/)
2. [ ] Click "Start your project"
3. [ ] Sign in with GitHub (easiest option)
4. [ ] Click "New project"
5. [ ] Fill in:
   - Organization: Create new or use existing
   - Name: `phoenixforge-ai`
   - Database Password: Create a strong password and **SAVE IT**
   - Region: Choose closest to you
   - Plan: Free (perfect for starting)
6. [ ] Click "Create new project"
7. [ ] **Wait 2-3 minutes** for database to be created

**Get your connection details:**
8. [ ] Click "Settings" (gear icon) in sidebar
9. [ ] Click "API"
10. [ ] Copy these values:
    ```
    NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc.......
    ```

**Set up the database structure:**
11. [ ] Click "SQL Editor" in sidebar
12. [ ] Open the file `database-schema.sql` from your project folder
13. [ ] Copy ALL the SQL code
14. [ ] Paste it into the SQL Editor
15. [ ] Click "Run" (or press Ctrl/Cmd + Enter)
16. [ ] You should see "Success" message

**Update your .env file:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc.......
```

✅ **Checkpoint:** You now have a database!

---

### Step 10: Test Payments ⏱️ 30 minutes

Let's test the complete payment flow!

**Make sure your website is still running** (from Step 6)
- If not, run: `cd website && npm run dev`

**Test the flow:**
1. [ ] Go to http://localhost:3000/pricing
2. [ ] Click "Get Started" on the Creator Plan
3. [ ] You should see a signup form (powered by Supabase)
4. [ ] Create a test account with your email
5. [ ] You'll be redirected to Stripe checkout

**Use Stripe test card:**
- Card number: `4242 4242 4242 4242`
- Expiration: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

6. [ ] Complete the checkout
7. [ ] You should be redirected back to your site
8. [ ] Go to http://localhost:3000/dashboard
9. [ ] You should see your subscription status!

🎉 **Congratulations!** Payments are working!

**Verify in Stripe:**
- [ ] Go to your Stripe dashboard
- [ ] Click "Payments" - you should see your test payment
- [ ] Click "Customers" - you should see your test customer

---

## Phase 4: Going Live (Optional - Do Later)

### When You're Ready to Accept Real Payments

**Don't do this until you've tested everything thoroughly!**

### Step 11: Switch to Production ⏱️ 60 minutes

**Prerequisites:**
- [ ] You've tested everything in test mode
- [ ] You're confident the platform works
- [ ] You're ready to accept real customers
- [ ] You have Terms of Service and Privacy Policy written

**Stripe - Activate Live Mode:**
1. [ ] Complete Stripe account verification
   - Provide business details
   - Add bank account for payouts
   - Verify identity
2. [ ] Switch toggle from "Test mode" to "Live mode"
3. [ ] Get new API keys (they start with `sk_live_` instead of `sk_test_`)
4. [ ] Recreate your products in live mode (same details)
5. [ ] Update .env with live keys

**Deploy to Production:**

See the full deployment guide in `docs/deployment/DEPLOYMENT-GUIDE.md`, but here's the quick version:

**Website:**
- [ ] Create account on [vercel.com](https://vercel.com/)
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Add all environment variables (use live keys!)
- [ ] Deploy
- [ ] Get your live URL (e.g., `phoenixforge.vercel.app`)

**Backend:**
- [ ] Create account on [railway.app](https://railway.app/)
- [ ] Click "New Project"
- [ ] Deploy from GitHub
- [ ] Add all environment variables
- [ ] Deploy

---

## 🎯 Quick Reference Card

**Where Things Are:**

```
📂 Your Project
│
├── 🌐 website/              → Main website (npm run dev)
├── 🔧 backend/              → API server (npm run dev)
├── 📱 mobile-apps/          → Mobile app (npm start)
├── 🎨 demos/streamlit/      → Quick demo (streamlit run main_demo.py)
├── 📚 docs/                 → All documentation
└── .env                     → Your API keys (IMPORTANT!)
```

**Important URLs (when running locally):**
- Website: http://localhost:3000
- Streamlit Demo: http://localhost:8501
- Mobile App: Scan QR code with Expo Go

**Important Files:**
- `.env` - Your API keys (NEVER share this!)
- `docs/QUICKSTART.md` - More detailed guide
- `docs/USER-CHECKLIST.md` - Comprehensive checklist
- `docs/ACTION-ITEMS.md` - Technical setup guide

---

## 🆘 Troubleshooting

### "Command not found: npm"
- **Fix:** Install Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installing

### "Port already in use"
- **Fix:** Something else is using that port
- Try: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)
- Or just restart your computer

### "Module not found" error
- **Fix:** 
  ```bash
  rm -rf node_modules
  npm install
  ```

### Website shows error pages
- **Fix:** Check your .env file has all the required keys
- Make sure you copied them exactly (no extra spaces)

### Payments not working
- **Fix:** 
  - Verify you're in Test mode in Stripe
  - Check STRIPE_SECRET_KEY is in .env
  - Make sure you created products and copied Price IDs

### Can't connect to database
- **Fix:**
  - Check Supabase URL and key in .env
  - Verify you ran the database-schema.sql

### Still stuck?
- Check `docs/` folder for more detailed guides
- Read error messages carefully - they often tell you what's wrong
- Google the error message
- Check GitHub Issues for similar problems

---

## ✅ Success Checklist

You're done when you can:

- [ ] ✅ See the Streamlit demo running
- [ ] ✅ See the website at localhost:3000
- [ ] ✅ See the mobile app on your phone (optional)
- [ ] ✅ Sign up for an account
- [ ] ✅ Complete a test payment
- [ ] ✅ See your subscription in the dashboard
- [ ] ✅ Use at least one AI feature (formatter, covers, etc.)
- [ ] ✅ See usage counter update in dashboard

---

## 🎓 What You've Accomplished

By completing this checklist, you now have:

✅ A working AI-powered publishing platform
✅ User authentication and accounts
✅ Payment processing with Stripe
✅ Subscription management
✅ Usage tracking
✅ Multiple AI-powered tools
✅ Mobile apps
✅ A professional demo for presentations

**This is a real SaaS business!** 🚀

---

## 📈 Next Steps

After you've completed this checklist:

1. **Week 1-2:** Test everything thoroughly
   - Use all features yourself
   - Have friends/family test
   - Fix any bugs you find

2. **Week 3-4:** Prepare for launch
   - Write Terms of Service & Privacy Policy
   - Create marketing materials
   - Set up social media accounts
   - Build an email list

3. **Month 2:** Soft launch
   - Switch to live Stripe mode
   - Deploy to production (Vercel + Railway)
   - Announce to your network
   - Post on social media

4. **Month 3+:** Grow
   - Gather user feedback
   - Add new features
   - Marketing and promotion
   - Scale up!

---

## 💡 Pro Tips

**For Testing:**
- Always use Stripe test mode until you're ready to launch
- Set OpenAI spending limits to avoid surprise bills
- Keep a test account separate from your admin account

**For Development:**
- Make small changes and test frequently
- Keep your .env file backed up (but NEVER commit it to Git!)
- Read error messages - they usually tell you what's wrong

**For Launch:**
- Start with test mode and a few beta users
- Don't advertise until you've tested with real people
- Have a support email ready
- Monitor your costs daily at first

**For Growth:**
- Listen to user feedback
- Focus on one marketing channel at a time
- Track your metrics (signups, revenue, churn)
- Keep improving based on data

---

## 📞 Resources

**Documentation:**
- Full setup guide: `docs/setup/SETUP-GUIDE.md`
- Deployment guide: `docs/deployment/DEPLOYMENT-GUIDE.md`
- Complete platform guide: `docs/user-guides/COMPLETE-PLATFORM-GUIDE.md`

**External Resources:**
- OpenAI Documentation: [platform.openai.com/docs](https://platform.openai.com/docs)
- Stripe Documentation: [stripe.com/docs](https://stripe.com/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

**Community:**
- GitHub Issues: For technical problems
- GitHub Discussions: For questions and ideas

---

## 🎉 You're Ready!

This checklist has everything you need to get started. Take it one step at a time, and don't rush. It's better to do it right than to do it fast.

**Remember:**
- You can always come back to this checklist
- It's okay to take breaks between phases
- Test everything before moving to the next step
- Ask for help if you're stuck

**Good luck with your platform!** 🚀

---

*Last updated: November 3, 2025*
*Questions? Check the docs folder or create a GitHub issue*
