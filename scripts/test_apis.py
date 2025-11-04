#!/usr/bin/env python3
"""
🦚 Rohimaya Publishing - API Connection Tester
Tests all API connections before deployment
"""

import os
import sys
from typing import Dict, Tuple

# Colors for terminal output
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'


def print_header(text: str):
    """Print a formatted header."""
    print(f"\n{BLUE}{'=' * 60}{RESET}")
    print(f"{BLUE}{text.center(60)}{RESET}")
    print(f"{BLUE}{'=' * 60}{RESET}\n")


def test_openai() -> Tuple[bool, str]:
    """Test OpenAI API connection."""
    try:
        from openai import OpenAI
    except ImportError:
        return False, "OpenAI package not installed (pip install openai)"

    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return False, "OPENAI_API_KEY not found in environment"

    try:
        client = OpenAI(api_key=api_key)
        # Simple test: list models
        models = client.models.list()
        return True, f"Connected! Found {len(list(models.data))} models"
    except Exception as e:
        return False, f"Connection failed: {str(e)}"


def test_anthropic() -> Tuple[bool, str]:
    """Test Anthropic (Claude) API connection."""
    try:
        from anthropic import Anthropic
    except ImportError:
        return False, "Anthropic package not installed (pip install anthropic)"

    api_key = os.environ.get('ANTHROPIC_API_KEY')
    if not api_key:
        return False, "ANTHROPIC_API_KEY not found in environment"

    try:
        client = Anthropic(api_key=api_key)
        # Simple test: send a minimal message
        message = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=10,
            messages=[{"role": "user", "content": "Hi"}]
        )
        return True, f"Connected! Response: {message.content[0].text}"
    except Exception as e:
        return False, f"Connection failed: {str(e)}"


def test_elevenlabs() -> Tuple[bool, str]:
    """Test ElevenLabs API connection."""
    try:
        from elevenlabs import ElevenLabs
    except ImportError:
        return False, "ElevenLabs package not installed (pip install elevenlabs)"

    api_key = os.environ.get('ELEVENLABS_API_KEY')
    if not api_key:
        return False, "ELEVENLABS_API_KEY not found in environment"

    try:
        client = ElevenLabs(api_key=api_key)
        # Simple test: get user info
        user = client.user.get()
        return True, f"Connected! User tier: {user.subscription.tier}"
    except Exception as e:
        return False, f"Connection failed: {str(e)}"


def main():
    """Run all API tests."""
    print_header("🦚 Rohimaya Publishing - API Connection Tests")

    # Define tests
    tests = {
        'OpenAI': test_openai,
        'Anthropic (Claude)': test_anthropic,
        'ElevenLabs': test_elevenlabs,
    }

    results: Dict[str, Tuple[bool, str]] = {}

    # Run tests
    for name, test_func in tests.items():
        print(f"Testing {name}...", end=' ')
        success, message = test_func()

        results[name] = (success, message)

        if success:
            print(f"{GREEN}✓ PASS{RESET}")
            print(f"  {message}")
        else:
            print(f"{RED}✗ FAIL{RESET}")
            print(f"  {message}")

    # Summary
    print_header("📊 Summary")

    passed = sum(1 for success, _ in results.values() if success)
    total = len(results)

    for name, (success, _) in results.items():
        status = f"{GREEN}✓{RESET}" if success else f"{RED}✗{RESET}"
        print(f"{status} {name}")

    print(f"\n{BLUE}Results: {passed}/{total} tests passed{RESET}")

    # Instructions for failures
    if passed < total:
        print(f"\n{YELLOW}⚠️  Some tests failed!{RESET}")
        print("\nTo fix:")
        print("1. Make sure you have installed all required packages:")
        print("   pip install openai anthropic elevenlabs")
        print("\n2. Set your API keys as environment variables:")
        print("   export OPENAI_API_KEY='sk-...'")
        print("   export ANTHROPIC_API_KEY='sk-ant-...'")
        print("   export ELEVENLABS_API_KEY='your-key'")
        print("\n3. Get API keys from:")
        print("   - OpenAI: https://platform.openai.com/api-keys")
        print("   - Anthropic: https://console.anthropic.com/settings/keys")
        print("   - ElevenLabs: https://elevenlabs.io/app/settings/api-keys")
        sys.exit(1)
    else:
        print(f"\n{GREEN}🎉 All API connections successful!{RESET}")
        print("\nYou're ready to deploy!")
        sys.exit(0)


if __name__ == '__main__':
    main()
