#!/bin/bash
# PhoenixForge AI - Demo Suite Quick Launcher
# Run this script to launch any demo

echo "🔥 PhoenixForge AI - Demo Suite 🔥"
echo "==================================="
echo ""
echo "Which demo would you like to run?"
echo ""
echo "1) Main Launcher (Overview + All Products)"
echo "2) Format Demo (AI Book Formatter)"
echo "3) Covers Demo (AI Cover Generator)"
echo "4) Images Demo (AI Image Creator)"
echo "5) Videos Demo (AI Video Maker)"
echo "6) Install Requirements First"
echo ""
read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "🚀 Launching Main Demo..."
        streamlit run demos/app.py
        ;;
    2)
        echo "📄 Launching Format Demo..."
        streamlit run demos/format_demo.py
        ;;
    3)
        echo "🎨 Launching Covers Demo..."
        streamlit run demos/covers_demo.py
        ;;
    4)
        echo "🖼️ Launching Images Demo..."
        streamlit run demos/images_demo.py
        ;;
    5)
        echo "🎬 Launching Videos Demo..."
        streamlit run demos/videos_demo.py
        ;;
    6)
        echo "📦 Installing requirements..."
        pip install -r demos/requirements.txt
        echo ""
        echo "✅ Installation complete! Run this script again to launch a demo."
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        ;;
esac
