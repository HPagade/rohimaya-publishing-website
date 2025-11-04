# 🦚 AI Cover Designer - Rohimaya Publishing

**Professional Book Cover Design with DALL-E 3**

## Overview

Create stunning, professional book covers using OpenAI's DALL-E 3. Perfect for indie authors, publishers, and anyone needing high-quality cover art. Generate unlimited variations until you find the perfect design.

## Features

- **DALL-E 3 Integration:** State-of-the-art AI image generation
- **14 Genres Supported:** Fantasy, Sci-Fi, Romance, Thriller, and more
- **11 Art Styles:** Photorealistic, Illustrated, Minimalist, Vintage, etc.
- **Color Palettes:** Pre-defined schemes or custom colors
- **Cover Gallery:** Save and compare multiple designs
- **High-Resolution:** HD quality, book cover ratio (1024x1792)
- **Instant Download:** Save covers as PNG files
- **Generation History:** Track all your cover experiments

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
git commit -m "Add AI Cover Designer app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/ai_cover_designer/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### 1. Enter Book Details

In the sidebar:
- **Book Title:** Your book's title (will appear on cover)
- **Author Name:** Your name as author
- **Genre:** Select from 14 genres
- **Art Style:** Choose visual style

### 2. Customize Design

- **Color Scheme:** Pre-defined palettes or custom colors
- **Mood/Atmosphere:** Describe emotional tone
- **Key Elements:** Specific imagery to include

### 3. Generation Settings

- **Quality:** Standard ($0.04) or HD ($0.08)
- **Size:** Book cover ratio (1024x1792) recommended

### 4. Generate

- Click **"Generate Cover"**
- Wait 10-30 seconds for AI generation
- View your cover

### 5. Iterate

- Click **"Generate Variation"** for similar designs
- Adjust settings and regenerate
- Save favorites to gallery

### 6. Download

- Click **"Download High-Res Cover"**
- Use for publishing, marketing, social media

## Supported Genres

1. Fantasy
2. Science Fiction
3. Romance
4. Mystery/Thriller
5. Horror
6. Literary Fiction
7. Historical Fiction
8. Young Adult
9. Children's Book
10. Non-Fiction
11. Biography/Memoir
12. Self-Help
13. Business
14. Poetry

## Art Styles

- **Photorealistic:** Like a photo shoot
- **Illustrated:** Hand-drawn aesthetic
- **Minimalist:** Clean, simple design
- **Abstract:** Artistic, non-literal
- **Vintage/Retro:** Classic book cover style
- **Modern/Contemporary:** Current design trends
- **Dark/Gothic:** Moody, dramatic
- **Whimsical:** Playful, fantastical
- **Watercolor:** Soft, painted look
- **Digital Art:** Modern CG aesthetic
- **Typography-focused:** Text as primary design element

## Color Palettes

### Pre-defined Schemes:
- **Phoenix Fire:** Orange & Gold (Rohimaya brand)
- **Peacock Elegance:** Teal & Navy (Rohimaya brand)
- **Dark & Moody:** Deep, mysterious tones
- **Bright & Vibrant:** Bold, saturated colors
- **Pastel & Soft:** Gentle, light hues
- **Black & White:** Classic monochrome
- **Earth Tones:** Natural, organic colors
- **Sunset Colors:** Warm gradients
- **Ocean Blues:** Cool water tones
- **Custom:** Describe your own palette

## Cost Information

### Per Generation:
- **Standard Quality:** ~$0.04
- **HD Quality:** ~$0.08

### Monthly Budget Examples:
- $10/month = ~125 standard covers or ~62 HD covers
- $25/month = ~312 standard covers or ~156 HD covers

Monitor usage at: https://platform.openai.com/usage

## Tips for Best Results

### 1. Be Specific
```
✅ Good: "A majestic phoenix rising from flames against a twilight sky with ancient ruins below"
❌ Vague: "A phoenix"
```

### 2. Genre Conventions
Research bestselling covers in your genre and describe similar elements.

### 3. Typography
DALL-E 3 generates text, but always verify it's legible. You may need to add text in post-production.

### 4. Multiple Iterations
Generate 5-10 variations to find the best design.

### 5. Test at Thumbnail Size
Your cover must work at small sizes (online stores, mobile).

### 6. Color Psychology
- Reds/Oranges: Action, passion, energy
- Blues: Trust, calm, intelligence
- Purples: Luxury, creativity, mystery
- Greens: Nature, growth, healing
- Black: Sophistication, mystery

## Brand Colors (Rohimaya Publishing)

- **Phoenix Fire Orange:** #FF8C42
- **Phoenix Gold:** #FFD700
- **Peacock Teal:** #4A9B9B
- **Midnight Navy:** #1A1A2E
- **Cream/Ivory:** #FFF8E7

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**Generation Takes Too Long:**
- DALL-E 3 typically takes 10-30 seconds
- This is normal for high-quality generation

**Cover Doesn't Match Description:**
- Try more specific prompts
- Generate variations
- Adjust style and genre selections

**Text on Cover is Unclear:**
- This is a known limitation of AI image generation
- Plan to add final text in design software (Canva, Photoshop)
- Focus AI generation on imagery and layout

**Download Button Not Working:**
- Check internet connection
- Try right-clicking image → Save As
- Generate new cover if URL expired

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

- Direct integration with Canva for text overlay
- Spine and back cover generation
- 3D mockup previews
- A/B testing recommendations
- Genre trend analysis
- Social media format exports

## Legal & Usage

- All generated images are owned by you (OpenAI's terms)
- Use for commercial purposes allowed
- Recommend post-production editing for final covers
- Always verify text legibility before publishing

## Support

Questions? Contact: support@rohimayapublishing.com

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
