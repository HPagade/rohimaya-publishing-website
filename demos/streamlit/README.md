# PhoenixForge AI - Complete Streamlit Demo

**All 7 Products in One Interactive Demo** - Fully working prototypes with real API integration!

## 🎯 What's Inside

This is a **complete, production-ready demo** of all 7 PhoenixForge AI products:

1. **📄 AI Manuscript Formatter** - Transform manuscripts into professional files
2. **🎙️ Audiobook Narrator** - Convert text to professional narration
3. **🎨 Cover Generator** - Create stunning book covers with DALL-E 3
4. **🖼️ Image Creator** - Generate unlimited custom images
5. **🍳 Cookbook Formatter** - Format recipes into beautiful cookbooks
6. **🏥 Health Content** - Generate workout plans, meal plans, and articles
7. **📱 Marketing Suite** - Create social media posts, emails, ads, and descriptions

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd demos/streamlit
pip install -r requirements.txt
```

### 2. Run the Demo

```bash
streamlit run main_demo.py
```

Then open your browser to **http://localhost:8501**

### 3. Try It Out!

The demo works in two modes:

**🎭 Demo Mode (Default):**
- No API keys needed
- Uses mock data for instant results
- Perfect for presentations

**✅ Live Mode (with API):**
- Real AI generation
- Requires OpenAI API key
- Shows actual capabilities

## 🔑 Enable Real API Calls

To use real AI generation:

### Step 1: Create .env file

Create a file named `.env` in the `demos/streamlit` folder:

```bash
# demos/streamlit/.env
OPENAI_API_KEY=sk-your-key-here
```

### Step 2: Get Your OpenAI API Key

1. Go to https://platform.openai.com
2. Sign in/Sign up
3. Go to API Keys
4. Create new secret key
5. Copy and paste into `.env`

### Step 3: Restart Streamlit

```bash
# Stop the app (Ctrl+C)
# Start again
streamlit run main_demo.py
```

You'll see ✅ **Live Mode** in the sidebar!

## ✨ Features

### Real API Integration

When you add your OpenAI API key, you can:

✅ **Format Manuscripts** - Real AI chapter detection and analysis
✅ **Generate Audiobooks** - Actual text-to-speech with multiple voices  
✅ **Create Covers** - Real DALL-E 3 image generation
✅ **Generate Images** - Custom AI images for your books
✅ **Parse Recipes** - AI extracts ingredients and instructions
✅ **Create Workout Plans** - Personalized fitness programs
✅ **Write Marketing Copy** - AI-generated social media posts and ads

### Demo Mode

Without an API key:
- See full interface
- Try all features
- View mock results
- Perfect for presentations

## 📁 File Structure

```
demos/streamlit/
├── main_demo.py           # Complete demo (USE THIS!)
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .env.example          # Example environment file
└── main_demo_old.py      # Backup of previous version
```

## 🎨 What Each Product Does

### 1. Manuscript Formatter
- Upload DOCX, PDF, or TXT files
- AI analyzes structure and chapters
- Real-time word count and page estimates
- Export to multiple formats

**Real API:** Analyzes manuscript structure with GPT-4

### 2. Audiobook Narrator
- Convert any text to speech
- Choose from 6 different voices (alloy, echo, fable, onyx, nova, shimmer)
- Adjust speed (0.5x to 2.0x)
- Download MP3 files

**Real API:** Uses OpenAI TTS to generate actual audio

### 3. Cover Generator
- Enter book title, author, genre
- Describe your ideal cover
- Select art style
- Generate professional covers

**Real API:** Creates real covers with DALL-E 3

### 4. Image Creator
- Create custom illustrations
- Choose size (square, portrait, landscape)
- Select quality (standard or HD)
- Generate multiple variations

**Real API:** Generates actual images with DALL-E 3

### 5. Cookbook Formatter
- Enter recipes manually or paste text
- AI parses ingredients and instructions
- Beautiful formatting options
- Export to PDF/ePub

**Real API:** GPT-4 parses recipe text intelligently

### 6. Health Content
- **Workout Plans:** Generate personalized fitness programs
- **Meal Plans:** Create nutrition plans with recipes
- **Health Articles:** Write evidence-based health content

**Real API:** GPT-4 creates detailed, personalized content

### 7. Marketing Suite
- **Social Media:** Posts for Twitter, Facebook, Instagram, LinkedIn
- **Email Campaigns:** Launch announcements, newsletters
- **Ad Copy:** Facebook, Google, Amazon ads
- **Book Descriptions:** Amazon/Goodreads listings

**Real API:** GPT-4 writes professional marketing copy

## 💡 Tips for Best Results

### For Presentations
1. Run in Demo Mode (fast, no delays)
2. Use fullscreen mode (F11)
3. Prepare talking points for each section
4. Show the pricing calculator at the end

### For Testing Real APIs
1. Start with small text samples
2. Monitor your OpenAI usage dashboard
3. Set spending limits on OpenAI account
4. Cache results to avoid repeat charges

### For Development
1. Check the code comments
2. Each function is self-contained
3. Easy to modify or extend
4. Error handling included

## 🐛 Troubleshooting

### "Command not found: streamlit"
```bash
pip install streamlit
```

### "Module not found: openai"
```bash
pip install -r requirements.txt
```

### Port already in use
```bash
streamlit run main_demo.py --server.port 8502
```

### API key not working
- Check the key starts with `sk-`
- Make sure `.env` is in the correct folder
- Restart Streamlit after adding the key
- Check your OpenAI account has credits

### Demo is slow
- This is normal with real API calls
- DALL-E generation takes 10-30 seconds
- Use Demo Mode for faster presentations

## 📊 What's Different from Old Version

✅ **All 7 products included** (was missing 3)
✅ **Real API integration** (not just mockups)
✅ **Proper error handling** (won't crash)
✅ **Demo/Live mode toggle** (flexible usage)
✅ **Working prototypes** (actually generate content)
✅ **Better UI/UX** (cleaner interface)
✅ **Comprehensive documentation** (this README!)

## 🚀 Deployment Options

### Option 1: Streamlit Cloud (Easiest, Free)

1. Push code to GitHub
2. Go to https://share.streamlit.io
3. Connect repo and select `main_demo.py`
4. Add OPENAI_API_KEY in Secrets
5. Deploy!

### Option 2: Your Own Server

```bash
# On your server
git clone your-repo
cd demos/streamlit
pip install -r requirements.txt

# Run with nohup
nohup streamlit run main_demo.py --server.port 8501 &
```

### Option 3: Docker

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["streamlit", "run", "main_demo.py", "--server.port=8501"]
```

## 📞 Support

**Having issues?**
- Check the troubleshooting section above
- Review OpenAI API documentation
- Check your API key and credits

**Want to customize?**
- All code is commented
- Each product is in its own function
- Easy to modify or extend

## ✅ Success Checklist

You know it's working when:

- [ ] Streamlit app loads without errors
- [ ] You can navigate all 7 products
- [ ] Demo mode shows mock results
- [ ] (With API key) Live mode generates real content
- [ ] Audio plays in Audiobook section
- [ ] Images generate in Cover/Image sections
- [ ] Text generates in Marketing section

## 🎉 You're Ready!

This is a **complete, production-ready demo** of all 7 PhoenixForge AI products. Use it for:

- 🎤 Investor presentations
- 📱 Customer demos
- 🧪 Testing features
- 📚 Training materials
- 💼 Sales pitches

**Start the demo:** `streamlit run main_demo.py`

---

*Last updated: November 3, 2025*
*Questions? Check the main repository README.md*
