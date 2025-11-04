"""
🦚 Rohimaya Publishing - AI Writing Assistant
Where Stories Take Shape
"""

import streamlit as st
from openai import OpenAI
import os

# ============================================================================
# PAGE CONFIG
# ============================================================================

st.set_page_config(
    page_title="AI Writing Assistant | Rohimaya Publishing",
    page_icon="🦚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# ============================================================================
# CUSTOM CSS - ROHIMAYA BRANDING
# ============================================================================

st.markdown("""
<style>
    /* Import fonts */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');

    /* Root variables - Rohimaya Brand Colors */
    :root {
        --phoenix-orange: #FF8C42;
        --phoenix-gold: #FFD700;
        --peacock-teal: #4A9B9B;
        --peacock-blue-gray: #7B9AA8;
        --deep-teal: #2F5F5F;
        --midnight-navy: #1A1A2E;
        --cream: #FFF8E7;
        --bronze: #B87333;
    }

    /* Main app background */
    .stApp {
        background-color: var(--cream);
        font-family: 'Inter', sans-serif;
    }

    /* Headers */
    h1, h2, h3 {
        font-family: 'Playfair Display', serif !important;
        color: var(--midnight-navy) !important;
    }

    /* Sidebar styling */
    section[data-testid="stSidebar"] {
        background: linear-gradient(180deg, var(--midnight-navy) 0%, var(--deep-teal) 100%);
    }

    section[data-testid="stSidebar"] * {
        color: var(--cream) !important;
    }

    /* Primary buttons */
    .stButton>button {
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold)) !important;
        color: var(--midnight-navy) !important;
        font-weight: 600 !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 12px 24px !important;
        font-family: 'Inter', sans-serif !important;
        transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    .stButton>button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(255, 140, 66, 0.4) !important;
    }

    /* Text areas */
    .stTextArea textarea {
        border: 2px solid var(--peacock-teal) !important;
        border-radius: 8px !important;
        font-family: 'Inter', sans-serif !important;
    }

    /* Select boxes */
    .stSelectbox {
        font-family: 'Inter', sans-serif !important;
    }

    /* Success/info boxes */
    .stSuccess {
        background-color: rgba(74, 155, 155, 0.1) !important;
        border-left: 4px solid var(--peacock-teal) !important;
    }

    /* Warning boxes */
    .stWarning {
        background-color: rgba(255, 140, 66, 0.1) !important;
        border-left: 4px solid var(--phoenix-orange) !important;
    }

    /* Divider */
    hr {
        border-color: var(--peacock-teal) !important;
        opacity: 0.3 !important;
    }
</style>
""", unsafe_allow_html=True)

# ============================================================================
# LOGO & HEADER
# ============================================================================

# Logo and branding
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    # Try to load logo, fall back gracefully if not found
    try:
        st.image("../../rohimaya-publishing-circle-logo.png", width=150)
    except:
        st.markdown("### 🦚🔥")

    st.markdown("<h1 style='text-align: center;'>AI Writing Assistant</h1>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: #4A9B9B; font-style: italic;'>Ascend • Flourish • Enlighten</p>", unsafe_allow_html=True)

st.markdown("---")

# ============================================================================
# OPENAI CLIENT SETUP
# ============================================================================

def get_openai_client():
    """Initialize OpenAI client with API key from secrets"""
    try:
        api_key = st.secrets["OPENAI_API_KEY"]
        return OpenAI(api_key=api_key)
    except Exception as e:
        st.error(f"⚠️ OpenAI API key not found. Please add it to Streamlit secrets. Error: {str(e)}")
        st.info("Go to: https://platform.openai.com/api-keys to get your API key")
        return None

# ============================================================================
# SIDEBAR - SETTINGS
# ============================================================================

st.sidebar.markdown("## ⚙️ Writing Settings")

# Genre selection
genre = st.sidebar.selectbox(
    "📚 Select Genre",
    [
        "Fantasy",
        "Romance",
        "Thriller/Suspense",
        "Science Fiction",
        "Mystery",
        "Historical Fiction",
        "Contemporary",
        "Horror",
        "Literary Fiction",
        "General"
    ]
)

# Tone selection
tone = st.sidebar.select_slider(
    "🎭 Writing Tone",
    options=["Lighthearted", "Balanced", "Serious", "Dark", "Intense"]
)

# Length preference
length_pref = st.sidebar.radio(
    "📏 Response Length",
    ["Brief", "Medium", "Detailed"]
)

# Temperature (creativity)
temperature = st.sidebar.slider(
    "🌡️ Creativity Level",
    min_value=0.0,
    max_value=1.0,
    value=0.7,
    step=0.1,
    help="Higher = more creative/varied, Lower = more focused/consistent"
)

st.sidebar.markdown("---")
st.sidebar.markdown("### 💡 Tips")
st.sidebar.info("""
**Pro Tips:**
- Paste your last few paragraphs for best context
- Be specific about what you need
- Try different creativity levels
- Use genre-specific mode for better results
""")

# ============================================================================
# MAIN APP - TAB INTERFACE
# ============================================================================

tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "✍️ Continue Writing",
    "📖 Expand Scene",
    "💬 Polish Dialogue",
    "🎨 Show Don't Tell",
    "⚡ Quick Actions"
])

# ============================================================================
# TAB 1: CONTINUE WRITING
# ============================================================================

with tab1:
    st.markdown("### ✍️ Continue Your Story")
    st.markdown("Paste your last few paragraphs and let AI continue the narrative in your style.")

    context_input = st.text_area(
        "Your Current Text (last 500-1000 words work best)",
        height=200,
        placeholder="Paste the last few paragraphs of your manuscript here...",
        key="continue_context"
    )

    col1, col2 = st.columns([3, 1])
    with col1:
        direction = st.text_input(
            "Direction (optional)",
            placeholder="e.g., 'The protagonist discovers a secret passage' or leave blank for AI to decide",
            key="continue_direction"
        )

    with col2:
        st.write("")
        st.write("")
        if st.button("✨ Continue Writing", use_container_width=True, key="continue_btn"):
            if not context_input:
                st.warning("Please paste some text to continue from!")
            else:
                client = get_openai_client()
                if client:
                    with st.spinner("✍️ Writing..."):
                        try:
                            # Build prompt
                            system_prompt = f"""You are a professional {genre} author with a masterful storytelling voice.
                            Continue the story naturally, matching the existing style and tone.
                            Tone: {tone}
                            Keep the narrative engaging and true to the {genre} genre."""

                            user_prompt = f"""Continue this story excerpt naturally:\n\n{context_input}"""
                            if direction:
                                user_prompt += f"\n\nDirection: {direction}"

                            # Length instruction
                            length_map = {
                                "Brief": "Write 2-3 paragraphs (200-300 words).",
                                "Medium": "Write 4-6 paragraphs (400-600 words).",
                                "Detailed": "Write 6-10 paragraphs (600-1000 words)."
                            }
                            user_prompt += f"\n\n{length_map[length_pref]}"

                            # Call OpenAI
                            response = client.chat.completions.create(
                                model="gpt-4-turbo-preview",
                                messages=[
                                    {"role": "system", "content": system_prompt},
                                    {"role": "user", "content": user_prompt}
                                ],
                                temperature=temperature,
                                max_tokens=1500
                            )

                            result = response.choices[0].message.content

                            st.success("✅ AI-generated continuation:")
                            st.markdown("---")
                            st.markdown(result)
                            st.markdown("---")

                            # Copy button
                            st.code(result, language=None)

                        except Exception as e:
                            st.error(f"Error generating text: {str(e)}")

# ============================================================================
# TAB 2: EXPAND SCENE
# ============================================================================

with tab2:
    st.markdown("### 📖 Expand a Scene")
    st.markdown("Turn a brief scene description into rich, detailed prose.")

    brief_scene = st.text_area(
        "Brief Scene Description",
        height=150,
        placeholder="e.g., 'Sarah enters the abandoned mansion. She hears a noise upstairs and investigates.'",
        key="expand_scene"
    )

    focus = st.multiselect(
        "What to emphasize:",
        ["Sensory Details", "Character Emotions", "Setting/Atmosphere", "Dialogue", "Action"],
        default=["Sensory Details", "Setting/Atmosphere"]
    )

    if st.button("🎨 Expand Scene", use_container_width=True, key="expand_btn"):
        if not brief_scene:
            st.warning("Please enter a scene to expand!")
        else:
            client = get_openai_client()
            if client:
                with st.spinner("🎨 Expanding scene..."):
                    try:
                        focus_str = ", ".join(focus)

                        system_prompt = f"""You are a {genre} author specializing in rich, immersive scene-writing.
                        Expand brief scenes into detailed, engaging prose.
                        Tone: {tone}
                        Focus on: {focus_str}"""

                        user_prompt = f"""Expand this brief scene into rich, detailed prose:\n\n{brief_scene}\n\n
                        Write {length_pref.lower()}-length prose ({"200-300" if length_pref == "Brief" else "400-600" if length_pref == "Medium" else "600-1000"} words)."""

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": user_prompt}
                            ],
                            temperature=temperature,
                            max_tokens=1500
                        )

                        result = response.choices[0].message.content

                        st.success("✅ Expanded scene:")
                        st.markdown("---")
                        st.markdown(result)
                        st.markdown("---")
                        st.code(result, language=None)

                    except Exception as e:
                        st.error(f"Error expanding scene: {str(e)}")

# ============================================================================
# TAB 3: POLISH DIALOGUE
# ============================================================================

with tab3:
    st.markdown("### 💬 Polish Dialogue")
    st.markdown("Make dialogue more natural, realistic, and character-appropriate.")

    raw_dialogue = st.text_area(
        "Your Dialogue (with character names)",
        height=200,
        placeholder="""Example:
SARAH: I think we should go back.
JAMES: No way. We came all this way.
SARAH: But it's getting dark.
JAMES: Don't be scared.""",
        key="polish_dialogue"
    )

    col1, col2 = st.columns(2)
    with col1:
        char_notes = st.text_input(
            "Character personality notes (optional)",
            placeholder="e.g., Sarah is timid, James is overconfident",
            key="char_notes"
        )

    with col2:
        st.write("")
        st.write("")
        if st.button("✨ Polish Dialogue", use_container_width=True, key="polish_btn"):
            if not raw_dialogue:
                st.warning("Please enter dialogue to polish!")
            else:
                client = get_openai_client()
                if client:
                    with st.spinner("💬 Polishing dialogue..."):
                        try:
                            system_prompt = f"""You are a {genre} dialogue expert.
                            Improve dialogue to be natural, engaging, and character-appropriate.
                            Add subtext, body language, and emotion.
                            Tone: {tone}"""

                            user_prompt = f"""Polish this dialogue:\n\n{raw_dialogue}"""
                            if char_notes:
                                user_prompt += f"\n\nCharacter notes: {char_notes}"
                            user_prompt += "\n\nMake it sound natural and add narrative beats."

                            response = client.chat.completions.create(
                                model="gpt-4-turbo-preview",
                                messages=[
                                    {"role": "system", "content": system_prompt},
                                    {"role": "user", "content": user_prompt}
                                ],
                                temperature=temperature,
                                max_tokens=1000
                            )

                            result = response.choices[0].message.content

                            st.success("✅ Polished dialogue:")
                            st.markdown("---")
                            st.markdown(result)
                            st.markdown("---")
                            st.code(result, language=None)

                        except Exception as e:
                            st.error(f"Error polishing dialogue: {str(e)}")

# ============================================================================
# TAB 4: SHOW DON'T TELL
# ============================================================================

with tab4:
    st.markdown("### 🎨 Show Don't Tell")
    st.markdown("Transform 'telling' statements into 'showing' prose with action and description.")

    telling_text = st.text_area(
        "Text to Transform",
        height=150,
        placeholder="e.g., 'She was nervous about the interview.'",
        key="show_dont_tell"
    )

    if st.button("🎭 Transform to Showing", use_container_width=True, key="show_btn"):
        if not telling_text:
            st.warning("Please enter text to transform!")
        else:
            client = get_openai_client()
            if client:
                with st.spinner("🎭 Transforming..."):
                    try:
                        system_prompt = f"""You are a {genre} writing coach specializing in 'show don't tell'.
                        Transform telling statements into showing prose with sensory details, actions, and reactions.
                        Tone: {tone}"""

                        user_prompt = f"""Transform this 'telling' into 'showing':\n\n{telling_text}\n\n
                        Use specific actions, sensory details, and character reactions. Write {"2-3" if length_pref == "Brief" else "3-5" if length_pref == "Medium" else "5-8"} sentences."""

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": user_prompt}
                            ],
                            temperature=temperature,
                            max_tokens=500
                        )

                        result = response.choices[0].message.content

                        col1, col2 = st.columns(2)
                        with col1:
                            st.markdown("**Before (Telling):**")
                            st.info(telling_text)
                        with col2:
                            st.markdown("**After (Showing):**")
                            st.success(result)

                        st.code(result, language=None)

                    except Exception as e:
                        st.error(f"Error transforming text: {str(e)}")

# ============================================================================
# TAB 5: QUICK ACTIONS
# ============================================================================

with tab5:
    st.markdown("### ⚡ Quick Writing Actions")

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### 📝 Quick Fixes")
        quick_text = st.text_area(
            "Your text:",
            height=150,
            key="quick_text"
        )

        action = st.selectbox(
            "Action:",
            [
                "Fix grammar & spelling",
                "Improve word choice",
                "Vary sentence structure",
                "Reduce passive voice",
                "Strengthen verbs",
                "Add more description"
            ]
        )

        if st.button("🔧 Apply Quick Fix", use_container_width=True):
            if not quick_text:
                st.warning("Please enter text!")
            else:
                client = get_openai_client()
                if client:
                    with st.spinner(f"Applying: {action}..."):
                        try:
                            system_prompt = f"You are a professional {genre} editor. Apply the requested improvement naturally."
                            user_prompt = f"Task: {action}\n\nText:\n{quick_text}\n\nProvide the improved version."

                            response = client.chat.completions.create(
                                model="gpt-4-turbo-preview",
                                messages=[
                                    {"role": "system", "content": system_prompt},
                                    {"role": "user", "content": user_prompt}
                                ],
                                temperature=0.3,  # Lower temp for editing
                                max_tokens=1000
                            )

                            result = response.choices[0].message.content
                            st.success("✅ Improved version:")
                            st.markdown(result)
                            st.code(result, language=None)

                        except Exception as e:
                            st.error(f"Error: {str(e)}")

    with col2:
        st.markdown("#### 💡 Writing Prompts")

        if st.button("✨ Generate Writing Prompt", use_container_width=True):
            client = get_openai_client()
            if client:
                with st.spinner("Generating prompt..."):
                    try:
                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[{
                                "role": "user",
                                "content": f"Generate a creative, specific writing prompt for {genre} fiction. Make it intriguing and actionable."
                            }],
                            temperature=0.9,
                            max_tokens=150
                        )
                        prompt = response.choices[0].message.content
                        st.success("💡 Writing Prompt:")
                        st.info(prompt)
                    except Exception as e:
                        st.error(f"Error: {str(e)}")

        st.markdown("#### 🎯 Brainstorm Ideas")
        concept = st.text_input("What do you need ideas for?", placeholder="e.g., character names, plot twists, settings")

        if st.button("🧠 Brainstorm", use_container_width=True):
            if not concept:
                st.warning("Please enter what you need ideas for!")
            else:
                client = get_openai_client()
                if client:
                    with st.spinner("Brainstorming..."):
                        try:
                            response = client.chat.completions.create(
                                model="gpt-4-turbo-preview",
                                messages=[{
                                    "role": "user",
                                    "content": f"Brainstorm 10 creative ideas for {genre} fiction: {concept}. Be specific and imaginative."
                                }],
                                temperature=0.9,
                                max_tokens=500
                            )
                            ideas = response.choices[0].message.content
                            st.success("🧠 Ideas:")
                            st.markdown(ideas)
                        except Exception as e:
                            st.error(f"Error: {str(e)}")

# ============================================================================
# FOOTER
# ============================================================================

st.markdown("---")
st.markdown("""
<div style='text-align: center; color: #4A9B9B;'>
    <p>Built with 🦚 by Rohimaya Publishing</p>
    <p style='font-size: 0.9em;'><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
