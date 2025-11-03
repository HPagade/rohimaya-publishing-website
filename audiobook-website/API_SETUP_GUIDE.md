# 🎤 AUDIOBOOK GENERATOR - API SETUP GUIDE

## 📋 Table of Contents
1. [Inworld AI Setup](#inworld-ai-setup) (Recommended - Voice Cloning + Emotions)
2. [ElevenLabs Setup](#elevenlabs-setup) (Alternative - Best Voice Quality)
3. [OpenAI TTS Setup](#openai-tts-setup) (Alternative - Cheapest Option)
4. [n8n Cloud Environment Variables](#n8n-cloud-environment-variables)
5. [Testing Your Setup](#testing-your-setup)

---

## 🌟 INWORLD AI SETUP (Recommended)

Inworld AI is the **best choice** for this workflow because it supports:
- ✅ Voice cloning (clone Hannah & Prasad's voices)
- ✅ Emotional control (happy, sad, angry, etc.)
- ✅ Character-specific voices
- ✅ High-quality audio output

### Step 1: Create Inworld AI Account
1. Go to: https://studio.inworld.ai/
2. Click **"Sign Up"** or **"Get Started"**
3. Choose **Creator Plan** (starts at $20/month for 1M characters)
4. Verify your email

### Step 2: Get API Credentials
1. Log into Inworld Studio
2. Click **Settings** (gear icon) in top right
3. Navigate to **"API Keys"** section
4. Click **"Create New API Key"**
5. Copy and save:
   - `INWORLD_API_KEY` (looks like: `sk-abc123...`)
   - `INWORLD_API_SECRET` (looks like: `sec-xyz789...`)
   - `INWORLD_WORKSPACE` (looks like: `ws-123abc...`)

### Step 3: Create Character Voices

#### Create "Aaravi" Character (Hannah's Voice):
1. In Inworld Studio, click **"Characters"**
2. Click **"Create Character"**
3. Name: `aaravi`
4. Click **"Voice"** tab
5. Click **"Clone Voice"**
6. Upload **3-5 audio samples** of Hannah speaking:
   - Each should be 10-30 seconds
   - Clear audio quality
   - Different emotions/tones
   - Total: 2-5 minutes of audio
7. Wait for processing (5-10 minutes)
8. Test the voice
9. Copy the **Character ID** (looks like: `char-aaravi-abc123`)

#### Create "Vihan" Character (Prasad's Voice):
1. Repeat above steps
2. Name: `vihan`
3. Upload Prasad's voice samples
4. Copy the **Character ID** (looks like: `char-vihan-xyz789`)

#### Create "Narrator" Character (Neutral Voice):
1. Create another character named `narrator`
2. Instead of cloning, select a **pre-built voice** from Inworld's library
3. Recommended: Choose a neutral, professional voice
4. Copy the **Character ID**

### Step 4: Configure Character Mapping in Workflow
In the n8n workflow, update the **"Smart Chunking"** node to use YOUR character IDs:

```javascript
// Find this section in the Smart Chunking node:
if (textLower.includes('aaravi')) {
  chunk.character = 'aaravi';  // This maps to your Inworld character ID
} else if (textLower.includes('vihan')) {
  chunk.character = 'vihan';   // This maps to your Inworld character ID
} else {
  chunk.character = 'narrator'; // This maps to your Inworld character ID
}
```

---

## 🎯 ELEVENLABS SETUP (Alternative)

ElevenLabs has **the best voice quality** but is more expensive.

### Step 1: Create Account
1. Go to: https://elevenlabs.io/
2. Sign up for an account
3. Choose **Creator Plan** ($22/month for 100K characters)

### Step 2: Get API Key
1. Log in to ElevenLabs
2. Click your **profile icon** → **Settings**
3. Navigate to **"API Keys"**
4. Click **"Create API Key"**
5. Copy and save: `ELEVENLABS_API_KEY`

### Step 3: Clone Voices
1. In ElevenLabs, go to **"Voice Library"**
2. Click **"Add Voice"**
3. For Hannah's voice:
   - Choose **"Instant Voice Cloning"**
   - Upload **1 audio sample** (30 seconds minimum)
   - Name: "Aaravi"
   - Copy the **Voice ID** (looks like: `21m00Tcm4TlvDq8ikWAM`)
4. Repeat for Prasad's voice (name: "Vihan")
5. Create or select a narrator voice

### Step 4: Update Workflow for ElevenLabs
Replace the **"Generate TTS - Inworld"** node with this ElevenLabs version:

```json
{
  "parameters": {
    "url": "=https://api.elevenlabs.io/v1/text-to-speech/{{ $json.character === 'aaravi' ? $env.AARAVI_VOICE_ID : $json.character === 'vihan' ? $env.VIHAN_VOICE_ID : $env.NARRATOR_VOICE_ID }}",
    "authentication": "genericCredentialType",
    "genericAuthType": "httpHeaderAuth",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "xi-api-key",
          "value": "={{ $env.ELEVENLABS_API_KEY }}"
        },
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "method": "POST",
    "sendBody": true,
    "specifyBody": "json",
    "jsonBody": "={{ {\n  \"text\": $json.text,\n  \"model_id\": \"eleven_multilingual_v2\",\n  \"voice_settings\": {\n    \"stability\": 0.5,\n    \"similarity_boost\": 0.75,\n    \"style\": 0.5,\n    \"use_speaker_boost\": true\n  }\n} }}",
    "options": {
      "response": {
        "response": {
          "responseFormat": "file",
          "outputPropertyName": "audio_data"
        }
      }
    }
  },
  "name": "Generate TTS - ElevenLabs",
  "type": "n8n-nodes-base.httpRequest",
  "typeVersion": 4.2
}
```

---

## 💰 OPENAI TTS SETUP (Budget Option)

OpenAI TTS is the **cheapest option** but has limited voice options and no emotion control.

### Step 1: Create OpenAI Account
1. Go to: https://platform.openai.com/
2. Sign up and add payment method
3. Cost: **$15 per 1M characters** (~10 hours of audio)

### Step 2: Get API Key
1. Navigate to **API Keys** section
2. Click **"Create new secret key"**
3. Copy and save: `OPENAI_API_KEY`

### Step 3: Update Workflow for OpenAI
Replace the TTS node with:

```json
{
  "parameters": {
    "url": "https://api.openai.com/v1/audio/speech",
    "authentication": "genericCredentialType",
    "genericAuthType": "httpHeaderAuth",
    "sendHeaders": true,
    "headerParameters": {
      "parameters": [
        {
          "name": "Authorization",
          "value": "=Bearer {{ $env.OPENAI_API_KEY }}"
        },
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "method": "POST",
    "sendBody": true,
    "specifyBody": "json",
    "jsonBody": "={{ {\n  \"model\": \"tts-1-hd\",\n  \"input\": $json.text,\n  \"voice\": $json.character === 'aaravi' ? 'nova' : $json.character === 'vihan' ? 'onyx' : 'alloy',\n  \"response_format\": \"mp3\"\n} }}",
    "options": {
      "response": {
        "response": {
          "responseFormat": "file"
        }
      }
    }
  },
  "name": "Generate TTS - OpenAI"
}
```

**Available OpenAI Voices:**
- `alloy` - Neutral
- `echo` - Male
- `fable` - Male (British)
- `onyx` - Male (Deep)
- `nova` - Female (Young)
- `shimmer` - Female (Soft)

---

## 🔧 N8N CLOUD ENVIRONMENT VARIABLES

### How to Add Environment Variables in n8n Cloud:

1. **Log into n8n Cloud**: https://app.n8n.cloud/
2. **Go to Settings**:
   - Click your **profile picture** (top right)
   - Select **"Settings"**
3. **Navigate to "Variables"**:
   - Click **"Variables"** in the left sidebar
4. **Add Each Variable**:
   - Click **"+ Add Variable"**
   - Enter the **Name** (exactly as shown below)
   - Enter the **Value** (your API key/ID)
   - Click **"Save"**

### Required Environment Variables (Inworld AI):

```
INWORLD_API_KEY=sk-your-api-key-here
INWORLD_API_SECRET=sec-your-secret-here
INWORLD_WORKSPACE=ws-your-workspace-id
```

### Required Environment Variables (ElevenLabs - if using):

```
ELEVENLABS_API_KEY=your-elevenlabs-key
AARAVI_VOICE_ID=voice-id-for-hannah
VIHAN_VOICE_ID=voice-id-for-prasad
NARRATOR_VOICE_ID=voice-id-for-narrator
```

### Required Environment Variables (OpenAI - if using):

```
OPENAI_API_KEY=sk-your-openai-key
```

---

## 🧪 TESTING YOUR SETUP

### Test 1: Single Chunk Test

1. In n8n, create a small test manuscript:
```
Aaravi smiled warmly. "This is a test of our audiobook system."

Vihan nodded. "It's working perfectly."

The narrator concluded the story with a sense of accomplishment.
```

2. Save as `/tmp/test_manuscript.txt`

3. Update the **Configuration** node:
   - `book_title`: "Test Book"
   - `manuscript_path`: "/tmp/test_manuscript.txt"
   - `output_folder`: "/tmp/test_output"
   - `batch_size`: "3"
   - `chars_per_chunk`: "500"

4. **Execute the workflow**

5. Check for errors in the execution log

6. Verify output files in `/tmp/test_output/chunks/`

### Test 2: Voice Quality Check

1. Download the generated MP3 files
2. Listen to each character's voice
3. Verify:
   - ✅ Hannah's voice sounds like Hannah
   - ✅ Prasad's voice sounds like Prasad
   - ✅ Narrator voice is clear and professional
   - ✅ Emotions are reflected in tone (if using Inworld)

### Test 3: Full Chapter Test

1. Use a **single chapter** (5,000-10,000 words)
2. Monitor the execution time
3. Check progress in the logs
4. Verify the final merged audio file

---

## 🚨 COMMON ISSUES & SOLUTIONS

### Issue: "Authentication Failed"
**Solution:** Double-check your API keys in n8n Variables. Make sure there are no extra spaces.

### Issue: "Character not found"
**Solution:** In Inworld Studio, verify your character names match exactly (case-sensitive).

### Issue: "Rate limit exceeded"
**Solution:** Increase the **Rate Limit** node delay from 1 second to 2-3 seconds.

### Issue: "Output file not found"
**Solution:** 
- n8n Cloud has limited file storage
- Consider using **Google Drive** or **Dropbox** node to store outputs
- Or use **n8n self-hosted** for unlimited local storage

### Issue: "FFmpeg command not found"
**Solution:** n8n Cloud may not have FFmpeg installed. You have two options:
1. Use **n8n self-hosted** (Docker/local Mac)
2. Use a **cloud FFmpeg service** API instead

---

## 📊 COST COMPARISON

| Provider | Cost per Hour | Voice Cloning | Emotion Control | Quality |
|----------|---------------|---------------|-----------------|---------|
| **Inworld AI** | $2-4 | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ |
| **ElevenLabs** | $2-5 | ✅ Yes | ❌ No | ⭐⭐⭐⭐⭐ |
| **OpenAI TTS** | $1.50 | ❌ No | ❌ No | ⭐⭐⭐ |

**Recommendation for your use case:** **Inworld AI** because you need voice cloning AND emotion control for characters.

---

## 🎉 NEXT STEPS

1. ✅ Choose your TTS provider (recommended: Inworld AI)
2. ✅ Create account and get API keys
3. ✅ Clone Hannah & Prasad's voices
4. ✅ Add environment variables to n8n Cloud
5. ✅ Import the workflow JSON
6. ✅ Run a test with a small manuscript
7. ✅ Process your first chapter!
8. 🚀 Generate your complete audiobook!

---

## 📞 NEED HELP?

Common support resources:
- **Inworld AI Docs**: https://docs.inworld.ai/
- **n8n Community**: https://community.n8n.io/
- **n8n Cloud Support**: https://n8n.io/support

Good luck with your audiobook! 🎙️📚
