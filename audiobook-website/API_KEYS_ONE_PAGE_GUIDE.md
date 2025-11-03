# 🔑 API KEYS - ONE PAGE VISUAL GUIDE

---

## WHERE TO GET KEYS

```
1. Go to: https://studio.inworld.ai
2. Click: Your Profile Picture (top right)
3. Click: "API Keys"
4. Copy: All 3 items below
```

---

## THE 3 THINGS YOU NEED

```
┌─────────────────────────────────────────────┐
│  📋 COPY THESE FROM INWORLD.AI:             │
├─────────────────────────────────────────────┤
│                                             │
│  1. API Key                                 │
│     iwk_abc123def456ghi789                  │
│     ▲                                       │
│     └─ Starts with "iwk_"                   │
│                                             │
│  2. API Secret                              │
│     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx         │
│     ▲                                       │
│     └─ Long random string                   │
│                                             │
│  3. Workspace ID                            │
│     workspaces/your-name-12345              │
│     ▲                                       │
│     └─ Starts with "workspaces/"            │
│                                             │
└─────────────────────────────────────────────┘
```

---

## WHERE TO PUT THEM IN N8N

### **METHOD 1: Environment Variables** ⭐ EASIEST!

```
N8N → Settings (⚙️) → Environment Variables → Add Variable

┌─────────────────────────────────────────────┐
│  Variable 1:                                │
│  Name:  INWORLD_API_KEY                     │
│  Value: iwk_abc123def456ghi789              │
│         (paste YOUR key)                    │
├─────────────────────────────────────────────┤
│  Variable 2:                                │
│  Name:  INWORLD_API_SECRET                  │
│  Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     │
│         (paste YOUR secret)                 │
├─────────────────────────────────────────────┤
│  Variable 3:                                │
│  Name:  INWORLD_WORKSPACE                   │
│  Value: workspaces/your-name-12345          │
│         (paste YOUR workspace)              │
└─────────────────────────────────────────────┘

THEN: Click "Save" for each one!
```

---

## HOW TO TEST IT WORKS

```
1. Open your workflow in N8N
2. Click on "🎤 Generate TTS" node
3. Click "Execute Node" button (top right)
4. Look for result:

✅ GREEN CHECKMARK = Success! Keys work!
❌ RED X = Error, check keys again
```

---

## COMMON MISTAKES

```
❌ WRONG                          ✅ RIGHT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Extra spaces:                    No spaces:
" iwk_abc123 "                   "iwk_abc123"

Missing part:                    Complete key:
"iwk_abc"                        "iwk_abc123def456ghi789"

Wrong variable name:             Exact name:
"INWORLD_KEY"                    "INWORLD_API_KEY"

Not saved:                       Clicked save:
Made changes, closed window      Made changes, CLICKED SAVE ✅
```

---

## QUICK TROUBLESHOOTING

```
ERROR MESSAGE               FIX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"401 Unauthorized"      → Check API Key is correct

"403 Forbidden"         → Check API Secret is correct

"404 Not Found"         → Check Workspace ID is correct

"Invalid credentials"   → Regenerate keys in Inworld.ai
                           Add new keys to N8N

Node stays yellow       → Keys not added yet
                           OR wrong variable names
```

---

## SCREENSHOT GUIDE

### **Inworld.ai - Where to Find:**

```
┌───────────────────────────────────────────┐
│  [LOGO]     My Workspace    [👤 Profile]  │ ← Click here
├───────────────────────────────────────────┤
│                                           │
│     Dropdown Menu:                        │
│     ┌─────────────────┐                   │
│     │ Dashboard       │                   │
│     │ API Keys        │ ← Click here      │
│     │ Settings        │                   │
│     │ Logout          │                   │
│     └─────────────────┘                   │
│                                           │
└───────────────────────────────────────────┘
```

### **N8N - Where to Put:**

```
┌───────────────────────────────────────────┐
│  N8N                                      │
│  ┌─────────────┐                          │
│  │ ⚙️ Settings  │ ← Click here             │
│  └─────────────┘                          │
│                                           │
│  Settings Page:                           │
│  ┌────────────────────┐                   │
│  │ General            │                   │
│  │ Users & Access     │                   │
│  │ Environment Vars   │ ← Click here      │
│  │ Community Nodes    │                   │
│  └────────────────────┘                   │
│                                           │
│  Then click: [+ Add Variable]             │
└───────────────────────────────────────────┘
```

---

## ✅ COMPLETION CHECKLIST

```
□ Logged into Inworld.ai
□ Copied API Key (starts with "iwk_")
□ Copied API Secret (long random string)
□ Copied Workspace ID (starts with "workspaces/")
□ Opened N8N Settings → Environment Variables
□ Added INWORLD_API_KEY variable
□ Added INWORLD_API_SECRET variable
□ Added INWORLD_WORKSPACE variable
□ Clicked SAVE for each one
□ Tested "Generate TTS" node
□ Got GREEN CHECKMARK ✅

ALL CHECKED? YOU'RE DONE! 🎉
```

---

## 💡 PRO TIP

**Save keys in a password manager:**
- 1Password
- LastPass
- Bitwarden

**Label them:**
```
Inworld.ai API Key - Audiobook Project
Inworld.ai API Secret - Audiobook Project
Inworld.ai Workspace - Audiobook Project
```

Then you never lose them! 🔐

---

## 🆘 EMERGENCY HELP

**If nothing works:**

1. **Regenerate keys** in Inworld.ai
2. **Delete old** environment variables in N8N
3. **Add new** keys
4. **Test again**

**Still stuck?**
- Check you're logged into correct N8N account
- Check you're logged into correct Inworld.ai account
- Try on different browser
- Clear cache and try again

---

## 📞 FINAL WORDS

**This is the ONLY hard part!**

Once API keys are set up:
- Everything else is click-and-go ✅
- No more configuration needed ✅
- Just upload manuscript and run ✅

**You've got this!** 💪

---

*Print this page and keep it handy!*

*Rohimaya Publishing - October 2025*
