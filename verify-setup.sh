#!/bin/bash

# PhoenixForge AI - Verification Script
# Tests that all components are properly set up and can be run

set -e

echo "🔥 PhoenixForge AI - System Verification"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track results
PASSED=0
FAILED=0
WARNINGS=0

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((PASSED++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

info() {
    echo -e "ℹ  $1"
}

# Check prerequisites
echo "Checking Prerequisites..."
echo "------------------------"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    if [[ "${NODE_VERSION:1:2}" -ge "18" ]]; then
        pass "Node.js $NODE_VERSION"
    else
        fail "Node.js $NODE_VERSION (need v18+)"
    fi
else
    fail "Node.js not installed"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    pass "npm $NPM_VERSION"
else
    fail "npm not installed"
fi

if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version)
    pass "git installed"
else
    fail "git not installed"
fi

if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    pass "Python $PYTHON_VERSION (for demos)"
else
    warn "Python not installed (needed for Streamlit demos)"
fi

if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    pass "Docker installed (optional)"
else
    warn "Docker not installed (optional for deployment)"
fi

echo ""

# Check directory structure
echo "Checking Directory Structure..."
echo "------------------------------"

DIRS=(
    "website"
    "backend"
    "mobile-apps"
    "automation/workflows"
    "demos/streamlit"
    "docs/setup"
    "docs/deployment"
    "deployment/docker"
)

for dir in "${DIRS[@]}"; do
    if [ -d "$dir" ]; then
        pass "Directory: $dir"
    else
        fail "Missing directory: $dir"
    fi
done

echo ""

# Check critical files
echo "Checking Critical Files..."
echo "-------------------------"

FILES=(
    "README.md"
    "QUICKSTART.md"
    ".env.example"
    "website/package.json"
    "backend/package.json"
    "mobile-apps/package.json"
    "mobile-apps/App.tsx"
    "demos/streamlit/main_demo.py"
    "demos/streamlit/requirements.txt"
    "automation/workflows/formatter-workflow.json"
    "automation/workflows/cover-generator-workflow.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        pass "File: $file"
    else
        fail "Missing file: $file"
    fi
done

echo ""

# Check package.json dependencies
echo "Checking Package Dependencies..."
echo "-------------------------------"

check_package() {
    local dir=$1
    if [ -f "$dir/package.json" ]; then
        if [ -d "$dir/node_modules" ]; then
            pass "$dir - dependencies installed"
        else
            warn "$dir - run 'cd $dir && npm install'"
        fi
    fi
}

check_package "website"
check_package "backend"
check_package "mobile-apps"

echo ""

# Check environment setup
echo "Checking Environment Setup..."
echo "----------------------------"

if [ -f ".env" ]; then
    pass ".env file exists"
    
    # Check for critical env vars (without showing values)
    if grep -q "OPENAI_API_KEY" .env; then
        if grep -q "OPENAI_API_KEY=$" .env || grep -q "OPENAI_API_KEY=\"\"" .env; then
            warn "OPENAI_API_KEY is empty (demo mode will be used)"
        else
            pass "OPENAI_API_KEY is set"
        fi
    else
        warn "OPENAI_API_KEY not found in .env"
    fi
else
    warn ".env file not found - run: cp .env.example .env"
fi

echo ""

# Test if services can start (without actually starting them)
echo "Checking Service Configurations..."
echo "---------------------------------"

# Website
if [ -f "website/package.json" ] && grep -q "\"dev\"" website/package.json; then
    pass "Website dev script configured"
else
    fail "Website dev script missing"
fi

# Backend
if [ -f "backend/package.json" ] && grep -q "\"dev\"" backend/package.json; then
    pass "Backend dev script configured"
else
    fail "Backend dev script missing"
fi

# Mobile
if [ -f "mobile-apps/app.json" ]; then
    pass "Mobile app config (app.json) exists"
else
    fail "Mobile app config missing"
fi

# Streamlit
if [ -f "demos/streamlit/main_demo.py" ]; then
    if command -v streamlit &> /dev/null; then
        pass "Streamlit demo ready to run"
    else
        warn "Streamlit not installed - run: pip install -r demos/streamlit/requirements.txt"
    fi
else
    fail "Streamlit demo script missing"
fi

echo ""

# Summary
echo "========================================"
echo "Verification Summary"
echo "========================================"
echo -e "${GREEN}Passed:${NC}   $PASSED"
echo -e "${RED}Failed:${NC}   $FAILED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Install dependencies: cd website && npm install"
    echo "2. Copy environment: cp .env.example .env"
    echo "3. Start development: npm run dev"
    echo ""
    echo "Or for quick demo:"
    echo "   cd demos/streamlit && streamlit run main_demo.py"
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please fix the issues above.${NC}"
    exit 1
fi
