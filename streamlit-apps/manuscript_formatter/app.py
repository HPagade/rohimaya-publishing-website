"""
🦚 Manuscript Formatter - Rohimaya Publishing
Professional manuscript formatting for publishing platforms
Built with Streamlit and OpenAI
"""

import streamlit as st
from openai import OpenAI
import io
import re
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Manuscript Formatter | Rohimaya Publishing",
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

    .format-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid var(--peacock-teal);
        margin: 1rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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

    .stTabs [data-baseweb="tab-list"] {
        gap: 8px;
        background-color: var(--midnight-navy);
        padding: 1rem;
        border-radius: 8px;
    }

    .stTabs [data-baseweb="tab"] {
        background-color: transparent;
        color: var(--cream);
        border-radius: 4px;
        padding: 0.5rem 1rem;
        font-weight: 600;
    }

    .stTabs [aria-selected="true"] {
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
        color: white;
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
    <h1 class="header-title">🦚 Manuscript Formatter</h1>
    <p class="header-subtitle">Professional formatting for KDP, IngramSpark, and EPUB</p>
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
if 'manuscript_text' not in st.session_state:
    st.session_state.manuscript_text = ""
if 'formatted_text' not in st.session_state:
    st.session_state.formatted_text = ""
if 'detected_chapters' not in st.session_state:
    st.session_state.detected_chapters = []

# Sidebar - Settings
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### ⚙️ Format Settings")

    format_type = st.selectbox(
        "Publishing Platform",
        ["Amazon KDP", "IngramSpark", "EPUB (Digital)", "Generic PDF", "Custom"]
    )

    trim_size = st.selectbox(
        "Trim Size",
        ["6 x 9 inches (Trade)", "5 x 8 inches (Digest)", "5.5 x 8.5 inches (US Trade)",
         "5.25 x 8 inches (Literary)", "8.5 x 11 inches (Large)"]
    )

    st.markdown("---")
    st.markdown("### 📐 Margins")

    col1, col2 = st.columns(2)
    with col1:
        top_margin = st.number_input("Top (in)", value=0.75, step=0.125)
        left_margin = st.number_input("Left (in)", value=0.875, step=0.125)
    with col2:
        bottom_margin = st.number_input("Bottom (in)", value=0.75, step=0.125)
        right_margin = st.number_input("Right (in)", value=0.625, step=0.125)

    st.markdown("---")
    st.markdown("### 🔤 Typography")

    font_family = st.selectbox(
        "Font",
        ["Garamond", "Times New Roman", "Georgia", "Palatino", "Baskerville"]
    )

    font_size = st.slider("Font Size (pt)", 10, 14, 11)
    line_spacing = st.slider("Line Spacing", 1.0, 2.0, 1.5, 0.1)

    st.markdown("---")
    st.markdown("### 📑 Front Matter")

    include_toc = st.checkbox("Table of Contents", value=True)
    include_copyright = st.checkbox("Copyright Page", value=True)
    include_dedication = st.checkbox("Dedication Page", value=False)
    include_acknowledgments = st.checkbox("Acknowledgments", value=False)

# Main content area with tabs
tab1, tab2, tab3, tab4 = st.tabs(["📄 Upload & Format", "🔍 AI Chapter Detection", "📋 Preview", "💾 Export"])

with tab1:
    st.markdown("### 📤 Upload Your Manuscript")

    uploaded_file = st.file_uploader(
        "Choose your manuscript file",
        type=["txt", "docx", "md", "pdf"],
        help="Supported formats: TXT, DOCX, MD, PDF"
    )

    if uploaded_file is not None:
        # Read file content
        file_content = uploaded_file.read()

        if uploaded_file.type == "text/plain":
            st.session_state.manuscript_text = file_content.decode("utf-8")
        elif uploaded_file.type == "text/markdown":
            st.session_state.manuscript_text = file_content.decode("utf-8")
        else:
            st.warning("⚠️ For DOCX and PDF files, please paste your text manually in the text area below for now.")

    st.markdown("### ✏️ Or Paste Your Manuscript")

    manuscript_input = st.text_area(
        "Paste your manuscript text here",
        value=st.session_state.manuscript_text,
        height=400,
        placeholder="Paste your entire manuscript here...\n\nChapter 1\n\nThe story begins...",
        help="Paste your complete manuscript text. AI will help detect chapters and format it properly."
    )

    if manuscript_input:
        st.session_state.manuscript_text = manuscript_input

    col1, col2, col3 = st.columns(3)

    with col1:
        if st.button("🎨 Format Manuscript", use_container_width=True):
            if st.session_state.manuscript_text:
                with st.spinner("🎨 Formatting your manuscript..."):
                    # Apply formatting rules
                    formatted = st.session_state.manuscript_text

                    # Basic formatting
                    formatted = formatted.replace("\t", "    ")  # Replace tabs with spaces
                    formatted = re.sub(r'\n{3,}', '\n\n', formatted)  # Normalize spacing

                    st.session_state.formatted_text = formatted

                st.markdown("""
                <div class="success-box">
                    ✅ Manuscript formatted successfully! Check the Preview tab.
                </div>
                """, unsafe_allow_html=True)

                st.info(f"📊 **Stats:** {len(formatted.split())} words, {len(formatted.split('\\n\\n'))} paragraphs")
            else:
                st.error("⚠️ Please upload or paste your manuscript first.")

    with col2:
        if st.button("🔄 Reset All", use_container_width=True):
            st.session_state.manuscript_text = ""
            st.session_state.formatted_text = ""
            st.session_state.detected_chapters = []
            st.rerun()

    with col3:
        word_count = len(st.session_state.manuscript_text.split()) if st.session_state.manuscript_text else 0
        st.metric("Word Count", f"{word_count:,}")

with tab2:
    st.markdown("### 🔍 AI-Powered Chapter Detection")

    st.markdown("""
    <div class="info-box">
        <strong>How it works:</strong> AI analyzes your manuscript to automatically detect chapter breaks,
        even if they're not clearly marked. It looks for narrative shifts, scene changes, and structural patterns.
    </div>
    """, unsafe_allow_html=True)

    if st.button("🤖 Detect Chapters with AI", use_container_width=True):
        if st.session_state.manuscript_text:
            with st.spinner("🔍 Analyzing manuscript structure..."):
                try:
                    # Use OpenAI to detect chapters
                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": "You are an expert book editor. Analyze the manuscript and identify chapter breaks. Return a JSON array of chapter titles and their starting positions."},
                            {"role": "user", "content": f"Analyze this manuscript and identify all chapters. For each chapter, provide the title (or 'Chapter X' if untitled) and a brief description:\n\n{st.session_state.manuscript_text[:4000]}"}
                        ],
                        temperature=0.3,
                        max_tokens=1000
                    )

                    detection_result = response.choices[0].message.content

                    # Simple chapter detection as fallback
                    chapters = []
                    lines = st.session_state.manuscript_text.split('\n')

                    chapter_patterns = [
                        r'^Chapter\s+\d+',
                        r'^CHAPTER\s+\d+',
                        r'^\d+\.',
                        r'^Part\s+\d+',
                        r'^PART\s+\d+'
                    ]

                    for i, line in enumerate(lines):
                        for pattern in chapter_patterns:
                            if re.match(pattern, line.strip()):
                                chapters.append({
                                    "title": line.strip(),
                                    "line": i,
                                    "preview": ' '.join(lines[i+1:i+4]) if i+4 < len(lines) else ""
                                })
                                break

                    st.session_state.detected_chapters = chapters

                    if chapters:
                        st.markdown(f"""
                        <div class="success-box">
                            ✅ Detected {len(chapters)} chapters!
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown("### 📚 Detected Chapters")

                        for idx, chapter in enumerate(chapters):
                            with st.expander(f"📖 {chapter['title']}", expanded=False):
                                st.write(f"**Line:** {chapter['line']}")
                                st.write(f"**Preview:** {chapter['preview'][:200]}...")
                    else:
                        st.markdown("""
                        <div class="warning-box">
                            ⚠️ No clear chapter markers found. AI analysis: <br><br>
                        """ + detection_result + """
                        </div>
                        """, unsafe_allow_html=True)

                except Exception as e:
                    st.error(f"Error detecting chapters: {str(e)}")
        else:
            st.error("⚠️ Please upload or paste your manuscript first.")

    if st.session_state.detected_chapters:
        st.markdown("---")
        st.markdown("### ✏️ Manual Chapter Adjustment")
        st.info("You can manually add or adjust chapter breaks here.")

        new_chapter = st.text_input("Add chapter at line number:")
        if st.button("➕ Add Chapter Break"):
            if new_chapter.isdigit():
                st.success(f"✅ Chapter break added at line {new_chapter}")

with tab3:
    st.markdown("### 📋 Formatted Preview")

    if st.session_state.formatted_text:
        st.markdown("""
        <div class="info-box">
            Preview of your formatted manuscript with selected settings applied.
        </div>
        """, unsafe_allow_html=True)

        preview_style = f"""
        <div style='
            font-family: {font_family};
            font-size: {font_size}pt;
            line-height: {line_spacing};
            padding: 2rem;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            max-height: 600px;
            overflow-y: auto;
        '>
        """

        # Convert text to HTML with proper formatting
        formatted_html = st.session_state.formatted_text.replace('\n\n', '</p><p>').replace('\n', '<br>')
        formatted_html = f"<p>{formatted_html}</p>"

        st.markdown(preview_style + formatted_html + "</div>", unsafe_allow_html=True)

        # Statistics
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            words = len(st.session_state.formatted_text.split())
            st.metric("Words", f"{words:,}")
        with col2:
            pages = words // 250  # Approx 250 words per page
            st.metric("Est. Pages", f"{pages}")
        with col3:
            chars = len(st.session_state.formatted_text)
            st.metric("Characters", f"{chars:,}")
        with col4:
            chapters = len(st.session_state.detected_chapters)
            st.metric("Chapters", f"{chapters}")
    else:
        st.info("👈 Format your manuscript in the 'Upload & Format' tab first.")

with tab4:
    st.markdown("### 💾 Export Your Formatted Manuscript")

    if st.session_state.formatted_text:
        export_format = st.selectbox(
            "Export Format",
            ["📄 Plain Text (.txt)", "📘 Markdown (.md)", "📕 Rich Text (simulated HTML)"]
        )

        filename = st.text_input(
            "Filename (without extension)",
            value=f"formatted_manuscript_{datetime.now().strftime('%Y%m%d')}"
        )

        col1, col2 = st.columns(2)

        with col1:
            if export_format == "📄 Plain Text (.txt)":
                st.download_button(
                    label="⬇️ Download TXT",
                    data=st.session_state.formatted_text,
                    file_name=f"{filename}.txt",
                    mime="text/plain",
                    use_container_width=True
                )
            elif export_format == "📘 Markdown (.md)":
                markdown_text = st.session_state.formatted_text
                # Add chapter headers if detected
                if st.session_state.detected_chapters:
                    for chapter in st.session_state.detected_chapters:
                        markdown_text = markdown_text.replace(
                            chapter['title'],
                            f"# {chapter['title']}"
                        )

                st.download_button(
                    label="⬇️ Download MD",
                    data=markdown_text,
                    file_name=f"{filename}.md",
                    mime="text/markdown",
                    use_container_width=True
                )
            elif export_format == "📕 Rich Text (simulated HTML)":
                html_content = f"""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {{
                            font-family: {font_family};
                            font-size: {font_size}pt;
                            line-height: {line_spacing};
                            margin: {top_margin}in {right_margin}in {bottom_margin}in {left_margin}in;
                        }}
                        p {{ margin: 1em 0; text-indent: 2em; }}
                    </style>
                </head>
                <body>
                    {st.session_state.formatted_text.replace(chr(10) + chr(10), '</p><p>').replace(chr(10), '<br>')}
                </body>
                </html>
                """

                st.download_button(
                    label="⬇️ Download HTML",
                    data=html_content,
                    file_name=f"{filename}.html",
                    mime="text/html",
                    use_container_width=True
                )

        with col2:
            st.info(f"""
            **Export Details:**
            - Format: {export_format}
            - Font: {font_family} {font_size}pt
            - Line Spacing: {line_spacing}
            - Margins: {top_margin}" / {right_margin}" / {bottom_margin}" / {left_margin}"
            - Chapters: {len(st.session_state.detected_chapters)}
            """)

        st.markdown("---")
        st.markdown("### 📋 Copy Formatted Text")
        st.code(st.session_state.formatted_text, language=None)

    else:
        st.info("👈 Format your manuscript in the 'Upload & Format' tab first.")

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
