# PhoenixForge - Next.js 14 Production App

Production-ready publishing platform built with Next.js 14, Supabase, and Stripe.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- Supabase URL and keys
- OpenAI API key
- Stripe keys and Price IDs

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## Project Structure

```
nextjs-app/
├── app/
│   ├── api/
│   │   ├── format/
│   │   │   ├── analyze/route.ts    # Manuscript analysis
│   │   │   └── export/route.ts     # PDF/EPUB export
│   │   └── stripe/
│   │       ├── create-checkout/    # Checkout sessions
│   │       └── webhook/            # Subscription events
│   ├── auth/
│   │   └── callback/               # OAuth callback
│   ├── dashboard/
│   │   └── page.tsx                # User dashboard
│   ├── formatter/
│   │   └── page.tsx                # AI Formatter UI
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── pricing/
│   │   └── page.tsx                # Pricing & plans
│   ├── signup/
│   │   └── page.tsx                # Signup page
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Landing page
├── components/
│   └── AuthButton.tsx              # Auth UI component
├── lib/
│   ├── ai/
│   │   └── OpenAITextAnalyzer.ts   # AI text analysis
│   ├── parsers/
│   │   └── index.ts                # Document parsing
│   └── supabase/
│       └── server.ts               # Supabase client
├── next.config.js                  # Next.js config
├── tailwind.config.js              # Tailwind config
└── tsconfig.json                   # TypeScript config
```

## Features

### ✅ Phase 1 (Available Now)
- **AI Formatter**: Analyze & format manuscripts
- **Authentication**: Email + Google OAuth
- **Payments**: Stripe subscriptions
- **Dashboard**: Usage tracking & stats
- **Export**: PDF & EPUB download

### 🚧 Phase 2 (Coming Soon)
- AI Covers
- AI Images

### 📅 Phase 3 (Planned)
- Cookbook Formatter
- Health Content Generator
- Marketing Suite

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Hosting**: Vercel

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

See `.env.example` for all required variables.

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

## Deployment

See [DEPLOYMENT-GUIDE.md](../DEPLOYMENT-GUIDE.md) for complete deployment instructions.

**Quick Deploy:**
```bash
vercel --prod
```

## Cost Estimate

- **Vercel**: FREE
- **Supabase**: FREE (up to 500MB DB)
- **Stripe**: $0/month (2.9% + 30¢ per transaction)
- **OpenAI**: ~$5-10/month

**Total: $5-20/month** 🎯

## Support

For deployment help, see [DEPLOYMENT-GUIDE.md](../DEPLOYMENT-GUIDE.md)

## License

Proprietary - PhoenixForge AI Publishing Platform
