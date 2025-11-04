#!/bin/bash

# 🦚 Rohimaya Publishing - Environment Setup Script
# Sets up development environment for all Streamlit apps

set -e  # Exit on error

echo "🦚 Setting up Rohimaya Publishing development environment..."
echo ""

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is required but not installed."
    echo "Please install Python 3.8 or higher from https://python.org"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "✅ Python $PYTHON_VERSION found"

# Create virtual environment
echo ""
echo "📦 Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo ""
echo "🔄 Activating virtual environment..."
source venv/bin/activate || . venv/Scripts/activate 2>/dev/null || echo "Note: You may need to activate manually"

# Upgrade pip
echo ""
echo "⬆️  Upgrading pip..."
python -m pip install --upgrade pip --quiet

# Install shared dependencies
echo ""
echo "📚 Installing shared dependencies..."
if [ -f "streamlit-apps/shared/requirements.txt" ]; then
    pip install -r streamlit-apps/shared/requirements.txt --quiet
    echo "✅ Shared dependencies installed"
fi

# Install dependencies for all apps
echo ""
echo "🎨 Installing dependencies for all Streamlit apps..."
app_count=0
for app_dir in streamlit-apps/*/; do
    if [ -f "$app_dir/requirements.txt" ]; then
        app_name=$(basename "$app_dir")
        echo "  📦 Installing: $app_name..."
        pip install -r "$app_dir/requirements.txt" --quiet
        ((app_count++))
    fi
done
echo "✅ Installed dependencies for $app_count apps"

# Create secrets template
echo ""
echo "🔑 Creating API secrets template..."
if [ ! -f ".streamlit/secrets.toml" ]; then
    mkdir -p .streamlit
    cat > .streamlit/secrets.toml << 'EOF'
# Rohimaya Publishing - API Keys
# Copy this file to each app's .streamlit/ directory and add your keys

# OpenAI API (Required for most apps)
OPENAI_API_KEY = "sk-your-key-here"

# Anthropic Claude API (Optional but recommended)
ANTHROPIC_API_KEY = "sk-ant-your-key-here"

# ElevenLabs API (Required for audiobook generator)
ELEVENLABS_API_KEY = "your-key-here"

# Get your API keys:
# - OpenAI: https://platform.openai.com/api-keys
# - Anthropic: https://console.anthropic.com/settings/keys
# - ElevenLabs: https://elevenlabs.io/app/settings/api-keys
EOF
    echo "✅ Created .streamlit/secrets.toml template"
    echo "⚠️  Remember to add your actual API keys!"
else
    echo "✅ Secrets file already exists"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Setup complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo ""
echo "1️⃣  Activate the virtual environment:"
echo "   source venv/bin/activate"
echo ""
echo "2️⃣  Add your API keys to .streamlit/secrets.toml"
echo ""
echo "3️⃣  Run any app:"
echo "   cd streamlit-apps/ai_writing_assistant"
echo "   streamlit run app.py"
echo ""
echo "📚 Full documentation: docs/QUICK_START.md"
echo ""
echo "🦚 Where Stories Take Shape!"
echo ""
