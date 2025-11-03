# 📱 Mobile App Store Deployment Guide

Complete guide for deploying PhoenixForge AI mobile apps to iOS App Store and Google Play Store.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [iOS App Store Deployment](#ios-app-store-deployment)
3. [Android Play Store Deployment](#android-play-store-deployment)
4. [Testing Before Submission](#testing-before-submission)
5. [App Store Optimization](#app-store-optimization)

---

## Prerequisites

### General Requirements
- ✅ Apple Developer Account ($99/year)
- ✅ Google Play Developer Account ($25 one-time)
- ✅ App content ready (screenshots, descriptions, icons)
- ✅ Privacy policy URL
- ✅ Terms of service URL
- ✅ Support email address

### Technical Requirements
- ✅ Mac computer (for iOS builds)
- ✅ Xcode 14+ (for iOS)
- ✅ Android Studio (for Android)
- ✅ Expo account (free)
- ✅ Working app tested on physical devices

---

## iOS App Store Deployment

### Step 1: Prepare App

1. **Update App Information**

Edit `mobile-apps/app.json`:
```json
{
  "expo": {
    "name": "PhoenixForge AI",
    "slug": "phoenixforge-ai",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.phoenixforge.ai",
      "buildNumber": "1",
      "supportsTablet": true,
      "icon": "./assets/icon.png"
    }
  }
}
```

2. **Create App Icons**

Required sizes:
- App Icon: 1024x1024 (no transparency)
- Notification Icon: 20x20, 40x40, 60x60, 80x80, 120x120, 180x180

Place in `mobile-apps/assets/`

3. **Create Splash Screen**

- Size: 2048x2048
- Background color in `app.json`

### Step 2: Build with Expo

**Option A: Expo Build Service (Easiest)**

```bash
cd mobile-apps

# Install Expo CLI
npm install -g expo-cli

# Login to Expo
expo login

# Build for iOS
expo build:ios

# Follow prompts:
# - Select "Archive" (for App Store)
# - Let Expo handle certificates (recommended)
# - Wait 10-20 minutes for build
```

**Option B: Local Build with EAS**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Configure
eas build:configure

# Build
eas build --platform ios

# Download IPA when complete
```

### Step 3: App Store Connect Setup

1. **Go to App Store Connect**
   - Visit: https://appstoreconnect.apple.com
   - Click "My Apps" → "+" → "New App"

2. **Fill App Information**
   - Platform: iOS
   - Name: PhoenixForge AI
   - Primary Language: English
   - Bundle ID: com.phoenixforge.ai
   - SKU: phoenixforge-ai-001

3. **Add App Information**
   - Category: Productivity
   - Subcategory: Business
   - Content Rights: Select appropriate
   - Age Rating: 4+

4. **Prepare Pricing**
   - Free app
   - Available in all territories

### Step 4: Upload Screenshots

Required screenshots for:
- **6.5" iPhone** (1284 x 2778 pixels) - 3-10 screenshots
- **5.5" iPhone** (1242 x 2208 pixels) - 3-10 screenshots  
- **12.9" iPad Pro** (2048 x 2732 pixels) - 3-10 screenshots

**Creating Screenshots:**

1. Run app on simulator:
```bash
cd mobile-apps
npm run ios
```

2. In simulator: `Cmd + S` to save screenshot
3. Or use provided template screenshots

**Screenshot Content Ideas:**
1. Landing/Home screen
2. Manuscript formatter in action
3. Cover generator with examples
4. Dashboard view
5. Results/download screen

### Step 5: Write App Description

**App Name (30 chars max):**
```
PhoenixForge AI
```

**Subtitle (30 chars max):**
```
AI-Powered Book Creation
```

**Description (4000 chars max):**
```
PhoenixForge AI - Where Stories Take Shape

Transform your manuscript into a professionally published book with the power of AI. PhoenixForge AI provides authors and publishers with cutting-edge tools for manuscript formatting, cover design, image creation, and more.

🎯 KEY FEATURES:

📄 AI Manuscript Formatter
• Automatic chapter detection with GPT-4
• Professional formatting in minutes
• Export to ePub, PDF, and print-ready formats
• 20+ genre-specific templates

🎨 AI Cover Generator
• Create stunning book covers with DALL-E 3
• 6 unique variations in 2 minutes
• Print-ready at 300 DPI
• 30+ genre templates

🖼️ AI Image Creator
• Generate unlimited custom images
• Character consistency across images
• Style matching
• Commercial license included

🎬 Video Trailer Maker
• Professional book trailers
• AI voiceover with 50+ voices
• Music library included
• Social media ready formats

🎙️ Audiobook Narrator
• Convert text to professional narration
• 50+ natural-sounding voices
• Multiple languages
• ACX-compliant output

💰 PRICING:

• Spark: $29/month - Perfect for starting authors
• Blaze: $49/month - Best value, unlimited covers
• Inferno: $99/month - Everything unlimited

✨ WHY PHOENIXFORGE AI?

• 10X faster than traditional methods
• 10X cheaper than hiring freelancers
• Professional quality guaranteed
• Powered by latest AI technology
• Trusted by 1,000+ authors worldwide

🔒 SECURITY & PRIVACY:

• Your content is secure and private
• Commercial license for all generated content
• GDPR compliant
• No data retention after export

Perfect for:
✓ Solo authors
✓ Publishing houses
✓ Literary agencies
✓ Content creators

Download now and start creating professionally published books today!

Support: support@phoenixforge.ai
Privacy Policy: phoenixforge.ai/privacy
Terms: phoenixforge.ai/terms
```

**Keywords (100 chars max):**
```
book,author,writing,publishing,ebook,cover,design,AI,formatting,epub,pdf
```

**Support URL:**
```
https://phoenixforge.ai/support
```

**Marketing URL:**
```
https://phoenixforge.ai
```

**Privacy Policy URL:**
```
https://phoenixforge.ai/privacy
```

### Step 6: Upload Build

1. **Using Expo:**
```bash
# After build completes, download IPA
# Upload via Transporter app or Xcode
```

2. **Using Transporter App:**
   - Download from Mac App Store
   - Open and sign in
   - Drag IPA file
   - Click "Deliver"

3. **Using Xcode:**
   - Open Xcode
   - Window → Organizer
   - Select archive
   - Distribute App → App Store Connect

### Step 7: Submit for Review

1. In App Store Connect, go to your app
2. Select "1.0 Prepare for Submission"
3. Fill all required information
4. Upload screenshots for all device types
5. Select build
6. Click "Submit for Review"

**Review Time:** Usually 24-48 hours

### Step 8: App Review Information

**Contact Information:**
- First/Last Name
- Phone Number
- Email: support@phoenixforge.ai

**Demo Account (if needed):**
```
Username: demo@phoenixforge.ai
Password: DemoPass123!
```

**Notes for Reviewer:**
```
PhoenixForge AI is an AI-powered creative suite for authors and publishers. 

To test the app:
1. Sign up with demo account or create new account
2. Try the manuscript formatter with sample text
3. Generate a book cover
4. View dashboard

All AI features are fully functional. Some features require subscription for unlimited use, but demo mode works without payment.

Contact: support@phoenixforge.ai for any questions during review.
```

---

## Android Play Store Deployment

### Step 1: Prepare App

1. **Update app.json:**
```json
{
  "expo": {
    "android": {
      "package": "com.phoenixforge.ai",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B35"
      },
      "permissions": [
        "INTERNET",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

2. **Create App Icons:**
- Adaptive Icon: 432x432 (foreground)
- Background color: #FF6B35

### Step 2: Build APK/AAB

```bash
cd mobile-apps

# Build AAB for Play Store
expo build:android -t app-bundle

# Or build APK for testing
expo build:android -t apk

# Wait for build (15-20 minutes)
# Download when complete
```

**Using EAS:**
```bash
eas build --platform android
```

### Step 3: Play Console Setup

1. **Create App:**
   - Go to: https://play.google.com/console
   - Create App
   - Name: PhoenixForge AI
   - Default language: English
   - App or game: App
   - Free or paid: Free

2. **Set Up Store Listing:**
   - Short description (80 chars):
   ```
   AI-powered book creation tools. Format, design covers, create images & more.
   ```
   
   - Full description (4000 chars): Use iOS description above
   
3. **Upload Assets:**

**App Icon:**
- 512 x 512 PNG
- 32-bit with alpha

**Feature Graphic:**
- 1024 x 500 PNG or JPEG
- No alpha

**Phone Screenshots:**
- At least 2 screenshots
- JPEG or 24-bit PNG
- Min 320px, max 3840px
- Max aspect ratio: 2:1

**Tablet Screenshots (optional but recommended):**
- 7-inch and 10-inch
- Same requirements as phone

**Creating Screenshots on Android:**
```bash
# Run on emulator
npm run android

# Take screenshot
# Emulator → Extended Controls → Screenshots
# Or adb shell screencap
```

4. **Categorization:**
   - App category: Productivity
   - Tags: Books, Writing, Publishing

5. **Contact Details:**
   - Email: support@phoenixforge.ai
   - Phone: Optional
   - Website: https://phoenixforge.ai

6. **Privacy Policy:**
   - URL: https://phoenixforge.ai/privacy

### Step 4: Content Rating

1. Start questionnaire
2. Select app category: Utility, Productivity, Communication, or Other
3. Answer all questions honestly
4. Most answers will be "No" for content
5. Submit for rating

**Expected Rating:** Everyone (equivalent to 4+ on iOS)

### Step 5: Upload APK/AAB

1. **Production Track:**
   - Go to "Production"
   - Create new release
   - Upload AAB file
   - Release name: "1.0.0 - Initial Release"
   
2. **Release Notes:**
```
🔥 Welcome to PhoenixForge AI v1.0!

Transform your manuscript into professionally published books with AI.

Features:
• AI-powered manuscript formatting
• Book cover generation with DALL-E 3
• Unlimited image creation
• Video trailer maker
• Audiobook narration

Perfect for authors, publishers, and content creators.

Support: support@phoenixforge.ai
```

3. **Save and review**

### Step 6: Pricing & Distribution

1. **Countries:**
   - Select "All countries" or specific ones
   - Review excluded countries

2. **Pricing:**
   - Free
   - Contains ads: No
   - In-app purchases: Yes (if applicable)

3. **Content Guidelines:**
   - Review and accept all policies

### Step 7: Submit for Review

1. Complete all sections
2. Review rollout  
3. Start rollout to production

**Review Time:** Usually 1-3 days (faster than iOS)

---

## Testing Before Submission

### iOS Testing

**TestFlight (Beta Testing):**
```bash
# Build for TestFlight
expo build:ios

# In App Store Connect:
# - Go to TestFlight
# - Add internal testers (up to 100)
# - Add external testers (up to 10,000)
```

**Testing Checklist:**
- [ ] App launches without crashing
- [ ] All features work as expected
- [ ] Navigation is smooth
- [ ] Forms validate correctly
- [ ] API calls work
- [ ] Offline mode (if applicable)
- [ ] Push notifications (if applicable)
- [ ] In-app purchases (if applicable)

### Android Testing

**Internal Testing:**
```bash
# Upload AAB to Internal Testing track
# Add testers by email
# They can download from Play Store
```

**Open Testing:**
- Make app available to unlimited testers
- Get feedback before production release

---

## App Store Optimization (ASO)

### Keywords Research

**For iOS:**
- Use tools like App Annie, Sensor Tower
- Target keywords with good volume, low competition
- Update every version

**For Android:**
- Keywords in title and description matter
- Use all available characters
- Include variations and synonyms

### Conversion Optimization

1. **Icon:**
   - Clear, recognizable at small sizes
   - Uses brand colors (#FF6B35)
   - Stands out from competitors

2. **Screenshots:**
   - Show value proposition immediately
   - Use captions/text overlays
   - Show actual features
   - Include social proof if possible

3. **Description:**
   - Benefits before features
   - Use bullet points
   - Include social proof
   - Clear call to action

### Ratings & Reviews

- Prompt users at positive moments
- Respond to all reviews
- Update app regularly
- Fix bugs quickly

---

## Post-Launch

### Monitor Metrics

- Downloads
- Daily/Monthly Active Users
- Retention rates
- Crash reports
- User reviews

### Regular Updates

- Bug fixes every 2-3 weeks
- New features monthly
- Keep app store listing fresh
- Update screenshots with new features

### Support

- Monitor support email
- Respond within 24 hours
- Track common issues
- Document FAQs

---

## Troubleshooting

### iOS Rejections

**Common reasons:**
- Incomplete information
- Broken links
- App crashes
- Misleading screenshots
- Violates guidelines

**Fix:** Address issues and resubmit (usually quick re-review)

### Android Rejections

**Common reasons:**
- Privacy policy issues
- Permissions not justified
- Malware detected
- Deceptive behavior

**Fix:** Read rejection carefully, fix issues, resubmit

---

## Resources

- [Apple App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)
- [Expo Documentation](https://docs.expo.dev/)
- [App Store Connect](https://appstoreconnect.apple.com/)
- [Google Play Console](https://play.google.com/console/)

---

**Questions?** Contact support@phoenixforge.ai

**Last updated:** November 3, 2025
