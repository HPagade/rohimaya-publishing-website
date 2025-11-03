# 🎙️ AUDIOBOOK GENERATOR - N8N CLOUD COMPLETE SETUP GUIDE

## 📋 Table of Contents
1. [Google Drive Setup](#google-drive-setup)
2. [n8n Cloud Setup](#n8n-cloud-setup)
3. [Inworld AI Setup](#inworld-ai-setup)
4. [Import Workflow](#import-workflow)
5. [Configure & Test](#configure-test)
6. [Processing Your Book](#processing-your-book)
7. [Merging Audio Chunks](#merging-audio-chunks)
8. [Troubleshooting](#troubleshooting)

---

## 🗂️ GOOGLE DRIVE SETUP {#google-drive-setup}

### Step 1: Create Folder Structure

1. Go to **Google Drive** (drive.google.com)
2. Create this folder structure:

```
📁 Audiobook Generator/
  ├── 📁 Manuscripts/           ← Upload your book files here
  │   ├── eclipse_book1.txt
  │   └── book2.txt
  │
  └── 📁 Audio Outputs/         ← Generated chunks go here
      ├── 📁 Book1_Eclipse/
      └── 📁 Book2/
```

### Step 2: Get Folder IDs

**For the Output Folder:**
1. Open the **"Audio Outputs"** folder in Google Drive
2. Look at the URL in your browser:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
                                          ^^^^^^^^^^^^^^^^^^^
                                          This is your FOLDER ID
   ```
3. Copy the folder ID (the part after `/folders/`)
4. Save it - you'll need this for the workflow!

**For Each Manuscript:**
1. Click on your manuscript file (e.g., `eclipse_book1.txt`)
2. Click the three dots → **Get link** → **Copy link**
3. The URL looks like:
   ```
   https://drive.google.com/file/d/1x2y3z4a5b6c7d8e9f0g/view
                                   ^^^^^^^^^^^^^^^^^^^
                                   This is your FILE ID
   ```
4. Copy the file ID
5. Save it - you'll need this for the workflow!

### Step 3: Prepare Your Manuscript

**File Format Requirements:**
- ✅ Plain text file (.txt)
- ✅ UTF-8 encoding
- ✅ Paragraphs separated by double line breaks

**Formatting Tips:**

```
Aaravi stood at the edge of the cliff, her heart pounding.

"We have to go now," Vihan said urgently.

She nodded, feeling the weight of their decision. The moon cast its silvery glow over the landscape below.
```

**Important:**
- Use character names so AI can detect who's speaking
- Separate paragraphs with blank lines
- Remove excessive formatting
- Keep dialogue tags (said, whispered, shouted) for emotion detection

---

## ☁️ N8N CLOUD SETUP {#n8n-cloud-setup}

### Step 1: Create n8n Cloud Account

1. Go to: **https://app.n8n.cloud/**
2. Click **"Sign Up"**
3. Choose a plan:
   - **Starter:** $20/month (good for testing)
   - **Pro:** $50/month (recommended for full books)
4. Verify your email

### Step 2: Connect Google Drive

1. In n8n Cloud, click your **profile picture** (top right)
2. Go to **Settings** → **Credentials**
3. Click **"Add Credential"**
4. Search for and select **"Google Drive OAuth2 API"**
5. Click **"Connect my account"**
6. Sign in with your Google account
7. Allow n8n to access Google Drive
8. Name the credential: **"Google Drive account"**
9. Click **"Save"**

### Step 3: Add Environment Variables

1. In n8n Cloud, go to **Settings** → **Variables**
2. Click **"+ Add Variable"** for each of these:

```
Name: INWORLD_API_KEY
Value: sk-your-api-key-here
```

```
Name: INWORLD_API_SECRET
Value: sec-your-secret-here
```

```
Name: INWORLD_WORKSPACE
Value: ws-your-workspace-id
```

3. Click **"Save"** after each one

---

## 🌟 INWORLD AI SETUP {#inworld-ai-setup}

### Step 1: Create Inworld Account

1. Go to: **https://studio.inworld.ai/**
2. Sign up for an account
3. Choose **Creator Plan** ($20/month for 1M characters)
4. Verify your email

### Step 2: Get API Credentials

1. Log into Inworld Studio
2. Click **Settings** (gear icon, top right)
3. Navigate to **"API Keys"**
4. Click **"Create New API Key"**
5. Copy and save these three values:
   - `INWORLD_API_KEY`
   - `INWORLD_API_SECRET`
   - `INWORLD_WORKSPACE`

### Step 3: Clone Voices

#### Create Aaravi Character (Hannah's Voice):
1. In Inworld Studio, click **"Characters"**
2. Click **"Create Character"**
3. **Name:** `aaravi` (lowercase, no spaces)
4. Click **"Voice"** tab
5. Click **"Clone Voice"**
6. Upload **3-5 audio samples** of Hannah:
   - Each sample: 10-30 seconds
   - Clear audio quality
   - Different emotions if possible
   - Total: 2-5 minutes of audio
7. Wait for processing (5-10 minutes)
8. Test the voice
9. **Important:** The character ID should match `aaravi`

#### Create Vihan Character (Prasad's Voice):
1. Repeat above steps
2. **Name:** `vihan` (lowercase, no spaces)
3. Upload Prasad's voice samples
4. Test the voice

#### Create Narrator Character:
1. Create another character named `narrator`
2. Choose a **pre-built voice** from Inworld's library
3. Select a neutral, professional voice
4. **Name:** `narrator` (lowercase, no spaces)

**CRITICAL:** The character names in Inworld Studio must be **exactly**:
- `aaravi`
- `vihan`
- `narrator`

(All lowercase, no spaces. The workflow depends on these exact names!)

---

## 📥 IMPORT WORKFLOW {#import-workflow}

### Step 1: Download the Workflow

1. Download `audiobook_n8n_cloud.json` from this package

### Step 2: Import to n8n Cloud

1. Log into **n8n Cloud**
2. Click **"Workflows"** in the left sidebar
3. Click **"Import from File"**
4. Select `audiobook_n8n_cloud.json`
5. Click **"Import"**

### Step 3: Update Credentials

The workflow has two nodes that need your Google Drive credentials:

1. Click on **"Download Manuscript from Google Drive"** node
2. Under **"Credential to connect with"**, select your **"Google Drive account"**
3. Click on **"Upload Chunk to Google Drive"** node
4. Under **"Credential to connect with"**, select your **"Google Drive account"**
5. Click **"Save"** (top right)

---

## ⚙️ CONFIGURE & TEST {#configure-test}

### Step 1: Update Configuration Node

1. Click on the **"Configuration"** node
2. Update these values:

```javascript
book_title: "Eclipse of Fire and Wings"
google_drive_file_id: "YOUR_FILE_ID_FROM_GOOGLE_DRIVE"
tts_provider: "inworld"
batch_size: "10"
chars_per_chunk: "2000"
output_drive_folder_id: "YOUR_OUTPUT_FOLDER_ID_FROM_GOOGLE_DRIVE"
```

**Where to get these IDs:**
- `google_drive_file_id`: From your manuscript file (see Google Drive Setup, Step 2)
- `output_drive_folder_id`: From your Audio Outputs folder (see Google Drive Setup, Step 2)

3. Click **"Save"**

### Step 2: Test with Small File

Before processing a full book, test with a small sample:

**Create a test file:**
```
Aaravi smiled warmly. "This is just a test of our audiobook system."

Vihan nodded in agreement. "It seems to be working perfectly so far."

The narrator concluded with a sense of satisfaction about the successful test.
```

1. Upload this as **"test.txt"** to your Google Drive Manuscripts folder
2. Get the file ID
3. Update the Configuration node with the test file ID
4. Click **"Execute Workflow"** (top right)
5. Watch the execution in the logs

**Expected Result:**
- 3 MP3 files in your Google Drive Output folder
- Each file named: `segment_00000_aaravi_happy.mp3`, etc.
- No errors in the execution log

---

## 📚 PROCESSING YOUR BOOK {#processing-your-book}

### Step 1: Prepare Manuscript

1. Upload your complete manuscript to Google Drive Manuscripts folder
2. Get the file ID
3. Update Configuration node

### Step 2: Start Processing

1. Click **"Execute Workflow"**
2. **Do NOT close the browser tab** - keep it open during processing
3. Monitor progress in the execution log

### Step 3: Monitor Progress

Watch the logs for progress updates:
```
📚 Starting manuscript processing...
   Book: Eclipse of Fire and Wings
   Total characters: 450,000
   Total paragraphs: 2,843

✂️  Chunking complete!
   Total chunks: 225
   Batches: 23

✅ Chunk 1/225 (0%) - aaravi [happy]
✅ Chunk 2/225 (1%) - vihan [determined]
✅ Chunk 3/225 (1%) - narrator [neutral]
...
```

### Processing Time Estimates:

| Book Size | Words | Chunks | Time | Cost (Inworld) |
|-----------|-------|--------|------|----------------|
| **Short** | 50K | ~25 | 30 min | $5 |
| **Medium** | 100K | ~50 | 1 hour | $10 |
| **Full Novel** | 200K | ~100 | 2 hours | $20 |
| **Epic** | 400K | ~200 | 4 hours | $40 |

**Notes:**
- Processing happens in batches of 10 chunks
- Rate limit: 2 seconds between each chunk
- Automatic retries on errors
- Keep browser tab open!

---

## 🎵 MERGING AUDIO CHUNKS {#merging-audio-chunks}

After processing completes, you'll have individual MP3 files in Google Drive. You need to merge them into one audiobook.

### Option 1: Online Audio Joiner (Easiest)

**Best for books under 100 chunks (~200 pages)**

1. Go to: **https://audio-joiner.com/**
2. Download all chunks from Google Drive
3. Click **"Add tracks"**
4. Select **ALL** your MP3 files (they'll auto-sort by filename)
5. Click **"Join"**
6. Download the merged file

**Alternative Online Tools:**
- https://www.mp3joiner.org/
- https://www.audacityteam.org/ (free desktop app, handles unlimited files)

### Option 2: Mac Terminal (Recommended for large books)

**Best for 100+ chunks (full novels)**

**Prerequisites:**
1. Install Homebrew (if not already installed):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install FFmpeg:
   ```bash
   brew install ffmpeg
   ```

**Steps:**

1. **Download all chunks from Google Drive** to a folder on your Mac:
   ```
   ~/Downloads/audiobook_chunks/
   ```

2. **Open Terminal** and navigate to the folder:
   ```bash
   cd ~/Downloads/audiobook_chunks
   ```

3. **Create a file list** (this puts files in correct order):
   ```bash
   for f in segment_*.mp3; do echo "file '$f'" >> list.txt; done
   ```

4. **Merge all chunks:**
   ```bash
   ffmpeg -f concat -safe 0 -i list.txt -c copy audiobook_complete.mp3
   ```

5. **Normalize audio for ACX/Audible compliance:**
   ```bash
   ffmpeg -i audiobook_complete.mp3 -af loudnorm=I=-18:TP=-1.5:LRA=11 -ar 48000 -ab 192k audiobook_final.mp3
   ```

6. **Your final audiobook:** `audiobook_final.mp3`

### Option 3: Audacity (Best for editing)

**Use this if you want to edit, add intro/outro, or fine-tune:**

1. Download **Audacity** (free): https://www.audacityteam.org/
2. Open Audacity
3. Go to **File** → **Import** → **Audio**
4. Select **ALL** your MP3 chunks (Ctrl+A or Cmd+A)
5. They'll import in order automatically
6. **Optional:** Add intro music, adjust levels, remove silence
7. Go to **File** → **Export** → **Export as MP3**
8. Choose quality: **192 kbps** (ACX standard)
9. Export!

---

## 🔧 TROUBLESHOOTING {#troubleshooting}

### Issue: "Authentication Failed" Error

**Solution:**
1. Check your environment variables in n8n Cloud
2. Make sure API keys have no extra spaces
3. Verify Inworld account is active
4. Re-authenticate Google Drive credential

### Issue: "Character not found" Error

**Solution:**
1. Verify character names in Inworld Studio are **exactly**:
   - `aaravi`
   - `vihan`
   - `narrator`
2. All lowercase, no spaces
3. Character must be fully created (not processing)

### Issue: Workflow Stops in Middle

**Possible Causes:**
1. **Browser tab closed** - Keep it open during processing
2. **n8n Cloud timeout** - For very long books, split into chapters
3. **API rate limit** - Increase rate limit delay to 3-4 seconds

**Solution:**
- Split large books into chapters
- Process each chapter separately
- Merge chapters at the end

### Issue: Wrong Character Voice

**Solution:**
The workflow detects characters by:
- Looking for names: "Aaravi", "Vihan"
- Looking for pronouns: "she said", "he replied"

**Tips:**
- Use character names frequently
- Include dialogue tags: "said", "whispered", "shouted"
- For narrator sections, avoid "I" pronouns

### Issue: Audio Quality Poor

**Solutions:**
1. **Check voice cloning samples:**
   - Use high-quality recordings
   - Upload 3-5 varied samples
   - Each 10-30 seconds long
   - Clear speech, no background noise

2. **Increase sample rate:**
   - In TTS node, change `"sample_rate": 48000` to keep high quality

3. **Use Inworld voice settings:**
   - Adjust `speaking_rate`, `pitch`, `volume` in TTS node

### Issue: "File not found" Error

**Solution:**
1. Verify manuscript file ID is correct
2. Make sure file is in Google Drive (not in Trash)
3. Check Google Drive permissions (n8n must have access)
4. Re-authenticate Google Drive credential

### Issue: Chunks Out of Order

**Solution:**
Filenames are auto-numbered: `segment_00001`, `segment_00002`, etc.

When merging:
- Tools should auto-sort by filename
- In Mac Terminal, the `for f in segment_*.mp3` command sorts automatically
- If still wrong, rename files with leading zeros: `segment_00001.mp3`

---

## 💡 TIPS & BEST PRACTICES

### For Best Audio Quality:

1. **Voice Cloning Samples:**
   - Record in quiet environment
   - Use good microphone
   - Speak clearly and naturally
   - Include different emotions
   - 3-5 samples, each 10-30 seconds

2. **Manuscript Formatting:**
   - Use character names frequently
   - Include dialogue tags (said, whispered, shouted)
   - Separate paragraphs with blank lines
   - Remove excessive formatting

3. **Processing:**
   - Test with small sample first
   - Split very large books into chapters
   - Keep browser tab open during processing
   - Monitor logs for errors

### For Faster Processing:

1. **Increase batch size** (in Configuration node):
   - Default: 10
   - Try: 20 (if no errors)
   - Max: 50 (may cause memory issues)

2. **Reduce rate limit delay**:
   - Default: 2 seconds
   - Try: 1 second
   - Watch for "rate limit exceeded" errors

3. **Use smaller chunks**:
   - Default: 2000 characters
   - Try: 1500 for faster generation
   - Trade-off: More chunks = more merging

### For ACX/Audible Compliance:

Your merged audiobook must meet these specs:

✅ **Format:** MP3
✅ **Sample Rate:** 48000 Hz
✅ **Bit Rate:** 192 kbps (constant bit rate)
✅ **Loudness:** -18 LUFS to -23 LUFS
✅ **Peak:** -3 dB or lower
✅ **Noise Floor:** -60 dB or lower

The FFmpeg normalization command in Option 2 handles all of this automatically!

---

## 📊 COST BREAKDOWN

### Inworld AI Pricing:

| Plan | Monthly Cost | Characters Included | Per Extra 1M Characters |
|------|--------------|---------------------|------------------------|
| **Free** | $0 | 20K | N/A |
| **Creator** | $20 | 1M | $20 |
| **Pro** | $100 | 10M | $10 |

**Example Costs:**
- 50K word book ≈ 300K characters ≈ **$6**
- 100K word book ≈ 600K characters ≈ **$12**
- 200K word book ≈ 1.2M characters ≈ **$24**

### n8n Cloud Pricing:

| Plan | Monthly Cost | Workflow Executions | Execution Time |
|------|--------------|---------------------|----------------|
| **Starter** | $20 | 2,500 | 30 min each |
| **Pro** | $50 | Unlimited | 2 hours each |

**Recommendation:** 
- **Starter** for testing/single books
- **Pro** for multiple books or full novels

---

## 🎉 YOU'RE READY!

You now have everything you need to generate professional audiobooks with AI-cloned voices!

**Quick Start Checklist:**

- [ ] Google Drive folders created
- [ ] Manuscript uploaded and file ID copied
- [ ] n8n Cloud account created
- [ ] Google Drive connected to n8n
- [ ] Inworld AI account created
- [ ] Voices cloned (Aaravi, Vihan, Narrator)
- [ ] Environment variables added
- [ ] Workflow imported
- [ ] Test file processed successfully
- [ ] Audio merging tool ready

**Next Steps:**
1. Process your first chapter
2. Listen and verify quality
3. Process remaining chapters
4. Merge into complete audiobook
5. Upload to ACX/Audible
6. 🎉 Publish your audiobook!

---

## 📞 SUPPORT RESOURCES

- **Inworld AI Docs:** https://docs.inworld.ai/
- **n8n Community:** https://community.n8n.io/
- **n8n Cloud Support:** https://n8n.io/support
- **Audacity Manual:** https://manual.audacityteam.org/

---

**Built for Hannah & Prasad by Claude**  
*Rohimaya Publishing - Where stories come alive* 🦚🔥📚
