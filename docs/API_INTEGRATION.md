# 🔌 API Integration Guide

How to set up and use external APIs with Rohimaya Publishing.

---

## Required APIs

### 1. OpenAI (Required)
**Used for:** AI writing, text generation, analysis

**Get your key:** https://platform.openai.com/api-keys

**Setup:**
```toml
# .streamlit/secrets.toml
OPENAI_API_KEY = "sk-..."
```

**Cost:** ~$0.01-$0.10 per request (GPT-3.5/GPT-4)

---

### 2. Anthropic Claude (Optional, but recommended)
**Used for:** Alternative AI writing, longer contexts

**Get your key:** https://console.anthropic.com/settings/keys

**Setup:**
```toml
# .streamlit/secrets.toml
ANTHROPIC_API_KEY = "sk-ant-..."
```

**Cost:** Similar to OpenAI, excellent for long documents

---

### 3. ElevenLabs (Optional)
**Used for:** Audiobook generation, text-to-speech

**Get your key:** https://elevenlabs.io/app/settings/api-keys

**Setup:**
```toml
# .streamlit/secrets.toml
ELEVENLABS_API_KEY = "your-key"
```

**Cost:** $22/month for 30,000 characters

---

## Configuration Methods

### Method 1: Streamlit Secrets (Production)
```bash
# Create secrets file
mkdir -p .streamlit
nano .streamlit/secrets.toml
```

```toml
OPENAI_API_KEY = "sk-..."
ANTHROPIC_API_KEY = "sk-ant-..."
ELEVENLABS_API_KEY = "your-key"
```

### Method 2: Environment Variables (Development)
```bash
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export ELEVENLABS_API_KEY="your-key"
```

### Method 3: .env File (Development)
```bash
# Create .env file in project root
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
ELEVENLABS_API_KEY=your-key
```

---

## Using APIs in Code

```python
from shared import get_openai_client, get_anthropic_client

# Get clients (automatically handles API keys)
openai_client = get_openai_client()
claude_client = get_anthropic_client()

# Use them
response = openai_client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello!"}]
)
```

---

## Security Best Practices

1. **Never commit API keys to Git**
2. **Use secrets.toml for production**
3. **Rotate keys regularly**
4. **Set usage limits in API dashboards**
5. **Monitor usage for unusual activity**

---

## Troubleshooting

**"API key not found"**
- Check file exists: `.streamlit/secrets.toml`
- Verify key format
- Try environment variable instead

**"Authentication failed"**
- Verify key is correct
- Check key hasn't expired
- Regenerate key if needed

**"Rate limit exceeded"**
- Wait 60 seconds
- Check usage limits
- Consider upgrading plan

---

**See also:** [SECURITY.md](SECURITY.md)
