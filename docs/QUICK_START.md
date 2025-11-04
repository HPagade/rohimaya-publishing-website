# 🚀 Quick Start Guide - Rohimaya Publishing

Get started with Rohimaya Publishing in under 30 minutes!

---

## For End Users (Authors)

### Using the Streamlit Apps

1. **Visit the deployed apps** (coming soon):
   - AI Writing Assistant: `https://app.rohimayapublishing.com/writing`
   - Manuscript Formatter: `https://app.rohimayapublishing.com/formatter`
   - AI Cover Designer: `https://app.rohimayapublishing.com/covers`
   - And 4 more tools!

2. **Sign up** for a free account

3. **Start creating:**
   - Upload your manuscript
   - Generate covers
   - Create audiobooks
   - And more!

---

## For Developers

### Running Locally

#### Prerequisites
- Python 3.8+
- Node.js 18+ (for production platform)
- Git

#### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/HPagade/rohimaya-publishing-website.git
cd rohimaya-publishing-website

# 2. Run a Streamlit app
cd streamlit-apps/ai_writing_assistant
pip install -r requirements.txt

# 3. Configure API keys
cp .streamlit/secrets.toml.example .streamlit/secrets.toml
# Edit secrets.toml with your API keys

# 4. Run the app
streamlit run app.py
```

#### Get API Keys

- **OpenAI:** https://platform.openai.com/api-keys
- **Anthropic (Claude):** https://console.anthropic.com/settings/keys
- **ElevenLabs:** https://elevenlabs.io/app/settings/api-keys

---

## Next Steps

- **Learn more:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Understand the architecture:** See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Contribute:** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Where Stories Take Shape** 🦚🔥
