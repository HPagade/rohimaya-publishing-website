"""
PhoenixForge AI - Demo Suite
Main launcher for all PhoenixForge products

Run with: streamlit run demos/app.py
"""

import streamlit as st
from pathlib import Path
import webbrowser

# Page config
st.set_page_config(
    page_title="PhoenixForge AI - Demo Suite",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
        background: linear-gradient(135deg, #ff6b6b 0%, #764ba2 100%);
        color: white;
        border-radius: 10px;
        margin-bottom: 2rem;
    }
    .product-card {
        padding: 1.5rem;
        border-radius: 10px;
        border: 2px solid #f0f0f0;
        margin: 1rem 0;
        transition: all 0.3s;
    }
    .product-card:hover {
        border-color: #ff6b6b;
        box-shadow: 0 5px 15px rgba(255,107,107,0.3);
    }
    .demo-link {
        background: linear-gradient(135deg, #ff6b6b 0%, #764ba2 100%);
        color: white !important;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        text-decoration: none;
        display: inline-block;
        margin: 0.5rem 0;
        font-weight: 600;
        text-align: center;
    }
    .command-box {
        background: #f8f9fa;
        border-left: 4px solid #ff6b6b;
        padding: 1rem;
        margin: 1rem 0;
        font-family: monospace;
        border-radius: 5px;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="main-header">
    <h1>🔥 PhoenixForge AI</h1>
    <h3>Where Stories Take Shape</h3>
    <p>Complete AI-Powered Creative Suite for Authors</p>
</div>
""", unsafe_allow_html=True)

# Introduction
st.markdown("## Welcome to the PhoenixForge Demo Suite!")

st.info("""
👋 **Welcome!** This is a working demonstration of the PhoenixForge AI platform.
Each demo shows a real, functioning product.

**All demos work in MOCK MODE** - No API keys required for testing!
""")

# Quick Start Instructions
with st.expander("🚀 Quick Start - How to Run Demos", expanded=True):
    st.markdown("""
    ### Option 1: Use the RUN_DEMOS.sh Launcher (Easiest!)

    ```bash
    cd rohimaya-publishing-website
    bash demos/RUN_DEMOS.sh
    ```

    Then select which demo you want from the menu!

    ### Option 2: Run Individual Demos

    Open a new terminal and run:
    """)

    demo_commands = {
        "📄 Format Demo": "streamlit run demos/format_demo.py",
        "🎨 Covers Demo": "streamlit run demos/covers_demo.py",
        "🖼️ Images Demo": "streamlit run demos/images_demo.py",
        "🎬 Videos Demo": "streamlit run demos/videos_demo.py"
    }

    for demo_name, command in demo_commands.items():
        st.code(command, language="bash")

    st.markdown("""
    ### Option 3: Deploy to Streamlit Cloud

    1. Go to https://share.streamlit.io
    2. Connect your GitHub repository
    3. Select the demo file (e.g., `demos/format_demo.py`)
    4. Click Deploy!

    Each demo will get its own URL like `https://your-app.streamlit.app`
    """)

# Product showcase
st.markdown("## 🎨 Our Products")

col1, col2 = st.columns(2)

with col1:
    st.markdown("""
    <div class="product-card">
        <h3>📄 PhoenixForge Format</h3>
        <p><strong>AI Book Formatter</strong></p>
        <ul>
            <li>Upload manuscripts (Word, PDF, TXT)</li>
            <li>AI detects chapters automatically</li>
            <li>Smart formatting for eBook & print</li>
            <li>Export to ePub, PDF, MOBI</li>
        </ul>
        <p><strong>Pricing:</strong> $29/book or $19-99/month</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="command-box">
        💡 <strong>To Try This Demo:</strong><br>
        <code>streamlit run demos/format_demo.py</code>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="product-card">
        <h3>🖼️ PhoenixForge Images</h3>
        <p><strong>AI Image Creator</strong></p>
        <ul>
            <li>Chapter headers & scene illustrations</li>
            <li>Character portraits</li>
            <li>Social media graphics</li>
            <li>Style consistency across series</li>
        </ul>
        <p><strong>Pricing:</strong> $3/image or included in subscription</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="command-box">
        💡 <strong>To Try This Demo:</strong><br>
        <code>streamlit run demos/images_demo.py</code>
    </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
    <div class="product-card">
        <h3>🎨 PhoenixForge Covers</h3>
        <p><strong>AI Cover Generator</strong></p>
        <ul>
            <li>30+ genre templates</li>
            <li>6 variations in 30 seconds</li>
            <li>Smart text overlay</li>
            <li>Export for eBook, print, social</li>
        </ul>
        <p><strong>Pricing:</strong> $19/cover or included in subscription</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="command-box">
        💡 <strong>To Try This Demo:</strong><br>
        <code>streamlit run demos/covers_demo.py</code>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="product-card">
        <h3>🎬 PhoenixForge Videos</h3>
        <p><strong>AI Video Trailer Creator</strong></p>
        <ul>
            <li>30-180 second book trailers</li>
            <li>AI voiceover (50+ voices)</li>
            <li>Pre-made genre templates</li>
            <li>Export for YouTube, Instagram, TikTok</li>
        </ul>
        <p><strong>Pricing:</strong> $49-149/video</p>
    </div>
    """, unsafe_allow_html=True)

    st.markdown("""
    <div class="command-box">
        💡 <strong>To Try This Demo:</strong><br>
        <code>streamlit run demos/videos_demo.py</code>
    </div>
    """, unsafe_allow_html=True)

# Subscription tiers
st.markdown("---")
st.markdown("## 💰 Subscription Tiers")

tier_col1, tier_col2, tier_col3 = st.columns(3)

with tier_col1:
    st.markdown("""
    ### 🔥 Spark
    **$29/month**

    Perfect for solo authors
    - 5 covers/month
    - 20 images/month
    - 1 video/month
    - 1 book format/month
    - Email support

    **Profit: $27/user** 💰
    """)

with tier_col2:
    st.markdown("""
    ### ⚡ Blaze
    **$49/month** ⭐ *MOST POPULAR*

    Perfect for active authors
    - **UNLIMITED** covers
    - 100 images/month
    - 3 videos/month
    - 3 book formats/month
    - Priority support

    **Profit: $41/user** 💰
    """)

with tier_col3:
    st.markdown("""
    ### 💥 Inferno
    **$99/month**

    Perfect for publishers
    - **UNLIMITED** everything
    - Team accounts (10 users)
    - API access
    - White-label option
    - Dedicated support

    **Profit: $89/user** 💰
    """)

# Revenue projections
st.markdown("---")
st.markdown("## 📊 Revenue Projections")

import pandas as pd

projections = pd.DataFrame({
    "Year": [1, 2, 3, 4, 5],
    "Users": [50, 250, 750, 1500, 3000],
    "Revenue": ["$24K", "$124K", "$372K", "$744K", "$1.49M"],
    "Profit": ["$18K", "$93K", "$279K", "$558K", "$1.12M"]
})

st.table(projections)

st.success("""
🎯 **Break-Even:** Month 2 (~20 users)
💰 **First $100K Year:** Year 2 (250 users)
🚀 **Million Dollar Revenue:** Year 4 (1,500 users)
""")

# Investment ask
st.markdown("---")
st.markdown("## 💼 Investment Requirements")

st.markdown("""
### 🎯 Seed Round: $50,000

**Use of Funds:**
- 💻 **Product Development** - $20K (40%)
  - Backend API integration
  - Database & user management
  - Payment processing
  - Mobile apps

- 🎨 **Design & Branding** - $10K (20%)
  - Professional logo & branding
  - UI/UX improvements
  - Marketing materials

- 📣 **Marketing** - $15K (30%)
  - Content marketing
  - Social media ads
  - Influencer partnerships
  - SEO & SEM

- 💰 **Operations** - $5K (10%)
  - Legal (incorporation, terms)
  - Accounting
  - Insurance
  - Contingency

**Timeline:** 6 months to full launch
**Expected ROI:** 3-5x within 2 years
""")

# Call to action
st.markdown("---")
st.markdown("## 🚀 Ready to Explore?")

st.info("""
### Try the Demos Now!

Run the launcher script in your terminal:

```bash
bash demos/RUN_DEMOS.sh
```

Or run individual demos with the commands shown above! ⬆️

### Questions?
📧 Email: support@phoenixforge.ai
🌐 Website: https://phoenixforge.ai
📚 Docs: See `demos/DEPLOYMENT.md` for full setup guide
""")

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #999; padding: 2rem 0;">
    <p>🔥 <strong>PhoenixForge AI</strong> - Where Stories Take Shape</p>
    <p>Built with ❤️ by the Rohimaya Publishing team</p>
</div>
""", unsafe_allow_html=True)
