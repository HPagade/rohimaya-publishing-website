# 🦚 Manuscript Formatter - Rohimaya Publishing

**Professional Manuscript Formatting for Publishers**

## Overview

Format your manuscripts for major publishing platforms including Amazon KDP, IngramSpark, and EPUB. Features AI-powered chapter detection, customizable trim sizes, margins, typography, and professional export options.

## Features

- **Multi-Platform Support:** Amazon KDP, IngramSpark, EPUB, Generic PDF
- **Trim Sizes:** 6x9, 5x8, 5.5x8.5, and more
- **AI Chapter Detection:** Automatically detect chapter breaks
- **Custom Typography:** Font family, size, line spacing
- **Flexible Margins:** Adjust all four margins independently
- **Front Matter:** Table of contents, copyright page, dedication
- **Export Formats:** TXT, MD, HTML (with PDF coming soon)

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy the key (starts with `sk-`)

### 3. Configure Secrets

Create `.streamlit/secrets.toml` and add your API key:

```toml
OPENAI_API_KEY = "sk-YOUR_KEY_HERE"
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
git commit -m "Add Manuscript Formatter app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/manuscript_formatter/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### 1. Upload Your Manuscript

- Supports TXT, DOCX, MD, PDF
- Or paste text directly

### 2. Configure Settings

- Select publishing platform (KDP, IngramSpark, etc.)
- Choose trim size
- Set margins (inches)
- Pick font and typography

### 3. AI Chapter Detection

- Click "Detect Chapters with AI"
- Review detected chapters
- Manually adjust if needed

### 4. Preview

- See formatted manuscript
- Check statistics (words, pages, chapters)

### 5. Export

- Choose format (TXT, MD, HTML)
- Download formatted manuscript
- Ready for publishing!

## Supported Formats

### Trim Sizes
- 6 x 9 inches (Trade) - Most common for fiction
- 5 x 8 inches (Digest) - Popular for novels
- 5.5 x 8.5 inches (US Trade)
- 5.25 x 8 inches (Literary)
- 8.5 x 11 inches (Large format)

### Publishing Platforms
- **Amazon KDP:** Optimized for Kindle Direct Publishing
- **IngramSpark:** Print-on-demand formatting
- **EPUB:** Digital e-book format
- **Generic PDF:** Universal format
- **Custom:** Your own specifications

## Brand Colors (Rohimaya Publishing)

- **Phoenix Fire Orange:** #FF8C42
- **Phoenix Gold:** #FFD700
- **Peacock Teal:** #4A9B9B
- **Midnight Navy:** #1A1A2E
- **Cream/Ivory:** #FFF8E7

## Usage Tips

1. **Upload full manuscript:** Include all chapters for best results
2. **Use AI detection:** Let AI find chapter breaks automatically
3. **Preview before export:** Check formatting in Preview tab
4. **Match platform specs:** Use recommended trim sizes for your platform
5. **Save settings:** Note your settings for future manuscripts

## Cost Information

- Uses OpenAI GPT-4 Turbo for chapter detection
- ~$0.02-0.05 per manuscript analysis
- Monitor usage at: https://platform.openai.com/usage

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**File Upload Issues:**
- DOCX/PDF: Currently manual paste required
- TXT/MD: Direct upload supported

**Chapter Detection Not Working:**
- Ensure chapters are clearly marked
- Try manual chapter breaks
- Check AI response in error message

**Export Issues:**
- Check that manuscript is formatted first
- Try different export format
- Download button should appear after formatting

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Future Enhancements

- Direct DOCX and PDF parsing
- PDF export with proper pagination
- EPUB 3.0 export
- IngramSpark template export
- Batch processing multiple manuscripts
- Cover page designer integration

## Support

Questions? Contact: support@rohimayapublishing.com

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
