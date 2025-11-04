"""
🦚 AI Cover Designer - Rohimaya Publishing
Professional book cover design with DALL-E 3
Built with Streamlit and OpenAI
"""

import streamlit as st
from openai import OpenAI
import requests
from io import BytesIO
from datetime import datetime
import base64

# Page configuration
st.set_page_config(
    page_title="AI Cover Designer | Rohimaya Publishing",
    page_icon="🦚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS with Rohimaya branding
st.markdown("""
<style>
    :root {
        --phoenix-orange: #FF8C42;
        --phoenix-gold: #FFD700;
        --peacock-teal: #4A9B9B;
        --midnight-navy: #1A1A2E;
        --cream: #FFF8E7;
    }

    .main {
        background: linear-gradient(135deg, var(--cream) 0%, #ffffff 100%);
    }

    .stButton>button {
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold)) !important;
        color: white !important;
        font-weight: 600;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(255, 140, 66, 0.3);
    }

    .header-container {
        background: linear-gradient(135deg, var(--midnight-navy) 0%, var(--peacock-teal) 100%);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .header-title {
        color: var(--phoenix-gold);
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        text-align: center;
    }

    .header-subtitle {
        color: var(--cream);
        font-size: 1.2rem;
        text-align: center;
        margin-top: 0.5rem;
    }

    .cover-preview {
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        margin: 2rem auto;
        max-width: 600px;
        display: block;
    }

    .success-box {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .info-box {
        background: linear-gradient(135deg, var(--peacock-teal) 0%, #3a8a8a 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .warning-box {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .style-card {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        border-left: 4px solid var(--peacock-teal);
        margin: 0.5rem 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .style-card:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .footer {
        text-align: center;
        padding: 2rem;
        color: var(--peacock-teal);
        font-weight: 600;
        margin-top: 3rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="header-container">
    <h1 class="header-title">🎨 AI Cover Designer</h1>
    <p class="header-subtitle">Professional book covers powered by DALL-E 3</p>
</div>
""", unsafe_allow_html=True)

# Initialize OpenAI client
def get_openai_client():
    try:
        api_key = st.secrets["OPENAI_API_KEY"]
        return OpenAI(api_key=api_key)
    except Exception as e:
        st.error(f"⚠️ OpenAI API key not found. Please add it to `.streamlit/secrets.toml`")
        st.stop()
        return None

client = get_openai_client()

# Session state initialization
if 'generated_covers' not in st.session_state:
    st.session_state.generated_covers = []
if 'current_cover_url' not in st.session_state:
    st.session_state.current_cover_url = None
if 'generation_history' not in st.session_state:
    st.session_state.generation_history = []

# Sidebar - Design Settings
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### 🎨 Design Parameters")

    book_title = st.text_input(
        "Book Title",
        placeholder="The Phoenix Chronicles",
        help="The title of your book"
    )

    author_name = st.text_input(
        "Author Name",
        placeholder="Hannah Pagade",
        help="Your author name (will appear on cover)"
    )

    st.markdown("---")
    st.markdown("### 📚 Genre & Style")

    genre = st.selectbox(
        "Genre",
        [
            "Fantasy",
            "Science Fiction",
            "Romance",
            "Mystery/Thriller",
            "Horror",
            "Literary Fiction",
            "Historical Fiction",
            "Young Adult",
            "Children's Book",
            "Non-Fiction",
            "Biography/Memoir",
            "Self-Help",
            "Business",
            "Poetry"
        ]
    )

    style = st.selectbox(
        "Art Style",
        [
            "Photorealistic",
            "Illustrated",
            "Minimalist",
            "Abstract",
            "Vintage/Retro",
            "Modern/Contemporary",
            "Dark/Gothic",
            "Whimsical",
            "Watercolor",
            "Digital Art",
            "Typography-focused"
        ]
    )

    st.markdown("---")
    st.markdown("### 🎨 Color Palette")

    color_scheme = st.selectbox(
        "Color Scheme",
        [
            "Phoenix Fire (Orange & Gold)",
            "Peacock Elegance (Teal & Navy)",
            "Dark & Moody",
            "Bright & Vibrant",
            "Pastel & Soft",
            "Black & White",
            "Earth Tones",
            "Sunset Colors",
            "Ocean Blues",
            "Custom"
        ]
    )

    if color_scheme == "Custom":
        custom_colors = st.text_input(
            "Describe your color palette",
            placeholder="Deep purple, electric blue, silver accents"
        )
    else:
        custom_colors = ""

    st.markdown("---")
    st.markdown("### ✨ Additional Details")

    mood = st.text_area(
        "Mood/Atmosphere",
        placeholder="Mysterious, epic, hopeful...",
        help="Describe the emotional tone"
    )

    key_elements = st.text_area(
        "Key Visual Elements",
        placeholder="Phoenix rising, ancient ruins, glowing artifacts...",
        help="Specific objects or imagery to include"
    )

# Main content area
col1, col2 = st.columns([2, 1])

with col1:
    st.markdown("### 🖼️ Cover Preview")

    if st.session_state.current_cover_url:
        st.image(
            st.session_state.current_cover_url,
            use_container_width=True,
            caption="Your AI-Generated Book Cover"
        )

        # Download button
        try:
            response = requests.get(st.session_state.current_cover_url)
            img_data = response.content

            st.download_button(
                label="⬇️ Download High-Res Cover",
                data=img_data,
                file_name=f"{book_title.replace(' ', '_')}_cover_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png",
                mime="image/png",
                use_container_width=True
            )
        except Exception as e:
            st.error(f"Error preparing download: {str(e)}")

        # Save to gallery
        if st.button("💾 Save to Gallery", use_container_width=True):
            if st.session_state.current_cover_url not in st.session_state.generated_covers:
                st.session_state.generated_covers.append({
                    'url': st.session_state.current_cover_url,
                    'title': book_title,
                    'genre': genre,
                    'style': style,
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                })
                st.success("✅ Saved to gallery!")
    else:
        st.markdown("""
        <div class="info-box">
            👈 Configure your book details in the sidebar, then click "Generate Cover" to create your design.
        </div>
        """, unsafe_allow_html=True)

        # Sample covers display
        st.markdown("### 🎨 Sample Cover Styles")

        sample_col1, sample_col2, sample_col3 = st.columns(3)

        with sample_col1:
            st.markdown("""
            <div class="style-card">
                <h4>📖 Fantasy</h4>
                <p>Epic landscapes, magical elements, rich colors</p>
            </div>
            """, unsafe_allow_html=True)

        with sample_col2:
            st.markdown("""
            <div class="style-card">
                <h4>🔍 Mystery</h4>
                <p>Dark atmosphere, intriguing imagery, bold typography</p>
            </div>
            """, unsafe_allow_html=True)

        with sample_col3:
            st.markdown("""
            <div class="style-card">
                <h4>💝 Romance</h4>
                <p>Soft colors, elegant fonts, emotional imagery</p>
            </div>
            """, unsafe_allow_html=True)

with col2:
    st.markdown("### ⚙️ Generation Controls")

    quality = st.select_slider(
        "Image Quality",
        options=["Standard", "HD"],
        value="HD",
        help="HD quality costs more but produces better results"
    )

    size = st.selectbox(
        "Image Size",
        ["1024x1792 (Book Cover)", "1024x1024 (Square)", "1792x1024 (Wide)"],
        help="1024x1792 is standard book cover ratio"
    )

    # Extract size dimensions
    size_map = {
        "1024x1792 (Book Cover)": "1024x1792",
        "1024x1024 (Square)": "1024x1024",
        "1792x1024 (Wide)": "1792x1024"
    }
    selected_size = size_map[size]

    st.markdown("---")

    if st.button("✨ Generate Cover", use_container_width=True, type="primary"):
        if not book_title:
            st.error("⚠️ Please enter a book title")
        else:
            with st.spinner("🎨 Creating your book cover... This may take 10-30 seconds..."):
                try:
                    # Build comprehensive prompt
                    color_desc = custom_colors if color_scheme == "Custom" else color_scheme

                    prompt = f"""Professional book cover design for a {genre} novel titled '{book_title}' by {author_name}.

Art style: {style}
Color palette: {color_desc}
Mood: {mood if mood else 'engaging and genre-appropriate'}
Key elements: {key_elements if key_elements else 'genre-typical imagery'}

The cover should be:
- Professional and market-ready
- Eye-catching and memorable
- Genre-appropriate
- Include the title '{book_title}' prominently
- Include author name '{author_name}'
- Commercial book cover quality
- Print-ready composition

Focus on creating a cover that would stand out in bookstores and online marketplaces."""

                    # Generate with DALL-E 3
                    response = client.images.generate(
                        model="dall-e-3",
                        prompt=prompt,
                        size=selected_size,
                        quality=quality.lower(),
                        n=1
                    )

                    # Get the generated image URL
                    image_url = response.data[0].url

                    # Update session state
                    st.session_state.current_cover_url = image_url
                    st.session_state.generation_history.append({
                        'url': image_url,
                        'title': book_title,
                        'author': author_name,
                        'genre': genre,
                        'style': style,
                        'prompt': prompt,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                    st.rerun()

                except Exception as e:
                    st.error(f"❌ Error generating cover: {str(e)}")

    st.markdown("---")

    if st.button("🔄 Generate Variation", use_container_width=True):
        if not book_title:
            st.error("⚠️ Please enter a book title")
        else:
            st.info("💡 Generating a new variation with the same parameters...")
            # Trigger regeneration with same settings
            if st.session_state.current_cover_url:
                st.rerun()

    if st.button("🗑️ Clear Current", use_container_width=True):
        st.session_state.current_cover_url = None
        st.rerun()

    st.markdown("---")
    st.markdown("### 💰 Cost Info")
    st.info(f"""
    **Per Generation:**
    - Standard: ~$0.04
    - HD: ~$0.08

    **Current Settings:**
    {quality} quality, {selected_size}
    """)

# Cover Gallery Section
if st.session_state.generated_covers:
    st.markdown("---")
    st.markdown("## 🖼️ Your Cover Gallery")

    gallery_cols = st.columns(3)

    for idx, cover in enumerate(st.session_state.generated_covers):
        with gallery_cols[idx % 3]:
            st.image(cover['url'], use_container_width=True)
            st.caption(f"**{cover['title']}**")
            st.caption(f"{cover['genre']} • {cover['style']}")
            st.caption(f"🕒 {cover['timestamp']}")

            if st.button(f"🔍 View", key=f"view_{idx}"):
                st.session_state.current_cover_url = cover['url']
                st.rerun()

# Generation History
if st.session_state.generation_history:
    with st.expander("📜 Generation History", expanded=False):
        for idx, item in enumerate(reversed(st.session_state.generation_history)):
            st.markdown(f"""
            **{idx + 1}. {item['title']}** by {item['author']}
            - Genre: {item['genre']} | Style: {item['style']}
            - Generated: {item['timestamp']}
            """)
            if st.button(f"View Cover #{len(st.session_state.generation_history) - idx}", key=f"history_{idx}"):
                st.session_state.current_cover_url = item['url']
                st.rerun()
            st.markdown("---")

# Tips Section
with st.expander("💡 Cover Design Tips", expanded=False):
    st.markdown("""
    ### Creating Effective Book Covers

    **1. Title Legibility**
    - Keep titles short and readable
    - Ensure high contrast with background
    - Use professional fonts

    **2. Genre Conventions**
    - Study bestsellers in your genre
    - Follow established visual patterns
    - Stand out while fitting in

    **3. Color Psychology**
    - Red/Orange: Energy, passion, action
    - Blue: Trust, calm, intelligence
    - Black: Mystery, elegance, sophistication
    - Purple: Creativity, luxury, spirituality
    - Green: Growth, nature, healing

    **4. Visual Hierarchy**
    - Title should be most prominent
    - Author name secondary
    - Supporting imagery enhances theme

    **5. Platform Considerations**
    - Design works at thumbnail size
    - Clear even at small dimensions
    - No tiny details that disappear

    **6. Iterations**
    - Generate multiple variations
    - Test with target audience
    - Refine based on feedback
    """)

# Best Practices Section
with st.expander("🎯 Genre-Specific Best Practices", expanded=False):
    st.markdown("""
    ### Genre Guidelines

    **Fantasy:**
    - Epic landscapes, magical elements
    - Rich, saturated colors
    - Medieval or mystical typography

    **Romance:**
    - Soft, warm color palettes
    - Elegant, flowing fonts
    - Emotional, intimate imagery

    **Thriller/Mystery:**
    - Dark, moody atmosphere
    - High contrast
    - Bold, impactful typography

    **Science Fiction:**
    - Futuristic elements
    - Cool color palettes (blues, purples)
    - Modern, clean fonts

    **Literary Fiction:**
    - Minimalist design
    - Sophisticated color choices
    - Artistic, abstract imagery

    **Non-Fiction:**
    - Clean, professional layout
    - Clear hierarchy
    - Trust-building colors and imagery
    """)

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
