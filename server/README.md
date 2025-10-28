# PhoenixForge AI - Backend API Server

Backend API server for PhoenixForge AI publishing platform, providing AI-powered manuscript formatting, cover generation, and content creation services.

## Features

- **AI Manuscript Formatting** - GPT-4 powered chapter detection and formatting
- **Cover Generation** - DALL-E 3 book cover creation
- **Image Generation** - AI-powered image creation for book content
- **Video Script Generation** - GPT-4 video trailer scripts
- **File Upload Handling** - Secure file upload with validation
- **Mock Mode** - Works without API keys for testing

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **OpenAI API** - GPT-4 and DALL-E 3
- **Multer** - File upload handling
- **ES6 Modules** - Modern JavaScript

## Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- OpenAI API key (optional for mock mode)

### Installation

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key (optional)
# OPENAI_API_KEY=sk-your-key-here

# Start development server
npm run dev
```

The server will start at `http://localhost:5000`

### Production

```bash
npm start
```

## Environment Variables

Create a `.env` file in the server directory:

```env
# Server
NODE_ENV=development
PORT=5000

# CORS
CORS_ORIGIN=http://localhost:3000

# OpenAI API (optional - works in mock mode without it)
OPENAI_API_KEY=sk-your-openai-api-key-here

# File Upload
MAX_FILE_SIZE=52428800  # 50MB
UPLOAD_DIR=./uploads
```

## API Endpoints

### Health Check

```
GET /api/health
```

Response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-10-28T04:55:01.236Z",
  "uptime": 39.887,
  "environment": "development"
}
```

### Root

```
GET /
```

Returns API information and available endpoints.

### Formatter Endpoints

#### Upload Manuscript

```
POST /api/formatter/upload
Content-Type: multipart/form-data

Body: file (PDF, DOCX, TXT)
```

Response:
```json
{
  "success": true,
  "mode": "ai",
  "data": {
    "fileName": "manuscript.txt",
    "fileSize": 125000,
    "wordCount": 50000,
    "chapters": [
      {
        "number": 1,
        "title": "Chapter 1: The Beginning",
        "startIndex": 0,
        "endIndex": 5000,
        "content": "..."
      }
    ]
  }
}
```

#### Format Manuscript

```
POST /api/formatter/format
Content-Type: application/json

{
  "chapters": [...],
  "format": "epub",
  "template": "modern"
}
```

### Cover Generation

#### Generate Cover

```
POST /api/covers/generate
Content-Type: application/json

{
  "title": "The Phoenix Chronicles",
  "author": "Hannah Pagade",
  "genre": "fantasy",
  "style": "dramatic",
  "description": "Epic fantasy adventure",
  "variations": 3
}
```

Response:
```json
{
  "success": true,
  "mode": "ai",
  "data": {
    "covers": [
      {
        "id": "cover-123",
        "url": "https://...",
        "thumbnail": "https://...",
        "title": "The Phoenix Chronicles",
        "author": "Hannah Pagade",
        "genre": "fantasy",
        "style": "dramatic",
        "variation": 1
      }
    ],
    "generated": 3,
    "requested": 3
  }
}
```

#### Get Options

```
GET /api/covers/options
```

Returns available genres, styles, and formats.

### Image Generation

```
POST /api/images/generate
Content-Type: application/json

{
  "prompt": "A phoenix warrior with golden armor",
  "style": "fantasy-art",
  "size": "1024x1024",
  "quantity": 1
}
```

### Video Generation

```
POST /api/videos/generate
Content-Type: application/json

{
  "title": "Book Title",
  "genre": "fantasy",
  "duration": 30,
  "style": "cinematic"
}
```

## Directory Structure

```
server/
├── src/
│   ├── index.js              # Main entry point
│   ├── config/
│   │   └── multer.config.js  # File upload configuration
│   ├── controllers/
│   │   ├── formatter.controller.js
│   │   ├── cover.controller.js
│   │   ├── image.controller.js
│   │   └── video.controller.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   ├── formatter.routes.js
│   │   ├── cover.routes.js
│   │   ├── image.routes.js
│   │   └── video.routes.js
│   ├── services/
│   │   └── openai.service.js  # OpenAI API integration
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── models/               # (Future database models)
│   └── utils/                # (Future utilities)
├── uploads/                  # File upload directory
├── .env                      # Environment variables
├── .env.example             # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Mock Mode

The API automatically detects if OpenAI API key is configured:

- **With API Key**: Uses real GPT-4 and DALL-E 3
- **Without API Key**: Returns mock data for testing

This allows you to:
- Test the API without OpenAI credits
- Develop frontend before purchasing API access
- Demo the application

## Development

### Start Development Server

```bash
npm run dev
```

Uses nodemon for auto-restart on file changes.

### Test Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Root endpoint
curl http://localhost:5000

# Test formatter upload
curl -X POST -F "file=@manuscript.txt" http://localhost:5000/api/formatter/upload

# Test cover generation
curl -X POST http://localhost:5000/api/covers/generate \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","author":"Author","genre":"fantasy"}'
```

## Deployment

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set OPENAI_API_KEY=sk-...
railway variables set NODE_ENV=production

# Deploy
railway up
```

### Heroku

```bash
# Create app
heroku create phoenixforge-api

# Set environment variables
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Docker (Future)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## Security

- **Helmet** - Security headers
- **CORS** - Configurable cross-origin requests
- **File Validation** - Only allowed file types
- **File Size Limits** - 50MB maximum
- **Environment Variables** - Sensitive data protection

## Error Handling

All errors return consistent format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "status": 400
  }
}
```

Development mode includes stack traces.

## Rate Limiting (Future)

To add rate limiting:

```bash
npm install express-rate-limit

# In index.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## Database Integration (Future)

To add PostgreSQL:

```bash
npm install pg
npm install --save-dev @types/pg

# Or use Prisma ORM
npm install prisma @prisma/client
npx prisma init
```

## Testing (Future)

```bash
npm install --save-dev jest supertest

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-endpoint`
3. Make changes and test
4. Commit: `git commit -am 'Add new endpoint'`
5. Push: `git push origin feature/new-endpoint`
6. Create Pull Request

## Troubleshooting

### Server won't start

```bash
# Check if port is in use
lsof -i :5000

# Kill process
kill -9 <PID>
```

### OpenAI API errors

- Check API key is valid
- Verify you have credits
- Check rate limits
- Use mock mode for testing

### File upload fails

- Check file size < 50MB
- Verify file type is allowed
- Check uploads/ directory exists and is writable

## License

Proprietary - Rohimaya Publishing

## Contact

- **Email**: support@phoenixforge.ai
- **Website**: https://phoenixforge.ai
- **Documentation**: https://docs.phoenixforge.ai

---

Built with ❤️ by the PhoenixForge team
