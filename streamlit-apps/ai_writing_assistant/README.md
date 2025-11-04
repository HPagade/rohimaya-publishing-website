# 🦚 AI Writing Assistant - Rohimaya Publishing

**Where Stories Take Shape**

## Overview

AI-powered writing assistant for authors. Helps with:
- Continuing your story in your style
- Expanding brief scenes into rich prose
- Polishing dialogue
- Show don't tell transformations
- Quick editing fixes

## Features

- **Continue Writing:** AI continues your story naturally
- **Expand Scenes:** Turn brief descriptions into detailed prose
- **Polish Dialogue:** Make conversations more natural
- **Show Don't Tell:** Transform telling into showing
- **Quick Actions:** Grammar fixes, word choice, prompts

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

Create `.streamlit/secrets.toml` (copy from the template) and add your API key:

```toml
OPENAI_API_KEY = "sk-YOUR_KEY_HERE"
```

**Important:** Never commit secrets.toml to Git!

### 4. Run Locally

```bash
streamlit run app.py
```

App will open at http://localhost:8501

## Deployment to Streamlit Cloud

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add AI Writing Assistant app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/ai_writing_assistant/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Get Shareable Link

After deployment, you'll get a URL like:
`https://your-app.streamlit.app`

Share this link with anyone!

## Brand Colors (Rohimaya Publishing)

- **Phoenix Fire Orange:** #FF8C42 (CTAs, buttons)
- **Phoenix Gold:** #FFD700 (accents)
- **Peacock Teal:** #4A9B9B (primary brand)
- **Midnight Navy:** #1A1A2E (dark backgrounds)
- **Cream/Ivory:** #FFF8E7 (light backgrounds)

## Usage Tips

1. **Paste context:** For best results, paste your last 500-1000 words
2. **Be specific:** Give clear directions about what you want
3. **Adjust creativity:** Use slider for more/less creative output
4. **Genre matters:** Select your genre for better results
5. **Copy output:** Use the code box to easily copy generated text

## Cost Information

- Uses OpenAI GPT-4 Turbo
- ~$0.01-0.03 per request
- Monitor usage at: https://platform.openai.com/usage

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**Slow response:**
- GPT-4 Turbo can take 5-15 seconds
- This is normal for quality output

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Support

Questions? Contact: support@rohimayapublishing.com

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
