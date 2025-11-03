# n8n Workflow Configurations for PhoenixForge AI

This directory contains n8n workflow JSON files that can be imported into your n8n instance to test and automate all PhoenixForge AI features.

## What is n8n?

n8n is an open-source workflow automation tool that lets you connect different services and automate tasks. Think of it as a visual programming tool where you can create workflows without writing code.

## Quick Start

### 1. Install n8n

**Option A: Docker (Recommended)**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option B: npm**
```bash
npm install -g n8n
n8n start
```

**Option C: npx (no install)**
```bash
npx n8n
```

Then open http://localhost:5678 in your browser.

### 2. Import Workflows

1. Open n8n at http://localhost:5678
2. Click on "Workflows" in the left sidebar
3. Click "Import from File" or use the import button
4. Select one of the workflow JSON files from this directory
5. Configure the API credentials (see below)

### 3. Configure API Credentials

Before running workflows, add these credentials in n8n:

1. Go to **Credentials** in the left sidebar
2. Click **Add Credential**
3. Add the following:

**OpenAI API**
- Type: HTTP Request
- Name: PhoenixForge API
- Authentication: Bearer Token
- Token: Your OpenAI API key (sk-...)

**Stripe**
- Type: Stripe API
- API Key: Your Stripe secret key (sk_test_...)

**Your PhoenixForge API**
- Type: HTTP Request  
- Name: PhoenixForge Backend
- Base URL: http://localhost:3001 (or your deployed URL)
- Authentication: None (or add your auth token)

## Available Workflows

### 1. `formatter-workflow.json` - AI Manuscript Formatter
**Purpose:** Upload manuscript, analyze with GPT-4, generate formatted PDF/EPUB

**Trigger:** Webhook or Manual
**Steps:**
1. Receive file upload
2. Extract text from DOCX/PDF
3. Send to GPT-4 for chapter analysis
4. Generate formatted PDF with PDFKit
5. Generate EPUB with epub-gen
6. Store files
7. Return download links

**Test URL:** POST http://localhost:5678/webhook/format
**Payload:**
```json
{
  "file": "base64_encoded_document",
  "genre": "fantasy",
  "template": "epic-fantasy"
}
```

### 2. `cover-generator-workflow.json` - AI Book Cover Generator
**Purpose:** Generate professional book covers using DALL-E 3

**Trigger:** Webhook or Manual
**Steps:**
1. Receive cover specifications (title, author, genre)
2. Generate prompt based on genre template
3. Call DALL-E 3 API (6 variations)
4. Add text overlay with title/author
5. Generate multiple formats (ebook, print)
6. Return image URLs

**Test URL:** POST http://localhost:5678/webhook/covers
**Payload:**
```json
{
  "title": "The Phoenix Chronicles",
  "author": "Hannah Pagade",
  "genre": "fantasy-romance",
  "style": "dramatic",
  "colors": ["#FF6B35", "#F7931E"]
}
```

### 3. `image-generator-workflow.json` - AI Image Creator
**Purpose:** Generate consistent character art and scene images

**Trigger:** Webhook or Manual
**Steps:**
1. Receive image request with prompt
2. Check for character ID (for consistency)
3. Generate image with DALL-E 3 or Stable Diffusion
4. Store metadata for character memory
5. Return high-res image URL

**Test URL:** POST http://localhost:5678/webhook/images
**Payload:**
```json
{
  "prompt": "A fierce phoenix warrior with golden armor",
  "style": "fantasy-art",
  "characterId": "char_123",
  "dimensions": "1024x1024"
}
```

### 4. `video-creator-workflow.json` - Book Trailer Generator
**Purpose:** Create video book trailers with AI voiceover

**Trigger:** Webhook or Manual
**Steps:**
1. Receive video specifications
2. Generate script with GPT-4 (if not provided)
3. Create voiceover with ElevenLabs
4. Generate video scenes with Runway ML
5. Combine with FFmpeg
6. Add music and transitions
7. Export in multiple formats

**Test URL:** POST http://localhost:5678/webhook/videos
**Payload:**
```json
{
  "duration": 30,
  "script": "In a world where phoenixes rule...",
  "images": ["img_123", "img_456"],
  "voiceId": "elegant_female",
  "music": "epic-orchestral"
}
```

### 5. `audiobook-workflow.json` - AI Audiobook Narrator
**Purpose:** Convert text to professional audiobook narration

**Trigger:** Webhook or Manual
**Steps:**
1. Receive text/manuscript
2. Split into chapters
3. Generate audio with ElevenLabs for each chapter
4. Apply audio processing (normalize, noise reduction)
5. Combine chapters into full audiobook
6. Generate ACX-compliant metadata
7. Return download link

**Test URL:** POST http://localhost:5678/webhook/audiobook
**Payload:**
```json
{
  "text": "Chapter 1. The Beginning...",
  "voiceId": "narrator_male",
  "chapterNumber": 1
}
```

### 6. `payment-processing-workflow.json` - Stripe Integration
**Purpose:** Handle subscription and payment processing

**Trigger:** Stripe Webhook
**Steps:**
1. Receive Stripe event
2. Validate webhook signature
3. Process subscription created/updated/cancelled
4. Update user database
5. Send confirmation email
6. Trigger usage limit updates

### 7. `complete-pipeline-workflow.json` - Full Book Creation Pipeline
**Purpose:** Orchestrate entire book creation from manuscript to marketing

**Trigger:** Manual or Scheduled
**Steps:**
1. Upload manuscript
2. Format manuscript (workflow #1)
3. Generate cover (workflow #2)
4. Create marketing images (workflow #3)
5. Generate book trailer (workflow #4)
6. Create audiobook (workflow #5)
7. Package everything
8. Send completion notification

**Test URL:** POST http://localhost:5678/webhook/complete-book
**Payload:**
```json
{
  "manuscript": "file_id_123",
  "title": "The Phoenix Chronicles",
  "author": "Hannah Pagade",
  "genre": "fantasy-romance"
}
```

## Testing Workflows

### Test Individual Workflows

1. **Import workflow** into n8n
2. **Click "Execute Workflow"** button
3. **Use test data** provided above
4. **View execution** in the workflow editor
5. **Check output** in each node

### Test with Webhook

1. **Activate workflow** (toggle in top right)
2. **Copy webhook URL** from the webhook node
3. **Send POST request** with curl or Postman:

```bash
curl -X POST http://localhost:5678/webhook/format \
  -H "Content-Type: application/json" \
  -d '{
    "file": "sample.docx",
    "genre": "fantasy"
  }'
```

### Test Complete Pipeline

1. Import `complete-pipeline-workflow.json`
2. Configure all sub-workflow credentials
3. Execute with sample data
4. Monitor progress through each stage
5. Receive final packaged output

## Monitoring & Debugging

### View Execution History
1. Go to **Executions** in left sidebar
2. See all workflow runs
3. Click any execution to see details
4. View input/output of each node

### Debug Failed Executions
1. Click on failed execution
2. See which node failed
3. View error message
4. Check node configuration
5. Re-execute after fixing

### Performance Tips
- Use **Wait** nodes to avoid rate limits
- Enable **Error Trigger** for notifications
- Set **Retry** on HTTP nodes for reliability
- Use **Split in Batches** for bulk operations

## Integration with PhoenixForge Platform

### Connect to Your Backend

The workflows are designed to work with the PhoenixForge backend API. To integrate:

1. **Start your backend server:**
```bash
cd server
npm install
npm start
```

2. **Update workflow credentials:**
- Change base URL from localhost to your deployed URL
- Add authentication tokens if required

3. **Test the connection:**
```bash
curl http://localhost:3001/api/health
```

### Connect to Frontend

The workflows can be triggered from your React frontend:

```javascript
// In your React component
const generateCover = async (coverData) => {
  const response = await fetch('http://localhost:5678/webhook/covers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(coverData)
  });
  return response.json();
};
```

## Production Deployment

### Deploy n8n

**Option 1: n8n Cloud (Easiest)**
- Sign up at https://n8n.cloud
- Import workflows
- Configure credentials
- Done!

**Option 2: Self-Host on Railway/Render**
```bash
# Use their n8n template
# Add environment variables:
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=your_password
```

**Option 3: Docker Production**
```bash
docker run -d \
  --name n8n-production \
  -p 5678:5678 \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=your_password \
  -e WEBHOOK_URL=https://yourdomain.com \
  -v n8n_data:/home/node/.n8n \
  n8nio/n8n
```

### Security Considerations

1. **Always use HTTPS** in production
2. **Enable authentication** on n8n instance
3. **Protect webhook URLs** with tokens
4. **Rotate API keys** regularly
5. **Use environment variables** for secrets
6. **Enable rate limiting** on webhooks

## Cost Estimates

Running these workflows with typical usage:

- **OpenAI GPT-4:** ~$0.03 per manuscript analysis
- **DALL-E 3:** ~$0.04 per image (6 variations = $0.24)
- **ElevenLabs:** ~$0.30 per 1,000 characters
- **Runway ML:** ~$0.05 per second of video
- **n8n Cloud:** Free tier: 5,000 executions/month

**Estimated cost for 100 books/month:** $50-100

## Troubleshooting

### Common Issues

**"Workflow execution failed"**
- Check API credentials are correct
- Verify API keys have sufficient quota
- Check network connectivity

**"Timeout error"**
- Increase timeout in node settings
- Split large files into smaller chunks
- Use async processing for long tasks

**"API rate limit exceeded"**
- Add Wait nodes between API calls
- Implement exponential backoff
- Upgrade API plan if needed

**"File too large"**
- Reduce file size before upload
- Use chunked upload for large files
- Increase n8n memory limits

### Getting Help

- **n8n Community:** https://community.n8n.io
- **Documentation:** https://docs.n8n.io
- **Our Support:** support@phoenixforge.ai

## Next Steps

1. ✅ Import all workflows
2. ✅ Configure credentials
3. ✅ Test each workflow individually
4. ✅ Test complete pipeline
5. ✅ Integrate with your frontend
6. ✅ Deploy to production
7. ✅ Monitor and optimize

## Additional Resources

- [n8n Template Library](https://n8n.io/workflows)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [PhoenixForge API Docs](../docs/API.md)

---

**Need help?** Contact us at support@phoenixforge.ai or open an issue on GitHub.
