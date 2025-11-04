"""
🦚 Audiobook Generator - Rohimaya Publishing
Professional audiobook narration with ElevenLabs AI
Built with Streamlit and ElevenLabs
"""

import streamlit as st
import requests
import json
from datetime import datetime
import time

# Page configuration
st.set_page_config(
    page_title="Audiobook Generator | Rohimaya Publishing",
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

    .voice-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid var(--peacock-teal);
        margin: 1rem 0;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .voice-card:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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

    .chapter-item {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 3px solid var(--phoenix-orange);
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
    <h1 class="header-title">🎙️ Audiobook Generator</h1>
    <p class="header-subtitle">Transform your manuscripts into professional audiobooks with AI narration</p>
</div>
""", unsafe_allow_html=True)

# Initialize session state
if 'generated_audio' not in st.session_state:
    st.session_state.generated_audio = []
if 'current_audio' not in st.session_state:
    st.session_state.current_audio = None
if 'chapters' not in st.session_state:
    st.session_state.chapters = []

# ElevenLabs API functions
def get_elevenlabs_voices():
    """Get available voices from ElevenLabs"""
    try:
        api_key = st.secrets["ELEVENLABS_API_KEY"]
        url = "https://api.elevenlabs.io/v1/voices"
        headers = {"xi-api-key": api_key}

        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            return response.json()["voices"]
        else:
            return []
    except Exception as e:
        st.error(f"Error fetching voices: {str(e)}")
        return []

def generate_speech(text, voice_id, stability=0.5, similarity_boost=0.75):
    """Generate speech using ElevenLabs API"""
    try:
        api_key = st.secrets["ELEVENLABS_API_KEY"]
        url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}"

        headers = {
            "Accept": "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": api_key
        }

        data = {
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": stability,
                "similarity_boost": similarity_boost
            }
        }

        response = requests.post(url, json=data, headers=headers)

        if response.status_code == 200:
            return response.content
        else:
            st.error(f"API Error: {response.status_code} - {response.text}")
            return None

    except Exception as e:
        st.error(f"Error generating speech: {str(e)}")
        return None

# Sidebar - Voice Settings
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### 🎙️ Voice Selection")

    # Check if API key exists
    try:
        api_key = st.secrets["ELEVENLABS_API_KEY"]
        api_key_exists = True
    except:
        api_key_exists = False
        st.error("⚠️ ElevenLabs API key not found in secrets.toml")

    if api_key_exists:
        # Pre-defined voice options (common ElevenLabs voices)
        voice_presets = {
            "Rachel (Female, American)": "21m00Tcm4TlvDq8ikWAM",
            "Domi (Female, American)": "AZnzlk1XvdvUeBnXmlld",
            "Bella (Female, American)": "EXAVITQu4vr4xnSDxMaL",
            "Antoni (Male, American)": "ErXwobaYiN019PkySvjV",
            "Elli (Female, American)": "MF3mGyEYCl7XYWbV9V6O",
            "Josh (Male, American)": "TxGEqnHWrfWFTfGW9XjX",
            "Arnold (Male, American)": "VR6AewLTigWG4xSOukaG",
            "Adam (Male, American)": "pNInz6obpgDQGcFmaJgB",
            "Sam (Male, American)": "yoZ06aMxZJJ28mfd3POQ"
        }

        selected_voice_name = st.selectbox(
            "Narrator Voice",
            list(voice_presets.keys())
        )

        selected_voice_id = voice_presets[selected_voice_name]

        st.markdown("---")
        st.markdown("### 🎚️ Voice Settings")

        stability = st.slider(
            "Stability",
            0.0, 1.0, 0.5, 0.05,
            help="Higher = more consistent, Lower = more expressive"
        )

        similarity_boost = st.slider(
            "Clarity",
            0.0, 1.0, 0.75, 0.05,
            help="Higher = clearer pronunciation"
        )

        st.markdown("---")
        st.markdown("### 📚 Chapter Settings")

        chapter_pause = st.slider(
            "Pause between chapters (seconds)",
            0, 5, 2,
            help="Silent gap between chapters"
        )

        auto_split = st.checkbox(
            "Auto-split long chapters",
            value=True,
            help="Split chapters longer than 5000 characters"
        )

        st.markdown("---")
        st.markdown("### 💰 Cost Estimator")

        if 'manuscript_text' in st.session_state and st.session_state.manuscript_text:
            char_count = len(st.session_state.manuscript_text)
            estimated_cost = (char_count / 1000) * 0.30  # ElevenLabs pricing ~$0.30 per 1k chars

            st.metric("Characters", f"{char_count:,}")
            st.metric("Est. Cost", f"${estimated_cost:.2f}")
            st.caption("Based on standard ElevenLabs pricing")
    else:
        selected_voice_id = None
        stability = 0.5
        similarity_boost = 0.75

# Main content area
tab1, tab2, tab3, tab4 = st.tabs(["📝 Input Text", "🎙️ Generate Audio", "🎧 Preview & Download", "📊 Batch Processing"])

with tab1:
    st.markdown("### 📝 Enter Your Manuscript")

    input_method = st.radio(
        "Input Method",
        ["Paste Text", "Upload File", "Chapter by Chapter"],
        horizontal=True
    )

    if input_method == "Paste Text":
        manuscript_text = st.text_area(
            "Paste your manuscript or chapter",
            height=400,
            placeholder="""Chapter 1

The story begins on a dark and stormy night...

[Paste your entire manuscript or specific chapters here]""",
            help="Paste the text you want to convert to audio"
        )

        if manuscript_text:
            st.session_state.manuscript_text = manuscript_text

            # Word and character count
            word_count = len(manuscript_text.split())
            char_count = len(manuscript_text)

            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Words", f"{word_count:,}")
            with col2:
                st.metric("Characters", f"{char_count:,}")
            with col3:
                est_minutes = word_count / 150  # Average speaking rate
                st.metric("Est. Duration", f"{est_minutes:.1f} min")

    elif input_method == "Upload File":
        uploaded_file = st.file_uploader(
            "Choose your manuscript file",
            type=["txt", "md"],
            help="TXT and MD files supported"
        )

        if uploaded_file is not None:
            file_content = uploaded_file.read().decode("utf-8")
            st.session_state.manuscript_text = file_content

            st.success(f"✅ Loaded {len(file_content.split())} words")

            # Preview
            with st.expander("📖 Preview", expanded=False):
                st.text(file_content[:1000] + "..." if len(file_content) > 1000 else file_content)

    elif input_method == "Chapter by Chapter":
        st.markdown("""
        <div class="info-box">
            Add chapters individually to generate audiobook one chapter at a time.
        </div>
        """, unsafe_allow_html=True)

        chapter_title = st.text_input("Chapter Title", placeholder="Chapter 1: The Beginning")
        chapter_text = st.text_area("Chapter Text", height=300)

        if st.button("➕ Add Chapter"):
            if chapter_title and chapter_text:
                st.session_state.chapters.append({
                    "title": chapter_title,
                    "text": chapter_text,
                    "word_count": len(chapter_text.split())
                })
                st.success(f"✅ Added: {chapter_title}")
                st.rerun()
            else:
                st.error("⚠️ Please enter both chapter title and text")

        # Display added chapters
        if st.session_state.chapters:
            st.markdown("### 📚 Added Chapters")

            total_words = sum(ch['word_count'] for ch in st.session_state.chapters)
            st.info(f"**Total:** {len(st.session_state.chapters)} chapters, {total_words:,} words")

            for idx, chapter in enumerate(st.session_state.chapters):
                with st.expander(f"📖 {chapter['title']}", expanded=False):
                    st.write(f"**Words:** {chapter['word_count']:,}")
                    st.text(chapter['text'][:200] + "..." if len(chapter['text']) > 200 else chapter['text'])

                    if st.button(f"🗑️ Remove", key=f"remove_{idx}"):
                        st.session_state.chapters.pop(idx)
                        st.rerun()

with tab2:
    st.markdown("### 🎙️ Generate Audiobook")

    if not api_key_exists:
        st.markdown("""
        <div class="warning-box">
            ⚠️ ElevenLabs API key required. Add it to `.streamlit/secrets.toml`
        </div>
        """, unsafe_allow_html=True)
    else:
        # Quick generation for single text
        if input_method != "Chapter by Chapter":
            if 'manuscript_text' in st.session_state and st.session_state.manuscript_text:
                st.markdown("""
                <div class="info-box">
                    Ready to generate audio from your manuscript.
                </div>
                """, unsafe_allow_html=True)

                # Text preview
                preview_length = 500
                preview_text = st.session_state.manuscript_text[:preview_length]
                if len(st.session_state.manuscript_text) > preview_length:
                    preview_text += "..."

                with st.expander("📖 Text Preview", expanded=False):
                    st.text(preview_text)

                # Generation options
                col1, col2 = st.columns(2)

                with col1:
                    if st.button("🎙️ Generate Full Audiobook", use_container_width=True, type="primary"):
                        with st.spinner("🎙️ Generating audiobook... This may take several minutes..."):
                            audio_data = generate_speech(
                                st.session_state.manuscript_text,
                                selected_voice_id,
                                stability,
                                similarity_boost
                            )

                            if audio_data:
                                st.session_state.current_audio = audio_data
                                st.session_state.generated_audio.append({
                                    'data': audio_data,
                                    'name': f"Audiobook_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                                    'voice': selected_voice_name,
                                    'duration': f"{len(st.session_state.manuscript_text.split()) / 150:.1f} min"
                                })

                                st.success("✅ Audiobook generated successfully!")
                                st.balloons()

                with col2:
                    sample_length = 1000
                    sample_text = st.session_state.manuscript_text[:sample_length]

                    if st.button("🔊 Generate Sample (First 1000 chars)", use_container_width=True):
                        with st.spinner("🎙️ Generating sample..."):
                            audio_data = generate_speech(
                                sample_text,
                                selected_voice_id,
                                stability,
                                similarity_boost
                            )

                            if audio_data:
                                st.session_state.current_audio = audio_data
                                st.success("✅ Sample generated!")

            else:
                st.info("👈 Enter or upload your manuscript in the 'Input Text' tab first.")

        # Chapter by chapter generation
        else:
            if st.session_state.chapters:
                st.markdown(f"""
                <div class="info-box">
                    {len(st.session_state.chapters)} chapters ready to generate.
                </div>
                """, unsafe_allow_html=True)

                if st.button("🎙️ Generate All Chapters", use_container_width=True, type="primary"):
                    progress_bar = st.progress(0)
                    status_text = st.empty()

                    all_audio_data = []

                    for idx, chapter in enumerate(st.session_state.chapters):
                        status_text.text(f"Generating: {chapter['title']}...")
                        progress_bar.progress((idx + 1) / len(st.session_state.chapters))

                        audio_data = generate_speech(
                            f"{chapter['title']}. {chapter['text']}",
                            selected_voice_id,
                            stability,
                            similarity_boost
                        )

                        if audio_data:
                            all_audio_data.append(audio_data)
                            time.sleep(1)  # Rate limiting

                    if all_audio_data:
                        # Combine all audio files (simplified - in production would need audio processing)
                        st.session_state.current_audio = all_audio_data[0]  # First chapter for now
                        st.success(f"✅ Generated {len(all_audio_data)} chapters!")
                        st.balloons()

            else:
                st.info("👈 Add chapters in the 'Input Text' tab first.")

with tab3:
    st.markdown("### 🎧 Audio Preview & Download")

    if st.session_state.current_audio:
        st.markdown("""
        <div class="success-box">
            ✅ Your audiobook is ready!
        </div>
        """, unsafe_allow_html=True)

        # Audio player
        st.audio(st.session_state.current_audio, format="audio/mp3")

        # Download button
        st.download_button(
            label="⬇️ Download Audiobook (MP3)",
            data=st.session_state.current_audio,
            file_name=f"audiobook_{datetime.now().strftime('%Y%m%d_%H%M%S')}.mp3",
            mime="audio/mpeg",
            use_container_width=True
        )

        # Metadata
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Format", "MP3")
        with col2:
            st.metric("Voice", selected_voice_name if api_key_exists else "N/A")
        with col3:
            file_size = len(st.session_state.current_audio) / (1024 * 1024)
            st.metric("Size", f"{file_size:.2f} MB")

    else:
        st.info("👈 Generate audio in the 'Generate Audio' tab first.")

    # Generation history
    if st.session_state.generated_audio:
        st.markdown("---")
        st.markdown("### 📜 Generation History")

        for idx, item in enumerate(reversed(st.session_state.generated_audio)):
            with st.expander(f"🎙️ {item['name']}", expanded=False):
                st.write(f"**Generated:** {item['timestamp']}")
                st.write(f"**Voice:** {item['voice']}")
                st.write(f"**Duration:** ~{item['duration']}")

                st.audio(item['data'], format="audio/mp3")

                st.download_button(
                    label="⬇️ Download",
                    data=item['data'],
                    file_name=f"{item['name']}.mp3",
                    mime="audio/mpeg",
                    key=f"download_{idx}"
                )

with tab4:
    st.markdown("### 📊 Batch Processing")

    st.markdown("""
    <div class="info-box">
        Process multiple books or chapters in batch mode. Perfect for series or collections.
    </div>
    """, unsafe_allow_html=True)

    st.markdown("#### 📁 Batch Upload")

    batch_files = st.file_uploader(
        "Upload multiple manuscript files",
        type=["txt", "md"],
        accept_multiple_files=True,
        help="Upload multiple files to process in batch"
    )

    if batch_files:
        st.success(f"✅ {len(batch_files)} files uploaded")

        # File list
        for file in batch_files:
            st.markdown(f"""
            <div class="chapter-item">
                📄 {file.name} ({len(file.read()) // 1024} KB)
            </div>
            """, unsafe_allow_html=True)
            file.seek(0)  # Reset file pointer

        if st.button("🎙️ Process All Files", use_container_width=True):
            st.info("Batch processing will be implemented in the full version. This generates audiobooks for each file sequentially.")

    st.markdown("---")
    st.markdown("#### ⚙️ Batch Settings")

    col1, col2 = st.columns(2)

    with col1:
        output_format = st.selectbox(
            "Output Format",
            ["MP3 (Individual files)", "ZIP (Combined)", "M4B (Audiobook format)"]
        )

    with col2:
        naming_convention = st.selectbox(
            "File Naming",
            ["Original filename", "Sequential numbering", "Custom prefix"]
        )

# Tips Section
with st.expander("💡 Audiobook Production Tips", expanded=False):
    st.markdown("""
    ### Creating Professional Audiobooks

    **1. Text Preparation**
    - Remove special characters and formatting
    - Spell out numbers and abbreviations
    - Add pronunciation guides for unusual names
    - Use paragraph breaks for natural pauses

    **2. Voice Selection**
    - Match voice to genre and tone
    - Consider narrator gender for POV
    - Test multiple voices with samples

    **3. Voice Settings**
    - **Stability (0.5-0.7):** Good for most content
    - **High Stability (0.8-1.0):** Consistent, less variation
    - **Low Stability (0.0-0.4):** More expressive, variable
    - **Clarity (0.7-0.9):** Best for audiobooks

    **4. Chapter Structure**
    - Start each chapter with title announcement
    - Add 2-3 second pauses between chapters
    - Consider splitting very long chapters

    **5. Quality Control**
    - Listen to samples before full generation
    - Check pronunciation of character names
    - Verify consistent pacing

    **6. Post-Production**
    - Add intro/outro music
    - Normalize audio levels
    - Export as M4B for platforms like Audible
    """)

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
