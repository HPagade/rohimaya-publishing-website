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
            "🎙️ Audiobook Narrator",
            "🎨 Cover Generator",
            "🖼️ Image Creator",
            "🍳 Cookbook Formatter",
            "🏥 Health Content",
            "📱 Marketing Suite",
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
    elif page == "🎙️ Audiobook Narrator":
        show_audiobook()
    elif page == "🎨 Cover Generator":
        show_cover_generator()
    elif page == "🖼️ Image Creator":
        show_image_creator()
    elif page == "🍳 Cookbook Formatter":
        show_cookbook()
    elif page == "🏥 Health Content":
        show_health()
    elif page == "📱 Marketing Suite":
        show_marketing()
    elif page == "💰 Pricing & ROI":
        show_pricing()
    elif page == "📊 Dashboard Demo":
        show_dashboard()

def show_home():
    """Home page with platform overview"""
    st.markdown('<h1 class="main-header">🔥 PhoenixForge AI</h1>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; font-size: 1.5rem;">Where Stories Take Shape</p>', unsafe_allow_html=True)
    
    st.markdown("---")
    
    # Feature overview - Row 1
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
            <h3>🎙️ Audiobook</h3>
            <p>Convert text to professional audiobook narration with AI voices</p>
            <ul>
                <li>50+ natural voices</li>
                <li>Chapter-by-chapter</li>
                <li>ACX-compliant output</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
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
    
    # Feature overview - Row 2
    col1, col2, col3 = st.columns(3)
    
    with col1:
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
    
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h3>🍳 Cookbook</h3>
            <p>Format recipes into beautiful cookbooks</p>
            <ul>
                <li>Recipe parsing</li>
                <li>Nutrition calculation</li>
                <li>Professional layouts</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="feature-card">
            <h3>🏥 Health Content</h3>
            <p>Generate health and fitness content</p>
            <ul>
                <li>Workout plans</li>
                <li>Meal plans</li>
                <li>Health articles</li>
            </ul>
        </div>
        """, unsafe_allow_html=True)
    
    # Feature overview - Row 3 (Marketing centered)
    col1, col2, col3 = st.columns([1, 1, 1])
    with col2:
        st.markdown("""
        <div class="feature-card">
            <h3>📱 Marketing Suite</h3>
            <p>AI-powered marketing content for authors</p>
            <ul>
                <li>Social media posts</li>
                <li>Email campaigns</li>
                <li>Book descriptions</li>
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
    1. Select a tool from the sidebar (7 products available!)
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

def show_audiobook():
    """Audiobook Narrator Demo"""
    st.title("🎙️ AI Audiobook Narrator")
    st.markdown("Transform your text into professional audiobook narration with AI")
    
    st.markdown("---")
    
    col1, col2 = st.columns([3, 1])
    
    with col1:
        st.subheader("📝 Text Input")
        
        # Input method
        input_method = st.radio(
            "Input Method",
            ["Paste Text", "Upload File", "Use Sample"],
            horizontal=True
        )
        
        text_content = ""
        if input_method == "Paste Text":
            text_content = st.text_area(
                "Paste your text here",
                height=200,
                placeholder="Chapter 1: The Beginning\n\nIn a world where magic was real..."
            )
        elif input_method == "Upload File":
            uploaded_file = st.file_uploader("Upload manuscript (TXT, DOCX, PDF)", type=['txt', 'docx', 'pdf'])
            if uploaded_file:
                st.success("✅ File uploaded successfully!")
                text_content = "sample"
        else:  # Use Sample
            if st.button("📝 Load Sample Text"):
                text_content = "sample"
                st.success("✅ Sample text loaded!")
        
        if text_content:
            st.subheader("🎙️ Voice Settings")
            
            col_voice, col_lang = st.columns(2)
            with col_voice:
                voice = st.selectbox(
                    "Select Voice",
                    [
                        "Alloy (Neutral)",
                        "Echo (Male)",
                        "Fable (British Male)",
                        "Onyx (Deep Male)",
                        "Nova (Female)",
                        "Shimmer (Soft Female)"
                    ]
                )
            
            with col_lang:
                language = st.selectbox(
                    "Language",
                    ["English (US)", "English (UK)", "Spanish", "French", "German", "Italian"]
                )
            
            # Advanced settings
            with st.expander("⚙️ Advanced Settings"):
                speed = st.slider("Speech Speed", 0.5, 2.0, 1.0, 0.1)
                format_output = st.selectbox("Output Format", ["MP3 (Standard)", "MP3 (HD)", "WAV (Lossless)", "FLAC"])
                chapter_split = st.checkbox("Split by chapters", value=True)
                add_intro = st.checkbox("Add intro music", value=False)
            
            st.markdown("---")
            
            if st.button("🎙️ Generate Audiobook", type="primary"):
                with st.spinner("🤖 AI generating audiobook narration..."):
                    import time
                    # Simulate processing
                    progress_bar = st.progress(0)
                    for i in range(100):
                        time.sleep(0.03)
                        progress_bar.progress(i + 1)
                
                st.success("✨ Audiobook generated successfully!")
                
                # Show results
                st.markdown("### 📊 Generation Results")
                col1, col2, col3, col4 = st.columns(4)
                col1.metric("Duration", "2h 34m")
                col2.metric("Chapters", "12")
                col3.metric("File Size", "147 MB")
                col4.metric("Quality", "HD")
                
                # Audio preview
                st.markdown("### 🎧 Preview")
                st.info("🎵 Audio preview would play here in production")
                
                # Download options
                st.markdown("### 📥 Download Options")
                col1, col2 = st.columns(2)
                with col1:
                    st.download_button(
                        "📥 Download Complete Audiobook",
                        data="Sample audiobook data",
                        file_name="audiobook_complete.mp3",
                        mime="audio/mpeg"
                    )
                with col2:
                    st.download_button(
                        "📂 Download by Chapters (ZIP)",
                        data="Sample chapter data",
                        file_name="audiobook_chapters.zip",
                        mime="application/zip"
                    )
    
    with col2:
        st.subheader("✨ Features")
        st.markdown("""
        **AI-Powered:**
        - OpenAI TTS
        - Natural voices
        - Emotion detection
        
        **Professional:**
        - ACX compliant
        - HD audio quality
        - Chapter markers
        
        **Flexible:**
        - Multiple voices
        - Speed control
        - Format options
        """)
        
        st.markdown("---")
        st.metric("Cost Savings", "95%")
        st.caption("$50 vs $2,000+ for human narrator")

def show_cookbook():
    """Cookbook Formatter Demo"""
    st.title("🍳 Cookbook Formatter")
    st.markdown("Transform recipes into beautifully formatted cookbooks")
    
    st.markdown("---")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("📝 Add Recipes")
        
        # Recipe input method
        input_method = st.radio(
            "Input Method",
            ["Manual Entry", "Parse Recipe Text", "Upload Recipe File"],
            horizontal=True
        )
        
        if input_method == "Manual Entry":
            st.markdown("#### Recipe Details")
            recipe_title = st.text_input("Recipe Title", "Classic Chocolate Chip Cookies")
            
            col_serv, col_prep, col_cook = st.columns(3)
            with col_serv:
                servings = st.number_input("Servings", 1, 100, 12)
            with col_prep:
                prep_time = st.number_input("Prep Time (min)", 1, 300, 15)
            with col_cook:
                cook_time = st.number_input("Cook Time (min)", 1, 300, 12)
            
            ingredients = st.text_area(
                "Ingredients (one per line)",
                "2 1/4 cups all-purpose flour\n1 tsp baking soda\n1 tsp salt\n1 cup butter, softened\n3/4 cup granulated sugar",
                height=150
            )
            
            instructions = st.text_area(
                "Instructions (one step per line)",
                "1. Preheat oven to 375°F\n2. Mix flour, baking soda, and salt\n3. Beat butter and sugars until creamy",
                height=150
            )
            
            # Tags and categories
            col_cat, col_diet = st.columns(2)
            with col_cat:
                category = st.multiselect(
                    "Categories",
                    ["Desserts", "Main Dish", "Appetizers", "Breakfast", "Snacks"],
                    default=["Desserts"]
                )
            with col_diet:
                dietary = st.multiselect(
                    "Dietary Tags",
                    ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb"],
                    default=["Vegetarian"]
                )
        
        elif input_method == "Parse Recipe Text":
            recipe_text = st.text_area(
                "Paste recipe text",
                "Our AI will automatically parse ingredients and instructions",
                height=250
            )
            if st.button("🤖 Parse Recipe with AI"):
                with st.spinner("Parsing recipe..."):
                    import time
                    time.sleep(2)
                st.success("✅ Recipe parsed successfully!")
        
        else:  # Upload
            uploaded_file = st.file_uploader("Upload recipe file", type=['txt', 'docx', 'pdf'])
            if uploaded_file:
                st.success("✅ File uploaded!")
        
        st.markdown("---")
        
        # Cookbook settings
        st.subheader("📖 Cookbook Settings")
        
        col_layout, col_style = st.columns(2)
        with col_layout:
            layout = st.selectbox(
                "Layout Style",
                ["Classic", "Modern", "Minimal", "Rustic", "Elegant"]
            )
        with col_style:
            color_scheme = st.selectbox(
                "Color Scheme",
                ["Warm Autumn", "Fresh Spring", "Cool Blue", "Monochrome", "Vibrant"]
            )
        
        include_nutrition = st.checkbox("Include Nutrition Facts", value=True)
        include_photos = st.checkbox("Include AI-Generated Food Photos", value=True)
        include_index = st.checkbox("Include Recipe Index", value=True)
        
        if st.button("📚 Generate Cookbook", type="primary"):
            with st.spinner("🤖 Formatting cookbook..."):
                import time
                time.sleep(3)
            
            st.success("✨ Cookbook formatted successfully!")
            
            # Results
            st.markdown("### 📊 Cookbook Stats")
            col1, col2, col3, col4 = st.columns(4)
            col1.metric("Recipes", "24")
            col2.metric("Pages", "156")
            col3.metric("Categories", "6")
            col4.metric("Total Time", "2.5 hrs")
            
            # Preview
            st.markdown("### 👁️ Preview")
            st.markdown("""
            <div style="background: #fff; border: 2px solid #ddd; padding: 2rem; border-radius: 10px;">
                <h2 style="color: #FF6B35; text-align: center;">Classic Chocolate Chip Cookies</h2>
                <p style="text-align: center;"><em>Servings: 12 | Prep: 15 min | Cook: 12 min</em></p>
                <hr>
                <h3>Ingredients</h3>
                <ul>
                    <li>2 1/4 cups all-purpose flour</li>
                    <li>1 tsp baking soda</li>
                    <li>1 cup butter, softened</li>
                </ul>
                <h3>Instructions</h3>
                <ol>
                    <li>Preheat oven to 375°F</li>
                    <li>Mix dry ingredients together</li>
                    <li>Beat butter until creamy</li>
                </ol>
            </div>
            """, unsafe_allow_html=True)
            
            # Download
            st.markdown("### 📥 Download")
            col1, col2 = st.columns(2)
            with col1:
                st.download_button(
                    "📄 Download PDF",
                    data="Sample cookbook PDF",
                    file_name="cookbook.pdf",
                    mime="application/pdf"
                )
            with col2:
                st.download_button(
                    "📱 Download ePub",
                    data="Sample cookbook ePub",
                    file_name="cookbook.epub",
                    mime="application/epub+zip"
                )
    
    with col2:
        st.subheader("✨ Features")
        st.markdown("""
        **Smart Parsing:**
        - AI recipe extraction
        - Auto ingredient lists
        - Step-by-step format
        
        **Nutrition:**
        - Calorie calculation
        - Macro tracking
        - Allergen warnings
        
        **Beautiful:**
        - Professional layouts
        - Multiple styles
        - Print-ready quality
        """)
        
        st.markdown("---")
        st.info("💡 **Tip:** Add 20+ recipes for a complete cookbook")

def show_health():
    """Health Content Generator Demo"""
    st.title("🏥 Health Content Generator")
    st.markdown("Generate professional health and fitness content with AI")
    
    st.markdown("---")
    
    # Content type selector
    content_type = st.radio(
        "Select Content Type",
        ["🏋️ Workout Plans", "🥗 Meal Plans", "📝 Health Articles"],
        horizontal=True
    )
    
    if content_type == "🏋️ Workout Plans":
        st.subheader("Workout Plan Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            fitness_level = st.selectbox(
                "Fitness Level",
                ["Beginner", "Intermediate", "Advanced", "Athletic"]
            )
            goal = st.selectbox(
                "Goal",
                ["Weight Loss", "Muscle Gain", "Strength", "Endurance", "General Fitness"]
            )
        
        with col2:
            duration = st.selectbox(
                "Program Duration",
                ["4 Weeks", "8 Weeks", "12 Weeks", "6 Months"]
            )
            equipment = st.multiselect(
                "Available Equipment",
                ["Dumbbells", "Barbell", "Resistance Bands", "Bodyweight Only", "Full Gym"],
                default=["Bodyweight Only"]
            )
        
        days_per_week = st.slider("Workout Days Per Week", 2, 7, 4)
        session_length = st.slider("Session Length (minutes)", 20, 120, 45)
        
        if st.button("💪 Generate Workout Plan", type="primary"):
            with st.spinner("🤖 Creating personalized workout plan..."):
                import time
                time.sleep(3)
            
            st.success("✨ Workout plan generated!")
            
            # Sample plan
            st.markdown("### 📋 Your 4-Week Workout Plan")
            
            tabs = st.tabs(["Week 1", "Week 2", "Week 3", "Week 4"])
            for i, tab in enumerate(tabs):
                with tab:
                    st.markdown(f"""
                    **Day 1: Full Body Strength**
                    - Warm-up: 5 min cardio
                    - Squats: 3 sets x 12 reps
                    - Push-ups: 3 sets x 10 reps
                    - Lunges: 3 sets x 10 reps each leg
                    - Plank: 3 sets x 30 seconds
                    - Cool-down: Stretching 5 min
                    
                    **Day 2: Cardio & Core**
                    - Jump rope: 2 min
                    - Burpees: 3 sets x 10 reps
                    - Mountain climbers: 3 sets x 15 reps
                    - Russian twists: 3 sets x 20 reps
                    - Bicycle crunches: 3 sets x 15 reps
                    
                    **Day 3: Rest or Active Recovery**
                    - Light walk or yoga
                    """)
            
            st.download_button(
                "📥 Download Complete Plan (PDF)",
                data="Sample workout plan",
                file_name="workout_plan.pdf",
                mime="application/pdf"
            )
    
    elif content_type == "🥗 Meal Plans":
        st.subheader("Meal Plan Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            calorie_target = st.number_input("Daily Calorie Target", 1200, 4000, 2000, step=100)
            goal = st.selectbox(
                "Goal",
                ["Weight Loss", "Muscle Gain", "Maintenance", "Athletic Performance"]
            )
        
        with col2:
            dietary_pref = st.multiselect(
                "Dietary Preferences",
                ["Vegetarian", "Vegan", "Keto", "Paleo", "Mediterranean", "Gluten-Free"],
                default=["Mediterranean"]
            )
            meals_per_day = st.slider("Meals Per Day", 3, 6, 3)
        
        if st.button("🥗 Generate Meal Plan", type="primary"):
            with st.spinner("🤖 Creating personalized meal plan..."):
                import time
                time.sleep(3)
            
            st.success("✨ Meal plan generated!")
            
            # Sample meal plan
            st.markdown("### 📋 Your 7-Day Meal Plan")
            
            days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
            for day in days:
                with st.expander(f"📅 {day}"):
                    st.markdown(f"""
                    **Breakfast (450 cal)**
                    - Greek yogurt with berries and granola
                    - Protein: 25g | Carbs: 45g | Fat: 12g
                    
                    **Lunch (600 cal)**
                    - Grilled chicken salad with olive oil dressing
                    - Protein: 35g | Carbs: 40g | Fat: 25g
                    
                    **Dinner (700 cal)**
                    - Baked salmon with quinoa and vegetables
                    - Protein: 40g | Carbs: 55g | Fat: 30g
                    
                    **Snack (250 cal)**
                    - Apple with almond butter
                    - Protein: 8g | Carbs: 30g | Fat: 15g
                    
                    **Daily Total: {calorie_target} cal**
                    """)
            
            st.download_button(
                "📥 Download Meal Plan with Recipes (PDF)",
                data="Sample meal plan",
                file_name="meal_plan.pdf",
                mime="application/pdf"
            )
    
    else:  # Health Articles
        st.subheader("Health Article Generator")
        
        article_topic = st.text_input(
            "Article Topic",
            "Benefits of Regular Exercise for Mental Health"
        )
        
        col1, col2 = st.columns(2)
        with col1:
            article_length = st.selectbox(
                "Article Length",
                ["Short (500 words)", "Medium (1000 words)", "Long (2000 words)", "In-depth (3000+ words)"]
            )
        with col2:
            tone = st.selectbox(
                "Tone",
                ["Professional", "Conversational", "Academic", "Encouraging"]
            )
        
        include_citations = st.checkbox("Include Scientific Citations", value=True)
        include_seo = st.checkbox("SEO Optimize", value=True)
        
        if st.button("📝 Generate Article", type="primary"):
            with st.spinner("🤖 Writing health article..."):
                import time
                time.sleep(3)
            
            st.success("✨ Article generated!")
            
            # Sample article
            st.markdown("### 📄 Generated Article")
            st.markdown("""
            <div style="background: #f8f9fa; padding: 2rem; border-radius: 10px; border-left: 4px solid #FF6B35;">
                <h2>Benefits of Regular Exercise for Mental Health</h2>
                <p><em>Published: November 3, 2025 | Reading time: 5 minutes</em></p>
                <hr>
                <p>Regular physical exercise has been scientifically proven to provide numerous benefits for mental health. 
                Research shows that engaging in consistent physical activity can significantly reduce symptoms of depression 
                and anxiety while improving overall mood and cognitive function.</p>
                
                <h3>Key Benefits</h3>
                <ol>
                    <li><strong>Reduced Stress:</strong> Exercise reduces cortisol levels and promotes relaxation</li>
                    <li><strong>Improved Mood:</strong> Physical activity triggers endorphin release</li>
                    <li><strong>Better Sleep:</strong> Regular exercise helps regulate sleep patterns</li>
                    <li><strong>Increased Confidence:</strong> Achieving fitness goals boosts self-esteem</li>
                </ol>
                
                <p><small>Citations: Journal of Clinical Psychology (2024), American Psychological Association</small></p>
            </div>
            """, unsafe_allow_html=True)
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Word Count", "1,247")
            with col2:
                st.metric("Reading Time", "5 min")
            with col3:
                st.metric("SEO Score", "92/100")
            
            st.download_button(
                "📥 Download Article (DOCX)",
                data="Sample article",
                file_name="health_article.docx",
                mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )

def show_marketing():
    """Marketing Suite Demo"""
    st.title("📱 Marketing Suite")
    st.markdown("AI-powered marketing content for authors and publishers")
    
    st.markdown("---")
    
    # Marketing content type
    marketing_type = st.radio(
        "Select Content Type",
        ["📱 Social Media Posts", "📧 Email Campaigns", "📢 Ad Copy", "📚 Book Descriptions"],
        horizontal=True
    )
    
    if marketing_type == "📱 Social Media Posts":
        st.subheader("Social Media Post Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            platform = st.selectbox(
                "Platform",
                ["Twitter/X", "Facebook", "Instagram", "LinkedIn", "TikTok", "All Platforms"]
            )
        with col2:
            tone = st.selectbox(
                "Tone",
                ["Professional", "Casual", "Humorous", "Inspirational", "Promotional"]
            )
        
        topic = st.text_area(
            "What's the post about?",
            "Announcing my new fantasy novel 'The Phoenix Chronicles' releasing next month",
            height=100
        )
        
        num_variations = st.slider("Number of Variations", 1, 5, 3)
        
        col_emoji, col_hashtags = st.columns(2)
        with col_emoji:
            use_emojis = st.checkbox("Include Emojis", value=True)
        with col_hashtags:
            use_hashtags = st.checkbox("Include Hashtags", value=True)
        
        if st.button("📱 Generate Posts", type="primary"):
            with st.spinner("🤖 Creating social media posts..."):
                import time
                time.sleep(2)
            
            st.success(f"✨ Generated {num_variations} variations!")
            
            # Sample posts
            for i in range(num_variations):
                with st.expander(f"✨ Variation #{i+1}"):
                    sample_posts = [
                        "🔥 Exciting news! My new fantasy novel 'The Phoenix Chronicles' drops next month! A tale of courage, magic, and rebirth. Pre-order link in bio! 📚✨ #FantasyBooks #NewRelease #AmWriting",
                        "✨ Next month, the phoenix rises! 🦅 'The Phoenix Chronicles' is my most ambitious work yet. Are you ready for an epic adventure? 🔥 #Fantasy #BookRelease #WritingCommunity",
                        "From the ashes, a new story is born! 🔥 'The Phoenix Chronicles' releases next month. Join me on an unforgettable journey! Link in bio 📖 #NewBook #FantasyAuthor #BookLovers"
                    ]
                    st.markdown(sample_posts[i % 3])
                    
                    col1, col2, col3 = st.columns(3)
                    with col1:
                        st.button(f"📋 Copy #{i+1}", key=f"copy_post_{i}")
                    with col2:
                        if platform == "Twitter/X":
                            char_count = len(sample_posts[i % 3])
                            st.caption(f"{char_count}/280 characters")
                    with col3:
                        st.caption(f"🔥 Engagement Score: {85 + i*3}%")
    
    elif marketing_type == "📧 Email Campaigns":
        st.subheader("Email Campaign Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            email_type = st.selectbox(
                "Email Type",
                ["Launch Announcement", "Newsletter", "Promotional", "Welcome Series", "Re-engagement"]
            )
        with col2:
            audience = st.selectbox(
                "Target Audience",
                ["Existing Readers", "Newsletter Subscribers", "Website Visitors", "Social Followers"]
            )
        
        campaign_topic = st.text_area(
            "Campaign Details",
            "Announcing the release of my new book with a special launch week discount",
            height=100
        )
        
        if st.button("📧 Generate Email", type="primary"):
            with st.spinner("🤖 Crafting email campaign..."):
                import time
                time.sleep(2)
            
            st.success("✨ Email generated!")
            
            # Sample email
            st.markdown("### 📧 Email Preview")
            st.markdown("""
            <div style="background: #fff; border: 2px solid #ddd; padding: 2rem; border-radius: 10px;">
                <p><strong>Subject Line:</strong> 🔥 The Phoenix Rises - New Book Launch + Special Offer!</p>
                <hr>
                <p>Hi [First Name],</p>
                <p>I'm thrilled to finally share this news with you! After months of writing, editing, and polishing, 
                <strong>The Phoenix Chronicles</strong> is officially launching next week! 📚✨</p>
                
                <p><strong>What's it about?</strong><br>
                In a world where phoenixes rule the skies, one young warrior must rise from the ashes to save her kingdom...</p>
                
                <p><strong>🎁 Launch Week Special:</strong><br>
                Get 40% off when you pre-order before November 10th!<br>
                Use code: <code>PHOENIX40</code></p>
                
                <p style="text-align: center; margin: 2rem 0;">
                    <a href="#" style="background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px;">
                        Pre-Order Now →
                    </a>
                </p>
                
                <p>Thank you for being an amazing reader and supporter!</p>
                <p>Best,<br>Hannah</p>
                <hr>
                <p><small>You're receiving this because you signed up for updates. <a href="#">Unsubscribe</a></small></p>
            </div>
            """, unsafe_allow_html=True)
            
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Open Rate Est.", "28%")
            with col2:
                st.metric("Click Rate Est.", "12%")
            with col3:
                st.metric("Conversion Est.", "3.5%")
    
    elif marketing_type == "📢 Ad Copy":
        st.subheader("Ad Copy Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            ad_platform = st.selectbox(
                "Platform",
                ["Facebook Ads", "Google Ads", "Amazon Ads", "Instagram Ads", "BookBub"]
            )
        with col2:
            ad_goal = st.selectbox(
                "Campaign Goal",
                ["Book Sales", "Email Signups", "Website Traffic", "Brand Awareness"]
            )
        
        product = st.text_input("Product/Book", "The Phoenix Chronicles")
        target_audience = st.text_input("Target Audience", "Fantasy readers, ages 25-45")
        
        if st.button("📢 Generate Ad Copy", type="primary"):
            with st.spinner("🤖 Creating ad copy..."):
                import time
                time.sleep(2)
            
            st.success("✨ Ad copy generated!")
            
            # Sample ad
            st.markdown("### 📢 Ad Copy")
            
            tabs = st.tabs(["Headline Options", "Description Options", "Call-to-Action"])
            
            with tabs[0]:
                st.markdown("""
                1. **From Ashes to Glory: The Phoenix Chronicles**
                2. **A Fantasy Epic That Will Set Your World Ablaze** 🔥
                3. **When Hope Dies, The Phoenix Rises**
                4. **The Most Anticipated Fantasy Release of 2025**
                5. **Magic. Adventure. Rebirth. One Unforgettable Story.**
                """)
            
            with tabs[1]:
                st.markdown("""
                **Option 1:**
                Discover The Phoenix Chronicles - an epic fantasy adventure that readers are calling "unputdownable." 
                Join thousands of readers who've fallen in love with this magical world. Limited time launch price!
                
                **Option 2:**
                If you loved Game of Thrones and Harry Potter, you'll love The Phoenix Chronicles. 
                A brave warrior, ancient magic, and a kingdom on the brink of destruction. Start reading today!
                
                **Option 3:**
                ⭐⭐⭐⭐⭐ "Best fantasy book I've read in years!" 
                The Phoenix Chronicles is breaking records and capturing hearts. Don't miss the book everyone's talking about.
                """)
            
            with tabs[2]:
                st.markdown("""
                - 🛒 Buy Now - Limited Time Offer!
                - 📖 Start Reading Today
                - 🔥 Get Your Copy →
                - ✨ Discover the Magic
                - 🎁 Claim Your Discount
                """)
    
    else:  # Book Descriptions
        st.subheader("Book Description Generator")
        
        col1, col2 = st.columns(2)
        with col1:
            style = st.selectbox(
                "Description Style",
                ["Amazon Listing", "Goodreads", "Back Cover Copy", "Short Pitch", "Long Synopsis"]
            )
        with col2:
            length = st.selectbox(
                "Length",
                ["Short (50-100 words)", "Medium (150-250 words)", "Long (300-400 words)"]
            )
        
        book_info = st.text_area(
            "Book Information",
            "Title: The Phoenix Chronicles\nGenre: Epic Fantasy\nThemes: Rebirth, courage, magic\nPlot: A young warrior discovers she's the last phoenix rider...",
            height=150
        )
        
        if st.button("📚 Generate Descriptions", type="primary"):
            with st.spinner("🤖 Writing book descriptions..."):
                import time
                time.sleep(2)
            
            st.success("✨ Generated 3 variations!")
            
            # Sample descriptions
            descriptions = [
                """
                **🔥 From the ashes of a fallen kingdom, a hero will rise.**
                
                Seventeen-year-old Aria never asked to be special. But when her village is destroyed and she discovers 
                she's the last phoenix rider in a thousand years, everything changes.
                
                With ancient magic awakening inside her and a ruthless emperor hunting phoenix riders to extinction, 
                Aria must master her newfound powers before it's too late. Accompanied by a mysterious warrior and 
                a wise-cracking dragon, she embarks on an epic quest to save not just her kingdom, but all of magic itself.
                
                **Perfect for fans of:**
                - Throne of Glass by Sarah J. Maas
                - Fourth Wing by Rebecca Yarros
                - The Priory of the Orange Tree by Samantha Shannon
                
                ⭐ "Unputdownable! The Phoenix Chronicles is the fantasy epic we've been waiting for." - BookRiot
                """,
                """
                **When hope dies, the phoenix rises.**
                
                In a world where magic is dying and phoenixes are myth, Aria's ordinary life shatters when flames 
                erupt from her hands. She's the last phoenix rider—a power that makes her both humanity's greatest 
                hope and its most hunted target.
                
                As war looms and darkness spreads, Aria must journey across treacherous lands to find the lost Phoenix 
                Temple. But the emperor will stop at nothing to claim her power for himself, and her growing feelings 
                for her mysterious guardian complicate everything.
                
                **The Phoenix Chronicles is an epic fantasy filled with:**
                ✨ Strong female protagonist
                🔥 Found family & slow-burn romance
                ⚔️ Epic battles & political intrigue
                🦅 Dragons & mythical creatures
                
                *Book 1 of The Phoenix Chronicles Trilogy*
                """,
                """
                From USA Today bestselling author comes an unforgettable fantasy adventure that will ignite your imagination.
                
                Aria's world ended in flames. Now, she'll be reborn in fire.
                
                Discover why readers are calling this "the best fantasy debut in years" and "impossible to put down."
                
                **Start the journey today.** ⭐⭐⭐⭐⭐
                """
            ]
            
            for i, desc in enumerate(descriptions):
                with st.expander(f"📖 Variation #{i+1} - {['Long', 'Medium', 'Short'][i]} Format"):
                    st.markdown(desc)
                    st.button(f"📋 Copy Description #{i+1}", key=f"copy_desc_{i}")

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
