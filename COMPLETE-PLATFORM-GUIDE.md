# PhoenixForge Complete Platform Guide
## All 7 Apps + Mobile Deployment

This comprehensive guide covers the complete PhoenixForge platform with all 7 products, mobile app deployment, and multi-platform distribution.

---

## 🎯 Complete Product Suite

### ✅ Phase 1 - COMPLETED
1. **AI Formatter** - Professional manuscript formatting
2. **Audiobook Generator** - AI narration with 6 voices
3. **Book Cover Creator** - AI art + copywriting

### ✅ Phase 2 - COMPLETED
4. **AI Images Generator** - Illustrations and artwork

### 🚧 Phase 3 - TO IMPLEMENT
5. **Cookbook Formatter** - Recipe formatting with photos
6. **Health Content Generator** - Wellness articles and guides
7. **Marketing Suite** - Social media, emails, ads

---

## 📱 Platform Distribution Strategy

### **Web Application** (nextjs-app/)
- **Current Status**: Production-ready
- **Deployment**: Vercel
- **Access**: phoenixforge.com
- **Technology**: Next.js 14, React, TypeScript

### **iOS Mobile App**
- **Technology**: React Native + Expo
- **Distribution**: Apple App Store
- **Features**: All 7 products accessible
- **IAP**: Apple In-App Purchases

### **Android Mobile App**
- **Technology**: React Native + Expo (shared codebase)
- **Distribution**: Google Play Store
- **Features**: All 7 products accessible
- **IAP**: Google Play Billing

---

## 💰 Updated Pricing Model (All 7 Products)

### Tier 1: FREE
**Price**: $0/month
- 3 formats/month
- 1 audiobook chapter
- 0 covers
- 0 images
- 0 cookbooks
- 0 health content
- 0 marketing assets
- **Target**: Trial users, students

### Tier 2: CREATOR
**Price**: $29/month or $290/year (17% discount)
- 50 formats/month
- 10 audiobook chapters
- 5 covers
- 10 images
- 5 cookbooks
- 10 health articles
- 20 marketing assets
- Priority email support
- HD quality outputs
- **Target**: Individual authors, bloggers

### Tier 3: PROFESSIONAL
**Price**: $79/month or $790/year (17% discount)
- Unlimited formats
- Unlimited audiobooks
- 20 covers/month
- 50 images/month
- 20 cookbooks/month
- 50 health articles/month
- 100 marketing assets/month
- Priority chat support
- Ultra HD quality
- API access
- White-label options
- **Target**: Publishing houses, agencies, content creators

### Tier 4: ENTERPRISE (New)
**Price**: Custom pricing (starts at $299/month)
- Unlimited everything
- Dedicated account manager
- Custom AI model training
- Priority processing queue
- SLA guarantees (99.9% uptime)
- Team management (up to 50 users)
- Custom integrations
- On-premise deployment option
- **Target**: Large publishers, corporations

---

## 🏗️ Mobile App Architecture

### Project Structure
```
mobile-app/
├── app/                      # Expo Router (file-based routing)
│   ├── (tabs)/
│   │   ├── index.tsx         # Home/Dashboard
│   │   ├── formatter.tsx     # AI Formatter
│   │   ├── audiobook.tsx     # Audiobook Generator
│   │   ├── covers.tsx        # Book Covers
│   │   ├── images.tsx        # AI Images
│   │   ├── cookbook.tsx      # Cookbook Formatter
│   │   ├── health.tsx        # Health Content
│   │   └── marketing.tsx     # Marketing Suite
│   ├── auth/
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── pricing.tsx
│   └── _layout.tsx           # Root layout
├── components/
│   ├── AuthButton.tsx
│   ├── UsageWidget.tsx
│   └── FileUploader.tsx
├── lib/
│   ├── api.ts                # API client
│   ├── supabase.ts           # Supabase client
│   └── types.ts              # TypeScript types
├── app.json                  # Expo configuration
├── package.json
└── eas.json                  # Expo Application Services config
```

### Key Technologies
- **Expo SDK 50+**: Simplifies iOS/Android development
- **Expo Router**: File-based navigation
- **React Native Paper**: Material Design UI components
- **Supabase Auth**: OAuth + Email authentication
- **Expo File System**: File uploads
- **Expo In-App Purchases**: Subscriptions
- **Expo Notifications**: Push notifications for job completion

---

## 📦 Phase 3 Apps Implementation

### 5. Cookbook Formatter (`/cookbook`)

**Features:**
- Recipe card formatting
- Ingredient lists with measurements
- Cooking instructions (numbered steps)
- Nutritional information calculator
- Photo placeholders or AI-generated food images
- Multiple layout options (classic, modern, minimalist)
- Dietary tags (vegan, gluten-free, keto, etc.)
- Export to PDF with professional layout

**API Endpoints:**
```
POST /api/cookbook/analyze - Parse recipes from text
POST /api/cookbook/format - Format cookbook with styles
POST /api/cookbook/nutrition - Calculate nutrition facts
POST /api/cookbook/generate-images - AI food photography
POST /api/cookbook/export - Generate PDF cookbook
```

**Pricing:**
- Free: 0 cookbooks/month
- Creator: 5 cookbooks/month
- Professional: 20 cookbooks/month
- Enterprise: Unlimited

---

### 6. Health Content Generator (`/health`)

**Features:**
- Workout plan generator (gym, home, bodyweight)
- Meal plan creator (weight loss, muscle gain, maintenance)
- Health article writer (evidence-based, SEO-optimized)
- Wellness guide generator
- Habit tracker templates
- Progress log templates
- Motivational content
- Medical disclaimer generation

**API Endpoints:**
```
POST /api/health/workout - Generate workout plans
POST /api/health/meal-plan - Create meal plans
POST /api/health/article - Write health articles
POST /api/health/guide - Generate wellness guides
POST /api/health/disclaimer - Generate medical disclaimers
```

**Content Types:**
- Workout Plans (beginner, intermediate, advanced)
- Meal Plans (1200-3000 calories)
- Articles (500-2000 words)
- Guides (comprehensive, step-by-step)

**Pricing:**
- Free: 0 pieces/month
- Creator: 10 pieces/month
- Professional: 50 pieces/month
- Enterprise: Unlimited

---

### 7. Marketing Suite (`/marketing`)

**Features:**
- Social media post generator (Twitter, Instagram, Facebook, LinkedIn)
- Email campaign templates
- Ad copy writer (Google Ads, Facebook Ads)
- Book description optimizer
- Landing page copy
- Press release generator
- Hashtag suggestions
- A/B test variations
- Multi-platform scheduling

**API Endpoints:**
```
POST /api/marketing/social - Generate social media posts
POST /api/marketing/email - Create email campaigns
POST /api/marketing/ad-copy - Write ad copy
POST /api/marketing/description - Optimize book descriptions
POST /api/marketing/press-release - Generate press releases
POST /api/marketing/hashtags - Suggest relevant hashtags
```

**Output Formats:**
- Social Posts: Optimized for character limits
- Email: HTML + Plain text versions
- Ads: Multiple variations for A/B testing
- Descriptions: SEO-optimized, keyword-rich

**Pricing:**
- Free: 0 assets/month
- Creator: 20 assets/month
- Professional: 100 assets/month
- Enterprise: Unlimited

---

## 🚀 Deployment Guide

### Part 1: Web Application (Vercel)

#### Prerequisites
1. Vercel account
2. GitHub repository
3. Environment variables configured

#### Steps
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
cd nextjs-app
vercel --prod

# 4. Set environment variables in Vercel Dashboard
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- OPENAI_API_KEY
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET

# 5. Configure custom domain (optional)
vercel domains add phoenixforge.com
```

**Production URL**: `https://phoenixforge.vercel.app`

---

### Part 2: iOS App Store Deployment

#### Prerequisites
1. Apple Developer Account ($99/year)
2. Mac with Xcode installed
3. Expo EAS account (free)

#### Step-by-Step

**1. Set up Expo Project**
```bash
# Install Expo CLI
npm install -g expo-cli eas-cli

# Create mobile app
cd /path/to/project
expo init mobile-app --template blank-typescript

# Install dependencies
cd mobile-app
npm install @supabase/supabase-js
npm install expo-router expo-file-system expo-document-picker
npm install react-native-paper react-native-safe-area-context
```

**2. Configure app.json**
```json
{
  "expo": {
    "name": "PhoenixForge",
    "slug": "phoenixforge",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.phoenixforge.app",
      "buildNumber": "1.0.0",
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to scan documents.",
        "NSPhotoLibraryUsageDescription": "This app needs access to your photos to upload manuscripts."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.phoenixforge.app",
      "versionCode": 1
    },
    "plugins": [
      "expo-router",
      "expo-document-picker"
    ]
  }
}
```

**3. Configure EAS Build**
```bash
# Initialize EAS
eas build:configure

# This creates eas.json
```

**eas.json:**
```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "ios": {
        "autoIncrement": true
      },
      "android": {
        "autoIncrement": true
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@email.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDEFGHIJ"
      },
      "android": {
        "serviceAccountKeyPath": "./google-play-service-account.json"
      }
    }
  }
}
```

**4. Build iOS App**
```bash
# Build for iOS
eas build --platform ios --profile production

# This will:
# - Upload your code to Expo servers
# - Build the app in the cloud
# - Generate an IPA file
# - Provide a download link
```

**5. Submit to App Store**
```bash
# Automatically submit to App Store
eas submit --platform ios --profile production

# Or manually:
# 1. Download IPA from Expo dashboard
# 2. Open Xcode
# 3. Use Transporter app to upload IPA
# 4. Go to App Store Connect
# 5. Create new app listing
# 6. Fill in metadata (description, screenshots, etc.)
# 7. Submit for review
```

**App Store Metadata:**
- **App Name**: PhoenixForge - AI Publishing Suite
- **Subtitle**: Format, Narrate & Design Books with AI
- **Description**: (See marketing copy below)
- **Keywords**: book, formatting, audiobook, ai, publishing, cover, design, author, writer
- **Category**: Productivity, Business
- **Age Rating**: 4+
- **Screenshots**: Required sizes (6.7", 6.5", 5.5")
- **App Preview Video**: Optional but recommended

---

### Part 3: Google Play Store Deployment

#### Steps

**1. Build Android APK/AAB**
```bash
# Build for Android
eas build --platform android --profile production

# This generates an AAB (Android App Bundle)
```

**2. Create Google Play Console Account**
- Go to play.google.com/console
- Pay $25 one-time registration fee
- Create developer account

**3. Create App**
- Click "Create app"
- Fill in app details:
  - App name: PhoenixForge
  - Default language: English
  - App or game: App
  - Free or paid: Free
- Accept declarations

**4. Set Up App**

**Store Listing:**
- App name: PhoenixForge - AI Publishing Suite
- Short description: Transform manuscripts into professional books with AI
- Full description: (See marketing copy below)
- App icon: 512x512 PNG
- Feature graphic: 1024x500 PNG
- Screenshots: At least 2 per device type

**Content Rating:**
- Fill out questionnaire
- Should receive E (Everyone) rating

**Target Audience:**
- Age: 18+
- Content: Educational/Productivity

**App Content:**
- Privacy policy URL
- Data safety form
- Advertising: No
- In-app purchases: Yes

**5. Submit AAB**
```bash
# Automated submission
eas submit --platform android --profile production

# Or manual:
# 1. Go to Play Console > Production
# 2. Create new release
# 3. Upload AAB file
# 4. Fill in release notes
# 5. Review and roll out
```

**6. In-App Purchases Setup**
- Create products matching web tiers:
  - `creator_monthly` - $29
  - `creator_yearly` - $290
  - `professional_monthly` - $79
  - `professional_yearly` - $790

**7. Review Process**
- Google typically reviews in 1-3 days
- Be prepared to respond to questions
- May need to provide demo video

---

## 💳 In-App Purchase Implementation

### iOS (Apple StoreKit)

```typescript
// lib/iap-ios.ts
import * as StoreReview from 'expo-store-review'
import * as InAppPurchases from 'expo-in-app-purchases'

const PRODUCT_IDS = {
  creator_monthly: 'com.phoenixforge.creator.monthly',
  creator_yearly: 'com.phoenixforge.creator.yearly',
  professional_monthly: 'com.phoenixforge.professional.monthly',
  professional_yearly: 'com.phoenixforge.professional.yearly',
}

export async function initializeIAP() {
  await InAppPurchases.connectAsync()
  const { responseCode, results } = await InAppPurchases.getProductsAsync(
    Object.values(PRODUCT_IDS)
  )
  return results
}

export async function purchaseProduct(productId: string) {
  const { responseCode, results } = await InAppPurchases.purchaseItemAsync(productId)

  if (responseCode === InAppPurchases.IAPResponseCode.OK) {
    // Verify purchase with backend
    const receipt = results?.[0]?.transactionReceipt
    await verifyPurchase(receipt)
  }
}

async function verifyPurchase(receipt: string) {
  await fetch('https://api.phoenixforge.com/api/iap/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ receipt, platform: 'ios' }),
  })
}
```

### Android (Google Play Billing)

```typescript
// lib/iap-android.ts
import * as InAppPurchases from 'expo-in-app-purchases'

const PRODUCT_IDS = {
  creator_monthly: 'creator_monthly',
  creator_yearly: 'creator_yearly',
  professional_monthly: 'professional_monthly',
  professional_yearly: 'professional_yearly',
}

export async function initializeIAP() {
  await InAppPurchases.connectAsync()
  const { responseCode, results } = await InAppPurchases.getProductsAsync(
    Object.values(PRODUCT_IDS)
  )
  return results
}

export async function purchaseSubscription(productId: string) {
  const { responseCode, results } = await InAppPurchases.purchaseItemAsync(productId)

  if (responseCode === InAppPurchases.IAPResponseCode.OK) {
    // Verify purchase with Google Play
    const purchaseToken = results?.[0]?.purchaseToken
    await verifyPurchase(purchaseToken)
  }
}

async function verifyPurchase(token: string) {
  await fetch('https://api.phoenixforge.com/api/iap/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, platform: 'android' }),
  })
}
```

---

## 📊 Revenue Model Breakdown

### Monthly Revenue Projections

**Year 1:**
| Users | Free | Creator | Professional | Enterprise | MRR |
|-------|------|---------|--------------|------------|-----|
| Month 1 | 100 | 10 | 2 | 0 | $448 |
| Month 3 | 500 | 50 | 10 | 1 | $2,539 |
| Month 6 | 2,000 | 200 | 40 | 5 | $10,660 |
| Month 12 | 10,000 | 1,000 | 200 | 20 | $51,800 |

**Revenue Sources:**
1. Web subscriptions (70%)
2. iOS in-app purchases (20%) - Apple takes 30%
3. Android in-app purchases (10%) - Google takes 30%

**Annual Projections:**
- Year 1: $300K-500K ARR
- Year 2: $1M-2M ARR (with marketing)
- Year 3: $3M-5M ARR (scale)

---

## 🔔 Push Notifications

### Implementation

```typescript
// lib/notifications.ts
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

export async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return null
  }

  const token = (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig?.extra?.eas?.projectId,
  })).data

  // Send token to backend
  await saveTokenToBackend(token)

  return token
}

async function saveTokenToBackend(token: string) {
  await fetch('https://api.phoenixforge.com/api/notifications/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })
}

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})
```

### Notification Triggers

Send push notifications when:
1. ✅ Audiobook generation complete
2. ✅ Book cover ready
3. ✅ Formatting job done
4. 📧 Monthly usage limit approaching
5. 💰 Payment successful
6. ⚠️ Payment failed
7. 🎉 New feature launched

---

## 📈 Marketing Copy

### App Store Description

**PhoenixForge - Transform Your Manuscript with AI**

Turn your book ideas into reality in minutes, not months. PhoenixForge is the complete AI-powered publishing suite for authors, bloggers, and content creators.

**🎯 What You Get:**

✨ **AI Formatter**
Professional manuscript formatting with automatic chapter detection, table of contents, and industry-standard layouts. Export to PDF, EPUB, and Kindle formats.

🎙️ **Audiobook Generator**
Transform your book into audiobooks with 6 professional AI voices. Choose narration speed, select chapters, and download HD audio files.

🎨 **Book Cover Creator**
Generate stunning book covers with AI art and copywriting. Get front, back, and spine designs ready for print.

📸 **AI Image Generator**
Create custom illustrations and artwork for your books in 6 different styles from photorealistic to watercolor.

📖 **Cookbook Formatter** (Pro)
Format recipe books with ingredient lists, cooking instructions, and nutritional information.

💪 **Health Content Generator** (Pro)
Generate workout plans, meal plans, and wellness articles with evidence-based content.

📣 **Marketing Suite** (Pro)
Create social media posts, email campaigns, and ad copy optimized for conversions.

**💰 Simple Pricing:**
- Free tier to try it out
- Creator: $29/month for individual authors
- Professional: $79/month for serious publishers
- Enterprise: Custom solutions for teams

**⚡ Why PhoenixForge?**
- Save $1000+ vs hiring formatters, narrators, and designers
- Complete your book in 15 minutes instead of weeks
- Professional quality guaranteed
- No technical skills required
- Cancel anytime

**🔒 Privacy & Security:**
Your manuscripts are encrypted and stored securely. We never share your content.

Start transforming your manuscripts today!

---

### Google Play Description

[Same as above, reformatted for Google Play's style]

---

## 🛠️ Technical Implementation Timeline

### Week 1-2: Phase 3 Apps (Web)
- [ ] Cookbook Formatter UI + API
- [ ] Health Content Generator UI + API
- [ ] Marketing Suite UI + API
- [ ] Test all features
- [ ] Deploy to Vercel

### Week 3-4: Mobile App Foundation
- [ ] Set up Expo project
- [ ] Implement authentication
- [ ] Create navigation structure
- [ ] Build reusable components
- [ ] Integrate with existing API

### Week 5-6: Mobile Features
- [ ] Implement all 7 product screens
- [ ] File upload functionality
- [ ] Image gallery
- [ ] Push notifications
- [ ] In-app purchases

### Week 7-8: Testing & Polish
- [ ] iOS testing on physical devices
- [ ] Android testing on various devices
- [ ] Fix bugs
- [ ] Performance optimization
- [ ] Beta testing with users

### Week 9-10: App Store Submission
- [ ] Create app store assets
- [ ] Write descriptions
- [ ] Submit to Apple
- [ ] Submit to Google
- [ ] Respond to review feedback

### Week 11-12: Launch & Marketing
- [ ] Soft launch to existing users
- [ ] Social media campaign
- [ ] Press release
- [ ] Product Hunt launch
- [ ] Monitor metrics

---

## 📊 Success Metrics

### KPIs to Track

**User Acquisition:**
- Daily active users (DAU)
- Monthly active users (MAU)
- App store downloads
- Web signups
- Conversion rate (free → paid)

**Engagement:**
- Jobs per user
- Time in app
- Feature usage by type
- Retention (D1, D7, D30)

**Revenue:**
- MRR (Monthly Recurring Revenue)
- ARPU (Average Revenue Per User)
- Churn rate
- LTV (Lifetime Value)
- CAC (Customer Acquisition Cost)

**Quality:**
- App store rating (target: 4.5+)
- Crash-free rate (target: 99.5%+)
- API response time (target: <2s)
- Job success rate (target: 95%+)

---

## 🎯 Next Steps

1. **Implement Phase 3 apps** (Cookbook, Health, Marketing)
2. **Set up mobile app project**
3. **Configure IAP for both platforms**
4. **Create app store assets**
5. **Build and test**
6. **Submit to stores**
7. **Launch marketing campaign**

---

## 📞 Support & Resources

- **Documentation**: docs.phoenixforge.com
- **API Reference**: api.phoenixforge.com/docs
- **Community**: community.phoenixforge.com
- **Email**: support@phoenixforge.com
- **Status**: status.phoenixforge.com

---

**Built with ❤️ for authors and content creators worldwide**

