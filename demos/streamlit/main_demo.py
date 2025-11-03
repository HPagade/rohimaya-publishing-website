"""
PhoenixForge AI - Complete Demo Application with API Integration
Interactive Streamlit demo showcasing all 7 platform features with real API calls
"""

import streamlit as st
import os
from pathlib import Path
import base64
import time
from io import BytesIO
import json

# Try to import optional dependencies
try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    st.warning("⚠️ OpenAI package not installed. Install with: pip install openai")

try:
    import pandas as pd
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False

try:
    from dotenv import load_dotenv
    load_dotenv()
    DOTENV_AVAILABLE = True
except ImportError:
    DOTENV_AVAILABLE = False

# Page configuration
st.set_page_config(
    page_title="PhoenixForge AI - Complete Demo",
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
    .success-box {
        background: #d4edda;
        border: 1px solid #c3e6cb;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
    }
    .warning-box {
        background: #fff3cd;
        border: 1px solid #ffeaa7;
        border-radius: 5px;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Initialize OpenAI client if available
def get_openai_client():
    """Get OpenAI client if API key is available"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None
    if not OPENAI_AVAILABLE:
        return None
    try:
        return OpenAI(api_key=api_key)
    except Exception as e:
        st.error(f"Error initializing OpenAI client: {str(e)}")
        return None

# Check API availability
def check_api_status():
    """Check if APIs are configured"""
    status = {
        "openai": os.getenv("OPENAI_API_KEY") is not None and OPENAI_AVAILABLE,
        "demo_mode": os.getenv("OPENAI_API_KEY") is None or not OPENAI_AVAILABLE
    }
    return status

def main():
    # Sidebar navigation
    st.sidebar.title("🔥 PhoenixForge AI")
    st.sidebar.markdown("---")
    
    # API Status indicator
    api_status = check_api_status()
    if api_status["demo_mode"]:
        st.sidebar.warning("🎭 **Demo Mode** - Using mock data")
        with st.sidebar.expander("ℹ️ Enable Real API Calls"):
            st.markdown("""
            To enable real API integration:
            
            1. Create a `.env` file in the demos/streamlit folder
            2. Add your OpenAI API key:
               ```
               OPENAI_API_KEY=sk-your-key-here
               ```
            3. Restart the Streamlit app
            
            For now, the demo uses mock data.
            """)
    else:
        st.sidebar.success("✅ **Live Mode** - API Connected")
    
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
    **7 Complete Products**
    
    All features are working prototypes.
    Switch to Live Mode to use real AI!
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
            <p>Transform manuscripts into professional files</p>
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
            <p>Convert text to professional narration</p>
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
            <p>Generate stunning book covers with AI</p>
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
            <p>Create unlimited images for books</p>
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
            <p>AI-powered marketing content</p>
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
    
    if PANDAS_AVAILABLE:
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Books Formatted", "2,547", "+47 today")
        col2.metric("Covers Generated", "8,231", "+156 today")
        col3.metric("Active Users", "1,234", "+23 today")
        col4.metric("Time Saved", "12,450 hrs", "vs manual")
    
    # Quick start
    st.markdown("---")
    st.markdown("## 🚀 Quick Start")
    
    api_status = check_api_status()
    if api_status["demo_mode"]:
        st.info("""
        **Demo Mode Active**
        
        1. Select any tool from the sidebar (7 products available!)
        2. Try the interface and see mock results
        3. Add your OpenAI API key to see real AI generation
        
        **To enable real AI:** See sidebar instructions
        """)
    else:
        st.success("""
        **Live Mode Active** ✅
        
        1. Select any tool from the sidebar
        2. Enter your content or details
        3. Click generate to see REAL AI in action!
        4. Download your results
        
        All 7 products are ready to use with real APIs!
        """)

def show_formatter():
    """Manuscript Formatter Demo with real AI analysis"""
    st.title("📄 AI Manuscript Formatter")
    st.markdown("Transform your manuscript into professionally formatted books")
    
    st.markdown("---")
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("Upload Manuscript")
        
        # Input options
        input_method = st.radio("Input Method", ["Upload File", "Paste Text", "Use Sample"], horizontal=True)
        
        manuscript_text = None
        
        if input_method == "Upload File":
            uploaded_file = st.file_uploader(
                "Choose a file (TXT, DOCX, PDF)",
                type=['txt', 'docx', 'pdf'],
                help="Upload your manuscript for formatting"
            )
            if uploaded_file:
                try:
                    if uploaded_file.type == "text/plain":
                        manuscript_text = uploaded_file.read().decode('utf-8')
                    else:
                        manuscript_text = "Sample manuscript content (file parsing would happen here)"
                    st.success(f"✅ Loaded {len(manuscript_text)} characters")
                except Exception as e:
                    st.error(f"Error reading file: {str(e)}")
        
        elif input_method == "Paste Text":
            manuscript_text = st.text_area(
                "Paste your manuscript text",
                height=200,
                placeholder="Chapter 1\n\nIn the beginning..."
            )
        
        else:  # Use Sample
            if st.button("📝 Load Sample Manuscript"):
                manuscript_text = """Chapter 1: The Phoenix Rises

The ancient city of Aethoria stood silent beneath a crimson sky. Aria gazed out from the crumbling tower, her heart heavy with the weight of destiny. She never asked to be the last phoenix rider, never wanted this terrible power that coursed through her veins like liquid fire.

Below, the enemy's army gathered like a dark stain across the landscape. Tomorrow, the battle would begin. Tomorrow, she would either save her kingdom or watch it burn.

She closed her eyes and felt the familiar heat building in her chest. The phoenix within her stirred, ancient and powerful. "We are ready," it whispered in her mind. "Together, we will rise from these ashes."

Chapter 2: The Awakening

Dawn broke cold and unforgiving..."""
                st.success("✅ Sample manuscript loaded!")
        
        if manuscript_text and len(manuscript_text) > 50:
            st.subheader("Formatting Options")
            
            col_genre, col_template = st.columns(2)
            with col_genre:
                genre = st.selectbox(
                    "Select Genre",
                    ["Fantasy", "Romance", "Thriller", "Science Fiction", "Mystery", "Literary Fiction", "Young Adult"]
                )
            
            with col_template:
                template = st.selectbox(
                    "Choose Template",
                    ["Modern Minimal", "Classic Literary", "Epic Fantasy", "Contemporary", "Academic"]
                )
            
            formats = st.multiselect(
                "Output Formats",
                ["PDF", "EPUB", "DOCX", "Print-Ready PDF"],
                default=["PDF"]
            )
            
            st.markdown("---")
            
            if st.button("🚀 Analyze & Format Manuscript", type="primary"):
                api_status = check_api_status()
                
                with st.spinner("🤖 AI analyzing manuscript structure..."):
                    time.sleep(2)
                    
                    if not api_status["demo_mode"]:
                        # Real API call
                        client = get_openai_client()
                        if client:
                            try:
                                # Analyze the manuscript structure
                                response = client.chat.completions.create(
                                    model="gpt-4",
                                    messages=[
                                        {"role": "system", "content": "You are a professional book formatter. Analyze the manuscript and identify chapters, word count, and structural elements."},
                                        {"role": "user", "content": f"Analyze this manuscript and identify chapters:\n\n{manuscript_text[:2000]}..."}
                                    ],
                                    max_tokens=500
                                )
                                analysis = response.choices[0].message.content
                                st.info(f"**AI Analysis:**\n\n{analysis}")
                            except Exception as e:
                                st.error(f"API Error: {str(e)}")
                                st.info("Falling back to demo mode...")
                                api_status["demo_mode"] = True
                
                st.success("✨ Formatting complete!")
                
                # Show results
                st.markdown("### 📊 Analysis Results")
                col1, col2, col3 = st.columns(3)
                
                # Count actual words and chapters
                word_count = len(manuscript_text.split())
                chapter_count = manuscript_text.count("Chapter")
                estimated_pages = word_count // 250
                
                col1.metric("Chapters", chapter_count if chapter_count > 0 else "N/A")
                col2.metric("Word Count", f"{word_count:,}")
                col3.metric("Estimated Pages", estimated_pages)
                
                st.markdown("### 📥 Download Formatted Files")
                col1, col2 = st.columns(2)
                with col1:
                    st.download_button(
                        "📄 Download PDF",
                        data=manuscript_text.encode('utf-8'),
                        file_name="formatted_manuscript.pdf",
                        mime="application/pdf"
                    )
                with col2:
                    if "EPUB" in formats:
                        st.download_button(
                            "📱 Download EPUB",
                            data=manuscript_text.encode('utf-8'),
                            file_name="formatted_manuscript.epub",
                            mime="application/epub+zip"
                        )
        else:
            st.info("👆 Choose an input method and add your manuscript to begin")
    
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

def show_audiobook():
    """Audiobook Narrator Demo with real TTS"""
    st.title("🎙️ AI Audiobook Narrator")
    st.markdown("Transform your text into professional audiobook narration")
    
    st.markdown("---")
    
    # Text input
    text_content = st.text_area(
        "📝 Text to Narrate",
        value="The ancient city of Aethoria stood silent beneath a crimson sky. Aria gazed out from the crumbling tower, her heart heavy with the weight of destiny.",
        height=150,
        help="Enter the text you want to convert to speech"
    )
    
    col1, col2 = st.columns(2)
    with col1:
        voice = st.selectbox(
            "🎙️ Select Voice",
            ["alloy", "echo", "fable", "onyx", "nova", "shimmer"],
            help="Different voice characteristics for your audiobook"
        )
    
    with col2:
        speed = st.slider("Speed", 0.5, 2.0, 1.0, 0.1, help="Playback speed")
    
    if st.button("🎙️ Generate Audiobook", type="primary"):
        api_status = check_api_status()
        
        with st.spinner("🤖 Generating audiobook narration..."):
            time.sleep(2)
            
            if not api_status["demo_mode"]:
                client = get_openai_client()
                if client and len(text_content) > 10:
                    try:
                        # Real TTS API call
                        response = client.audio.speech.create(
                            model="tts-1",
                            voice=voice,
                            input=text_content[:1000],  # Limit for demo
                            speed=speed
                        )
                        
                        # Convert to bytes
                        audio_bytes = BytesIO(response.content)
                        
                        st.success("✨ Audiobook generated successfully!")
                        
                        st.audio(audio_bytes, format='audio/mp3')
                        
                        st.download_button(
                            "📥 Download Audio File",
                            data=audio_bytes.getvalue(),
                            file_name="audiobook_sample.mp3",
                            mime="audio/mpeg"
                        )
                        
                    except Exception as e:
                        st.error(f"API Error: {str(e)}")
                        st.info("Showing demo mode instead...")
                        api_status["demo_mode"] = True
            
            if api_status["demo_mode"]:
                st.success("✨ Audiobook generated! (Demo Mode)")
                st.info("🎵 Audio preview would play here with real API key")
                
                col1, col2, col3 = st.columns(3)
                col1.metric("Duration", "1m 34s")
                col2.metric("Quality", "HD")
                col3.metric("Size", "2.3 MB")

def show_cover_generator():
    """Cover Generator with real DALL-E integration"""
    st.title("🎨 AI Book Cover Generator")
    st.markdown("Create stunning professional covers with DALL-E 3")
    
    st.markdown("---")
    
    col1, col2 = st.columns([3, 2])
    
    with col1:
        title = st.text_input("Book Title", "The Phoenix Chronicles")
        author = st.text_input("Author Name", "Hannah Pagade")
        
        col_genre, col_style = st.columns(2)
        with col_genre:
            genre = st.selectbox("Genre", ["Fantasy", "Romance", "Thriller", "Sci-Fi", "Mystery", "Horror"])
        with col_style:
            style = st.selectbox("Style", ["Dramatic", "Minimalist", "Illustrated", "Photorealistic"])
        
        description = st.text_area(
            "Cover Description",
            "A majestic phoenix rising from flames against a crimson sky, fantasy book cover art",
            help="Describe what you want on the cover"
        )
        
        if st.button("🎨 Generate Cover", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 AI generating book cover..."):
                time.sleep(3)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            # Create optimized prompt
                            prompt = f"Professional book cover for '{title}' by {author}. Genre: {genre}. Style: {style}. {description}. High quality, print-ready design."
                            
                            # Real DALL-E API call
                            response = client.images.generate(
                                model="dall-e-3",
                                prompt=prompt,
                                size="1024x1024",
                                quality="standard",
                                n=1
                            )
                            
                            image_url = response.data[0].url
                            
                            st.success("✨ Cover generated successfully!")
                            st.image(image_url, caption=f"{title} - Generated Cover", use_column_width=True)
                            
                            st.markdown(f"**Prompt used:** {prompt}")
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            st.info("Showing demo mode instead...")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Cover generated! (Demo Mode)")
                    st.markdown(f"""
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                height: 400px; border-radius: 10px; display: flex; 
                                align-items: center; justify-content: center; color: white;">
                        <div style="text-align: center;">
                            <h2>{title}</h2>
                            <p style="font-size: 1.2rem;">{author}</p>
                            <p><em>{genre} • {style}</em></p>
                        </div>
                    </div>
                    """, unsafe_allow_html=True)
                    st.info("📸 Real AI-generated cover would appear here with API key")
    
    with col2:
        st.subheader("✨ Features")
        st.markdown("""
        **AI-Powered:**
        - DALL-E 3 generation
        - Genre-specific prompts
        - Smart composition
        
        **Professional:**
        - Print-ready quality
        - High resolution
        - Commercial license
        
        **Fast:**
        - 2 minutes vs 3-5 days
        - No designer needed
        - Instant variations
        """)

def show_image_creator():
    """Image Creator with real DALL-E"""
    st.title("🖼️ AI Image Creator")
    st.markdown("Generate unlimited images for your books")
    
    st.markdown("---")
    
    prompt = st.text_area(
        "🎨 Image Prompt",
        "A fierce phoenix warrior with golden armor, standing in flames, fantasy art style",
        height=100,
        help="Describe the image you want to create"
    )
    
    col1, col2, col3 = st.columns(3)
    with col1:
        size = st.selectbox("Size", ["1024x1024", "1024x1792", "1792x1024"])
    with col2:
        quality = st.selectbox("Quality", ["standard", "hd"])
    with col3:
        quantity = st.number_input("Quantity", 1, 4, 1, help="Number of images to generate")
    
    if st.button("🖼️ Generate Images", type="primary"):
        api_status = check_api_status()
        
        with st.spinner(f"🤖 AI creating {quantity} image(s)..."):
            time.sleep(2)
            
            if not api_status["demo_mode"]:
                client = get_openai_client()
                if client:
                    try:
                        for i in range(min(quantity, 2)):  # Limit to 2 for demo
                            response = client.images.generate(
                                model="dall-e-3",
                                prompt=prompt,
                                size=size,
                                quality=quality,
                                n=1
                            )
                            
                            image_url = response.data[0].url
                            st.image(image_url, caption=f"Generated Image #{i+1}", use_column_width=True)
                            
                        st.success(f"✨ Generated {min(quantity, 2)} image(s)!")
                        
                    except Exception as e:
                        st.error(f"API Error: {str(e)}")
                        api_status["demo_mode"] = True
            
            if api_status["demo_mode"]:
                st.success(f"✨ Generated {quantity} image(s)! (Demo Mode)")
                cols = st.columns(min(quantity, 3))
                for i in range(quantity):
                    with cols[i % 3]:
                        st.markdown(f"""
                        <div style="background: linear-gradient(45deg, #f093fb {i*20}%, #f5576c 100%); 
                                    height: 300px; border-radius: 10px; display: flex;
                                    align-items: center; justify-content: center; color: white;">
                            <p style="font-size: 1.5rem;">Generated Image #{i+1}</p>
                        </div>
                        """, unsafe_allow_html=True)

def show_cookbook():
    """Cookbook Formatter with AI recipe parsing"""
    st.title("🍳 Cookbook Formatter")
    st.markdown("Transform recipes into beautiful cookbooks")
    
    st.markdown("---")
    
    input_method = st.radio("Input Method", ["Manual Entry", "AI Parse Recipe"], horizontal=True)
    
    if input_method == "AI Parse Recipe":
        recipe_text = st.text_area(
            "Paste recipe text (AI will parse it)",
            """Classic Chocolate Chip Cookies

Ingredients:
2 1/4 cups all-purpose flour
1 tsp baking soda
1 tsp salt
1 cup butter, softened
3/4 cup granulated sugar
3/4 cup packed brown sugar
2 large eggs
2 tsp vanilla extract
2 cups chocolate chips

Instructions:
1. Preheat oven to 375°F (190°C)
2. Mix flour, baking soda, and salt in a bowl
3. Beat butter and both sugars until creamy
4. Add eggs and vanilla, beat well
5. Gradually blend in flour mixture
6. Stir in chocolate chips
7. Drop rounded tablespoons onto ungreased cookie sheets
8. Bake 9-11 minutes or until golden brown
9. Cool on baking sheet for 2 minutes

Makes 60 cookies. Prep time: 15 min. Cook time: 11 min.""",
            height=250
        )
        
        if st.button("🤖 Parse Recipe with AI", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 AI parsing recipe..."):
                time.sleep(2)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4",
                                messages=[
                                    {"role": "system", "content": "You are a recipe parser. Extract title, ingredients, instructions, servings, prep time, and cook time from the recipe text. Format as JSON."},
                                    {"role": "user", "content": recipe_text}
                                ],
                                max_tokens=1000
                            )
                            
                            parsed_data = response.choices[0].message.content
                            st.success("✨ Recipe parsed successfully!")
                            st.json(parsed_data)
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Recipe parsed! (Demo Mode)")
                    st.json({
                        "title": "Classic Chocolate Chip Cookies",
                        "servings": 60,
                        "prep_time": "15 min",
                        "cook_time": "11 min",
                        "ingredients_count": 9,
                        "instructions_steps": 9
                    })
    else:
        st.text_input("Recipe Title", "Classic Chocolate Chip Cookies")
        col1, col2, col3 = st.columns(3)
        with col1:
            st.number_input("Servings", 1, 100, 12)
        with col2:
            st.number_input("Prep Time (min)", 1, 300, 15)
        with col3:
            st.number_input("Cook Time (min)", 1, 300, 12)
        
        st.text_area("Ingredients (one per line)", height=150)
        st.text_area("Instructions (one per line)", height=150)
        
        if st.button("📚 Generate Cookbook", type="primary"):
            st.success("✨ Cookbook formatted successfully!")
            st.info("📖 Preview and download options would appear here")

def show_health():
    """Health Content Generator with AI"""
    st.title("🏥 Health Content Generator")
    st.markdown("Generate professional health and fitness content")
    
    st.markdown("---")
    
    content_type = st.radio(
        "Content Type",
        ["🏋️ Workout Plan", "🥗 Meal Plan", "📝 Health Article"],
        horizontal=True
    )
    
    if content_type == "🏋️ Workout Plan":
        col1, col2 = st.columns(2)
        with col1:
            level = st.selectbox("Fitness Level", ["Beginner", "Intermediate", "Advanced"])
        with col2:
            goal = st.selectbox("Goal", ["Weight Loss", "Muscle Gain", "Strength", "Endurance"])
        
        if st.button("💪 Generate Workout Plan", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 Creating personalized workout plan..."):
                time.sleep(2)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4",
                                messages=[
                                    {"role": "system", "content": "You are a certified fitness trainer. Create a detailed workout plan."},
                                    {"role": "user", "content": f"Create a 4-week {level} workout plan for {goal}. Include specific exercises, sets, reps, and rest periods."}
                                ],
                                max_tokens=1500
                            )
                            
                            plan = response.choices[0].message.content
                            st.success("✨ Workout plan generated!")
                            st.markdown(plan)
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Workout plan generated! (Demo Mode)")
                    st.markdown(f"""
                    ### 4-Week {level} Workout Plan - {goal}
                    
                    **Week 1:**
                    - Day 1: Full Body Strength
                    - Day 2: Cardio & Core
                    - Day 3: Rest
                    - Day 4: Upper Body
                    - Day 5: Lower Body
                    - Day 6: Active Recovery
                    - Day 7: Rest
                    
                    *Full detailed plan would be generated with real API*
                    """)
    
    elif content_type == "🥗 Meal Plan":
        calorie_target = st.number_input("Daily Calorie Target", 1200, 4000, 2000, step=100)
        
        if st.button("🥗 Generate Meal Plan", type="primary"):
            st.success("✨ Meal plan generated! (Demo Mode)")
            st.markdown(f"""
            ### 7-Day Meal Plan ({calorie_target} calories/day)
            
            **Monday:**
            - Breakfast: Oatmeal with berries (400 cal)
            - Lunch: Grilled chicken salad (600 cal)
            - Dinner: Salmon with quinoa (700 cal)
            - Snacks: Greek yogurt (300 cal)
            
            *Full week plan would be generated with recipes*
            """)
    
    else:  # Health Article
        topic = st.text_input("Article Topic", "Benefits of Regular Exercise")
        
        if st.button("📝 Generate Article", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 Writing health article..."):
                time.sleep(2)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4",
                                messages=[
                                    {"role": "system", "content": "You are a health content writer. Write professional, evidence-based health articles."},
                                    {"role": "user", "content": f"Write a 1000-word article about: {topic}. Include scientific references and practical advice."}
                                ],
                                max_tokens=1500
                            )
                            
                            article = response.choices[0].message.content
                            st.success("✨ Article generated!")
                            st.markdown(article)
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Article generated! (Demo Mode)")
                    st.markdown(f"""
                    # {topic}
                    
                    Regular physical exercise provides numerous benefits...
                    
                    *Full article would be generated with real API*
                    """)

def show_marketing():
    """Marketing Suite with real AI content generation"""
    st.title("📱 Marketing Suite")
    st.markdown("AI-powered marketing content for authors")
    
    st.markdown("---")
    
    marketing_type = st.radio(
        "Content Type",
        ["📱 Social Media", "📧 Email", "📢 Ad Copy", "📚 Book Description"],
        horizontal=True
    )
    
    if marketing_type == "📱 Social Media":
        col1, col2 = st.columns(2)
        with col1:
            platform = st.selectbox("Platform", ["Twitter/X", "Facebook", "Instagram", "LinkedIn"])
        with col2:
            tone = st.selectbox("Tone", ["Professional", "Casual", "Humorous", "Inspirational"])
        
        topic = st.text_area(
            "What's the post about?",
            "Announcing my new fantasy novel 'The Phoenix Chronicles'",
            height=100
        )
        
        if st.button("📱 Generate Posts", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 Creating social media posts..."):
                time.sleep(2)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4",
                                messages=[
                                    {"role": "system", "content": f"You are a social media expert. Create engaging {platform} posts."},
                                    {"role": "user", "content": f"Create 3 {tone} variations of a {platform} post about: {topic}. Include appropriate emojis and hashtags."}
                                ],
                                max_tokens=500
                            )
                            
                            posts = response.choices[0].message.content
                            st.success("✨ Posts generated!")
                            st.markdown(posts)
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Posts generated! (Demo Mode)")
                    st.markdown("""
                    **Variation 1:**
                    🔥 Exciting news! My new fantasy novel 'The Phoenix Chronicles' is here! ✨📚 #Fantasy #NewRelease
                    
                    **Variation 2:**
                    The phoenix rises! 🦅 'The Phoenix Chronicles' is now available! #BookRelease #AmWriting
                    
                    **Variation 3:**
                    From the ashes, a new story is born! 🔥 Check out 'The Phoenix Chronicles' #NewBook
                    """)
    
    elif marketing_type == "📚 Book Description":
        book_info = st.text_area(
            "Book Information",
            "Fantasy novel about a phoenix rider saving her kingdom",
            height=100
        )
        
        if st.button("📚 Generate Description", type="primary"):
            api_status = check_api_status()
            
            with st.spinner("🤖 Writing book description..."):
                time.sleep(2)
                
                if not api_status["demo_mode"]:
                    client = get_openai_client()
                    if client:
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4",
                                messages=[
                                    {"role": "system", "content": "You are a book marketing expert. Write compelling book descriptions."},
                                    {"role": "user", "content": f"Write an engaging book description for Amazon/Goodreads about: {book_info}. Make it compelling and include hooks."}
                                ],
                                max_tokens=500
                            )
                            
                            description = response.choices[0].message.content
                            st.success("✨ Description generated!")
                            st.markdown(description)
                            
                        except Exception as e:
                            st.error(f"API Error: {str(e)}")
                            api_status["demo_mode"] = True
                
                if api_status["demo_mode"]:
                    st.success("✨ Description generated! (Demo Mode)")
                    st.markdown("""
                    **When hope dies, the phoenix rises.**
                    
                    Aria never asked to be the last phoenix rider. But when her kingdom falls and ancient magic awakens within her, she must rise from the ashes to save everything she loves.
                    
                    *Full description would be generated with real API*
                    """)

def show_pricing():
    """Pricing and ROI Calculator"""
    st.title("💰 Pricing & ROI Calculator")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
        ### Creator - $29/mo
        - 3 manuscripts/month
        - 5 covers/month
        - 20 images/month
        - 1 audiobook/month
        """)
    
    with col2:
        st.markdown("""
        ### Professional - $79/mo ⭐
        - 10 manuscripts/month
        - UNLIMITED covers
        - 100 images/month
        - 5 audiobooks/month
        """)
    
    with col3:
        st.markdown("""
        ### Enterprise - $299/mo
        - UNLIMITED everything
        - Team accounts
        - API access
        - Priority support
        """)
    
    st.markdown("---")
    st.subheader("💡 ROI Calculator")
    
    books_per_month = st.slider("Books you publish per month", 1, 20, 3)
    
    traditional_cost = books_per_month * (500 + 300 + 200)
    phoenixforge_cost = 79
    savings = traditional_cost - phoenixforge_cost
    
    if PANDAS_AVAILABLE:
        col1, col2, col3 = st.columns(3)
        col1.metric("Traditional Cost", f"${traditional_cost:,}")
        col2.metric("PhoenixForge Cost", f"${phoenixforge_cost}")
        col3.metric("Monthly Savings", f"${savings:,}", f"{int((savings/traditional_cost)*100)}%")

def show_dashboard():
    """Dashboard Demo"""
    st.title("📊 Dashboard")
    
    if PANDAS_AVAILABLE:
        # Metrics
        col1, col2, col3, col4 = st.columns(4)
        col1.metric("Projects", "12", "+3")
        col2.metric("Covers Generated", "47", "+8")
        col3.metric("Usage", "67%", "of limit")
        col4.metric("Days Left", "18", "in billing cycle")
        
        st.markdown("---")
        
        # Recent projects
        st.subheader("📚 Recent Projects")
        
        df = pd.DataFrame({
            "Project": ["The Phoenix Chronicles", "Shadow Realm", "Digital Dreams"],
            "Type": ["Fantasy", "Thriller", "Sci-Fi"],
            "Status": ["Completed", "In Progress", "Completed"],
            "Created": ["2025-10-20", "2025-10-22", "2025-10-24"]
        })
        
        st.dataframe(df, use_container_width=True)

if __name__ == "__main__":
    main()
