# 🔒 Security Guidelines

Security best practices for Rohimaya Publishing.

---

## Reporting Security Issues

**Found a security vulnerability?**

**DO NOT** create a public GitHub issue.

Instead, email: security@rohimayapublishing.com

We'll respond within 48 hours.

---

## API Key Security

### ❌ Never Do This
```python
# DON'T hardcode API keys
api_key = "sk-abc123..."
```

### ✅ Always Do This
```python
# DO use secrets/environment variables
import streamlit as st
api_key = st.secrets["OPENAI_API_KEY"]
```

### Best Practices
1. **Never commit secrets to Git**
2. **Use `.gitignore` to exclude secrets files**
3. **Rotate API keys regularly**
4. **Set usage limits on API dashboards**
5. **Monitor for unusual activity**

---

## File Upload Security

### Validate All Uploads
```python
# Check file type
allowed_types = ['txt', 'docx', 'pdf']
if file.type not in allowed_types:
    raise ValueError("Invalid file type")

# Check file size
max_size = 10 * 1024 * 1024  # 10MB
if file.size > max_size:
    raise ValueError("File too large")
```

### Sanitize Filenames
```python
import re

def sanitize_filename(filename):
    # Remove dangerous characters
    return re.sub(r'[^\w\s.-]', '', filename)
```

---

## Environment Variables

### Required in .gitignore
```
.env
.streamlit/secrets.toml
*.key
*.pem
config.local.*
```

### Example secrets.toml
```toml
# .streamlit/secrets.toml
OPENAI_API_KEY = "sk-..."
ANTHROPIC_API_KEY = "sk-ant-..."

# Add to .gitignore!
```

---

## Production Deployment

### Checklist
- [ ] All secrets in environment variables (not code)
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] Error messages don't leak sensitive info
- [ ] Logging doesn't include secrets
- [ ] Dependencies up to date

---

## Common Vulnerabilities

### 1. API Key Exposure
**Risk:** High
**Solution:** Use secrets management, never commit keys

### 2. Unsafe File Uploads
**Risk:** High
**Solution:** Validate file types, sizes, scan for malware

### 3. Injection Attacks
**Risk:** Medium
**Solution:** Sanitize all user input, use parameterized queries

### 4. Broken Authentication
**Risk:** High
**Solution:** Use established auth libraries, enforce strong passwords

---

## Dependency Security

### Regular Updates
```bash
# Check for vulnerabilities
pip audit

# Update dependencies
pip install --upgrade -r requirements.txt
```

### Use Lock Files
- `package-lock.json` for Node.js
- `requirements.txt` with pinned versions for Python

---

## Secure Coding Practices

1. **Validate all input**
2. **Sanitize all output**
3. **Use HTTPS everywhere**
4. **Implement rate limiting**
5. **Log security events**
6. **Handle errors gracefully**
7. **Keep dependencies updated**

---

## Contact

Security questions: security@rohimayapublishing.com
