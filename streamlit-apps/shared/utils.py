"""
Rohimaya Publishing - Utilities Module
Common helper functions used across Streamlit apps
"""

import streamlit as st
from datetime import datetime
from pathlib import Path
import tempfile
from typing import Optional, Union
import io


def save_uploaded_file(uploaded_file) -> Optional[str]:
    """
    Save an uploaded file to a temporary location and return the path.

    Args:
        uploaded_file: Streamlit UploadedFile object

    Returns:
        str: Path to the saved file, or None if save failed
    """
    if uploaded_file is None:
        return None

    try:
        # Create temp directory if it doesn't exist
        temp_dir = Path(tempfile.gettempdir()) / "rohimaya_uploads"
        temp_dir.mkdir(exist_ok=True)

        # Generate unique filename
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_extension = Path(uploaded_file.name).suffix
        temp_file_path = temp_dir / f"{timestamp}_{uploaded_file.name}"

        # Save file
        with open(temp_file_path, "wb") as f:
            f.write(uploaded_file.getbuffer())

        return str(temp_file_path)

    except Exception as e:
        st.error(f"Error saving file: {str(e)}")
        return None


def export_to_docx(content: str, filename: str = "document.docx") -> bytes:
    """
    Export text content to a DOCX file and return as bytes.

    Args:
        content: Text content to export
        filename: Name for the exported file

    Returns:
        bytes: DOCX file content as bytes
    """
    try:
        from docx import Document
        from docx.shared import Pt, RGBColor
        from docx.enum.text import WD_ALIGN_PARAGRAPH
    except ImportError:
        st.error("python-docx package not installed. Run: `pip install python-docx`")
        return b""

    # Create document
    doc = Document()

    # Set default font
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)

    # Add content (split by paragraphs)
    paragraphs = content.split('\n\n')
    for para_text in paragraphs:
        if para_text.strip():
            p = doc.add_paragraph(para_text.strip())
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT

    # Save to bytes
    file_stream = io.BytesIO()
    doc.save(file_stream)
    file_stream.seek(0)

    return file_stream.getvalue()


def export_to_pdf(content: str, filename: str = "document.pdf") -> Optional[bytes]:
    """
    Export text content to a PDF file and return as bytes.

    Args:
        content: Text content to export
        filename: Name for the exported file

    Returns:
        bytes: PDF file content as bytes, or None if export failed
    """
    try:
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
    except ImportError:
        st.error("reportlab package not installed. Run: `pip install reportlab`")
        return None

    # Create PDF in memory
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    # Define styles
    styles = getSampleStyleSheet()
    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=16,
        alignment=0,  # Left align
    )

    # Build content
    story = []
    paragraphs = content.split('\n\n')

    for para_text in paragraphs:
        if para_text.strip():
            p = Paragraph(para_text.strip(), body_style)
            story.append(p)
            story.append(Spacer(1, 0.2 * inch))

    # Generate PDF
    doc.build(story)
    buffer.seek(0)

    return buffer.getvalue()


def format_timestamp(dt: Optional[datetime] = None, format_str: str = "%Y-%m-%d %H:%M:%S") -> str:
    """
    Format a datetime object as a string.

    Args:
        dt: Datetime object (defaults to current time)
        format_str: Format string for datetime

    Returns:
        str: Formatted datetime string
    """
    if dt is None:
        dt = datetime.now()

    return dt.strftime(format_str)


def truncate_text(text: str, max_length: int = 100, suffix: str = "...") -> str:
    """
    Truncate text to a maximum length, adding suffix if truncated.

    Args:
        text: Text to truncate
        max_length: Maximum length of returned text
        suffix: Suffix to add if text is truncated

    Returns:
        str: Truncated text
    """
    if len(text) <= max_length:
        return text

    return text[:max_length - len(suffix)] + suffix


def word_count(text: str) -> int:
    """
    Count words in text.

    Args:
        text: Text to count words in

    Returns:
        int: Number of words
    """
    return len(text.split())


def character_count(text: str, include_spaces: bool = True) -> int:
    """
    Count characters in text.

    Args:
        text: Text to count characters in
        include_spaces: Whether to include spaces in count

    Returns:
        int: Number of characters
    """
    if include_spaces:
        return len(text)
    return len(text.replace(" ", ""))


def estimate_reading_time(text: str, words_per_minute: int = 200) -> int:
    """
    Estimate reading time for text in minutes.

    Args:
        text: Text to estimate reading time for
        words_per_minute: Average reading speed

    Returns:
        int: Estimated reading time in minutes
    """
    words = word_count(text)
    minutes = words / words_per_minute
    return max(1, round(minutes))  # Minimum 1 minute


def display_text_stats(text: str):
    """
    Display statistics about the provided text in Streamlit columns.

    Args:
        text: Text to analyze
    """
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.metric("Words", f"{word_count(text):,}")

    with col2:
        st.metric("Characters", f"{character_count(text):,}")

    with col3:
        st.metric("Characters (no spaces)", f"{character_count(text, include_spaces=False):,}")

    with col4:
        st.metric("Est. Reading Time", f"{estimate_reading_time(text)} min")


def create_download_button(
    data: Union[str, bytes],
    filename: str,
    label: str = "Download",
    mime: str = "text/plain"
):
    """
    Create a styled download button for exporting content.

    Args:
        data: Content to download (string or bytes)
        filename: Name for the downloaded file
        label: Button label
        mime: MIME type of the file
    """
    st.download_button(
        label=f"⬇️ {label}",
        data=data,
        file_name=filename,
        mime=mime,
        help=f"Click to download {filename}"
    )


def display_success_animation(message: str = "Success!"):
    """
    Display a success message with animation.

    Args:
        message: Success message to display
    """
    st.success(message)
    st.balloons()


def clean_text(text: str) -> str:
    """
    Clean text by removing extra whitespace and formatting.

    Args:
        text: Text to clean

    Returns:
        str: Cleaned text
    """
    # Remove multiple spaces
    text = ' '.join(text.split())

    # Remove multiple newlines
    while '\n\n\n' in text:
        text = text.replace('\n\n\n', '\n\n')

    return text.strip()


def format_currency(amount: float, currency: str = "USD") -> str:
    """
    Format a number as currency.

    Args:
        amount: Amount to format
        currency: Currency code

    Returns:
        str: Formatted currency string
    """
    if currency == "USD":
        return f"${amount:,.2f}"
    elif currency == "EUR":
        return f"€{amount:,.2f}"
    elif currency == "GBP":
        return f"£{amount:,.2f}"
    else:
        return f"{currency} {amount:,.2f}"


def validate_email(email: str) -> bool:
    """
    Simple email validation.

    Args:
        email: Email address to validate

    Returns:
        bool: True if email appears valid
    """
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def create_sidebar_info(app_name: str, app_description: str):
    """
    Create a standard sidebar info section for Rohimaya apps.

    Args:
        app_name: Name of the app
        app_description: Description of what the app does
    """
    with st.sidebar:
        st.title(f"🦚 {app_name}")
        st.markdown(f"*{app_description}*")
        st.markdown("---")
        st.markdown("### About Rohimaya")
        st.markdown("""
        Rohimaya Publishing provides AI-powered tools to help authors write,
        format, publish, and market their books.

        **Where Stories Take Shape** 🦚🔥
        """)
        st.markdown("---")
        st.markdown("""
        <div style="text-align: center; font-size: 0.8rem; color: #7B9AA8;">
            <a href="https://rohimayapublishing.com" style="color: #4A9B9B; text-decoration: none;">Website</a> |
            <a href="https://github.com/HPagade/rohimaya-publishing-website" style="color: #4A9B9B; text-decoration: none;">GitHub</a> |
            <a href="mailto:support@rohimayapublishing.com" style="color: #4A9B9B; text-decoration: none;">Support</a>
        </div>
        """, unsafe_allow_html=True)
