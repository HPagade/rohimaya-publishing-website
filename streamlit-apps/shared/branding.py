"""
Rohimaya Publishing - Branding & Styling Module
Consistent branding across all Streamlit apps
"""

import streamlit as st


def get_rohimaya_colors():
    """
    Returns the official Rohimaya Publishing color palette.

    Returns:
        dict: Color palette with hex codes
    """
    return {
        'phoenix_orange': '#FF8C42',
        'phoenix_gold': '#FFD700',
        'peacock_teal': '#4A9B9B',
        'peacock_blue_gray': '#7B9AA8',
        'deep_teal': '#2F5F5F',
        'midnight_navy': '#1A1A2E',
        'cream': '#FFF8E7',
        'bronze': '#B87333',
    }


def setup_page_config(page_title: str, page_icon: str = "🦚", layout: str = "wide"):
    """
    Set up consistent page configuration for all Rohimaya apps.

    Args:
        page_title: Title to display in browser tab
        page_icon: Emoji or icon for the page
        layout: Layout mode ('wide' or 'centered')
    """
    st.set_page_config(
        page_title=f"{page_title} | Rohimaya Publishing",
        page_icon=page_icon,
        layout=layout,
        initial_sidebar_state="expanded",
        menu_items={
            'Get Help': 'https://rohimayapublishing.com/support',
            'Report a bug': 'https://github.com/HPagade/rohimaya-publishing-website/issues',
            'About': '# Rohimaya Publishing\nWhere Stories Take Shape 🦚🔥'
        }
    )


def apply_rohimaya_styling():
    """
    Apply consistent Rohimaya Publishing CSS styling to the Streamlit app.
    This includes fonts, colors, button styles, and component styling.
    """
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

        h1 {
            font-size: 3rem !important;
            margin-bottom: 0.5rem !important;
        }

        /* Sidebar styling */
        section[data-testid="stSidebar"] {
            background: linear-gradient(180deg, var(--midnight-navy) 0%, var(--deep-teal) 100%);
        }

        section[data-testid="stSidebar"] * {
            color: var(--cream) !important;
        }

        section[data-testid="stSidebar"] h1,
        section[data-testid="stSidebar"] h2,
        section[data-testid="stSidebar"] h3 {
            color: var(--phoenix-gold) !important;
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
            background-color: white !important;
        }

        .stTextArea textarea:focus {
            border-color: var(--phoenix-orange) !important;
            box-shadow: 0 0 0 2px rgba(255, 140, 66, 0.2) !important;
        }

        /* Text inputs */
        .stTextInput input {
            border: 2px solid var(--peacock-teal) !important;
            border-radius: 8px !important;
            font-family: 'Inter', sans-serif !important;
        }

        .stTextInput input:focus {
            border-color: var(--phoenix-orange) !important;
            box-shadow: 0 0 0 2px rgba(255, 140, 66, 0.2) !important;
        }

        /* Select boxes */
        .stSelectbox {
            font-family: 'Inter', sans-serif !important;
        }

        /* Number inputs */
        .stNumberInput input {
            border: 2px solid var(--peacock-teal) !important;
            border-radius: 8px !important;
        }

        /* Sliders */
        .stSlider {
            font-family: 'Inter', sans-serif !important;
        }

        /* File uploader */
        .stFileUploader {
            border: 2px dashed var(--peacock-teal) !important;
            border-radius: 10px !important;
            padding: 20px !important;
        }

        /* Success/info boxes */
        .stSuccess {
            background-color: rgba(74, 155, 155, 0.1) !important;
            border-left: 4px solid var(--peacock-teal) !important;
            border-radius: 5px !important;
            font-family: 'Inter', sans-serif !important;
        }

        /* Warning boxes */
        .stWarning {
            background-color: rgba(255, 140, 66, 0.1) !important;
            border-left: 4px solid var(--phoenix-orange) !important;
            border-radius: 5px !important;
            font-family: 'Inter', sans-serif !important;
        }

        /* Error boxes */
        .stError {
            background-color: rgba(220, 38, 38, 0.1) !important;
            border-left: 4px solid #DC2626 !important;
            border-radius: 5px !important;
            font-family: 'Inter', sans-serif !important;
        }

        /* Info boxes */
        .stInfo {
            background-color: rgba(123, 154, 168, 0.1) !important;
            border-left: 4px solid var(--peacock-blue-gray) !important;
            border-radius: 5px !important;
            font-family: 'Inter', sans-serif !important;
        }

        /* Expander */
        .streamlit-expanderHeader {
            background-color: rgba(74, 155, 155, 0.1) !important;
            border-radius: 8px !important;
            font-family: 'Inter', sans-serif !important;
            color: var(--midnight-navy) !important;
        }

        /* Tabs */
        .stTabs [data-baseweb="tab-list"] {
            gap: 8px;
        }

        .stTabs [data-baseweb="tab"] {
            border-radius: 8px 8px 0 0;
            padding: 10px 20px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            background-color: white;
            color: var(--midnight-navy);
        }

        .stTabs [data-baseweb="tab"]:hover {
            background-color: rgba(74, 155, 155, 0.1);
        }

        .stTabs [aria-selected="true"] {
            background-color: var(--peacock-teal) !important;
            color: white !important;
        }

        /* Columns */
        .stColumn {
            padding: 10px;
        }

        /* Divider */
        hr {
            border: none;
            height: 2px;
            background: linear-gradient(90deg, var(--phoenix-orange), var(--peacock-teal));
            margin: 2rem 0;
        }

        /* Code blocks */
        code {
            background-color: rgba(26, 26, 46, 0.05) !important;
            color: var(--midnight-navy) !important;
            padding: 2px 6px !important;
            border-radius: 4px !important;
            font-family: 'Fira Code', monospace !important;
        }

        /* Progress bars */
        .stProgress > div > div {
            background: linear-gradient(90deg, var(--phoenix-orange), var(--peacock-teal)) !important;
        }

        /* Metric styling */
        [data-testid="stMetricValue"] {
            font-family: 'Playfair Display', serif !important;
            color: var(--midnight-navy) !important;
        }

        /* Download button */
        .stDownloadButton>button {
            background: linear-gradient(135deg, var(--peacock-teal), var(--peacock-blue-gray)) !important;
            color: white !important;
            font-weight: 600 !important;
            border: none !important;
            border-radius: 10px !important;
            padding: 12px 24px !important;
        }

        .stDownloadButton>button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(74, 155, 155, 0.4) !important;
        }

        /* Spinner */
        .stSpinner > div {
            border-top-color: var(--phoenix-orange) !important;
        }

        /* Checkbox */
        .stCheckbox {
            font-family: 'Inter', sans-serif !important;
        }

        /* Radio buttons */
        .stRadio {
            font-family: 'Inter', sans-serif !important;
        }

        /* Data frames */
        .dataframe {
            font-family: 'Inter', sans-serif !important;
            border: 2px solid var(--peacock-teal) !important;
            border-radius: 8px !important;
        }
    </style>
    """, unsafe_allow_html=True)


def display_logo_header(title: str, subtitle: str = "Where Stories Take Shape"):
    """
    Display the Rohimaya Publishing header with logo and title.

    Args:
        title: Main title to display
        subtitle: Subtitle/tagline to display
    """
    st.markdown(f"""
    <div style="text-align: center; padding: 2rem 0;">
        <h1 style="
            font-family: 'Playfair Display', serif;
            color: #1A1A2E;
            font-size: 3rem;
            margin-bottom: 0.5rem;
            background: linear-gradient(135deg, #FF8C42, #4A9B9B);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        ">🦚 {title}</h1>
        <p style="
            font-family: 'Inter', sans-serif;
            color: #2F5F5F;
            font-size: 1.2rem;
            font-style: italic;
            margin-top: 0;
        ">{subtitle}</p>
    </div>
    """, unsafe_allow_html=True)


def display_footer():
    """Display the Rohimaya Publishing footer."""
    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; padding: 2rem 0; font-family: 'Inter', sans-serif; color: #7B9AA8;">
        <p>Made with ❤️ by <strong style="color: #FF8C42;">Rohimaya Publishing</strong></p>
        <p style="font-size: 0.9rem;">Where Stories Take Shape 🦚🔥</p>
        <p style="font-size: 0.8rem;">
            <a href="https://rohimayapublishing.com" style="color: #4A9B9B; text-decoration: none;">Website</a> |
            <a href="https://github.com/HPagade/rohimaya-publishing-website" style="color: #4A9B9B; text-decoration: none;">GitHub</a> |
            <a href="mailto:support@rohimayapublishing.com" style="color: #4A9B9B; text-decoration: none;">Support</a>
        </p>
    </div>
    """, unsafe_allow_html=True)
