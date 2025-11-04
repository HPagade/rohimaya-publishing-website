# 🔧 Rohimaya Publishing - Utility Scripts

Helper scripts to make development and deployment easier.

---

## Available Scripts

### 1. setup_env.sh
**Purpose:** Set up development environment

**Usage:**
```bash
chmod +x scripts/setup_env.sh
./scripts/setup_env.sh
```

**What it does:**
- Creates Python virtual environment
- Installs all dependencies for Streamlit apps
- Creates API secrets template
- Provides next steps guidance

---

### 2. test_apis.py
**Purpose:** Test all API connections

**Usage:**
```bash
# Set API keys first
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export ELEVENLABS_API_KEY="your-key"

# Run tests
python scripts/test_apis.py
```

**What it tests:**
- OpenAI API connection
- Anthropic (Claude) API connection
- ElevenLabs API connection

**Output:**
- ✓ PASS or ✗ FAIL for each API
- Helpful error messages
- Setup instructions if tests fail

---

### 3. deploy_all.sh
**Purpose:** Deploy all Streamlit apps

**Usage:**
```bash
chmod +x scripts/deploy_all.sh
./scripts/deploy_all.sh
```

**What it does:**
- Lists all apps ready for deployment
- Provides deployment instructions for Streamlit Cloud
- Reminds you to add API secrets

**Note:** Streamlit Cloud doesn't support CLI deployment, so this script provides manual instructions.

---

## Quick Reference

```bash
# Full setup workflow
./scripts/setup_env.sh          # Set up environment
source venv/bin/activate        # Activate environment
python scripts/test_apis.py     # Test API connections
./scripts/deploy_all.sh         # Get deployment instructions
```

---

## Adding New Scripts

When adding new scripts:

1. **Make them executable:**
   ```bash
   chmod +x scripts/your_script.sh
   ```

2. **Add a header comment:**
   ```bash
   #!/bin/bash
   # Purpose: What this script does
   ```

3. **Update this README** with usage instructions

---

## Troubleshooting

**"Permission denied"**
```bash
chmod +x scripts/script_name.sh
```

**"Command not found"**
- Check you're in repository root
- Use `./scripts/` prefix
- Verify script exists: `ls scripts/`

---

🦚 **Where Stories Take Shape**
