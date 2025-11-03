# 🔑 API KEYS SETUP GUIDE - SUPER SIMPLE!

**For:** Total Beginners (Prasad!)  
**Time:** 15 minutes  
**What You'll Learn:** Where to put API keys so the system works

---

## 🎯 WHAT ARE API KEYS?

Think of API keys like **passwords** that let N8N talk to Inworld.ai (or ElevenLabs).

**You need:**
- API Key (like a username)
- API Secret (like a password)
- Workspace ID (like your account number)

**Without these:** The workflow can't generate audio ❌  
**With these:** Everything works! ✅

---

## 📋 PART 1: GET YOUR API KEYS

### **STEP 1: Go to Inworld.ai**

1. Open browser
2. Go to: **https://studio.inworld.ai**
3. Sign up or log in

### **STEP 2: Find Your API Keys**

1. Click your **profile picture** (top right corner)
2. Click **"API Keys"** in dropdown menu
3. You'll see a page with your keys

### **STEP 3: Copy These 3 Things**

You'll see something like this:

```
API Key: iwk_abc123def456ghi789
API Secret: xxxxxxxxxxxxxxxxxx
Workspace ID: workspaces/your-name-12345
```

**IMPORTANT:** Copy each one to a notepad! You'll need them in a minute.

---

## 📋 PART 2: PUT KEYS INTO N8N (3 Ways)

You can add API keys **3 different ways** in N8N. I'll show you all 3!

---

## 🎯 METHOD 1: Environment Variables (RECOMMENDED - Easiest!)

This is the **safest and easiest** way!

### **Step-by-Step:**

1. **Open N8N**
   - Go to your N8N dashboard

2. **Click Settings Icon**
   - Look for ⚙️ (gear icon) in the left sidebar
   - OR click your profile → "Settings"

3. **Click "Environment Variables"**
   - You'll see a list (might be empty)

4. **Click "Add Variable"** button

5. **Add First Variable:**
   - Name: `INWORLD_API_KEY`
   - Value: `iwk_abc123def456ghi789` (paste YOUR key)
   - Click "Save"

6. **Add Second Variable:**
   - Click "Add Variable" again
   - Name: `INWORLD_API_SECRET`
   - Value: (paste YOUR secret)
   - Click "Save"

7. **Add Third Variable:**
   - Click "Add Variable" again
   - Name: `INWORLD_WORKSPACE`
   - Value: `workspaces/your-name-12345` (paste YOUR workspace ID)
   - Click "Save"

### **What It Looks Like:**

```
Environment Variables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name                    Value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INWORLD_API_KEY        iwk_abc123def456ghi789
INWORLD_API_SECRET     ••••••••••••••••••••
INWORLD_WORKSPACE      workspaces/your-name-12345
```

### **✅ Done! You can skip Method 2 and 3!**

---

## 🎯 METHOD 2: Directly in Workflow Nodes (Easy Alternative)

If you couldn't do Method 1, use this!

### **Step-by-Step:**

1. **Open Your Workflow**
   - The one you imported

2. **Find the "🎤 Generate TTS" Node**
   - It's the orange/red node in the middle
   - Click on it

3. **Scroll Down to "Headers"**
   - You'll see a section called "Headers"
   - It has 3 rows:
     - Authorization
     - x-api-secret
     - Content-Type

4. **Edit Authorization Header:**
   - Find the line that says:
     ```
     Bearer {{ $env.INWORLD_API_KEY }}
     ```
   - **Replace** the entire thing with:
     ```
     Bearer iwk_abc123def456ghi789
     ```
     (Use YOUR actual API key!)

5. **Edit x-api-secret Header:**
   - Find the line that says:
     ```
     {{ $env.INWORLD_API_SECRET }}
     ```
   - **Replace** with YOUR actual secret:
     ```
     your_actual_secret_here
     ```

6. **Edit the URL:**
   - At the very top of the node settings
   - Find the URL that says:
     ```
     https://api.inworld.ai/v1/workspaces/{{ $env.INWORLD_WORKSPACE }}/...
     ```
   - **Replace** `{{ $env.INWORLD_WORKSPACE }}` with YOUR workspace ID:
     ```
     https://api.inworld.ai/v1/workspaces/workspaces/your-name-12345/...
     ```

7. **Click "Execute Node"** to test
   - If it works → Green checkmark ✅
   - If error → Check you copied keys correctly

---

## 🎯 METHOD 3: Using N8N Credentials (Most Professional)

This is the "proper" way but takes a bit longer.

### **Step-by-Step:**

1. **Open Your Workflow**

2. **Click "🎤 Generate TTS" Node**

3. **Find "Authentication" Section**
   - It's near the top of the node settings

4. **Click "Add New Credential"**
   - You'll see a dropdown
   - Click the "+ Create New" option

5. **Fill in Credential Form:**
   - **Credential Name:** `Inworld.ai`
   - **Credential Type:** `Header Auth` (select from dropdown)

6. **Add Header 1 (API Key):**
   - Header Name: `Authorization`
   - Header Value: `Bearer iwk_abc123def456ghi789` (your key)

7. **Add Header 2 (API Secret):**
   - Click "Add Header"
   - Header Name: `x-api-secret`
   - Header Value: (paste your secret)

8. **Click "Save"**

9. **Select Your New Credential**
   - In the node, select "Inworld.ai" from dropdown

10. **Update Workspace ID in URL**
    - Still need to replace `{{ $env.INWORLD_WORKSPACE }}`
    - With your actual workspace ID

---

## 🧪 TESTING YOUR API KEYS

### **Quick Test:**

1. **Open the "🎤 Generate TTS" Node**

2. **Click "Execute Node"** button (top right of node)

3. **Look for Result:**

**✅ SUCCESS if you see:**
- Green checkmark on node
- "Execution successful" message
- Audio file in output

**❌ ERROR if you see:**
- Red X on node
- "Authentication failed" message
- "Invalid API key" error

### **Common Errors:**

**"401 Unauthorized"**
- ❌ Wrong API key
- ✅ Fix: Double-check you copied the key correctly

**"403 Forbidden"**
- ❌ Wrong API secret
- ✅ Fix: Check your secret, no extra spaces

**"404 Not Found"**
- ❌ Wrong workspace ID
- ✅ Fix: Copy workspace ID exactly as shown in Inworld

---

## 📝 COMPLETE CHECKLIST

### **For Method 1 (Environment Variables):**

- [ ] Logged into N8N
- [ ] Clicked Settings → Environment Variables
- [ ] Added `INWORLD_API_KEY` with your key
- [ ] Added `INWORLD_API_SECRET` with your secret
- [ ] Added `INWORLD_WORKSPACE` with your workspace ID
- [ ] Saved all 3 variables
- [ ] Tested the workflow node
- [ ] Saw green checkmark ✅

### **Verification:**

Run this in N8N to check:
```javascript
// In any Function node, paste:
console.log('API Key exists:', !!$env.INWORLD_API_KEY);
console.log('API Secret exists:', !!$env.INWORLD_API_SECRET);
console.log('Workspace exists:', !!$env.INWORLD_WORKSPACE);
```

Should see:
```
API Key exists: true
API Secret exists: true
Workspace exists: true
```

---

## 🎓 FOR ELEVENLABS (Alternative to Inworld)

If using ElevenLabs instead:

### **Environment Variables:**

Add these instead:

```
Name                    Value
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ELEVENLABS_API_KEY     sk_abc123def456ghi789
HANNAH_VOICE_ID        21m00Tcm4TlvDq8ikWAM
PRASAD_VOICE_ID        pNInz6obpgDQGcFmaJgB
```

### **Where to Get These:**

1. **ELEVENLABS_API_KEY:**
   - Go to: elevenlabs.io
   - Profile → API Keys
   - Copy your key

2. **HANNAH_VOICE_ID:**
   - Go to: Voice Lab
   - Find Hannah's cloned voice
   - Click "⋮" → Copy Voice ID

3. **PRASAD_VOICE_ID:**
   - Same as above for Prasad's voice

---

## 🔒 SECURITY TIPS

### **DO:**
✅ Keep API keys secret (don't share publicly)  
✅ Use environment variables (Method 1)  
✅ Save keys in password manager  
✅ Regenerate if exposed  

### **DON'T:**
❌ Share keys in screenshots  
❌ Commit keys to public GitHub  
❌ Email keys in plain text  
❌ Leave keys in code comments  

---

## 🆘 "HELP! IT'S NOT WORKING!"

### **Troubleshooting Steps:**

1. **Check Keys are Correct:**
   ```
   - No extra spaces at start/end
   - Copied completely (not cut off)
   - Right keys in right places
   ```

2. **Verify in Inworld Dashboard:**
   - Go back to Inworld.ai
   - Make sure keys are "Active"
   - Check usage limits not exceeded

3. **Test with Simple Request:**
   - Create a new Function node
   - Paste this test code:
   ```javascript
   const axios = require('axios');
   
   const response = await axios.post(
     'https://api.inworld.ai/v1/test',
     {},
     {
       headers: {
         'Authorization': `Bearer ${$env.INWORLD_API_KEY}`,
         'x-api-secret': $env.INWORLD_API_SECRET
       }
     }
   );
   
   return response.data;
   ```
   - Execute node
   - Should return success

4. **Still Not Working?**
   - Regenerate keys in Inworld
   - Delete old environment variables
   - Add new ones
   - Try again

---

## 📸 VISUAL GUIDE

### **What You're Looking For:**

**In Inworld.ai Dashboard:**
```
┌────────────────────────────────────┐
│  API Keys                          │
├────────────────────────────────────┤
│  API Key                           │
│  iwk_abc123def456ghi789      [Copy]│
│                                    │
│  API Secret                        │
│  ••••••••••••••••••••        [Show]│
│                                    │
│  Workspace ID                      │
│  workspaces/your-name-12345  [Copy]│
└────────────────────────────────────┘
```

**In N8N Environment Variables:**
```
┌────────────────────────────────────┐
│  Environment Variables             │
├────────────────────────────────────┤
│  [+ Add Variable]                  │
│                                    │
│  INWORLD_API_KEY                   │
│  iwk_abc123...             [Edit]  │
│                                    │
│  INWORLD_API_SECRET                │
│  •••••••••••••             [Edit]  │
│                                    │
│  INWORLD_WORKSPACE                 │
│  workspaces/your-name...   [Edit]  │
└────────────────────────────────────┘
```

---

## ✅ FINAL CHECK

Before running workflow:

- [ ] Got API keys from Inworld.ai
- [ ] Copied all 3 values to notepad
- [ ] Added to N8N (Method 1, 2, or 3)
- [ ] Tested one node - got green checkmark
- [ ] No error messages
- [ ] Ready to process book!

---

## 🎉 SUCCESS!

**If you see green checkmarks and no errors, YOU'RE DONE!** 🎊

Your API keys are set up correctly and the workflow can now:
- ✅ Generate audio
- ✅ Use your cloned voices
- ✅ Process your entire book

**Next step:** Follow the main guide to process your first book!

---

## 💡 REMEMBER

**API Keys are like passwords:**
- Keep them safe 🔒
- Don't share publicly 🚫
- Regenerate if exposed 🔄

**Environment Variables (Method 1) are best because:**
- ✅ Secure (hidden in N8N)
- ✅ Reusable (work for all workflows)
- ✅ Easy to update (change once, applies everywhere)

---

## 📞 STILL STUCK?

**Try this order:**

1. ✅ Re-read this guide slowly
2. ✅ Check keys copied correctly (no spaces)
3. ✅ Test with one node first
4. ✅ Check Inworld.ai dashboard for errors
5. ✅ Ask Hannah for help 😊

---

**You've got this! API keys are the hardest part, and you just conquered it!** 💪✨

*Rohimaya Publishing - October 2025*
