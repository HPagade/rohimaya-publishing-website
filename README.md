# 🦚 Rohimaya Publishing - AI Author Tools Suite

**"Where Stories Take Shape"**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Python 3.8+](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-red.svg)](https://streamlit.io)

> AI-powered tools to help authors write, format, publish, and market their books - all in one platform.

---

## 🌟 What is Rohimaya Publishing?

**Rohimaya Publishing** provides a complete suite of AI-powered tools designed specifically for authors. Whether you're writing your first book or your fiftieth, our tools help you:

- ✍️ **Write faster** with AI assistance
- 📖 **Format professionally** for any platform
- 🎨 **Design beautiful covers** in minutes
- 🎧 **Create audiobooks** without hiring narrators
- 📝 **Plan compelling stories** with AI guidance
- 👤 **Develop rich characters** with detailed profiles
- 📣 **Market effectively** with auto-generated copy

All at a **fraction of the cost** of traditional services.

---

## ✨ Features

### 7 Core Tools

| Tool | Description | Status |
|------|-------------|--------|
| **🖋️ AI Writing Assistant** | Continue writing, expand scenes, polish dialogue | ✅ Ready |
| **📖 Manuscript Formatter** | Format for KDP, IngramSpark, EPUB | ✅ Ready |
| **🎨 AI Cover Designer** | Generate professional covers with DALL-E 3 | ✅ Ready |
| **🎧 Audiobook Generator** | Convert manuscripts to audiobooks | ✅ Ready |
| **📝 Plot Outliner** | Structure your story with AI assistance | ✅ Ready |
| **👤 Character Creator** | Develop rich character profiles | ✅ Ready |
| **📣 Marketing Copy Generator** | Create blurbs, ads, social posts | ✅ Ready |

### 5 Automation Workflows

- User onboarding
- Book publishing pipeline
- Content publishing
- Payment processing
- Customer support

---

## 🚀 Quick Start

### For Users

**Try the apps:** Coming soon at [rohimayapublishing.com](https://rohimayapublishing.com)

### For Developers

#### Prerequisites
- Python 3.8+
- pip package manager
- API keys (OpenAI, Anthropic, ElevenLabs)

#### Quick Setup

```bash
# 1. Clone the repository
git clone https://github.com/HPagade/rohimaya-publishing-website.git
cd rohimaya-publishing-website

# 2. Run setup script
chmod +x scripts/setup_env.sh
./scripts/setup_env.sh

# 3. Activate environment
source venv/bin/activate

# 4. Run any app
cd streamlit-apps/ai_writing_assistant
streamlit run app.py
```

**See [docs/QUICK_START.md](docs/QUICK_START.md) for detailed instructions.**

---

## 📁 Repository Structure

```
rohimaya-publishing-website/
├── README.md                    # You are here
├── LICENSE                      # MIT License
├── .gitignore                   # Git ignore rules
│
├── streamlit-apps/              # 🎨 7 Streamlit prototypes
│   ├── shared/                  # Common branding & utilities
│   ├── ai_writing_assistant/
│   ├── manuscript_formatter/
│   ├── ai_cover_designer/
│   ├── audiobook_generator/
│   ├── plot_outliner/
│   ├── character_creator/
│   └── marketing_copy_generator/
│
├── n8n-workflows/               # 🔄 5 automation workflows
│
├── docs/                        # 📚 Complete documentation
│   ├── QUICK_START.md          # Get started quickly
│   ├── DEPLOYMENT_GUIDE.md     # Deploy to production
│   ├── API_INTEGRATION.md      # API setup guide
│   ├── BRANDING_GUIDE.md       # Brand guidelines
│   ├── SECURITY.md             # Security best practices
│   └── CONTRIBUTING.md         # How to contribute
│
├── business-materials/          # 📊 Business plans & pitches
│
├── production/                  # 🚀 Production platform code
│   ├── backend/                # Node.js backend
│   ├── website/                # Next.js website
│   └── mobile-apps/            # React Native apps
│
├── scripts/                     # 🔧 Utility scripts
│   ├── setup_env.sh           # Quick environment setup
│   ├── test_apis.py           # Test API connections
│   └── deploy_all.sh          # Deployment helper
│
├── assets/                      # 🎨 Brand assets
└── deployment/                  # ⚙️ Deployment configs
```

---

## 🛠️ Tech Stack

### Frontend
- **Streamlit** - Rapid prototyping and demos
- **Next.js 14** - Production website
- **React Native** - Mobile apps (future)
- **Tailwind CSS** - Styling

### AI APIs
- **Claude (Anthropic)** - Advanced text generation
- **OpenAI (GPT-4, DALL-E 3)** - Text and image generation
- **ElevenLabs** - Text-to-speech for audiobooks

### Automation
- **n8n** - Workflow automation
- **Cloudflare** - Hosting and CDN
- **Supabase** - Database and auth

---

## 📖 Documentation

### Getting Started
- [Quick Start Guide](docs/QUICK_START.md) - Get running in 30 minutes
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) - Deploy to production
- [API Integration](docs/API_INTEGRATION.md) - Set up API keys

### Development
- [Contributing Guidelines](docs/CONTRIBUTING.md) - How to contribute
- [Branding Guide](docs/BRANDING_GUIDE.md) - Brand colors, fonts, style
- [Security Guide](docs/SECURITY.md) - Security best practices

### Business
- [Executive Summary](docs/EXECUTIVE_SUMMARY.md) - Business overview
- [Complete Business Plan](business-materials/) - Detailed planning
- [Revenue Projections](docs/REVENUE-PROJECTIONS.md) - Financial forecasts

---

## 🎨 Brand

Rohimaya Publishing features a gorgeous phoenix and peacock circular medallion logo with a carefully designed color palette:

### Colors
- **Phoenix Orange** `#FF8C42` - Energy & creativity
- **Peacock Teal** `#4A9B9B` - Elegance & growth
- **Midnight Navy** `#1A1A2E` - Professionalism
- **Cream** `#FFF8E7` - Warmth & approachability

### Typography
- **Headings:** Playfair Display (elegant serif)
- **Body:** Inter (clean sans-serif)

See the full [Branding Guide](docs/BRANDING_GUIDE.md) for details.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Hannah Pagade** - Founder & CEO, Fantasy Romance Author
- **Prasad Pagade** - CTO & Technical Partner

---

## 🔗 Links

- **Website:** [rohimayapublishing.com](https://rohimayapublishing.com) (coming soon)
- **GitHub:** [github.com/HPagade/rohimaya-publishing-website](https://github.com/HPagade/rohimaya-publishing-website)
- **Support:** support@rohimayapublishing.com

---

## 🌟 Why Rohimaya Publishing?

### Perfect for Authors Who Want:
✅ Professional-quality tools without enterprise costs  
✅ AI assistance that understands creative writing  
✅ Complete publishing pipeline in one place  
✅ Beautiful results in minutes, not weeks  
✅ Tools built by authors, for authors  

### Our Promise:
- **No subscriptions** (pay as you go)
- **No lock-in** (export your data anytime)
- **No compromises** (professional quality guaranteed)

---

**Built with ❤️ by authors, for authors**

**Where Stories Take Shape** 🦚🔥
