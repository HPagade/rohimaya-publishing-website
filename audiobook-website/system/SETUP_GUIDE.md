# 🚀 AUDIOBOOK TTS SYSTEM - SETUP GUIDE

**For:** Prasad Pagade  
**Project:** Eclipse of Fire and Wings - Audiobook Generation  
**Time:** 2 hours (ElevenLabs) or 1-2 weeks (Custom AI Agent)

---

## 🎯 TWO IMPLEMENTATION OPTIONS

### **Option A: ElevenLabs API (Fast - Recommended to Start)**
- Setup: 2 hours
- Cost: $22/month + $36/book
- Perfect for: Quick results, testing, first audiobook

### **Option B: Custom AI Agent (Full Control)**
- Setup: 1-2 weeks development
- Cost: Development time + optional GPU hardware
- Perfect for: Long-term, many books, learning ML/TTS

---

## 🚀 OPTION A: ELEVENLABS API SETUP

### **Step 1: System Requirements**

**Hardware:**
- Any Mac or PC
- 8GB RAM minimum
- 10GB free disk space
- Internet connection

**Software:**
- Python 3.10 or 3.11
- FFmpeg
- Text editor

---

### **Step 2: Install Dependencies (30 minutes)**

**On Mac:**
```bash
# Install Homebrew if needed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3.11
brew install python@3.11

# Install FFmpeg
brew install ffmpeg

# Verify installations
python3 --version
ffmpeg -version
```

**On Windows:**
```bash
# Install Python from python.org
# Download FFmpeg from ffmpeg.org
# Add both to PATH
```

---

### **Step 3: Clone Repository**
```bash
# Navigate to where you want the project
cd ~/Documents

# Clone the repository (replace with actual URL)
git clone https://github.com/YOUR-USERNAME/audiobook-website.git
cd audiobook-website/system

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Mac/Linux
# OR
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt
```

---

### **Step 4: Set Up ElevenLabs Account (15 minutes)**

1. **Go to:** https://elevenlabs.io
2. **Sign up** for Creator plan ($22/month)
3. **Get your API key:**
   - Click your profile → Settings
   - Copy your API key
4. **Save for later** - you'll need this

---

### **Step 5: Record Voice Samples (30 minutes)**

**For Hannah (Aaravi):**
1. Find quiet room
2. Use `voice_samples/recording_script.txt`
3. Record 10-15 minutes
4. Save as `hannah_voice_sample.wav`

**For Prasad (Vihan):**
1. Same process
2. Record 10-15 minutes
3. Save as `prasad_voice_sample.wav`

**Recording Tips:**
- Use phone or computer mic (quality is fine!)
- Show emotional variety
- Natural speaking pace
- No background noise

---

### **Step 6: Clone Voices in ElevenLabs (15 minutes)**

1. **Go to:** https://elevenlabs.io/voice-lab
2. **Click:** "Add Voice" → "Instant Voice Cloning"
3. **Upload** Hannah's recording
4. **Name it:** "Hannah - Aaravi"
5. **Copy the Voice ID** (long string)
6. **Repeat** for Prasad's voice
7. **Save both Voice IDs** - you'll need them

---

### **Step 7: Configure Environment (5 minutes)**

1. **Copy the template:**
```bash
   cp .env.example .env
```

2. **Edit `.env` file** and add:
```bash
   ELEVENLABS_API_KEY=your_actual_api_key_here
   HANNAH_VOICE_ID=hannah_voice_id_from_elevenlabs
   PRASAD_VOICE_ID=prasad_voice_id_from_elevenlabs
```

3. **Save the file**

---

### **Step 8: Test the System (15 minutes)**

**Create a test script** `test_voices.py`:
```python
import os
from elevenlabs import generate, save
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Test Hannah's voice
hannah_audio = generate(
    text="Hello, I'm Aaravi. The peacock power flows through me.",
    voice=os.getenv("HANNAH_VOICE_ID"),
    model="eleven_multilingual_v2"
)
save(hannah_audio, "test_hannah.mp3")

# Test Prasad's voice
prasad_audio = generate(
    text="I am Vihan. The phoenix fire burns within.",
    voice=os.getenv("PRASAD_VOICE_ID"),
    model="eleven_multilingual_v2"
)
save(prasad_audio, "test_prasad.mp3")

print("✅ Voice tests complete! Check test_hannah.mp3 and test_prasad.mp3")
```

**Run the test:**
```bash
python test_voices.py
```

**Listen to the output files** - do the voices sound good?

---

### **Step 9: Process Your First Chapter (30 minutes)**

1. **Prepare your manuscript:**
   - Create `manuscript/chapter_01.txt`
   - Copy Chapter 1 text

2. **Tag characters (optional):**
```
   [NARRATOR] The morning sun rose over the mountains.
   [AARAVI] "We need to leave now," she said.
   [VIHAN] "I'm ready," he replied.
```

3. **Run the processor:**
```bash
   python scripts/generate_chapter.py --input manuscript/chapter_01.txt --output output/chapter_01.mp3
```

4. **Wait** 15-30 minutes depending on chapter length

5. **Listen to the output!**

---

## 🤖 OPTION B: CUSTOM AI AGENT SETUP

See `docs/CUSTOM_AI_AGENT_GUIDE.md` for complete implementation guide.

**Quick Overview:**
1. Install Coqui TTS
2. Build FastAPI application
3. Train voice models
4. Create n8n workflow
5. Process audiobook

---

## 📊 COST BREAKDOWN

### **ElevenLabs (Option A):**
- Month 1: $22 (subscription) + $36 (Book 1 API) = $58
- Books 2-7: $36 each
- Total for 7 books: $274

### **Custom Agent (Option B):**
- Development: 40-60 hours
- GPU (optional): $500-$1,500
- Per book cost: $0-$5 electricity

---

## ✅ SUCCESS CHECKLIST

**Setup Complete When:**
- [ ] Python & FFmpeg installed
- [ ] ElevenLabs account created
- [ ] Voices recorded (10-15 min each)
- [ ] Voices cloned in ElevenLabs
- [ ] `.env` file configured
- [ ] Test voices working
- [ ] Chapter 1 processed successfully

---

## 🆘 TROUBLESHOOTING

### **"ModuleNotFoundError"**
- Make sure virtual environment is activated
- Run: `pip install -r requirements.txt`

### **"Invalid API key"**
- Check `.env` file has correct key
- No spaces around the `=` sign
- Key should be in quotes

### **"Voice quality is poor"**
- Record longer samples (15-20 min)
- Ensure clean audio (no background noise)
- Try different recording equipment

### **"Processing is slow"**
- This is normal for first run
- Chapter 1: ~15-30 minutes
- Full book: 6-8 hours overnight

---

## 📞 NEED HELP?

- **ElevenLabs Support:** https://elevenlabs.io/support
- **Documentation:** Check `docs/` folder
- **Architecture Options:** See `docs/ARCHITECTURE_OPTIONS.md`

---

## 🎉 YOU'RE READY!

Once setup is complete, you can:
- ✅ Process entire books overnight
- ✅ Generate ACX-compliant audio
- ✅ Use Hannah & Prasad's cloned voices
- ✅ Save $2,500+ per book vs traditional narration

**Now go create amazing audiobooks!** 🎙️✨

---

*Rohimaya Publishing*  
*October 2025*