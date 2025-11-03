# 🎙️ PhoenixForge Voice - Audiobook Generation System

**Merged from:** [audiobook-website repository](https://github.com/HPagade/audiobook-website)  
**Integration Date:** November 3, 2025  
**Part of:** PhoenixForge AI Suite

---

## 📋 Overview

This folder contains the complete audiobook generation system that was developed separately and is now integrated into the main PhoenixForge AI platform as **PhoenixForge Voice**.

### What's Included

**Web Interface:**
- `index.html` - Interactive website for audiobook system
- Responsive design (mobile, tablet, desktop)
- Cost calculator and feature showcase

**Setup Guides:**
- `API_KEYS_ONE_PAGE_GUIDE.md` - Quick API setup
- `API_KEYS_SETUP_SUPER_SIMPLE.md` - Simplified setup guide
- `API_SETUP_GUIDE.md` - Detailed configuration
- `N8N_CLOUD_SETUP_GUIDE.md` - n8n cloud automation
- `N8N_COMPLETE_BEGINNER_GUIDE.md` - Complete n8n tutorial
- `QUICK_START_CARD.md` - Quick reference card

**Automation Workflows:**
- `audiobook-large-books-n8n-workflow.json` - Handle large books
- `audiobook_generator_cloud.json` - Cloud-based generation
- `audiobook_n8n_cloud.json` - n8n cloud workflow

**System Configuration:**
- `system/requirements.txt` - Python dependencies
- `system/n8n-workflows/audiobook-pipeline.json` - Pipeline configuration
- `system/config/processing_config.json` - Processing settings
- `system/config/character_voices.json` - Voice assignments
- `system/.env.example` - Environment template

**Documentation:**
- `system/docs/ARCHITECTURE_OPTIONS.md` - System architecture
- `system/docs/SUPER_QUICK_START.md` - Quick start guide
- `system/SETUP_GUIDE.md` - Complete setup instructions

---

## 🎯 Purpose

This audiobook generation system enables:

1. **Text-to-Speech Conversion** - Transform manuscripts into audiobooks
2. **Multiple Voice Options** - 50+ AI voices with emotional range
3. **Character Voice Consistency** - Maintain character voices throughout
4. **Large Book Processing** - Handle books of any length
5. **Automated Workflows** - n8n automation for batch processing
6. **Cost-Effective Production** - $0.005 per word vs traditional $3,000-10,000

---

## 🔗 Integration with PhoenixForge AI

### How It Fits

This system is being integrated as **PhoenixForge Voice**, the fifth product in the suite:

1. **PhoenixForge Format** - Manuscript formatting
2. **PhoenixForge Covers** - Book cover generation
3. **PhoenixForge Images** - Image creation
4. **PhoenixForge Videos** - Video trailers
5. **PhoenixForge Voice** ← This system (Q2 2025 launch)

### Migration Path

**Current State (n8n prototype):**
- Standalone system with n8n workflows
- Separate API integrations
- Manual configuration

**Target State (Integrated platform):**
- Native Next.js API routes
- Unified dashboard
- One-click audiobook generation
- Integrated with other products

---

## 🚀 Quick Start

### For Development

1. **Review the guides:**
   - Start with `QUICK_START_CARD.md`
   - Follow `API_SETUP_GUIDE.md` for API keys
   - Use `N8N_COMPLETE_BEGINNER_GUIDE.md` for automation

2. **Set up environment:**
   ```bash
   cd audiobook-website/system
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Import n8n workflows:**
   - Use files in `system/n8n-workflows/`
   - Follow `N8N_CLOUD_SETUP_GUIDE.md`

### For Testing

1. **Open the demo:**
   - Open `index.html` in browser
   - Explore features and cost calculator

2. **Try workflows:**
   - Import workflow JSON files into n8n
   - Configure API keys
   - Test with sample text

---

## 📊 Key Features

### Voice Options
- **50+ AI voices** (ElevenLabs, Google TTS, Azure Neural)
- **Multiple languages** and accents
- **Emotional range** and tone control
- **Character consistency** across chapters

### Processing
- **Large book support** - Handle 100,000+ word manuscripts
- **Chapter-by-chapter** processing
- **Batch generation** for efficiency
- **ACX-compliant** output for Audible

### Cost Efficiency
- **$0.005 per word** (vs $3,000-10,000 traditional)
- **Example:** 80,000-word book = $400 (vs $5,000+)
- **Savings:** 92%+ compared to professional narration

---

## 🔧 Technical Details

### APIs Used
- **ElevenLabs** - Premium voice synthesis
- **Google Cloud TTS** - Backup and additional voices
- **Azure Neural TTS** - Alternative provider
- **n8n** - Workflow automation

### Output Format
- **ACX-compliant** audio (48kHz, 192kbps)
- **Chapter markers** for navigation
- **Metadata tags** for platforms
- **Multiple formats** (MP3, M4B)

### Processing Pipeline
1. Text parsing and cleanup
2. Character voice assignment
3. Chapter segmentation
4. TTS generation
5. Audio mastering
6. File packaging

---

## 📈 Future Integration

### Planned Features (Q2 2025)

**Native Platform Integration:**
- [ ] Migrate from n8n to Next.js API routes
- [ ] Unified dashboard with other products
- [ ] Real-time progress tracking
- [ ] Preview audio before full generation

**Enhanced Features:**
- [ ] Voice cloning for author narration
- [ ] Multi-language support (Spanish, French, German)
- [ ] Advanced audio effects (background music, sound effects)
- [ ] Direct upload to ACX/Audible

**Business Integration:**
- [ ] Subscription tier limits (SPARK, BLAZE, INFERNO)
- [ ] Pay-as-you-go pricing ($0.005/word)
- [ ] Usage tracking and analytics
- [ ] Team collaboration features

---

## 📚 Documentation Reference

For complete context on PhoenixForge AI:
- Main docs: `/docs/`
- Business materials: `/business-materials/`
- LLM context: `/business-materials/LLM_CONTEXT_DOCUMENT.md`
- Tech stack: `/business-materials/tech-stack/COMPLETE_TECH_STACK.md`

---

## 🤝 Contributing

This system is being actively integrated into the main platform. 

**Current Status:** Prototype phase (n8n-based)  
**Target Status:** Production (Next.js native) - Q2 2025  
**Maintainer:** Rohimaya Publishing Team

---

## 📞 Support

**Questions about this system:**
- Technical: prasad@phoenixforge.ai
- Product: hannah@phoenixforge.ai
- General: support@phoenixforge.ai

---

## 🔥 Where Stories Take Shape

This audiobook system represents the final piece of the PhoenixForge AI suite, enabling authors to create complete, professional book productions entirely through AI.

**From manuscript to market in one platform.**

---

*Merged: November 3, 2025*  
*Original Repository: HPagade/audiobook-website*  
*Integration Target: PhoenixForge Voice (Q2 2025)*  
*© 2025 Rohimaya Publishing, LLC. All rights reserved.*
