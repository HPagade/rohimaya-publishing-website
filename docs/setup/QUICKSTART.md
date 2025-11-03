# 🚀 PhoenixForge AI - Quick Start Guide

Get up and running with PhoenixForge AI in 15 minutes!

---

## 📦 Prerequisites

Before you begin, ensure you have:

- ✅ **Node.js 20+** - [Download](https://nodejs.org)
- ✅ **npm or yarn** - Comes with Node.js
- ✅ **PostgreSQL 15+** - [Download](https://www.postgresql.org/download/)
- ✅ **Redis 7+** - [Download](https://redis.io/download)
- ✅ **Git** - [Download](https://git-scm.com/downloads)

### Check Your Setup

```bash
node --version  # Should be v20 or higher
npm --version
psql --version
redis-cli --version
git --version
```

---

## ⚡ 15-Minute Setup

### 1. Clone the Repository (1 min)

```bash
# Clone the repo
git clone https://github.com/rohimaya/rohimaya-publishing-website.git

# Navigate to directory
cd rohimaya-publishing-website

# Or if you forked it:
git clone https://github.com/YOUR_USERNAME/rohimaya-publishing-website.git
cd rohimaya-publishing-website
```

---

### 2. Install Dependencies (3 min)

```bash
# Install all packages
npm install

# Or with yarn
yarn install
```

This will install ~500MB of dependencies. Grab a coffee! ☕

---

### 3. Set Up Database (2 min)

```bash
# Create PostgreSQL database
createdb phoenixforge

# Or manually:
psql postgres
CREATE DATABASE phoenixforge;
\q
```

---

### 4. Configure Environment (3 min)

```bash
# Copy environment template
cp .env.example .env

# Edit with your favorite editor
nano .env  # or vim, code, etc.
```

**Minimum required for local development:**

```bash
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/phoenixforge"

# Redis
REDIS_URL="redis://localhost:6379"

# OpenAI (for AI features - get key at platform.openai.com)
OPENAI_API_KEY="sk-your-key-here"

# NextAuth (generate random string)
NEXTAUTH_SECRET="your-random-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
```

**Generate a secure NextAuth secret:**
```bash
openssl rand -base64 32
```

---

### 5. Run Database Migrations (2 min)

```bash
# Apply database schema
npm run db:migrate

# Or with Prisma directly
npx prisma migrate dev
```

---

### 6. Seed the Database (Optional - 1 min)

```bash
# Add sample data
npm run db:seed
```

This creates:
- Test user account
- Sample book covers
- Genre templates
- Demo content

---

### 7. Start Development Server (1 min)

```bash
# Start all services
npm run dev

# Or start individually:
npm run dev:web    # Frontend (port 3000)
npm run dev:api    # Backend API (port 4000)
npm run dev:worker # Background jobs
```

**You should see:**
```
✓ Ready on http://localhost:3000
✓ API running on http://localhost:4000
✓ Worker processing jobs
```

---

### 8. Open in Browser (30 sec)

Visit: **http://localhost:3000**

You should see the PhoenixForge AI homepage! 🎉

---

## 🎯 Quick Test

### Test the Cover Generator

1. **Navigate to:** http://localhost:3000/covers
2. **Fill in:**
   - Title: "Test Book"
   - Author: "Your Name"
   - Genre: "Fantasy"
   - Description: "An epic tale..."
3. **Click "Generate"**
4. **Wait 30-60 seconds**
5. **See 6 AI-generated covers!**

### Test the Formatter

1. **Navigate to:** http://localhost:3000/format
2. **Upload a .docx file** (sample provided in `/samples/manuscript.docx`)
3. **Choose format:** ePub
4. **Click "Format"**
5. **Download formatted book!**

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Database Connection Error

```bash
# Check PostgreSQL is running
pg_isready

# Restart PostgreSQL
brew services restart postgresql  # macOS
sudo systemctl restart postgresql  # Linux
```

### Redis Connection Error

```bash
# Check Redis is running
redis-cli ping  # Should return "PONG"

# Start Redis
brew services start redis  # macOS
sudo systemctl start redis  # Linux
```

### Missing Dependencies

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### API Key Issues

Make sure your OpenAI API key is valid:
```bash
# Test API key
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## 📚 Next Steps

### Learn the Codebase

1. **Read the docs:** `/docs` folder
2. **Explore components:** `/src/components`
3. **Check API routes:** `/src/pages/api`
4. **Review services:** `/src/services`

### Make Your First Change

```bash
# Create a branch
git checkout -b feature/my-first-change

# Make changes
# ... edit files ...

# Test
npm test

# Commit
git add .
git commit -m "feat: my first change"

# Push
git push origin feature/my-first-change
```

### Join the Community

- **Discord:** https://discord.gg/phoenixforge
- **GitHub Discussions:** Ask questions
- **Twitter:** @phoenixforge - Follow for updates

---

## 🎓 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database
npm run db:studio    # Open Prisma Studio

# Testing
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:e2e     # End-to-end tests
npm run test:coverage # Coverage report

# Linting & Formatting
npm run lint         # Check code style
npm run lint:fix     # Fix issues
npm run format       # Format code

# Type Checking
npm run type-check   # Check TypeScript

# Build & Deploy
npm run build        # Production build
npm run analyze      # Analyze bundle
```

---

## 🔧 Configuration Files

Important files in the root:

```
.
├── .env                 # Your environment variables
├── .env.example         # Template for .env
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── prisma/schema.prisma # Database schema
└── package.json         # Dependencies & scripts
```

---

## 📖 Documentation

- **README.md** - Main documentation
- **CONTRIBUTING.md** - How to contribute
- **API.md** - API documentation
- **DEPLOYMENT.md** - Deployment guide
- **/docs** - Detailed docs folder

---

## 🆘 Getting Help

**Can't get it working?**

1. **Check Issues:** Someone might have had the same problem
2. **GitHub Discussions:** Ask the community
3. **Discord:** Real-time help
4. **Email:** dev@phoenixforge.ai

**When asking for help, include:**
- Your OS (Windows, Mac, Linux)
- Node.js version
- Error messages (full output)
- What you've tried already

---

## ✅ Verification Checklist

Before moving forward, verify:

- [ ] Application loads at http://localhost:3000
- [ ] You can log in / create an account
- [ ] Cover generator works
- [ ] Format tool works
- [ ] No console errors
- [ ] Database connected
- [ ] Redis connected
- [ ] Tests pass (`npm test`)

---

## 🎉 You're Ready!

Congratulations! You now have PhoenixForge AI running locally.

**What's next?**

1. Explore the features
2. Read the full README
3. Join the community
4. Start contributing!

---

**Where Stories Take Shape** 🔥

Need help? **dev@phoenixforge.ai** | Join us on **Discord**
