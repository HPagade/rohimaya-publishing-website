# 🦚 Audiobook Generator - Rohimaya Publishing

**Transform Manuscripts into Professional Audiobooks with AI**

## Overview

Convert your written manuscripts into professional audiobooks using ElevenLabs' advanced text-to-speech AI. Choose from multiple narrator voices, customize voice settings, and generate high-quality audio narration in minutes.

## Features

- **ElevenLabs Integration:** State-of-the-art text-to-speech AI
- **9 Professional Voices:** Male and female narrators with American accents
- **Voice Customization:** Adjust stability, clarity, and expression
- **Multiple Input Methods:** Paste text, upload files, or add chapters individually
- **Chapter-by-Chapter:** Process books one chapter at a time
- **Batch Processing:** Generate multiple audiobooks sequentially
- **Instant Preview:** Listen before downloading
- **MP3 Export:** Download audio files ready for distribution
- **Cost Estimation:** See pricing before generation

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get ElevenLabs API Key

1. Go to https://elevenlabs.io
2. Sign up for an account
3. Navigate to Profile → API Keys
4. Generate a new API key
5. Copy the key

### 3. Configure Secrets

Create `.streamlit/secrets.toml` and add your API key:

```toml
ELEVENLABS_API_KEY = "your_elevenlabs_api_key_here"
```

**Important:** Never commit secrets.toml to Git!

### 4. Add Logo File

Place `rohimaya-publishing-circle-logo.png` in the same directory as app.py.

### 5. Run Locally

```bash
streamlit run app.py
```

App will open at http://localhost:8501

## Deployment to Streamlit Cloud

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Audiobook Generator app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/audiobook_generator/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### Method 1: Single Manuscript

1. **Input Text tab:**
   - Select "Paste Text"
   - Paste your manuscript
   - See word count and estimated duration

2. **Sidebar:**
   - Choose narrator voice
   - Adjust stability and clarity
   - Review cost estimate

3. **Generate Audio tab:**
   - Click "Generate Full Audiobook"
   - Wait for generation (may take several minutes)
   - Or generate a sample first

4. **Preview & Download tab:**
   - Listen to preview
   - Download MP3 file

### Method 2: Chapter by Chapter

1. **Input Text tab:**
   - Select "Chapter by Chapter"
   - Enter chapter title and text
   - Click "Add Chapter"
   - Repeat for all chapters

2. **Generate Audio tab:**
   - Click "Generate All Chapters"
   - Progress bar shows generation status

3. **Preview & Download tab:**
   - Listen to chapters
   - Download individual or combined files

### Method 3: Batch Upload

1. **Batch Processing tab:**
   - Upload multiple TXT/MD files
   - Configure batch settings
   - Process all files at once

## Available Voices

### Female Narrators:
- **Rachel:** Calm, clear American voice
- **Domi:** Warm, friendly tone
- **Bella:** Professional, articulate
- **Elli:** Youthful, energetic

### Male Narrators:
- **Antoni:** Deep, authoritative
- **Josh:** Friendly, conversational
- **Arnold:** Strong, confident
- **Adam:** Clear, professional
- **Sam:** Versatile, natural

## Voice Settings

### Stability (0.0 - 1.0)
- **0.0 - 0.3:** Very expressive, variable (fiction, drama)
- **0.4 - 0.6:** Balanced (general narration)
- **0.7 - 1.0:** Consistent, stable (non-fiction, technical)

### Clarity (0.0 - 1.0)
- **0.5 - 0.7:** Natural variation
- **0.7 - 0.9:** Clear pronunciation (recommended)
- **0.9 - 1.0:** Maximum clarity (technical content)

## Cost Information

### ElevenLabs Pricing (approximate):
- **Free Tier:** 10,000 characters/month
- **Starter ($5/month):** 30,000 characters
- **Creator ($22/month):** 100,000 characters
- **Pro ($99/month):** 500,000 characters

### Per-Book Estimates:
- **Short story (5k words):** ~30k chars = $0.10-0.15
- **Novella (20k words):** ~120k chars = $0.40-0.60
- **Novel (80k words):** ~480k chars = $1.60-2.40
- **Epic (150k words):** ~900k chars = $3.00-4.50

Pricing: ~$0.30 per 1,000 characters

Monitor usage at: https://elevenlabs.io/usage

## Text Preparation Tips

### 1. Clean Your Manuscript
```
❌ Bad: "She said, 'I'll be there @ 3pm.'"
✅ Good: "She said, I'll be there at three PM."
```

### 2. Spell Out Numbers
```
❌ Bad: "The year was 1984."
✅ Good: "The year was nineteen eighty-four."
```

### 3. Pronunciation Guides
For unusual names, add phonetic spelling in parentheses:
```
"Hermione (her-MY-oh-nee) cast the spell..."
```

### 4. Remove Formatting
- No markdown symbols (*, _, #)
- No special characters (©, ®, ™)
- No excessive punctuation (!!!, ???)

### 5. Chapter Structure
```
Chapter One

[2-3 second pause - automatic]

The story begins...
```

## Output Formats

### MP3 (Default)
- Universal compatibility
- Good compression
- Supported everywhere

### M4B (Post-production)
- iTunes/Apple Books format
- Chapter markers support
- Recommended for audiobook platforms

### WAV (Uncompressed)
- Highest quality
- Large file size
- Professional editing

## Distribution Platforms

### Where to Sell Your Audiobooks:
1. **Audible/ACX:** Amazon's audiobook platform
2. **Findaway Voices:** Wide distribution
3. **Google Play Books:** Android users
4. **Apple Books:** iOS users
5. **Spotify:** Audiobook support
6. **Direct Sales:** Your own website

## Troubleshooting

**API Key Error:**
- Verify key in secrets.toml
- Check account has credits
- Ensure no extra spaces

**Generation Failed:**
- Check text length (max 5,000 chars per request)
- Enable auto-split for long chapters
- Verify internet connection

**Audio Quality Issues:**
- Increase clarity setting
- Choose different voice
- Clean manuscript text

**Slow Generation:**
- ElevenLabs takes 5-15 seconds per 1,000 characters
- This is normal for AI generation
- Use sample generation to test first

**Rate Limiting:**
- Free tier has strict limits
- Upgrade to paid plan
- Space out generation requests

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Advanced Features (Coming Soon)

- Audio editing and trimming
- Background music integration
- Multi-voice dialogue (character voices)
- Automatic chapter detection and splitting
- Direct upload to ACX/Findaway
- Audio quality analysis
- Pronunciation dictionary

## Legal & Usage

- Narration rights: You own the audio output
- Commercial use allowed
- ElevenLabs TOS apply
- Voice cloning requires permissions
- Ensure you have rights to the text

## Best Practices

### For Fiction:
1. Choose expressive voice
2. Lower stability (0.4-0.6)
3. Test dialogue sections
4. Consider character voices

### For Non-Fiction:
1. Choose clear, authoritative voice
2. Higher stability (0.7-0.8)
3. Emphasize clarity
4. Consistent pacing

### For Children's Books:
1. Energetic, warm voices
2. Medium stability (0.5)
3. Clear pronunciation
4. Engaging expression

## Support

Questions? Contact: support@rohimayapublishing.com

## Resources

- ElevenLabs Documentation: https://docs.elevenlabs.io
- Voice Samples: https://elevenlabs.io/voices
- Pricing Calculator: https://elevenlabs.io/pricing

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
