# 🎙️ COMPLETE N8N AUDIOBOOK SYSTEM - BEGINNER GUIDE

**For:** Prasad Pagade  
**Project:** Processing 400+ Page Books Without Memory/Token Issues  
**Time:** 30 minutes setup, then automated!  
**Skill Level:** Beginner-Friendly (No Coding Required!)

---

## 🌟 WHAT THIS SYSTEM DOES

### **The Magic:**
This N8N workflow processes books of **ANY SIZE** (400+ pages, 500+ pages, even 1000+ pages!) without:
- ❌ Running out of memory
- ❌ Hitting token limits
- ❌ Manual intervention
- ❌ Coding/programming

### **How It Works:**
1. **Smart Chunking** - Breaks manuscript into 2000-character pieces
2. **Batch Processing** - Processes 10 chunks at a time
3. **Auto-Resume** - Continues if interrupted
4. **Progress Tracking** - Shows real-time progress
5. **Error Recovery** - Automatically retries failures
6. **ACX Compliance** - Perfect audio output for Audible

### **Result:**
- ✅ Professional audiobook
- ✅ ACX/Audible compliant (-18 LUFS, 48kHz)
- ✅ Hannah & Prasad's voices
- ✅ Proper character/emotion detection
- ✅ Complete hands-off after setup

---

## 📋 PREREQUISITES

### **What You Need:**

1. **N8N Cloud Account** (or self-hosted N8N)
   - Sign up: https://n8n.io
   - Free tier works!
   
2. **Inworld.ai Account** (or ElevenLabs)
   - Sign up: https://inworld.ai
   - Get API key & secret
   
3. **Your Manuscript**
   - Plain text file (.txt)
   - Any size (400+ pages is fine!)
   
4. **FFmpeg** (auto-installed on N8N Cloud)
   - For audio merging/normalization

---

## 🚀 STEP-BY-STEP SETUP

### **STEP 1: Set Up N8N Cloud (10 minutes)**

#### 1.1 Create N8N Account
1. Go to: https://n8n.io
2. Click **"Get Started"**
3. Choose **"Cloud"** option
4. Sign up with email
5. Verify your email

#### 1.2 Create New Workflow
1. Click **"New Workflow"**
2. Name it: **"Audiobook Generator - Large Books"**
3. You'll see an empty canvas

---

### **STEP 2: Import the Workflow (5 minutes)**

#### 2.1 Download Workflow File
1. Go to your GitHub repo: `audiobook-website`
2. Navigate to: `system/n8n-workflows/`
3. Download: `audiobook-large-books-n8n-workflow.json`

#### 2.2 Import into N8N
1. In N8N, click the **"⋮"** menu (top right)
2. Click **"Import from File"**
3. Select the JSON file you downloaded
4. Click **"Import"**

**🎉 The complete workflow is now loaded!**

---

### **STEP 3: Configure API Credentials (10 minutes)**

#### 3.1 Add Inworld.ai Credentials

1. **Get Your API Keys:**
   - Go to: https://studio.inworld.ai
   - Sign in
   - Click your profile → **"API Keys"**
   - Copy:
     - API Key
     - API Secret
     - Workspace ID

2. **Add to N8N:**
   - In N8N workflow, click any **"🎤 Generate TTS"** node
   - Scroll to **"Authentication"**
   - Click **"Create New Credential"**
   - Enter:
     - Name: **"Inworld.ai"**
     - API Key: *paste your key*
     - API Secret: *paste your secret*
   - Click **"Save"**

3. **Set Environment Variables:**
   - In N8N, go to **Settings → Environment Variables**
   - Add these:
     ```
     INWORLD_API_KEY=your_api_key_here
     INWORLD_API_SECRET=your_api_secret_here
     INWORLD_WORKSPACE=your_workspace_id_here
     ```
   - Click **"Save"**

---

### **STEP 4: Prepare Your Manuscript (5 minutes)**

#### 4.1 Format Your Manuscript

Your manuscript should be a plain text file (.txt) with:
- Paragraphs separated by double line breaks
- Character names mentioned clearly
- No special formatting needed

**Example:**
```
Chapter 1: The Beginning

The morning sun rose over the mountains, casting golden light across the valley.

Aaravi stood at the cliff's edge, her peacock manifestation pulsing with energy. "We need to move now," she said.

Vihan appeared beside her, the phoenix fire flickering in his eyes. "I'm ready," he replied.
```

#### 4.2 Upload to N8N

**Option A: Direct Upload (Easiest)**
1. In N8N, go to **Files** (left sidebar)
2. Click **"Upload"**
3. Select your manuscript.txt
4. Copy the file path (e.g., `/files/manuscript.txt`)

**Option B: Cloud Storage**
1. Upload to Google Drive/Dropbox
2. Get shareable link
3. Use N8N's Google Drive node to fetch

---

### **STEP 5: Configure the Workflow (5 minutes)**

#### 5.1 Update Configuration Node

1. Click the **"⚙️ Configuration"** node
2. Update these values:

```javascript
book_title: "Eclipse of Fire and Wings"
manuscript_path: "/files/manuscript.txt"  // Your file path
output_folder: "/output/book1"
tts_provider: "inworld"
batch_size: "10"  // Process 10 chunks at a time
chars_per_chunk: "2000"  // Safe size for TTS
```

3. Click **"Execute Node"** to test

---

### **STEP 6: Test the Workflow (5 minutes)**

#### 6.1 Test with First Chapter

Before processing the entire book, test with just Chapter 1:

1. Create a test file with only Chapter 1
2. Update `manuscript_path` to point to test file
3. Click **"Execute Workflow"** (top right)
4. Watch the nodes light up green ✅
5. Check `/output/book1/chunks/` for audio files

#### 6.2 Verify Audio Quality

1. Download one of the test chunks
2. Listen to it
3. Check:
   - ✅ Correct voice (Hannah/Prasad/Narrator)
   - ✅ Proper emotion
   - ✅ Clear audio
   - ✅ Good pacing

**If everything sounds good, you're ready for the full book!**

---

## 🎬 RUNNING THE FULL BOOK

### **STEP 7: Process Complete Book (Automated!)**

#### 7.1 Update to Full Manuscript

1. Go back to **"⚙️ Configuration"** node
2. Change `manuscript_path` to full manuscript
3. Click **"Save"**

#### 7.2 Activate Workflow

1. Click **"Active"** toggle (top right)
2. Click **"Execute Workflow"**

**Now sit back and relax! ☕**

---

## 📊 MONITORING PROGRESS

### **While Processing:**

1. **In N8N Dashboard:**
   - See nodes turning green ✅
   - View execution logs
   - Check "📊 Progress" sticky notes

2. **Progress File:**
   - Check: `/output/progress/audiobook_progress.json`
   - Shows:
     - Total chunks
     - Completed chunks
     - Percentage complete
     - Estimated time remaining

3. **Audio Chunks:**
   - Check: `/output/book1/chunks/`
   - See MP3 files appearing
   - Each named: `segment_00001_aaravi_determined.mp3`

### **Example Progress File:**
```json
{
  "Eclipse of Fire and Wings": {
    "total_chunks": 450,
    "completed": 180,
    "failed": 2,
    "percentage": 40,
    "started": "2025-10-25T10:00:00Z",
    "last_updated": "2025-10-25T12:30:00Z"
  }
}
```

---

## ⏱️ TIMING ESTIMATES

### **Processing Time (for 400-page book):**

**Breakdown:**
- **Chunking:** 1-2 minutes (instant)
- **TTS Generation:** 6-8 hours (overnight)
  - ~450 chunks × 30 seconds each = 225 minutes
  - Plus rate limiting delays
- **Merging:** 5-10 minutes
- **Normalization:** 5-10 minutes
- **Final Processing:** 2-5 minutes

**Total:** ~7-9 hours (fully automated)

**💡 Pro Tip:** Start it before bed, wake up to finished audiobook!

---

## 🎯 WHAT HAPPENS AUTOMATICALLY

### **The Workflow Does This For You:**

1. ✅ **Reads manuscript** - Loads entire file
2. ✅ **Smart chunking** - Splits into 2000-char pieces
3. ✅ **Character detection** - Identifies Aaravi/Vihan/Narrator
4. ✅ **Emotion detection** - Finds happy/sad/angry/etc
5. ✅ **Batch processing** - Processes 10 chunks at a time
6. ✅ **TTS generation** - Calls Inworld.ai API
7. ✅ **Saves chunks** - Stores individual MP3s
8. ✅ **Tracks progress** - Updates JSON file
9. ✅ **Rate limiting** - Waits 1 sec between requests
10. ✅ **Error handling** - Retries failures automatically
11. ✅ **Merges audio** - Combines all chunks
12. ✅ **Normalizes** - ACX compliant (-18 LUFS)
13. ✅ **Removes silence** - Cleans up gaps
14. ✅ **Generates report** - Final statistics

**You do:** Start it  
**N8N does:** Everything else!

---

## 🛠️ CUSTOMIZATION OPTIONS

### **Adjust Processing Speed:**

In **"⚙️ Configuration"** node:

```javascript
// Process MORE chunks per batch (faster, more API load)
batch_size: "20"  // Default: 10

// Process FEWER chunks per batch (slower, safer)
batch_size: "5"

// Adjust chunk size
chars_per_chunk: "1500"  // Smaller chunks
chars_per_chunk: "2500"  // Larger chunks (may hit limits)
```

### **Change TTS Provider:**

#### For ElevenLabs Instead:
1. Update Configuration:
   ```javascript
   tts_provider: "elevenlabs"
   ```

2. Update "🎤 Generate TTS" node URL:
   ```
   https://api.elevenlabs.io/v1/text-to-speech/{{voice_id}}
   ```

3. Add ElevenLabs credentials

---

## 📁 OUTPUT FILES

### **After Processing Completes:**

```
/output/book1/
├── chunks/                          # Individual audio segments
│   ├── segment_00001_narrator_neutral.mp3
│   ├── segment_00002_aaravi_determined.mp3
│   ├── segment_00003_vihan_protective.mp3
│   └── ... (450 files)
├── audiobook_raw.mp3               # Merged but not normalized
├── audiobook_normalized.mp3        # ACX normalized
├── audiobook_final.mp3             # ✨ FINAL OUTPUT ✨
├── file_list.txt                   # FFmpeg concat list
├── FINAL_REPORT.json               # Completion report
└── progress/
    └── audiobook_progress.json     # Progress tracking
```

### **The File You Want:**
📁 **`audiobook_final.mp3`** - This is your complete, ACX-compliant audiobook!

---

## 📊 FINAL REPORT EXAMPLE

```json
{
  "status": "SUCCESS",
  "book_title": "Eclipse of Fire and Wings",
  "output": {
    "file": "/output/book1/audiobook_final.mp3",
    "size_mb": "487.32",
    "duration": "8h 15m 43s",
    "duration_seconds": 29743
  },
  "processing": {
    "total_chunks": 450,
    "started": "2025-10-25T22:00:00Z",
    "completed": "2025-10-26T06:15:00Z",
    "time_elapsed": "495 minutes"
  },
  "acx_compliance": {
    "sample_rate": "48000 Hz",
    "bitrate": "192 kbps",
    "loudness": "-18 LUFS",
    "peak": "-1.5 dB",
    "compliant": true
  },
  "next_steps": [
    "✅ Listen to complete audiobook for quality check",
    "✅ Upload to ACX/Audible platform",
    "✅ Submit for review",
    "🎉 Celebrate your audiobook!"
  ]
}
```

---

## 🆘 TROUBLESHOOTING

### **Problem: "API Rate Limit Exceeded"**

**Solution:**
- Increase delay in "⏱️ Rate Limit" node
- Change from 1 second to 2-3 seconds
- Reduce batch_size from 10 to 5

---

### **Problem: "Out of Memory"**

**Solution:**
- This shouldn't happen! The chunking prevents it
- If it does: Reduce `chars_per_chunk` from 2000 to 1500
- Contact N8N support if persists

---

### **Problem: "Some Chunks Failed"**

**Solution:**
- Check `/output/errors/error_log.json`
- Failed chunks are automatically retried 3 times
- Manually retry specific chunks:
  1. Note failed chunk indices
  2. Extract those segments from manuscript
  3. Process separately

---

### **Problem: "Wrong Voice for Character"**

**Solution:**
- Improve character detection in "✂️ Smart Chunking" node
- Add more character name patterns:
  ```javascript
  if (textLower.includes('aaravi') || 
      textLower.includes('she said') ||
      textLower.includes('she whispered')) {
    chunk.character = 'aaravi';
  }
  ```

---

### **Problem: "Audio Quality Issues"**

**Solution:**
- Check voice samples are high quality (10+ minutes)
- Verify API credentials are correct
- Test with single chunk first
- Adjust voice_settings in TTS node

---

### **Problem: "Workflow Stuck"**

**Solution:**
- Check execution logs in N8N
- Look for red error messages
- Cancel and restart from last successful batch
- Progress is saved, won't lose work!

---

## 💡 PRO TIPS

### **1. Process Multiple Books Sequentially**

Create multiple Configuration nodes:
```javascript
// Book 1
book_title: "Eclipse of Fire and Wings"
output_folder: "/output/book1"

// Book 2
book_title: "Shadows of the Lioness"
output_folder: "/output/book2"
```

Connect them in sequence!

---

### **2. Optimize for Speed**

```javascript
batch_size: "20"           // Process more at once
chars_per_chunk: "2500"    // Larger chunks (fewer API calls)
```

**But be careful:** May hit rate limits!

---

### **3. Optimize for Quality**

```javascript
batch_size: "5"            // Process fewer at once
chars_per_chunk: "1500"    // Smaller chunks (better emotion detection)
```

---

### **4. Save Costs**

- Use larger chunks (fewer API calls)
- Process overnight (no rush)
- Clone voices once, reuse for all books

---

### **5. Quality Check Strategy**

Don't listen to entire 8-hour audiobook!

1. **Listen to:**
   - First 5 minutes
   - Chapter transitions (3-4 samples)
   - Emotional scenes (2-3 samples)
   - Last 5 minutes

2. **Check for:**
   - ✅ Correct voices
   - ✅ Proper emotions
   - ✅ No glitches/cuts
   - ✅ Consistent volume

---

## 📈 SCALING TO ALL 7 BOOKS

### **Week-by-Week Plan:**

**Week 1:** Book 1
- Set up system
- Process first book
- Quality check
- Upload to ACX

**Week 2:** Books 2-3
- Use same workflow
- Just change configuration
- Process overnight

**Week 3:** Books 4-5
- Continue pattern
- System is proven

**Week 4:** Books 6-7
- Final books
- Celebrate! 🎉

---

## 💰 COST BREAKDOWN

### **Inworld.ai Pricing:**
- **Characters/month:** ~$0.06 per 1,000 characters
- **400-page book:** ~180,000 words = ~900,000 characters
- **Cost per book:** ~$54

**For 7 books:** ~$378 total

**vs Traditional Narration:** $2,500 per book = $17,500 total

**Savings:** $17,122 💰

---

## ✅ FINAL CHECKLIST

Before starting full book processing:

- [ ] N8N account created
- [ ] Workflow imported
- [ ] API credentials configured
- [ ] Manuscript uploaded and formatted
- [ ] Configuration node updated
- [ ] Test run completed successfully
- [ ] Audio quality verified
- [ ] Output folder created
- [ ] Progress tracking working
- [ ] Error handling tested

**All checked?** 🚀 **START THE WORKFLOW!**

---

## 🎉 SUCCESS CRITERIA

### **You'll Know It Worked When:**

1. ✅ All chunks processed (check progress.json)
2. ✅ Final MP3 file exists
3. ✅ Duration matches book length (~8 hours)
4. ✅ ACX compliance confirmed in report
5. ✅ No major errors in error log
6. ✅ Audio sounds professional
7. ✅ Characters have correct voices
8. ✅ Emotions are appropriate

---

## 📞 NEED HELP?

### **Resources:**

1. **N8N Documentation:**
   - https://docs.n8n.io

2. **Inworld.ai Docs:**
   - https://docs.inworld.ai

3. **This Repository:**
   - Check other guides in `/docs/`
   - Review troubleshooting section

4. **Community:**
   - N8N Community Forum
   - Inworld.ai Discord

---

## 🎊 CONGRATULATIONS!

You now have a **professional audiobook generation system** that:

✅ Handles books of ANY size  
✅ Requires NO coding  
✅ Runs completely automated  
✅ Produces ACX-compliant audio  
✅ Uses your cloned voices  
✅ Costs fraction of traditional narration  

**Now go create amazing audiobooks!** 🎙️✨

---

## 📚 APPENDIX: TECHNICAL DETAILS

### **How the Chunking Algorithm Works:**

```
1. Read entire manuscript
2. Split by paragraphs (double line break)
3. Combine paragraphs until reaching 2000 chars
4. Create new chunk, repeat
5. Result: ~450 chunks for 400-page book
```

**Why 2000 characters?**
- Safe for all TTS APIs
- Preserves paragraph boundaries
- Good for emotion detection
- Prevents memory issues

### **Batch Processing Logic:**

```
Batch 1: Chunks 0-9 (10 chunks)
  → Process all 10
  → Save progress
  → Continue

Batch 2: Chunks 10-19
  → Process all 10
  → Save progress
  → Continue

... until all chunks complete
```

### **Error Recovery:**

```
If chunk fails:
  1. Log error
  2. Wait 5 seconds
  3. Retry (up to 3 times)
  4. If still fails: Log and continue
  5. Report at end
```

---

**Created for Rohimaya Publishing**  
**October 2025**  
**Happy Audiobook Creating! 🎉**
