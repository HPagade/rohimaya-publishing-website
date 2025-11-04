"""
Rohimaya Publishing - API Helpers Module
Centralized API client initialization and error handling
"""

import streamlit as st
from typing import Optional
import os


def get_openai_client():
    """
    Initialize and return OpenAI client with API key from Streamlit secrets.

    Returns:
        OpenAI: Configured OpenAI client

    Raises:
        ValueError: If API key is not configured
    """
    try:
        from openai import OpenAI
    except ImportError:
        st.error("OpenAI package not installed. Run: `pip install openai`")
        st.stop()

    # Try to get API key from secrets, then environment
    api_key = None
    if hasattr(st, 'secrets') and 'OPENAI_API_KEY' in st.secrets:
        api_key = st.secrets['OPENAI_API_KEY']
    elif 'OPENAI_API_KEY' in os.environ:
        api_key = os.environ['OPENAI_API_KEY']

    if not api_key:
        st.error("""
        ⚠️ **OpenAI API Key Not Found**

        Please configure your API key in one of these ways:

        1. **Streamlit Secrets** (Recommended for deployment):
           Create `.streamlit/secrets.toml` and add:
           ```
           OPENAI_API_KEY = "sk-..."
           ```

        2. **Environment Variable** (For local development):
           ```bash
           export OPENAI_API_KEY="sk-..."
           ```

        Get your API key at: https://platform.openai.com/api-keys
        """)
        st.stop()

    return OpenAI(api_key=api_key)


def get_anthropic_client():
    """
    Initialize and return Anthropic (Claude) client with API key from Streamlit secrets.

    Returns:
        Anthropic: Configured Anthropic client

    Raises:
        ValueError: If API key is not configured
    """
    try:
        from anthropic import Anthropic
    except ImportError:
        st.error("Anthropic package not installed. Run: `pip install anthropic`")
        st.stop()

    # Try to get API key from secrets, then environment
    api_key = None
    if hasattr(st, 'secrets') and 'ANTHROPIC_API_KEY' in st.secrets:
        api_key = st.secrets['ANTHROPIC_API_KEY']
    elif 'ANTHROPIC_API_KEY' in os.environ:
        api_key = os.environ['ANTHROPIC_API_KEY']

    if not api_key:
        st.error("""
        ⚠️ **Anthropic API Key Not Found**

        Please configure your API key in one of these ways:

        1. **Streamlit Secrets** (Recommended for deployment):
           Create `.streamlit/secrets.toml` and add:
           ```
           ANTHROPIC_API_KEY = "sk-ant-..."
           ```

        2. **Environment Variable** (For local development):
           ```bash
           export ANTHROPIC_API_KEY="sk-ant-..."
           ```

        Get your API key at: https://console.anthropic.com/settings/keys
        """)
        st.stop()

    return Anthropic(api_key=api_key)


def get_elevenlabs_client():
    """
    Initialize and return ElevenLabs client with API key from Streamlit secrets.

    Returns:
        ElevenLabs: Configured ElevenLabs client

    Raises:
        ValueError: If API key is not configured
    """
    try:
        from elevenlabs import ElevenLabs
    except ImportError:
        st.error("ElevenLabs package not installed. Run: `pip install elevenlabs`")
        st.stop()

    # Try to get API key from secrets, then environment
    api_key = None
    if hasattr(st, 'secrets') and 'ELEVENLABS_API_KEY' in st.secrets:
        api_key = st.secrets['ELEVENLABS_API_KEY']
    elif 'ELEVENLABS_API_KEY' in os.environ:
        api_key = os.environ['ELEVENLABS_API_KEY']

    if not api_key:
        st.error("""
        ⚠️ **ElevenLabs API Key Not Found**

        Please configure your API key in one of these ways:

        1. **Streamlit Secrets** (Recommended for deployment):
           Create `.streamlit/secrets.toml` and add:
           ```
           ELEVENLABS_API_KEY = "your-key"
           ```

        2. **Environment Variable** (For local development):
           ```bash
           export ELEVENLABS_API_KEY="your-key"
           ```

        Get your API key at: https://elevenlabs.io/app/settings/api-keys
        """)
        st.stop()

    return ElevenLabs(api_key=api_key)


def handle_api_error(error: Exception, service: str = "API"):
    """
    Display user-friendly error messages for common API errors.

    Args:
        error: The exception that was raised
        service: Name of the service that errored (e.g., "OpenAI", "Claude")
    """
    error_message = str(error).lower()

    if "authentication" in error_message or "api key" in error_message or "401" in error_message:
        st.error(f"""
        🔒 **Authentication Error with {service}**

        Your API key appears to be invalid or expired.

        **Steps to fix:**
        1. Check that your API key is correctly configured
        2. Verify the key hasn't expired
        3. Generate a new key if needed

        **Error details:** {str(error)}
        """)

    elif "rate limit" in error_message or "429" in error_message:
        st.error(f"""
        🚦 **Rate Limit Exceeded with {service}**

        You've made too many requests. Please wait a moment and try again.

        **Tips:**
        - Wait 60 seconds before trying again
        - Consider upgrading your API plan for higher limits
        - Reduce the frequency of requests

        **Error details:** {str(error)}
        """)

    elif "quota" in error_message or "insufficient" in error_message:
        st.error(f"""
        💳 **Quota Exceeded with {service}**

        Your account has insufficient quota or credits.

        **Steps to fix:**
        1. Add credits to your account
        2. Upgrade your plan
        3. Wait for your quota to reset

        **Error details:** {str(error)}
        """)

    elif "timeout" in error_message or "timed out" in error_message:
        st.error(f"""
        ⏱️ **Request Timeout with {service}**

        The request took too long to process.

        **Steps to fix:**
        - Try again with a shorter input
        - Check your internet connection
        - The service might be experiencing high load

        **Error details:** {str(error)}
        """)

    elif "connection" in error_message or "network" in error_message:
        st.error(f"""
        🌐 **Connection Error with {service}**

        Unable to connect to the service.

        **Steps to fix:**
        - Check your internet connection
        - Verify the service is online
        - Try again in a few moments

        **Error details:** {str(error)}
        """)

    else:
        # Generic error message for unknown errors
        st.error(f"""
        ❌ **Error with {service}**

        An unexpected error occurred.

        **Error details:** {str(error)}

        If this persists, please contact support with the error details above.
        """)


def check_api_keys_configured() -> dict:
    """
    Check which API keys are configured and return status.

    Returns:
        dict: Dictionary with API key status (True if configured, False otherwise)
    """
    status = {
        'openai': False,
        'anthropic': False,
        'elevenlabs': False,
    }

    # Check OpenAI
    if (hasattr(st, 'secrets') and 'OPENAI_API_KEY' in st.secrets) or 'OPENAI_API_KEY' in os.environ:
        status['openai'] = True

    # Check Anthropic
    if (hasattr(st, 'secrets') and 'ANTHROPIC_API_KEY' in st.secrets) or 'ANTHROPIC_API_KEY' in os.environ:
        status['anthropic'] = True

    # Check ElevenLabs
    if (hasattr(st, 'secrets') and 'ELEVENLABS_API_KEY' in st.secrets) or 'ELEVENLABS_API_KEY' in os.environ:
        status['elevenlabs'] = True

    return status


def display_api_status():
    """Display the configuration status of all API keys in the sidebar."""
    st.sidebar.markdown("### 🔑 API Status")

    status = check_api_keys_configured()

    st.sidebar.write("**OpenAI:**", "✅ Configured" if status['openai'] else "❌ Not configured")
    st.sidebar.write("**Anthropic:**", "✅ Configured" if status['anthropic'] else "❌ Not configured")
    st.sidebar.write("**ElevenLabs:**", "✅ Configured" if status['elevenlabs'] else "❌ Not configured")

    if not any(status.values()):
        st.sidebar.warning("⚠️ No API keys configured. Some features may not work.")
