# PhoenixForge AI - Streamlit Demo Prototypes

This directory contains working Streamlit prototypes for demonstrating PhoenixForge AI features to potential users, investors, and stakeholders.

## What is Streamlit?

Streamlit is a Python framework that turns Python scripts into interactive web applications in minutes. Perfect for creating demos and prototypes.

## Quick Start

### Install Streamlit

```bash
pip install streamlit
# Or for all requirements:
pip install -r requirements.txt
```

### Run Individual Demos

```bash
# Manuscript Formatter Demo
streamlit run formatter_demo.py

# Cover Generator Demo
streamlit run cover_generator_demo.py

# Complete Platform Demo
streamlit run complete_platform_demo.py
```

### Run All Demos (Menu)

```bash
streamlit run main_demo.py
```

Then open your browser to http://localhost:8501

## Available Demos

### 1. `formatter_demo.py` - AI Manuscript Formatter
**Purpose:** Demonstrate manuscript formatting capabilities

**Features:**
- Upload DOCX/PDF files
- Select genre and template
- AI-powered chapter detection
- Generate formatted PDF/EPUB
- Download formatted files

**Best For:** Authors, publishers, formatting services

### 2. `cover_generator_demo.py` - AI Book Cover Generator  
**Purpose:** Show AI cover generation in action

**Features:**
- Enter book details (title, author, genre)
- Select style preferences
- Generate 6 cover variations
- A/B testing view
- Download high-res covers

**Best For:** Authors, designers, marketing teams

### 3. `image_generator_demo.py` - AI Image Creator
**Purpose:** Demonstrate character and scene generation

**Features:**
- Text-to-image generation
- Character consistency
- Style variations
- Batch generation
- Gallery view

**Best For:** Illustrators, children's book authors

### 4. `audiobook_demo.py` - AI Audiobook Narrator
**Purpose:** Show text-to-speech capabilities

**Features:**
- Enter text or upload manuscript
- Select voice (50+ options)
- Preview audio samples
- Generate full audiobook
- Download MP3 files

**Best For:** Authors, audiobook narrators

### 5. `complete_platform_demo.py` - Full Platform
**Purpose:** Show complete end-to-end workflow

**Features:**
- All tools in one interface
- Dashboard with usage stats
- Sample projects
- Pricing calculator
- ROI demonstration

**Best For:** Presentations, investor pitches

### 6. `main_demo.py` - Demo Menu
**Purpose:** Navigate between all demos

**Features:**
- Clean menu interface
- Quick access to all demos
- About/FAQ section
- Contact information

## Demo Data

Sample data files are included in the `demo_data/` directory:
- `sample_manuscript.txt` - Sample book text
- `sample_cover_specs.json` - Cover generation examples
- `sample_images.json` - Image generation prompts

## Customization

### Branding
Edit `config.py` to customize:
- Company name and logo
- Color scheme
- Contact information
- Feature flags

### API Integration
The demos can work in two modes:

**Mock Mode (Default):**
- Uses placeholder data
- No API keys needed
- Fast for demonstrations

**Live Mode:**
- Calls real APIs
- Requires API keys in `.env`
- Shows actual results

To enable live mode, set in `.env`:
```
DEMO_MODE=live
OPENAI_API_KEY=sk-...
```

## Tips for Presentations

### 1. Pre-load Examples
Run demos before presentations to cache results:
```bash
python preload_demos.py
```

### 2. Offline Mode
Enable offline mode for demos without internet:
```bash
export OFFLINE_MODE=true
streamlit run main_demo.py
```

### 3. Full Screen Mode
Press `F11` in browser for full-screen presentation

### 4. Hide Streamlit Branding
Add to `~/.streamlit/config.toml`:
```toml
[server]
headless = true

[ui]
hideTopBar = true
```

## Deployment

### Deploy to Streamlit Cloud (Free)

1. Push demos to GitHub
2. Go to https://share.streamlit.io
3. Connect your GitHub repo
4. Select `main_demo.py` as main file
5. Add secrets (API keys) in dashboard
6. Deploy!

Your demo will be live at: `https://your-app.streamlit.app`

### Deploy to Heroku

```bash
# Create Procfile
echo "web: streamlit run main_demo.py --server.port=$PORT" > Procfile

# Create setup.sh
cat > setup.sh << 'EOF'
mkdir -p ~/.streamlit/
echo "[server]
headless = true
port = $PORT
enableCORS = false
" > ~/.streamlit/config.toml
EOF

# Deploy
heroku create phoenixforge-demo
git push heroku main
```

### Deploy to Your Own Server

```bash
# Install on server
pip install streamlit

# Run with supervisor or systemd
streamlit run main_demo.py --server.port 8501 --server.address 0.0.0.0
```

## Demo Scripts

Sample talking points are provided in `demo_scripts/`:
- `investor_pitch.md` - 10-minute investor demo
- `author_demo.md` - 5-minute author onboarding
- `feature_showcase.md` - Detailed feature walkthrough

## Troubleshooting

### Port Already in Use
```bash
# Kill existing Streamlit processes
pkill -f streamlit
# Or use different port
streamlit run main_demo.py --server.port 8502
```

### Slow Loading
```bash
# Enable caching
export STREAMLIT_CACHE=true
```

### Memory Issues with Large Files
```bash
# Limit file size
export MAX_FILE_SIZE=10  # MB
```

## Adding New Demos

1. Create new file: `your_demo.py`
2. Follow template in `_demo_template.py`
3. Add to menu in `main_demo.py`
4. Update this README

## Support

- **Questions:** demos@phoenixforge.ai
- **Bug Reports:** GitHub Issues
- **Feature Requests:** GitHub Discussions

---

**Ready to impress?** Run `streamlit run main_demo.py` and start demo! 🚀
