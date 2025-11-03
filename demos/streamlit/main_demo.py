"""
PhoenixForge AI - Main Demo Application
Interactive Streamlit demo showcasing all platform features
"""

import streamlit as st
import base64
from pathlib import Path

# Page configuration
st.set_page_config(
    page_title="PhoenixForge AI - Demo",
    page_icon="🔥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        color: #FF6B35;
        text-align: center;
        margin-bottom: 2rem;
    }
    .feature-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 10px;
        color: white;
        margin: 1rem 0;
    }
    .demo-section {
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 10px;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

def main():
    # Sidebar navigation
    st.sidebar.title("🔥 PhoenixForge AI")
    st.sidebar.markdown("---")
    
    page = st.sidebar.radio(
        "Navigate to:",
        [
            "🏠 Home",
            "📄 Manuscript Formatter",
            "🎨 Cover Generator",
            "🖼️ Image Creator",
            "🎬 Video Trailer Maker",
            "🎙️ Audiobook Narrator",
            "💰 Pricing & ROI",
            "📊 Dashboard Demo"
        ]
    )
    
    st.sidebar.markdown("---")
    st.sidebar.info("""
    **Demo Mode**
    
    This is a working prototype demonstrating PhoenixForge AI capabilities.
    
    All features shown are available in the production platform.
    """)
    
    # Main content routing
    if page == "🏠 Home":
        show_home()
    elif page == "📄 Manuscript Formatter":
        show_formatter()
    elif page == "🎨 Cover Generator":
        show_cover_generator()
    elif page == "🖼️ Image Creator":
        show_image_creator()
    elif page == "🎬 Video Trailer Maker":
        show_video_maker()
    elif page == "🎙️ Audiobook Narrator":
        show_audiobook()
    elif page == "💰 Pricing & ROI":
        show_pricing()
    elif page == "📊 Dashboard Demo":
        show_dashboard()

def show_home():
    """Home page with platform overview"""
    st.markdown('<h1 class="main-header">🔥 PhoenixForge AI</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; font-size: 1.5rem;">Where Stories Take Shape</p>', unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Feature overview
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        <div class="feature-card">
            <h3>📄 AI Formatter</h3>
            <p>Transform manuscripts into professional ePub, PDF, and print-ready files in minutes</p>
            <ul>
                <li>Auto chapter detection</li>
                <li>20+ genre templates</li>
                <li>Multi-format export</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h3>🎨 AI Covers</h3>
            <p>Generate stunning book covers with AI in 2 minutes</p>
            <ul>
                <li>6 variations instantly</li>
                <li>30+ genre templates</li>
                <li>Print-ready quality</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="feature-card">
            <h3>🖼️ AI Images</h3>
            <p>Create unlimited images for your books</p>
            <ul>
                <li>Character consistency</li>
                <li>Style matching</li>
                <li>Commercial license</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    # Stats
    st.markdown("---")
    st.markdown("## 📊 Platform Stats")
    
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Books Formatted", "2,547", "+47 today")
    col2.metric("Covers Generated", "8,231", "+156 today")
    col3.metric("Active Users", "1,234", "+23 today")
    col4.metric("Time Saved", "12,450 hrs", "vs manual")
    
    # Quick start
    st.markdown("---")
    st.markdown("## 🚀 Quick Start")
    
    st.info("""
    **Try the demo:**
    1. Select a tool from the sidebar
    2. Upload your content or enter details
    3. Click generate to see AI in action
    4. Download your results
    
    **Note:** This demo uses mock data for speed. Connect to live APIs for actual generation.
    """)

def show_formatter():
    """Manuscript Formatter Demo"""
    st.title("📄 AI Manuscript Formatter")
    st.markdown("Transform your manuscript into professionally formatted books")
    
    st.markdown("---")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("Upload Manuscript")
        uploaded_file = st.file_uploader(
            "Choose a file (DOCX, PDF, TXT)",
            type=['docx', 'pdf', 'txt'],
            help="Upload your manuscript for formatting"
        )
        
        if not uploaded_file:
            st.info("👆 Upload a manuscript to begin, or use sample data below")
            if st.button("📝 Use Sample Manuscript"):
                uploaded_file = "sample"
        
        if uploaded_file:
            st.success("✅ File loaded successfully!")
            
            st.subheader("Formatting Options")
            
            genre = st.selectbox(
                "Select Genre",
                ["Fantasy", "Romance", "Thriller", "Science Fiction", "Mystery", "Literary Fiction"]
            )
            
            template = st.selectbox(
                "Choose Template",
                ["Epic Fantasy", "Modern Minimal", "Classic Literary", "Contemporary", "Technical"]
            )
            
            formats = st.multiselect(
                "Output Formats",
                ["PDF", "EPUB", "MOBI", "Print-Ready PDF"],
                default=["PDF", "EPUB"]
            )
            
            if st.button("🚀 Format Manuscript", type="primary"):
                with st.spinner("🤖 AI analyzing manuscript structure..."):
                    import time
                    time.sleep(2)
                    
                st.success("✨ Formatting complete!")
                
                # Show results
                st.markdown("### 📊 Analysis Results")
                col1, col2, col3 = st.columns(3)
                col1.metric("Chapters", "24")
                col2.metric("Word Count", "87,432")
                col3.metric("Estimated Pages", "342")
                
                st.markdown("### 📥 Download Formatted Files")
                col1, col2 = st.columns(2)
                with col1:
                    st.download_button(
                        "📄 Download PDF",
                        data="Sample PDF content",
                        file_name="formatted_manuscript.pdf",
                        mime="application/pdf"
                    )
                with col2:
                    st.download_button(
                        "📱 Download EPUB",
                        data="Sample EPUB content",
                        file_name="formatted_manuscript.epub",
                        mime="application/epub+zip"
                    )
    
    with col2:
        st.subheader("✨ Features")
        st.markdown("""
        **AI-Powered:**
        - Smart chapter detection
        - Automatic formatting
        - Style consistency
        
        **Professional Quality:**
        - Print-ready at 300 DPI
        - Industry-standard layouts
        - Multiple export formats
        
        **Time Savings:**
        - 5 minutes vs 5 hours
        - No manual formatting
        - Instant revisions
        """)
        
        st.markdown("---")
        st.info("💡 **Tip:** For best results, ensure your manuscript has clear chapter headings.")

def show_cover_generator():
    """Cover Generator Demo"""
    st.title("🎨 AI Book Cover Generator")
    st.markdown("Create stunning professional covers in 2 minutes")
    
    st.markdown("---")
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        st.subheader("Book Details")
        
        title = st.text_input("Book Title", "The Phoenix Chronicles")
        author = st.text_input("Author Name", "Hannah Pagade")
        
        col_genre, col_style = st.columns(2)
        with col_genre:
            genre = st.selectbox(
                "Genre",
                ["Fantasy", "Fantasy Romance", "Thriller", "Romance", "Sci-Fi", "Mystery", "Horror"]
            )
        with col_style:
            style = st.selectbox(
                "Style",
                ["Dramatic", "Minimalist", "Illustrated", "Photorealistic", "Artistic"]
            )
        
        description = st.text_area(
            "Cover Description (optional)",
            "An epic tale of a phoenix warrior rising from the ashes...",
            help="Provide details about mood, colors, key elements"
        )
        
        num_variations = st.slider("Number of Variations", 1, 6, 6)
        
        if st.button("🎨 Generate Covers", type="primary"):
            with st.spinner(f"🤖 AI generating {num_variations} cover variations..."):
                import time
                time.sleep(3)
            
            st.success(f"✨ Generated {num_variations} covers!")
            
            # Display mock covers
            st.markdown("### 🖼️ Cover Variations")
            cols = st.columns(3)
            for i in range(num_variations):
                with cols[i % 3]:
                    st.markdown(f"""
                    <div style="background: linear-gradient(135deg, #667eea {i*10}%, #764ba2 100%); 
                                height: 300px; border-radius: 10px; display: flex; 
                                align-items: center; justify-content: center; color: white;">
                        <div style="text-align: center;">
                            <h3>{title}</h3>
                            <p>{author}</p>
                            <small>Variation #{i+1}</small>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    st.button(f"📥 Download #{i+1}", key=f"cover_{i}")
    
    with col2:
        st.subheader("✨ Features")
        st.markdown("""
        **AI-Powered:**
        - DALL-E 3 generation
        - Genre-specific templates
        - Smart text placement
        
        **Professional Quality:**
        - Print-ready 300 DPI
        - Multiple size formats
        - Commercial license
        
        **A/B Testing:**
        - 6 variations instantly
        - Different styles
        - Choose the winner
        """)
        
        st.markdown("---")
        st.metric("Time Savings", "98%")
        st.caption("2 minutes vs 3-5 days + $300-500")

def show_image_creator():
    """Image Creator Demo"""
    st.title("🖼️ AI Image Creator")
    st.markdown("Generate unlimited images for your books")
    
    prompt = st.text_area(
        "Image Prompt",
        "A fierce phoenix warrior with golden armor, standing in flames",
        height=100
    )
    
    col1, col2, col3 = st.columns(3)
    with col1:
        style = st.selectbox("Style", ["Fantasy Art", "Realistic", "Illustration", "Anime", "Oil Painting"])
    with col2:
        dimensions = st.selectbox("Dimensions", ["1024x1024", "1024x1792", "1792x1024"])
    with col3:
        quantity = st.number_input("Quantity", 1, 10, 1)
    
    if st.button("🖼️ Generate Images", type="primary"):
        with st.spinner("🤖 AI creating images..."):
            import time
            time.sleep(2)
        
        st.success(f"✨ Generated {quantity} image(s)!")
        
        # Display mock images
        cols = st.columns(min(quantity, 3))
        for i in range(quantity):
            with cols[i % 3]:
                st.markdown(f"""
                <div style="background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%); 
                            height: 300px; border-radius: 10px; display: flex;
                            align-items: center; justify-content: center; color: white;">
                    <p>Generated Image #{i+1}</p>
                </div>
                """, unsafe_allow_html=True)
                st.download_button(f"📥 Download #{i+1}", "image_data", f"image_{i+1}.png", key=f"img_{i}")

def show_video_maker():
    """Video Trailer Maker Demo"""
    st.title("🎬 AI Video Trailer Maker")
    st.markdown("Create professional book trailers in minutes")
    
    st.warning("🚧 Video generation coming soon! This demo shows the interface.")
    
    duration = st.slider("Duration (seconds)", 15, 180, 30)
    voice = st.selectbox("Voice", ["Elegant Female", "Narrator Male", "Young Adult", "Epic"])
    music = st.selectbox("Music", ["Epic Orchestral", "Dramatic Piano", "Suspenseful", "Romantic"])
    
    script = st.text_area("Script (auto-generated)", 
                         "In a world where phoenixes rule the skies...")
    
    if st.button("🎬 Generate Trailer", type="primary"):
        st.info("Video generation would process here in production")

def show_audiobook():
    """Audiobook Narrator Demo"""
    st.title("🎙️ AI Audiobook Narrator")
    st.markdown("Transform text into professional audiobook narration")
    
    st.warning("🚧 Audiobook generation coming soon! This demo shows the interface.")
    
    text = st.text_area("Text to Narrate", height=200)
    voice = st.selectbox("Narrator Voice", ["Professional Male", "Professional Female", "Character Voices"])
    
    if st.button("🎙️ Generate Audiobook", type="primary"):
        st.info("Audio generation would process here in production")

def show_pricing():
    """Pricing and ROI Calculator"""
    st.title("💰 Pricing & ROI Calculator")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        ### Spark - $29/mo
        - 3 manuscripts/month
        - 5 covers/month
        - 20 images/month
        - 1 video/month
        """)
    
    with col2:
        st.markdown("""
        ### Blaze - $49/mo ⭐
        - 10 manuscripts/month
        - UNLIMITED covers
        - 100 images/month
        - 3 videos/month
        """)
    
    with col3:
        st.markdown("""
        ### Inferno - $99/mo
        - UNLIMITED everything
        - Team accounts
        - API access
        - Priority support
        """)
    
    st.markdown("---")
    st.subheader("💡 ROI Calculator")
    
    books_per_month = st.slider("Books you publish per month", 1, 20, 3)
    
    traditional_cost = books_per_month * (500 + 300 + 200)  # formatter + cover + images
    phoenixforge_cost = 49  # Blaze tier
    savings = traditional_cost - phoenixforge_cost
    
    col1, col2, col3 = st.columns(3)
    col1.metric("Traditional Cost", f"${traditional_cost:,}")
    col2.metric("PhoenixForge Cost", f"${phoenixforge_cost}")
    col3.metric("Monthly Savings", f"${savings:,}", f"{int((savings/traditional_cost)*100)}%")

def show_dashboard():
    """Dashboard Demo"""
    st.title("📊 Dashboard")
    
    # Metrics
    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Projects", "12", "+3")
    col2.metric("Covers Generated", "47", "+8")
    col3.metric("Usage", "67%", "of limit")
    col4.metric("Days Left", "18", "in billing cycle")
    
    st.markdown("---")
    
    # Recent projects
    st.subheader("📚 Recent Projects")
    
    import pandas as pd
    df = pd.DataFrame({
        "Project": ["The Phoenix Chronicles", "Shadow Realm", "Digital Dreams"],
        "Type": ["Fantasy", "Thriller", "Sci-Fi"],
        "Status": ["Completed", "In Progress", "Completed"],
        "Created": ["2025-10-20", "2025-10-22", "2025-10-24"]
    })
    
    st.dataframe(df, use_container_width=True)

if __name__ == "__main__":
    main()
