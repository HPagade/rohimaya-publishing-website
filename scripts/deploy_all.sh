#!/bin/bash

# 🦚 Rohimaya Publishing - Deploy All Apps Script
# Deploys all Streamlit apps to Streamlit Cloud

set -e  # Exit on error

echo "🚀 Rohimaya Publishing - Deploy All Apps"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if streamlit CLI is installed
if ! command -v streamlit &> /dev/null; then
    echo "❌ Streamlit is not installed"
    echo "Install it with: pip install streamlit"
    exit 1
fi

# Check if in repository root
if [ ! -d "streamlit-apps" ]; then
    echo "❌ Error: Must run from repository root directory"
    echo "Current directory: $(pwd)"
    exit 1
fi

# List of apps to deploy
apps=(
    "ai_writing_assistant"
    "ai_cover_designer"
    "audiobook_generator"
    "character_creator"
    "manuscript_formatter"
    "marketing_copy_generator"
    "plot_outliner"
)

echo "Found ${#apps[@]} apps to deploy:"
for app in "${apps[@]}"; do
    echo "  • $app"
done
echo ""

# Confirmation
read -p "Deploy all apps to Streamlit Cloud? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled"
    exit 0
fi

echo ""
echo "📝 Deployment Steps:"
echo ""
echo "Automatic deployment via CLI is not supported by Streamlit Cloud."
echo "Please follow these steps for each app:"
echo ""
echo "1. Go to https://share.streamlit.io"
echo "2. Click 'New app'"
echo "3. Select repository: HPagade/rohimaya-publishing-website"
echo "4. Select branch: main (or your branch)"
echo "5. Set app path: streamlit-apps/[app-name]/app.py"
echo "6. Click 'Deploy'"
echo "7. Add secrets in app settings"
echo ""
echo "Apps to deploy:"
for app in "${apps[@]}"; do
    echo "  📱 streamlit-apps/$app/app.py"
done
echo ""
echo "⚠️  Remember to add API keys in each app's secrets settings!"
echo ""
echo "📚 For detailed instructions, see: docs/DEPLOYMENT_GUIDE.md"
echo ""
