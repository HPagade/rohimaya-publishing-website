# PhoenixForge AI - Complete Technical Stack

**Last Updated:** November 3, 2025  
**Status:** Production-Ready  

---

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Frontend Stack](#frontend-stack)
- [Backend Stack](#backend-stack)
- [AI Services](#ai-services)
- [Database & Storage](#database--storage)
- [Infrastructure & DevOps](#infrastructure--devops)
- [Security & Authentication](#security--authentication)
- [Monitoring & Analytics](#monitoring--analytics)
- [Development Tools](#development-tools)
- [API Integrations](#api-integrations)
- [Environment Setup](#environment-setup)
- [Deployment Pipeline](#deployment-pipeline)

---

## 🏗️ Architecture Overview

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Layer                               │
├─────────────┬──────────────┬──────────────┬────────────────────┤
│ Web Browser │ iOS App      │ Android App  │ Progressive Web App │
└─────────────┴──────────────┴──────────────┴────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CDN (CloudFront)                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Frontend (Next.js on Vercel)                    │
│  ┌───────────┬────────────┬──────────────┬──────────────────┐  │
│  │ App Router│ Components │ State (Zustand)│ API Client     │  │
│  └───────────┴────────────┴──────────────┴──────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                API Gateway + Load Balancer                       │
└─────────────────────────────────────────────────────────────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
┌──────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ Backend API      │  │ Worker Services │  │ WebSocket Server│
│ (Express/Railway)│  │ (Bull Queue)    │  │ (Real-time)     │
│                  │  │                 │  │                 │
│ ┌──────────────┐│  │ ┌─────────────┐ │  │ Job Status      │
│ │ Controllers  ││  │ │ AI Jobs     │ │  │ Notifications   │
│ │ Services     ││  │ │ File Proc   │ │  │                 │
│ │ Middleware   ││  │ │ Email Queue │ │  │                 │
│ └──────────────┘│  │ └─────────────┘ │  │                 │
└──────────────────┘  └─────────────────┘  └─────────────────┘
        │                      │
        ▼                      ▼
┌──────────────────────────────────────────┐
│          Data Layer                       │
│  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │PostgreSQL│  │  Redis   │  │ S3     │ │
│  │(Supabase)│  │ (Upstash)│  │ (AWS)  │ │
│  └──────────┘  └──────────┘  └────────┘ │
└──────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│                     AI Service Layer                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐│
│  │ OpenAI   │  │ Replicate│  │ Runway ML│  │ ElevenLabs       ││
│  │ GPT-4    │  │ Stable   │  │ Video    │  │ Voice            ││
│  │ DALL-E 3 │  │ Diffusion│  │ Gen-2    │  │ Synthesis        ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘│
└──────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Frontend Stack

### Core Framework

**Next.js 14.2.33**
```json
{
  "framework": "Next.js",
  "version": "14.2.33",
  "features": [
    "App Router (React Server Components)",
    "Server-Side Rendering (SSR)",
    "Static Site Generation (SSG)",
    "API Routes",
    "Middleware",
    "Image Optimization",
    "Font Optimization"
  ]
}
```

**Why Next.js?**
- ✅ SEO-friendly (crucial for content marketing)
- ✅ Fast page loads (better conversion)
- ✅ Built-in API routes (simplified architecture)
- ✅ Vercel deployment (optimal performance)
- ✅ TypeScript support
- ✅ Large ecosystem & community

---

### React Ecosystem

**React 18.2.0**
```typescript
// Core libraries
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  
  // Key features used:
  "features": [
    "Hooks (useState, useEffect, useCallback, useMemo)",
    "Context API (theme, auth)",
    "Suspense (loading states)",
    "Server Components (Next.js 14)",
    "Concurrent rendering"
  ]
}
```

---

### State Management

**Zustand**
```typescript
// Lightweight state management
import create from 'zustand'

// Example: User state
const useUserStore = create((set) => ({
  user: null,
  subscription: null,
  setUser: (user) => set({ user }),
  setSubscription: (sub) => set({ subscription: sub })
}))

// Example: UI state
const useUIStore = create((set) => ({
  theme: 'dark',
  sidebarOpen: false,
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'dark' ? 'light' : 'dark' 
  })),
  toggleSidebar: () => set((state) => ({ 
    sidebarOpen: !state.sidebarOpen 
  }))
}))
```

**Why Zustand?**
- ✅ Simple API (no boilerplate)
- ✅ Small bundle size (1kb)
- ✅ TypeScript support
- ✅ No Context Provider hell
- ✅ Excellent DevTools

---

### Data Fetching

**React Query (TanStack Query)**
```typescript
import { useQuery, useMutation } from '@tanstack/react-query'

// Fetch user data
const { data, isLoading, error } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
})

// Generate cover mutation
const generateCover = useMutation({
  mutationFn: (coverData) => api.covers.generate(coverData),
  onSuccess: (data) => {
    queryClient.invalidateQueries(['covers'])
  }
})
```

**Features:**
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Error handling
- ✅ Loading states

---

### Styling

**TailwindCSS 3.4.1**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF5F0',
          100: '#FFE8DC',
          500: '#FF6B35',  // Main brand color
          600: '#E55F2E',
          900: '#8C2B0F',
        },
        secondary: {
          500: '#F7931E',  // Golden
        },
        accent: {
          500: '#9B59B6',  // Purple
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

**Utility Plugins:**
```bash
npm install -D \
  @tailwindcss/forms \      # Better form styling
  @tailwindcss/typography   # Prose styling (for blog)
```

---

### UI Component Library

**Shadcn/ui**
```typescript
// Components used:
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Form, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Toast } from '@/components/ui/toast'
```

**Why Shadcn/ui?**
- ✅ Not a dependency (copy-paste components)
- ✅ Fully customizable
- ✅ Accessible (ARIA compliant)
- ✅ Dark mode support
- ✅ TailwindCSS native

---

### Icons & Assets

**Lucide React**
```typescript
import { 
  Sparkles,      // AI/magic features
  Image,         // Image generation
  Video,         // Video creation
  FileText,      // Documents
  Zap,           // Speed/instant
  Crown,         // Premium features
  Download,      // Download assets
  Settings,      // Configuration
} from 'lucide-react'
```

**Why Lucide?**
- ✅ 1000+ icons
- ✅ Consistent design
- ✅ Tree-shakeable (small bundle)
- ✅ TypeScript types

---

### Animations

**Framer Motion**
```typescript
import { motion, AnimatePresence } from 'framer-motion'

// Example: Fade in animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>

// Example: List animation
<AnimatePresence>
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      {item.content}
    </motion.div>
  ))}
</AnimatePresence>
```

**Use cases:**
- Page transitions
- Modal animations
- Loading states
- Hover effects
- List animations

---

### Form Handling

**React Hook Form + Zod**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Define schema
const coverSchema = z.object({
  title: z.string().min(1).max(100),
  author: z.string().min(1).max(100),
  genre: z.enum(['fantasy', 'romance', 'thriller', 'scifi']),
  description: z.string().min(10).max(500),
})

// Use in component
const form = useForm({
  resolver: zodResolver(coverSchema),
  defaultValues: {
    title: '',
    author: '',
    genre: 'fantasy',
    description: '',
  }
})

const onSubmit = async (data) => {
  await generateCover.mutateAsync(data)
}
```

---

## ⚙️ Backend Stack

### Core Framework

**Node.js 20.x + Express.js 5.1.0**
```javascript
// backend/src/index.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

const app = express()

// Middleware
app.use(helmet())  // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(morgan('combined'))  // Logging
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,  // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})
app.use('/api/', limiter)

// Routes
import healthRoutes from './routes/health.routes.js'
import coversRoutes from './routes/covers.routes.js'
import imagesRoutes from './routes/images.routes.js'
import videosRoutes from './routes/videos.routes.js'
import formatterRoutes from './routes/formatter.routes.js'
import subscriptionRoutes from './routes/subscription.routes.js'

app.use('/api/health', healthRoutes)
app.use('/api/covers', coversRoutes)
app.use('/api/images', imagesRoutes)
app.use('/api/videos', videosRoutes)
app.use('/api/formatter', formatterRoutes)
app.use('/api/subscriptions', subscriptionRoutes)

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

### Service Layer Architecture

**services/ directory structure:**
```
backend/src/services/
├── openai.service.js           # GPT-4, DALL-E 3
├── cover.generator.service.js  # Cover generation logic
├── image.processing.service.js # Image manipulation
├── image.content.generator.service.js
├── video.generator.service.js  # Video creation
├── audiobook.service.js        # Voice synthesis
├── document.parser.service.js  # Parse DOCX, PDF
├── epub.export.service.js      # Generate ePub
├── pdf.export.service.js       # Generate PDF
├── publication.standards.service.js
├── stripe.service.js           # Payment processing
└── database.service.js         # Database operations
```

**Example Service (openai.service.js):**
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const generateCoverPrompt = async (bookData) => {
  const { title, genre, description } = bookData
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are an expert book cover designer...'
      },
      {
        role: 'user',
        content: `Create a cover for: ${title}, Genre: ${genre}...`
      }
    ],
    temperature: 0.7,
  })
  
  return completion.choices[0].message.content
}

export const generateImage = async (prompt, options = {}) => {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: options.size || '1024x1024',
    quality: options.quality || 'hd',
    style: options.style || 'vivid'
  })
  
  return response.data[0].url
}

export const analyzeManuscript = async (text) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    messages: [
      {
        role: 'system',
        content: 'Analyze this manuscript and identify chapter breaks...'
      },
      {
        role: 'user',
        content: text
      }
    ]
  })
  
  return completion.choices[0].message.content
}
```

---

### Job Queue System

**Bull Queue (Redis-based)**
```javascript
import Bull from 'bull'

// Create queues
export const coverQueue = new Bull('cover-generation', {
  redis: process.env.REDIS_URL,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: 100,
    removeOnFail: false
  }
})

// Process jobs
coverQueue.process(async (job) => {
  const { title, author, genre, description, userId } = job.data
  
  try {
    // Update progress
    job.progress(10)
    
    // Generate prompt with GPT-4
    const prompt = await generateCoverPrompt({ title, genre, description })
    job.progress(30)
    
    // Generate 6 variations with DALL-E 3
    const covers = []
    for (let i = 0; i < 6; i++) {
      const imageUrl = await generateImage(prompt)
      const processedUrl = await uploadToS3(imageUrl, userId)
      covers.push(processedUrl)
      job.progress(30 + (i + 1) * 10)
    }
    
    // Save to database
    await saveCoverGeneration(userId, { title, covers })
    job.progress(100)
    
    return { covers }
  } catch (error) {
    console.error('Cover generation failed:', error)
    throw error
  }
})

// Add job to queue
export const createCoverJob = async (data) => {
  const job = await coverQueue.add(data, {
    priority: data.subscriptionTier === 'inferno' ? 1 : 5
  })
  return job.id
}

// Get job status
export const getJobStatus = async (jobId) => {
  const job = await coverQueue.getJob(jobId)
  if (!job) return null
  
  const state = await job.getState()
  const progress = job.progress()
  const result = job.returnvalue
  
  return { state, progress, result }
}
```

---

### File Upload Handling

**Multer + AWS S3**
```javascript
import multer from 'multer'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs/promises'

// Configure S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// Multer config (temporary storage)
const upload = multer({
  dest: '/tmp/uploads/',
  limits: {
    fileSize: 50 * 1024 * 1024  // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})

// Upload to S3
export const uploadToS3 = async (filePath, userId, fileName) => {
  const fileContent = await fs.readFile(filePath)
  
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: `users/${userId}/${Date.now()}-${fileName}`,
    Body: fileContent,
    ContentType: 'application/octet-stream'
  }
  
  await s3Client.send(new PutObjectCommand(params))
  
  // Clean up temp file
  await fs.unlink(filePath)
  
  return `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${params.Key}`
}

// Route example
app.post('/api/formatter/upload', 
  upload.single('manuscript'),
  async (req, res) => {
    try {
      const { userId } = req.user
      const file = req.file
      
      const s3Url = await uploadToS3(file.path, userId, file.originalname)
      
      // Create formatting job
      const jobId = await createFormattingJob({
        userId,
        fileUrl: s3Url,
        options: req.body
      })
      
      res.json({ jobId, status: 'processing' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)
```

---

## 🤖 AI Services

### OpenAI Integration

**API Configuration:**
```javascript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORG_ID,
  maxRetries: 3,
  timeout: 60000  // 60 seconds
})

// Cost tracking
const PRICING = {
  'gpt-4-turbo': {
    input: 0.01 / 1000,   // $0.01 per 1K tokens
    output: 0.03 / 1000    // $0.03 per 1K tokens
  },
  'dall-e-3': {
    '1024x1024': 0.040,    // $0.04 per image
    '1024x1792': 0.080,    // $0.08 per image
    '1792x1024': 0.080     // $0.08 per image
  }
}

// Wrapper with error handling + retry
export const callGPT4 = async (messages, options = {}) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 2000,
    })
    
    // Track usage
    const usage = completion.usage
    const cost = (
      usage.prompt_tokens * PRICING['gpt-4-turbo'].input +
      usage.completion_tokens * PRICING['gpt-4-turbo'].output
    )
    
    await trackAIUsage({
      model: 'gpt-4-turbo',
      tokens: usage.total_tokens,
      cost
    })
    
    return completion.choices[0].message.content
  } catch (error) {
    if (error.status === 429) {
      // Rate limit - implement exponential backoff
      await sleep(5000)
      return callGPT4(messages, options)
    }
    throw error
  }
}
```

---

### Replicate (Stable Diffusion)

**API Integration:**
```javascript
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN
})

export const generateImageSD = async (prompt, options = {}) => {
  const output = await replicate.run(
    'stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b',
    {
      input: {
        prompt: prompt,
        negative_prompt: options.negativePrompt || 'blurry, low quality',
        width: options.width || 1024,
        height: options.height || 1024,
        num_outputs: options.numOutputs || 1,
        scheduler: 'DPMSolverMultistep',
        num_inference_steps: 30,
        guidance_scale: 7.5,
      }
    }
  )
  
  return output
}

// Cost: ~$0.005 per image (vs $0.04 for DALL-E)
// Use for bulk generation, DALL-E for premium quality
```

---

### ElevenLabs (Voice)

**API Integration:**
```javascript
import axios from 'axios'

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY

export const generateVoiceover = async (text, voiceId, options = {}) => {
  const response = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text,
      model_id: options.modelId || 'eleven_multilingual_v2',
      voice_settings: {
        stability: options.stability || 0.5,
        similarity_boost: options.similarityBoost || 0.75,
        style: options.style || 0,
        use_speaker_boost: true
      }
    },
    {
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer'
    }
  )
  
  // Save audio file
  const audioBuffer = Buffer.from(response.data)
  return audioBuffer
}

// Available voices
export const VOICES = {
  'elegant_female': '21m00Tcm4TlvDq8ikWAM',
  'deep_male': 'VR6AewLTigWG4xSOukaG',
  'british_narrator': 'pNInz6obpgDQGcFmaJgB',
  // ... 50+ more voices
}
```

---

### Runway ML (Video)

**API Integration:**
```javascript
import axios from 'axios'

const RUNWAY_API_KEY = process.env.RUNWAY_API_KEY

export const generateVideo = async (imageUrl, prompt, options = {}) => {
  // Start generation
  const startResponse = await axios.post(
    'https://api.runwayml.com/v1/gen2/text_to_video',
    {
      image_url: imageUrl,
      text_prompt: prompt,
      duration: options.duration || 4,  // seconds
      seed: options.seed || Math.floor(Math.random() * 1000000)
    },
    {
      headers: {
        'Authorization': `Bearer ${RUNWAY_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )
  
  const taskId = startResponse.data.id
  
  // Poll for completion
  let completed = false
  let videoUrl = null
  
  while (!completed) {
    await sleep(5000)  // Wait 5 seconds
    
    const statusResponse = await axios.get(
      `https://api.runwayml.com/v1/tasks/${taskId}`,
      {
        headers: {
          'Authorization': `Bearer ${RUNWAY_API_KEY}`
        }
      }
    )
    
    if (statusResponse.data.status === 'SUCCEEDED') {
      completed = true
      videoUrl = statusResponse.data.output.url
    } else if (statusResponse.data.status === 'FAILED') {
      throw new Error('Video generation failed')
    }
  }
  
  return videoUrl
}
```

---

## 💾 Database & Storage

### PostgreSQL Schema

**Database: Supabase (Managed PostgreSQL 15)**

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  subscription_tier VARCHAR(50) DEFAULT 'spark',
  subscription_status VARCHAR(50) DEFAULT 'active',
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  genre VARCHAR(100),
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assets table (covers, images, videos)
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,  -- 'cover', 'image', 'video', 'manuscript'
  url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table (AI generation jobs)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'queued',
  progress INTEGER DEFAULT 0,
  input JSONB,
  output JSONB,
  error TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- Usage tracking
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  formats_used INTEGER DEFAULT 0,
  covers_used INTEGER DEFAULT 0,
  images_used INTEGER DEFAULT 0,
  videos_used INTEGER DEFAULT 0,
  api_calls INTEGER DEFAULT 0,
  UNIQUE(user_id, month)
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_project_id ON assets(project_id);
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_usage_user_month ON usage(user_id, month);
```

---

### Redis Schema

**Redis: Upstash (Serverless Redis)**

```javascript
// Cache structure
{
  // User session cache
  "session:{userId}": {
    user: {...},
    subscription: {...},
    usage: {...},
    ttl: 3600  // 1 hour
  },
  
  // Job queue (Bull)
  "bull:cover-generation:{jobId}": {
    data: {...},
    progress: 75,
    status: 'active'
  },
  
  // Rate limiting
  "ratelimit:{ip}:{endpoint}": {
    count: 42,
    ttl: 900  // 15 minutes
  },
  
  // Generated content cache
  "cover:{hash}": {
    urls: [...],
    ttl: 86400  // 24 hours
  }
}
```

---

### File Storage (AWS S3)

**Bucket Structure:**
```
phoenixforge-files/
├── users/
│   ├── {userId}/
│   │   ├── manuscripts/
│   │   │   ├── original/
│   │   │   └── processed/
│   │   ├── covers/
│   │   │   ├── generated/
│   │   │   └── final/
│   │   ├── images/
│   │   └── videos/
├── templates/
│   ├── covers/
│   ├── manuscripts/
│   └── styles/
└── public/
    ├── landing-page/
    └── marketing/
```

**S3 Configuration:**
```javascript
// S3 bucket policy (private)
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT:user/phoenixforge-api"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::phoenixforge-files/*"
    }
  ]
}

// Generate signed URLs for downloads
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'

export const generateDownloadUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key
  })
  
  // URL expires in 1 hour
  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
  return url
}
```

---

## 🚀 Infrastructure & DevOps

### Hosting

**Frontend: Vercel**
```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],  // US East (lowest latency)
  "env": {
    "NEXT_PUBLIC_API_URL": "@api_url",
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase_url"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Backend: Railway**
```json
// railway.json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

### CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
      - run: npm run lint

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: 'backend-api'
```

---

### Docker Configuration

**Backend Dockerfile:**
```dockerfile
# backend/Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000

CMD ["node", "src/index.js"]
```

**Docker Compose (Local Development):**
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: phoenixforge
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/phoenixforge
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

---

## 🔐 Security & Authentication

### Clerk Authentication

**Setup:**
```typescript
// app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

// Protect routes
import { auth } from '@clerk/nextjs'

export default async function ProtectedPage() {
  const { userId } = auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return <Dashboard userId={userId} />
}

// API route protection
import { getAuth } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  const { userId } = getAuth(req)
  
  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Process request
}
```

---

### Stripe Integration

**Setup:**
```javascript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})

// Create checkout session
export const createCheckoutSession = async (userId, priceId) => {
  const session = await stripe.checkout.sessions.create({
    customer: await getStripeCustomerId(userId),
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    metadata: {
      userId
    }
  })
  
  return session.url
}

// Webhook handler
export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']
  
  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }
  
  switch (event.type) {
    case 'customer.subscription.created':
      await handleSubscriptionCreated(event.data.object)
      break
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object)
      break
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object)
      break
    case 'invoice.payment_succeeded':
      await handlePaymentSucceeded(event.data.object)
      break
    case 'invoice.payment_failed':
      await handlePaymentFailed(event.data.object)
      break
  }
  
  res.json({ received: true })
}
```

---

## 📊 Monitoring & Analytics

### Error Tracking (Sentry)

```javascript
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
  beforeSend(event) {
    // Don't send API keys
    if (event.request) {
      delete event.request.headers.authorization
    }
    return event
  }
})

// Usage
try {
  await generateCover(data)
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'cover-generation'
    },
    contexts: {
      user: { id: userId },
      request: { data }
    }
  })
  throw error
}
```

---

### Analytics (Mixpanel)

```typescript
import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)

// Track events
export const trackEvent = (eventName: string, properties?: object) => {
  mixpanel.track(eventName, {
    ...properties,
    timestamp: new Date().toISOString()
  })
}

// Usage
trackEvent('Cover Generated', {
  genre: 'fantasy',
  variations: 6,
  tier: 'blaze'
})

// Identify user
export const identifyUser = (userId: string, traits?: object) => {
  mixpanel.identify(userId)
  mixpanel.people.set(traits)
}
```

---

## 🛠️ Development Tools

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    "prefer-const": "error"
  }
}
```

---

### Testing

**Jest + React Testing Library:**
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
}

// Example test
import { render, screen, fireEvent } from '@testing-library/react'
import CoverGenerator from '@/components/CoverGenerator'

describe('CoverGenerator', () => {
  it('submits form with correct data', async () => {
    render(<CoverGenerator />)
    
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'My Fantasy Book' }
    })
    
    fireEvent.click(screen.getByText('Generate Covers'))
    
    expect(screen.getByText('Generating...')).toBeInTheDocument()
  })
})
```

---

## 📦 Complete Environment Setup

### Required Environment Variables

```bash
# ============================================
# APPLICATION
# ============================================
NODE_ENV=production
PORT=5000
APP_URL=https://phoenixforge.ai
API_URL=https://api.phoenixforge.ai

# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
REDIS_URL="redis://:password@global-phoenix-12345.upstash.io:6379"

# ============================================
# AI SERVICES
# ============================================
OPENAI_API_KEY="sk-proj-xxxxxxxxxxxxxxxxxxxx"
ANTHROPIC_API_KEY="sk-ant-xxxxxxxxxxxxxxxxxxxx"
REPLICATE_API_TOKEN="r8_xxxxxxxxxxxxxxxxxxxx"
RUNWAY_API_KEY="rnwy_xxxxxxxxxxxxxxxxxxxx"
ELEVENLABS_API_KEY="xxxxxxxxxxxxxxxxxxxx"

# ============================================
# AWS
# ============================================
AWS_ACCESS_KEY_ID="AKIAXXXXXXXXXXXX"
AWS_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxx"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="phoenixforge-files"
AWS_CLOUDFRONT_URL="https://d111111abcdef8.cloudfront.net"

# ============================================
# AUTHENTICATION
# ============================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxx"

# ============================================
# PAYMENTS
# ============================================
STRIPE_PUBLIC_KEY="pk_live_xxxxxxxxxxxxxxxxxxxx"
STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_SPARK="price_xxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_BLAZE="price_xxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_INFERNO="price_xxxxxxxxxxxxxxxxxxxx"

# ============================================
# MONITORING
# ============================================
SENTRY_DSN="https://xxxxxxxxxxxxxxxxxxxx@sentry.io/1234567"
NEXT_PUBLIC_MIXPANEL_TOKEN="xxxxxxxxxxxxxxxxxxxx"
GOOGLE_ANALYTICS_ID="G-XXXXXXXXXX"

# ============================================
# EMAIL
# ============================================
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
FROM_EMAIL="noreply@phoenixforge.ai"

# ============================================
# FEATURES
# ============================================
ENABLE_COVERS=true
ENABLE_IMAGES=true
ENABLE_VIDEOS=true
ENABLE_FORMAT=true
ENABLE_VOICE=false
ENABLE_API=true
```

---

## 🚀 Deployment Process

### Step-by-Step Deployment

**1. Frontend (Vercel)**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd website
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
# ... add all env vars
```

**2. Backend (Railway)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
cd backend
railway up

# Set environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set REDIS_URL="redis://..."
# ... add all env vars
```

**3. Database (Supabase)**
```bash
# Run migrations
psql $DATABASE_URL < database-schema.sql
psql $DATABASE_URL < database-updates.sql

# Or use Supabase CLI
supabase db push
```

---

## 📈 Performance Optimization

### Caching Strategy

```typescript
// Next.js caching
export const revalidate = 3600 // 1 hour

// React Query caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 min
      cacheTime: 10 * 60 * 1000, // 10 min
      refetchOnWindowFocus: false
    }
  }
})

// Redis caching
const getCachedData = async (key) => {
  const cached = await redis.get(key)
  if (cached) return JSON.parse(cached)
  
  const data = await fetchData()
  await redis.setex(key, 3600, JSON.stringify(data))
  return data
}
```

---

## 📝 API Documentation

**Swagger/OpenAPI:**
```yaml
# openapi.yaml
openapi: 3.0.0
info:
  title: PhoenixForge AI API
  version: 1.0.0
  description: AI-powered book production tools

servers:
  - url: https://api.phoenixforge.ai/v1

paths:
  /covers/generate:
    post:
      summary: Generate book covers
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                title:
                  type: string
                author:
                  type: string
                genre:
                  type: string
                  enum: [fantasy, romance, thriller, scifi]
                description:
                  type: string
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: object
                properties:
                  jobId:
                    type: string
                  status:
                    type: string
```

---

## 🎯 Success Metrics

**Performance Targets:**
- Frontend load time: < 2s
- API response time: < 500ms
- Cover generation: < 2 min
- Format processing: < 5 min
- Uptime: 99.9%

**Cost Targets:**
- AI costs: < $5/user/month
- Infrastructure: < $2/user/month
- Total COGS: < $7/user/month
- Target margin: 85%

---

*This technical stack is designed for scale, supporting 100,000+ users while maintaining excellent performance and reliability.*

---

**Last Updated:** November 3, 2025  
**Maintained by:** PhoenixForge AI Engineering Team  
**Questions?** engineering@phoenixforge.ai
