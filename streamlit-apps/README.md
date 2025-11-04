# 🦚 Rohimaya Publishing - Streamlit Apps Suite

**"Where Stories Take Shape"**

This directory contains 7 complete Streamlit prototypes that demonstrate the core features of Rohimaya Publishing's AI-powered author tools platform.

---

## 📚 Available Apps

### 1. 🖋️ AI Writing Assistant
**Location:** `ai_writing_assistant/`

Features:
- Continue writing from any point in your manuscript
- Expand scenes with more detail and description
- Polish dialogue to sound more natural
- Rewrite sections in different tones or styles
- Real-time word count and statistics

**Perfect for:** Authors experiencing writer's block or needing creative assistance

---

### 2. 📖 Manuscript Formatter
**Location:** `manuscript_formatter/`

Features:
- Format manuscripts for KDP (Kindle Direct Publishing)
- Export to IngramSpark specifications
- Generate EPUB files for digital distribution
- Apply professional typography and layout
- Automatic table of contents generation

**Perfect for:** Authors ready to publish but unsure about formatting requirements

---

### 3. 🎨 AI Cover Designer
**Location:** `ai_cover_designer/`

Features:
- Generate professional book covers using DALL-E 3
- Multiple style options (watercolor, digital art, photorealistic)
- Genre-specific templates
- Instant previews in 3D mockups
- High-resolution downloads

**Perfect for:** Authors who need eye-catching covers but can't afford professional designers

---

### 4. 🎧 Audiobook Generator
**Location:** `audiobook_generator/`

Features:
- Convert manuscripts to high-quality audiobooks
- Multiple voice options (male, female, various accents)
- Automatic chapter detection
- Emotion and pacing control
- Export as MP3 with chapter markers

**Perfect for:** Authors wanting to reach audiobook listeners without hiring narrators

---

### 5. 📝 Plot Outliner
**Location:** `plot_outliner/`

Features:
- AI-assisted story structure planning
- Three-act structure templates
- Character arc development
- Plot hole detection
- Scene-by-scene breakdowns

**Perfect for:** Authors planning their next book or fixing plot issues

---

### 6. 👤 Character Creator
**Location:** `character_creator/`

Features:
- Generate detailed character profiles
- Personality traits and quirks
- Backstory development
- Character relationships mapping
- Character voice samples

**Perfect for:** Authors developing rich, memorable characters

---

### 7. 📣 Marketing Copy Generator
**Location:** `marketing_copy_generator/`

Features:
- Generate compelling book blurbs
- Create social media posts
- Write email marketing campaigns
- Generate ad copy for Amazon/Facebook
- SEO-optimized book descriptions

**Perfect for:** Authors who hate marketing or don't know where to start

---

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- API keys for OpenAI, Anthropic (Claude), and/or ElevenLabs

### Setup Instructions

#### 1. Install Dependencies

Each app has its own `requirements.txt`, but they all share common dependencies:

```bash
# Navigate to the streamlit-apps directory
cd streamlit-apps

# Install shared dependencies
pip install -r shared/requirements.txt

# Install dependencies for a specific app (example)
cd ai_writing_assistant
pip install -r requirements.txt
```

#### 2. Configure API Keys

Each app needs API keys to function. You have two options:

**Option A: Create `.streamlit/secrets.toml` (Recommended)**

For each app you want to run, create a secrets file:

```bash
cd ai_writing_assistant
mkdir -p .streamlit
nano .streamlit/secrets.toml
```

Add your API keys:

```toml
OPENAI_API_KEY = "sk-..."
ANTHROPIC_API_KEY = "sk-ant-..."
ELEVENLABS_API_KEY = "your-key-here"
```

Each app folder contains a `.streamlit/secrets.toml.example` template.

**Option B: Environment Variables**

```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export ELEVENLABS_API_KEY="your-key-here"
```

#### 3. Run an App

```bash
# Navigate to any app directory
cd ai_writing_assistant

# Run with Streamlit
streamlit run app.py
```

The app will open in your default browser at `http://localhost:8501`

---

## 🎨 Shared Module

All apps use a common `shared/` module for:

### Branding (`shared/branding.py`)
- Consistent Rohimaya colors, fonts, and styling
- Reusable UI components
- Logo and header displays

### API Helpers (`shared/api_helpers.py`)
- Centralized API client initialization
- Consistent error handling
- API key validation

### Utilities (`shared/utils.py`)
- File handling (upload, save, export)
- Text statistics and formatting
- Common helper functions

### Usage Example

```python
from shared import (
    setup_page_config,
    apply_rohimaya_styling,
    get_openai_client,
    display_text_stats
)

# Set up page
setup_page_config("My App")
apply_rohimaya_styling()

# Get API client
client = get_openai_client()

# Use utilities
display_text_stats(my_text)
```

---

## 🎨 Brand Guidelines

All apps follow Rohimaya Publishing's brand identity:

### Colors
- **Phoenix Orange:** `#FF8C42` - Primary CTA, energy
- **Phoenix Gold:** `#FFD700` - Accents, highlights
- **Peacock Teal:** `#4A9B9B` - Secondary actions, calm
- **Midnight Navy:** `#1A1A2E` - Text, headers
- **Cream:** `#FFF8E7` - Backgrounds

### Typography
- **Headings:** Playfair Display (elegant serif)
- **Body:** Inter (clean sans-serif)
- **Code:** Fira Code (monospace)

### Design Principles
- Clean, professional layouts
- Generous white space
- Clear visual hierarchy
- Accessible color contrast
- Mobile-responsive

---

## 📁 App Structure

Each app follows this standard structure:

```
app_name/
├── app.py                    # Main application file
├── requirements.txt          # Python dependencies
├── README.md                 # App-specific documentation
└── .streamlit/
    ├── config.toml          # Streamlit configuration
    └── secrets.toml.example # API key template
```

---

## 🛠️ Development

### Adding a New App

1. Create a new directory under `streamlit-apps/`
2. Copy the structure from an existing app
3. Update `app.py` with your features
4. Use the shared module for branding and utilities
5. Add your app to this README

### Best Practices

- **Always import from shared:** Use common branding and utilities
- **Handle errors gracefully:** Use `api_helpers.handle_api_error()`
- **Display statistics:** Show word counts, character counts, etc.
- **Add download options:** Let users export their work
- **Test thoroughly:** Ensure all features work with API keys

---

## 🚀 Deployment

### Deploy to Streamlit Cloud

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Streamlit app"
   git push
   ```

2. **Go to:** https://share.streamlit.io

3. **Deploy:**
   - Click "New app"
   - Select your repository
   - Choose branch (usually `main`)
   - Set app path: `streamlit-apps/app_name/app.py`
   - Click "Deploy"

4. **Configure Secrets:**
   - Go to app settings
   - Add your API keys in the secrets section
   - Save and restart

### Deploy All Apps Script

```bash
# From the streamlit-apps directory
chmod +x ../scripts/deploy_all.sh
../scripts/deploy_all.sh
```

---

## 🧪 Testing

### Test Locally

```bash
# Run an app
cd ai_writing_assistant
streamlit run app.py

# Test with different API keys
OPENAI_API_KEY="sk-test..." streamlit run app.py
```

### Common Issues

**"API key not found"**
- Check `.streamlit/secrets.toml` exists
- Verify API key format is correct
- Try using environment variables instead

**"Module not found"**
- Make sure you're in the app directory
- Install requirements: `pip install -r requirements.txt`
- Check that shared module is accessible

**"Rate limit exceeded"**
- Wait a minute and try again
- Check your API usage on the provider's dashboard
- Consider upgrading your API plan

---

## 📊 API Usage & Costs

### Estimated Costs (Per Use)

| App | Estimated Cost | Notes |
|-----|---------------|-------|
| AI Writing Assistant | $0.01-$0.05 | Depends on length |
| Manuscript Formatter | $0.00 | No API calls |
| AI Cover Designer | $0.04 | Per DALL-E 3 generation |
| Audiobook Generator | $0.10-$2.00 | Depends on length |
| Plot Outliner | $0.02-$0.10 | Depends on complexity |
| Character Creator | $0.01-$0.03 | Per character |
| Marketing Copy | $0.01-$0.02 | Per piece |

**Note:** These are estimates. Actual costs depend on:
- Input length
- Model used (GPT-4 vs GPT-3.5)
- Number of generations requested
- API provider pricing changes

---

## 🤝 Contributing

Want to improve an app or add a new feature?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

See [CONTRIBUTING.md](../docs/CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

These apps are part of the Rohimaya Publishing project.

See [LICENSE](../LICENSE) for details.

---

## 💬 Support

Need help with the apps?

- **Documentation:** See individual app READMEs
- **GitHub Issues:** Report bugs or request features
- **Email:** support@rohimayapublishing.com
- **Discord:** Join our community (coming soon!)

---

## 🎉 Success Stories

*These apps are prototypes. Once deployed, we'll feature user success stories here!*

---

## 🗺️ Roadmap

### Phase 1: Current (Prototypes)
- ✅ 7 standalone Streamlit apps
- ✅ Shared branding and utilities
- ✅ Individual deployment ready

### Phase 2: Integration (Next)
- 🔄 Integrate apps into main platform
- 🔄 User accounts and authentication
- 🔄 Save and load projects
- 🔄 Usage analytics

### Phase 3: Enhancement (Future)
- 📅 Advanced AI models
- 📅 Collaborative features
- 📅 Mobile app versions
- 📅 Enterprise features

---

## 📚 Additional Resources

- **Main Documentation:** [/docs](/docs)
- **Business Plan:** [/business-materials](/business-materials)
- **n8n Workflows:** [/n8n-workflows](/n8n-workflows)
- **Production Platform:** [/production](/production)

---

**Built with ❤️ by Rohimaya Publishing**

**Where Stories Take Shape** 🦚🔥

---

*Last Updated: November 4, 2025*
