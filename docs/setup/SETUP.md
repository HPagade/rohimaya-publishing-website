# 🚀 Rohimaya Publishing Website - Setup Guide

Welcome! This guide will help you get your website up and running.

## 📋 Prerequisites

Before starting, make sure you have these installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **Git**
   - Download from: https://git-scm.com/
   - Check version: `git --version`

3. **A Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

---

## 🛠️ Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd /path/to/rohimaya-publishing-website
```

### Step 2: Install Dependencies

This will install all the React libraries and tools needed:

```bash
npm install
```

**What this does:**
- Downloads React, React Router, and other libraries
- Creates a `node_modules` folder (this is large, that's normal!)
- May take 2-5 minutes depending on your internet speed

### Step 3: Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env` and add your API keys (we'll get these later):

```bash
# You can leave these blank for now
REACT_APP_NAME=Rohimaya Publishing
REACT_APP_URL=http://localhost:3000
```

### Step 4: Start Development Server

```bash
npm start
```

**What happens:**
- Development server starts on http://localhost:3000
- Your browser should open automatically
- The page will reload when you make changes
- Errors will show in the browser console

### Step 5: View Your Website!

Open your browser to: **http://localhost:3000**

You should see your beautiful homepage! 🎉

---

## 📂 Project Structure Explained

```
rohimaya-publishing-website/
│
├── public/                  # Static files (HTML, images, etc.)
│   ├── index.html          # Main HTML file (React injects here)
│   ├── manifest.json       # PWA configuration
│   └── robots.txt          # SEO crawler instructions
│
├── src/                    # Source code (where you'll work most)
│   ├── components/         # Reusable React components
│   │   └── layout/        # Header, Footer, Navigation
│   │
│   ├── pages/             # Page components (one per route)
│   │   ├── HomePage.js    # Main landing page
│   │   ├── BooksPage.js   # All books page
│   │   ├── AIFormatterPage.js  # AI formatter tool
│   │   └── AboutPage.js   # About page
│   │
│   ├── App.js             # Main app component (sets up routing)
│   ├── index.js           # Entry point (starts React)
│   └── index.css          # Global styles
│
├── package.json           # Project dependencies
├── .env                   # Environment variables (API keys)
├── .gitignore            # Files to exclude from Git
└── README.md             # Project overview
```

---

## 🎨 Understanding React Basics

### What is a Component?

A **component** is a reusable piece of UI. Think of it like a LEGO block.

**Example:**
```javascript
function Button({ text }) {
  return <button className="btn">{text}</button>;
}

// Use it:
<Button text="Click Me" />
```

### What is State?

**State** is data that can change. When state changes, React re-renders the component.

**Example:**
```javascript
const [count, setCount] = useState(0);

// count = current value
// setCount = function to update it

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

### What is Routing?

**Routing** lets you show different pages without reloading:

```javascript
<Route path="/" element={<HomePage />} />
<Route path="/books" element={<BooksPage />} />
```

When user visits `/books`, React shows `BooksPage` component.

---

## 🎯 Next Steps

### Immediate (Week 1):
1. ✅ Get site running locally
2. Add your actual book information
3. Customize colors/branding
4. Add real images (book covers)

### Short Term (Week 2-3):
5. Connect Mailchimp for email signup
6. Add Stripe for payments
7. Start building AI formatter functionality

### Medium Term (Week 4-6):
8. Build full AI formatter tool
9. Add database for books
10. Deploy to Netlify/Vercel

---

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Kill the process using port 3000
# On Mac/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found Errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### React Scripts Not Found

```bash
# Make sure you're in the project directory
cd rohimaya-publishing-website
npm install react-scripts --save
```

### Browser Shows Blank Page

1. Check browser console (F12) for errors
2. Make sure development server is running
3. Try `npm start` again

---

## 📚 Learning Resources

### React Fundamentals
- **Official React Docs:** https://react.dev
- **React Tutorial:** https://react.dev/learn
- **React Router:** https://reactrouter.com/

### JavaScript Refresher
- **MDN Web Docs:** https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JavaScript.info:** https://javascript.info/

### CSS Styling
- **CSS Tricks:** https://css-tricks.com/
- **Flexbox Guide:** https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Grid Guide:** https://css-tricks.com/snippets/css/complete-guide-grid/

### Git & GitHub
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics
- **GitHub Guide:** https://guides.github.com/

---

## 🔑 Getting API Keys (For Later)

### OpenAI (for AI Chatbot & Formatter)
1. Go to: https://platform.openai.com/
2. Sign up / Login
3. Go to API Keys
4. Create new key
5. Cost: ~$20-50/month

**Alternative - Anthropic Claude (Recommended):**
1. Go to: https://console.anthropic.com/
2. More cost-effective for longer text
3. Great for book formatting

### Stripe (for Payments)
1. Go to: https://stripe.com/
2. Sign up (free)
3. Get API keys from Dashboard
4. Use test keys during development
5. Cost: 2.9% + 30¢ per transaction

### Mailchimp (for Email)
1. Go to: https://mailchimp.com/
2. Sign up (free up to 500 subscribers)
3. Get API key from Account → Extras → API keys
4. Create an Audience
5. Cost: Free tier is enough to start

---

## 🚀 Deployment (When Ready)

### Deploy to Netlify (Easiest)

1. Push your code to GitHub
2. Go to: https://netlify.com
3. Sign up with GitHub
4. Click "New site from Git"
5. Select your repository
6. Build command: `npm run build`
7. Publish directory: `build`
8. Click Deploy!

**Your site will be live at:** `your-site-name.netlify.app`

### Deploy to Vercel (Also Easy)

1. Push code to GitHub
2. Go to: https://vercel.com
3. Import your GitHub repository
4. Vercel auto-detects React
5. Click Deploy!

**Your site will be live at:** `your-site-name.vercel.app`

### Custom Domain (Optional)

1. Buy domain from Namecheap, Google Domains, etc. (~$12/year)
2. In Netlify/Vercel, add custom domain
3. Update DNS settings (follow their guide)
4. Wait 24-48 hours for DNS propagation

---

## 💡 Development Tips

### 1. Use the Browser Console

Press **F12** to open Developer Tools:
- **Console:** See errors and `console.log()` output
- **Network:** See API requests
- **Elements:** Inspect HTML/CSS

### 2. Hot Reload

Save any file and the page automatically updates! No need to refresh.

### 3. Component File Organization

Each component should have:
- `.js` file (logic)
- `.css` file (styles)
- Both in same folder

### 4. Commit Often

```bash
git add .
git commit -m "Descriptive message"
git push
```

Save your progress frequently!

### 5. Use Comments

```javascript
// This helps future you remember what this does!
const greeting = "Hello";
```

---

## 🎓 Learning Path

### Week 1: Basics
- [ ] Understand component structure
- [ ] Practice editing existing components
- [ ] Customize colors and text
- [ ] Add your book information

### Week 2: Styling
- [ ] Understand CSS classes
- [ ] Modify existing styles
- [ ] Make the site match your brand
- [ ] Add images

### Week 3: Interactivity
- [ ] Understand useState
- [ ] Add form handling
- [ ] Connect to APIs
- [ ] Email signup

### Week 4: Advanced
- [ ] Build AI formatter
- [ ] Add payment processing
- [ ] User authentication
- [ ] Database integration

---

## 🆘 Getting Help

### Where to Ask Questions:

1. **Stack Overflow:** https://stackoverflow.com/questions/tagged/reactjs
2. **React Discord:** https://discord.gg/reactiflux
3. **Reddit:** r/reactjs, r/webdev
4. **AI Assistants:** Claude Code, ChatGPT, GitHub Copilot

### When Asking for Help:

Include:
1. What you're trying to do
2. What you expected to happen
3. What actually happened
4. Error messages (full text)
5. Relevant code snippet

---

## ✅ Setup Checklist

Before moving forward, verify:

- [ ] Node.js installed (`node --version`)
- [ ] Git installed (`git --version`)
- [ ] Dependencies installed (`npm install`)
- [ ] Site runs locally (`npm start`)
- [ ] Can see homepage at localhost:3000
- [ ] Can navigate between pages
- [ ] No errors in browser console

---

## 🎉 You're Ready!

Your foundation is built! Now you can:

1. **Customize content** - Add your actual books
2. **Style it** - Match your brand colors
3. **Add features** - Build the AI formatter
4. **Deploy** - Go live!

**Next:** Let's add your actual book information and customize the design!

---

*Created for Rohimaya Publishing | Setup Guide v1.0*
