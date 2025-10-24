# 🔧 Learning Path: Backend API Basics

*Educational Guide - Building the AI Processing Server*

---

## What is a Backend?

The **backend** is the "behind the scenes" part of your app that:
- Stores data (database)
- Processes requests (API server)
- Handles AI processing (OpenAI calls)
- Manages payments (Stripe)
- Sends emails (Mailchimp)

Think of it like a restaurant:
- **Frontend** (React) = Dining room (what customers see)
- **Backend** (Node.js) = Kitchen (where work happens)
- **Database** = Pantry (where ingredients/data stored)

---

## 🎯 Our Backend Stack

### Node.js + Express
**Why Node.js?**
- Same language as frontend (JavaScript!)
- Fast and efficient
- Huge ecosystem (npm packages)
- Great for APIs

**Why Express?**
- Simple web framework
- Easy routing
- Middleware support
- Industry standard

---

## 📂 Backend Structure

```
server/
├── server.js              # Main entry point
├── routes/                # API endpoints
│   ├── formatter.js       # /api/formatter/*
│   ├── creative.js        # /api/creative/*
│   └── payment.js         # /api/payment/*
├── controllers/           # Business logic
│   ├── formatterController.js
│   ├── creativeController.js
│   └── paymentController.js
├── services/              # External APIs
│   ├── openai.js          # OpenAI/DALL-E
│   ├── stripe.js          # Payments
│   └── storage.js         # File storage
├── middleware/            # Helper functions
│   ├── auth.js            # Authentication
│   ├── upload.js          # File uploads
│   └── errorHandler.js    # Error handling
├── models/                # Database schemas
│   ├── User.js
│   ├── Project.js
│   └── Payment.js
└── config/                # Configuration
    ├── database.js
    └── environment.js
```

---

## 🚀 Building Your First API

### Step 1: Setup

```bash
# Create server directory
mkdir server
cd server

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express cors dotenv
npm install --save-dev nodemon
```

**What each does:**
- `express` - Web framework
- `cors` - Allow frontend to talk to backend
- `dotenv` - Load environment variables
- `nodemon` - Auto-restart server on changes

---

### Step 2: Basic Server

Create `server/server.js`:

```javascript
// IMPORT DEPENDENCIES
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// CREATE EXPRESS APP
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// ROUTES

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

**Run it:**
```bash
node server.js
# Visit: http://localhost:5000/api/test
```

---

### Step 3: Understanding Requests

**HTTP Methods:**
- `GET` - Retrieve data (like reading a book)
- `POST` - Create data (like adding a new book)
- `PUT` - Update data (like editing a book)
- `DELETE` - Remove data (like deleting a book)

**Example:**
```javascript
// GET - Retrieve all books
app.get('/api/books', (req, res) => {
  const books = [
    { id: 1, title: 'Eclipse of Fire & Wings' },
    { id: 2, title: 'Masala & Magnolia' }
  ];
  res.json(books);
});

// GET - Retrieve one book
app.get('/api/books/:id', (req, res) => {
  const { id } = req.params; // Get ID from URL
  // In real app, fetch from database
  res.json({ id, title: 'Eclipse of Fire & Wings' });
});

// POST - Create new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body; // Get data from request
  // In real app, save to database
  res.json({ id: 3, title, author, status: 'created' });
});
```

---

## 🔑 Working with OpenAI API

### Step 1: Get API Key

1. Go to https://platform.openai.com/api-keys
2. Create new secret key
3. Copy it (you can't see it again!)
4. Add to `.env` file:

```bash
OPENAI_API_KEY=sk-proj-xxx...
```

### Step 2: Install OpenAI Package

```bash
npm install openai
```

### Step 3: Create OpenAI Service

Create `server/services/openai.js`:

```javascript
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// FORMAT MANUSCRIPT
async function formatManuscript(text) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a professional book formatter. Analyze the manuscript and detect chapter breaks.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3 // Lower = more consistent
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}

// GENERATE BOOK COVER (DALL-E)
async function generateCover(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1, // Number of images
      size: '1024x1792', // Book cover size
      quality: 'hd'
    });

    return response.data[0].url;
  } catch (error) {
    console.error('DALL-E Error:', error);
    throw error;
  }
}

module.exports = {
  formatManuscript,
  generateCover
};
```

### Step 4: Create API Endpoint

Create `server/routes/formatter.js`:

```javascript
const express = require('express');
const router = express.Router();
const { formatManuscript } = require('../services/openai');

// POST /api/formatter/process
router.post('/process', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Process with OpenAI
    const formatted = await formatManuscript(text);

    res.json({
      success: true,
      formatted: formatted,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Format error:', error);
    res.status(500).json({
      success: false,
      error: 'Processing failed'
    });
  }
});

module.exports = router;
```

### Step 5: Register Route in Main Server

In `server.js`, add:

```javascript
const formatterRoutes = require('./routes/formatter');
app.use('/api/formatter', formatterRoutes);
```

---

## 📤 File Uploads

### Step 1: Install Multer

```bash
npm install multer
```

### Step 2: Configure Upload

Create `server/middleware/upload.js`:

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// File filter (only allow certain types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type'), false); // Reject file
  }
};

// Create upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB limit
  }
});

module.exports = upload;
```

### Step 3: Use in Route

```javascript
const upload = require('../middleware/upload');

router.post('/upload', upload.single('manuscript'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

---

## 🗄️ Database Basics

### Option 1: PostgreSQL (Recommended)

**Why PostgreSQL?**
- Reliable and robust
- Great for structured data
- Free tier available (Supabase, Railway)

**Install:**
```bash
npm install pg
```

**Connect:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Query example
async function getUser(id) {
  const result = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
}
```

### Option 2: MongoDB (Alternative)

**Why MongoDB?**
- Flexible schema
- Good for unstructured data
- Easy to get started

**Install:**
```bash
npm install mongodb mongoose
```

---

## 🔐 Environment Variables

**What are Environment Variables?**
Secrets and config that should NOT be in your code.

Create `.env`:
```bash
# Server
PORT=5000
NODE_ENV=development

# OpenAI
OPENAI_API_KEY=sk-proj-xxx...

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx...

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Load in code:**
```javascript
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT || 5000;
```

**NEVER commit `.env` to Git!**
Add to `.gitignore`:
```
.env
.env.local
.env.production
```

---

## 🧪 Testing Your API

### Using cURL:
```bash
# Test GET
curl http://localhost:5000/api/test

# Test POST
curl -X POST http://localhost:5000/api/formatter/process \
  -H "Content-Type: application/json" \
  -d '{"text":"My manuscript text here"}'
```

### Using Postman (Recommended):
1. Download: https://www.postman.com/
2. Create new request
3. Set method (GET/POST)
4. Enter URL
5. Add body (JSON)
6. Send!

---

## 🔍 Error Handling

**Always handle errors!**

```javascript
// Bad (no error handling)
app.post('/api/format', async (req, res) => {
  const result = await formatManuscript(req.body.text);
  res.json(result);
});

// Good (with error handling)
app.post('/api/format', async (req, res) => {
  try {
    const { text } = req.body;

    // Validate input
    if (!text) {
      return res.status(400).json({ error: 'Text required' });
    }

    // Process
    const result = await formatManuscript(text);

    // Success response
    res.json({ success: true, data: result });

  } catch (error) {
    console.error('Error:', error);

    // Error response
    res.status(500).json({
      success: false,
      error: 'Processing failed',
      message: error.message
    });
  }
});
```

---

## 📊 API Best Practices

1. **Use appropriate HTTP status codes:**
   - 200: Success
   - 201: Created
   - 400: Bad request (user error)
   - 401: Unauthorized
   - 404: Not found
   - 500: Server error

2. **Return consistent response format:**
```javascript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: 'Message here' }
```

3. **Validate all inputs:**
```javascript
if (!req.body.email || !isValidEmail(req.body.email)) {
  return res.status(400).json({ error: 'Valid email required' });
}
```

4. **Rate limiting:**
```bash
npm install express-rate-limit
```

5. **Log everything:**
```javascript
console.log('[API] Request:', req.method, req.url);
console.error('[ERROR]', error.message);
```

---

## 🎓 Learning Exercises

### Exercise 1: Simple API
Create an API with 3 endpoints:
1. GET /api/books - Return list of books
2. POST /api/books - Add new book
3. GET /api/books/:id - Get one book

### Exercise 2: OpenAI Integration
Create endpoint that:
1. Accepts text
2. Sends to OpenAI
3. Returns AI response

### Exercise 3: File Upload
Create endpoint that:
1. Accepts file upload
2. Saves file
3. Returns file info

---

## 📚 Resources

- **Node.js Docs**: https://nodejs.org/docs
- **Express.js Guide**: https://expressjs.com/
- **OpenAI API Docs**: https://platform.openai.com/docs
- **Postman Learning**: https://learning.postman.com/

---

**Next:** Read `03-CONNECTING-FRONTEND-BACKEND.md` to connect React to your API!
