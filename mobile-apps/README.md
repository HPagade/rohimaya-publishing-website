# PhoenixForge AI - Mobile Apps

This directory contains the React Native mobile applications for iOS and Android.

## 🎯 Overview

The PhoenixForge mobile apps provide full access to all platform features on mobile devices:
- AI Manuscript Formatter
- Book Cover Generator  
- Image Creator
- Video Trailer Maker
- Audiobook Narrator
- Dashboard and account management

## 📱 Tech Stack

- **React Native** 0.72+
- **Expo** (for easier development and deployment)
- **TypeScript** for type safety
- **React Navigation** for routing
- **AsyncStorage** for local data
- **Axios** for API calls
- **React Native Paper** for UI components

## 🚀 Quick Start

### Prerequisites

```bash
# Install Node.js 18+
node --version

# Install Expo CLI
npm install -g expo-cli

# For iOS development (Mac only)
xcode-select --install

# For Android development
# Install Android Studio with Android SDK
```

### Installation

```bash
cd mobile-apps
npm install
```

### Running the App

**Development with Expo (Recommended for testing):**
```bash
# Start Expo dev server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Scan QR code with Expo Go app to test on physical device
```

**Native Development:**
```bash
# iOS (Mac only)
cd ios
pod install
cd ..
npx react-native run-ios

# Android
npx react-native run-android
```

## 📁 Project Structure

```
mobile-apps/
├── App.tsx                 # Main app entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies
│
├── src/
│   ├── screens/            # App screens
│   │   ├── HomeScreen.tsx
│   │   ├── FormatterScreen.tsx
│   │   ├── CoversScreen.tsx
│   │   ├── ImagesScreen.tsx
│   │   └── DashboardScreen.tsx
│   │
│   ├── components/         # Reusable components
│   │   ├── Header.tsx
│   │   ├── FeatureCard.tsx
│   │   └── LoadingOverlay.tsx
│   │
│   ├── navigation/         # Navigation setup
│   │   └── AppNavigator.tsx
│   │
│   ├── services/           # API services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── storage.ts
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useApi.ts
│   │
│   ├── utils/              # Utilities
│   │   └── helpers.ts
│   │
│   └── types/              # TypeScript types
│       └── index.ts
│
├── ios/                    # iOS native code
│   └── Podfile
│
└── android/                # Android native code
    └── build.gradle
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```bash
API_URL=https://api.phoenixforge.ai
EXPO_PUBLIC_API_KEY=your_api_key_here
```

### App Configuration

Edit `app.json`:
```json
{
  "expo": {
    "name": "PhoenixForge AI",
    "slug": "phoenixforge-ai",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "backgroundColor": "#FF6B35"
    },
    "ios": {
      "bundleIdentifier": "com.phoenixforge.ai",
      "supportsTablet": true
    },
    "android": {
      "package": "com.phoenixforge.ai",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FF6B35"
      }
    }
  }
}
```

## 📦 Building for Production

### iOS Build

**Using Expo (Easiest):**
```bash
# Build for App Store
expo build:ios

# Download and submit to App Store Connect
```

**Native Build:**
```bash
cd ios
xcodebuild -workspace PhoenixForge.xcworkspace \
           -scheme PhoenixForge \
           -configuration Release \
           -archivePath ./build/PhoenixForge.xcarchive \
           archive
```

### Android Build

**Using Expo:**
```bash
# Build APK for testing
expo build:android -t apk

# Build AAB for Play Store
expo build:android -t app-bundle
```

**Native Build:**
```bash
cd android
./gradlew assembleRelease

# APK will be at:
# android/app/build/outputs/apk/release/app-release.apk
```

## 🏪 App Store Submission

### iOS - App Store

1. **Prepare in Xcode:**
   - Open `ios/PhoenixForge.xcworkspace`
   - Set version and build number
   - Configure signing & capabilities
   - Select "Any iOS Device" as target

2. **Archive:**
   - Product → Archive
   - Wait for archive to complete
   - Distribute App → App Store Connect

3. **App Store Connect:**
   - Log in to https://appstoreconnect.apple.com
   - Create new app
   - Fill in app information
   - Upload screenshots (use provided templates)
   - Submit for review

**Required Screenshots:**
- 6.5" iPhone (1284 x 2778)
- 5.5" iPhone (1242 x 2208)
- 12.9" iPad (2048 x 2732)

### Android - Google Play

1. **Generate Signed APK:**
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

2. **Google Play Console:**
   - Go to https://play.google.com/console
   - Create new application
   - Fill in store listing details
   - Upload AAB file
   - Set pricing (Free)
   - Submit for review

**Required Screenshots:**
- Phone (16:9) - 1080 x 1920 minimum
- 7" Tablet - 1024 x 600 minimum
- 10" Tablet - 1280 x 800 minimum

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

## 🔐 Security

### Code Signing

**iOS:**
- Use Apple Developer account
- Create provisioning profiles
- Configure in Xcode

**Android:**
- Generate keystore:
  ```bash
  keytool -genkeypair -v -keystore phoenixforge.keystore \
          -alias phoenixforge -keyalg RSA -keysize 2048 \
          -validity 10000
  ```

### API Security

- Use HTTPS only
- Store API keys securely
- Implement proper authentication
- Use certificate pinning for production

## 📱 Features by Platform

### iOS
- ✅ Face ID / Touch ID authentication
- ✅ Share Extension
- ✅ Widgets (coming soon)
- ✅ Siri Shortcuts (coming soon)

### Android
- ✅ Fingerprint authentication
- ✅ Share functionality
- ✅ Widgets (coming soon)
- ✅ Google Assistant actions (coming soon)

## 🐛 Troubleshooting

### Common Issues

**"Command not found: expo"**
```bash
npm install -g expo-cli
```

**"Unable to resolve module..."**
```bash
rm -rf node_modules
npm install
npm start -- --reset-cache
```

**iOS build fails:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**Android build fails:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## 📈 Monitoring & Analytics

- **Crash Reporting:** Sentry
- **Analytics:** Firebase Analytics
- **Performance:** Firebase Performance
- **User Feedback:** In-app feedback form

## 🔄 Updates

### Over-the-Air (OTA) Updates

Using Expo Updates:
```bash
# Publish update
expo publish

# Users get update automatically
# No app store submission needed for JS changes
```

### App Store Updates

For native code changes:
1. Increment version in `app.json`
2. Build new version
3. Submit to App Store/Play Store

## 📞 Support

- **Issues:** GitHub Issues
- **Questions:** support@phoenixforge.ai
- **Documentation:** https://docs.phoenixforge.ai/mobile

## 🚢 Release Checklist

Before releasing:
- [ ] Update version in `app.json`
- [ ] Test on physical iOS device
- [ ] Test on physical Android device
- [ ] Verify all API endpoints work
- [ ] Test payment flow
- [ ] Review app store screenshots
- [ ] Update changelog
- [ ] Create release notes
- [ ] Submit for review

## 📝 License

Proprietary - © 2025 Rohimaya Publishing, LLC

---

**Ready to build?** Run `npm install && npm start` to begin! 🚀
