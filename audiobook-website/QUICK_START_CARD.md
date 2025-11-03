# 🚀 QUICK START CARD - For Prasad

**Processing 400+ Page Books with N8N - No Coding Required!**

---

## ⚡ 5-MINUTE SETUP

### 1. Import Workflow
- Download: `audiobook-large-books-n8n-workflow.json`
- N8N → Import from File → Done!

### 2. Add API Keys
```
INWORLD_API_KEY=your_key_here
INWORLD_API_SECRET=your_secret_here
INWORLD_WORKSPACE=your_workspace_id
```

### 3. Configure
```javascript
book_title: "Eclipse of Fire and Wings"
manuscript_path: "/files/manuscript.txt"
output_folder: "/output/book1"
batch_size: "10"
chars_per_chunk: "2000"
```

### 4. Run!
- Click "Execute Workflow"
- Wait 7-9 hours
- Get audiobook! 🎉

---

## 📊 SYSTEM SPECS

**Handles:**
- ✅ Books of ANY size (400+ pages, 500+ pages, 1000+ pages!)
- ✅ No memory limits
- ✅ No token limits
- ✅ Auto error recovery

**Processing:**
- **Chunking:** 2000 characters per chunk
- **Batching:** 10 chunks at a time
- **Rate Limiting:** 1 second between requests
- **Retries:** 3 attempts per chunk

**Output:**
- **Format:** MP3
- **Sample Rate:** 48000 Hz
- **Bitrate:** 192 kbps
- **Loudness:** -18 LUFS (ACX compliant)

---

## ⏱️ TIMING

**400-Page Book:**
- Chunking: 2 minutes
- TTS Generation: 6-8 hours
- Merging: 10 minutes
- **Total: ~7-9 hours**

💡 **Start before bed, wake up to audiobook!**

---

## 📁 FILES YOU GET

```
/output/book1/
├── audiobook_final.mp3         ← 🎯 THIS IS IT!
├── audiobook_normalized.mp3
├── audiobook_raw.mp3
├── FINAL_REPORT.json
└── chunks/
    └── 450+ individual MP3s
```

---

## 🎯 QUICK CHECKS

### ✅ It's Working If:
- Nodes turning green
- Progress increasing in JSON
- Audio files appearing in /chunks/
- No red error messages

### ❌ Something Wrong If:
- Nodes stay yellow > 5 min
- Error messages in console
- No new files after 30 min

---

## 🆘 COMMON FIXES

**"API Error"**
→ Check API keys in environment variables

**"Rate Limit"**
→ Increase delay from 1s to 2s in Rate Limit node

**"Out of Memory"**
→ Reduce chars_per_chunk from 2000 to 1500

**"Wrong Voice"**
→ Check character detection logic in Smart Chunking node

---

## 💡 PRO SETTINGS

### Fast Mode (Risky):
```javascript
batch_size: "20"
chars_per_chunk: "2500"
```

### Safe Mode (Slower):
```javascript
batch_size: "5"
chars_per_chunk: "1500"
```

### Balanced (Recommended):
```javascript
batch_size: "10"
chars_per_chunk: "2000"
```

---

## 📈 PROGRESS TRACKING

Check: `/output/progress/audiobook_progress.json`

```json
{
  "Eclipse of Fire and Wings": {
    "total_chunks": 450,
    "completed": 180,
    "percentage": 40,
    "last_updated": "2025-10-25T12:30:00Z"
  }
}
```

---

## 💰 COSTS

**Per Book:**
- Inworld.ai: ~$54
- N8N Cloud: Free tier (or $20/month)

**vs Traditional:** $2,500 per book

**Savings:** $2,446 per book! 💰

---

## 🎊 FOR ALL 7 BOOKS

1. **Week 1:** Book 1 (setup + process)
2. **Week 2:** Books 2-3 (just change config)
3. **Week 3:** Books 4-5 (same pattern)
4. **Week 4:** Books 6-7 (finish!)

**Total Time:** 1 month  
**Total Cost:** ~$378  
**vs Traditional:** $17,500

**You Save:** $17,122! 🎉

---

## 🚀 ONE-LINE SUMMARY

**"Upload manuscript → Click execute → Come back in 8 hours → Download audiobook"**

That's it! No coding, no manual work, no memory issues!

---

## 📞 FILES YOU NEED

1. **audiobook-large-books-n8n-workflow.json**
   - The N8N workflow (import this)

2. **N8N_COMPLETE_BEGINNER_GUIDE.md**
   - Full step-by-step instructions

3. **character_voices_inworld.json**
   - Voice configuration

4. **Your manuscript.txt**
   - Plain text version of book

---

## ✨ FINAL CHECK

Before starting:
- [ ] N8N account ✅
- [ ] Inworld.ai API keys ✅
- [ ] Workflow imported ✅
- [ ] Configuration updated ✅
- [ ] Manuscript uploaded ✅

**All checked? PRESS EXECUTE! 🚀**

---

**Questions? Read the full guide: N8N_COMPLETE_BEGINNER_GUIDE.md**

**Happy Audiobook Making! 🎙️✨**

*Rohimaya Publishing - October 2025*
