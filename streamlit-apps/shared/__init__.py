"""
Rohimaya Publishing - Shared Utilities for Streamlit Apps
Common functionality used across all 7 Streamlit applications
"""

from .branding import (
    apply_rohimaya_styling,
    get_rohimaya_colors,
    setup_page_config,
    display_logo_header
)

from .api_helpers import (
    get_openai_client,
    get_anthropic_client,
    get_elevenlabs_client,
    handle_api_error
)

from .utils import (
    save_uploaded_file,
    export_to_docx,
    export_to_pdf,
    format_timestamp,
    truncate_text
)

__all__ = [
    # Branding
    'apply_rohimaya_styling',
    'get_rohimaya_colors',
    'setup_page_config',
    'display_logo_header',
    # API Helpers
    'get_openai_client',
    'get_anthropic_client',
    'get_elevenlabs_client',
    'handle_api_error',
    # Utils
    'save_uploaded_file',
    'export_to_docx',
    'export_to_pdf',
    'format_timestamp',
    'truncate_text',
]
