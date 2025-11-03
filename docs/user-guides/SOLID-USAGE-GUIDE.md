# 🎯 SOLID Usage Guide - Practical Examples

**How to use the SOLID architecture in your code**

---

## 📦 What We Built

### Interfaces (Contracts)
- `ITextAnalyzer` - Text analysis abstraction
- `IAudioGenerator` - Audio generation abstraction
- `IImageGenerator` - Image generation abstraction
- `IRepository` - Database access abstraction

### Implementations
- `OpenAITextAnalyzer` - OpenAI GPT-4 implementation
- `OpenAIAudioGenerator` - OpenAI TTS implementation
- `UserRepository` - Supabase database implementation

### Container
- `Container` - Dependency injection system
- `getService()` - Helper to retrieve services

---

## 🚀 QUICK START

### 1. Using Services in Controllers

```typescript
// server/src/controllers/FormatterController.ts
import { getService } from '../config/container';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';
import { IUserRepository } from '../interfaces/IRepository';

export class FormatterController {
  // Get services from container (automatic dependency injection)
  private analyzer = getService<ITextAnalyzer>('ITextAnalyzer');
  private userRepo = getService<IUserRepository>('IUserRepository');

  async analyzeManuscript(req, res) {
    try {
      const { text, userId } = req.body;

      // Use analyzer (doesn't care if it's OpenAI, Anthropic, or Claude)
      const analysis = await this.analyzer.analyzeText(text);

      // Use repository (doesn't care if it's Supabase, Postgres, or MongoDB)
      const user = await this.userRepo.findById(userId);

      res.json({
        success: true,
        data: {
          analysis,
          user: user?.email
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

### 2. Using Services in Business Logic

```typescript
// server/src/services/BookFormatter.ts
import { getService } from '../config/container';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';

export class BookFormatter {
  private analyzer = getService<ITextAnalyzer>('ITextAnalyzer');

  async formatManuscript(text: string, title: string, author: string) {
    // Analyze text structure
    const analysis = await this.analyzer.analyzeText(text, {
      detectChapters: true,
      analyzeGenre: true
    });

    // Apply formatting based on analysis
    const formatted = {
      title,
      author,
      ...analysis,
      formattedText: this.applyFormatting(text, analysis)
    };

    return formatted;
  }

  private applyFormatting(text: string, analysis: any): string {
    // Your formatting logic here
    return text;
  }
}
```

---

## 🔄 SWITCHING PROVIDERS

### Switch AI Provider Without Changing Code

**Step 1: Create new provider (implements same interface)**

```typescript
// server/src/providers/anthropic/AnthropicTextAnalyzer.ts
import Anthropic from '@anthropic-ai/sdk';
import { ITextAnalyzer, TextAnalysisResult } from '../../interfaces/ITextAnalyzer';

export class AnthropicTextAnalyzer implements ITextAnalyzer {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
  }

  async analyzeText(text: string): Promise<TextAnalysisResult> {
    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Analyze this manuscript: ${text}`
      }]
    });

    // Parse response and return same structure
    return this.parseResponse(response);
  }

  // Implement other interface methods...
  detectChapters(text: string): Promise<Chapter[]> { /* ... */ }
  estimateReadingTime(wordCount: number): number { /* ... */ }
  isConfigured(): boolean { /* ... */ }
  getProviderName(): string { return 'Anthropic Claude'; }
  estimateCost(textLength: number): number { /* ... */ }
}
```

**Step 2: Register in container**

```typescript
// server/src/config/container.ts
import { AnthropicTextAnalyzer } from '../providers/anthropic/AnthropicTextAnalyzer';

// In registerServices():
if (process.env.USE_ANTHROPIC === 'true') {
  this.register<ITextAnalyzer>(
    'ITextAnalyzer',
    () => new AnthropicTextAnalyzer()
  );
} else {
  this.register<ITextAnalyzer>(
    'ITextAnalyzer',
    () => new OpenAITextAnalyzer()
  );
}
```

**Step 3: Set environment variable**

```bash
# .env
USE_ANTHROPIC=true
```

**That's it! No code changes needed anywhere else** ✨

---

## 🧪 TESTING WITH MOCKS

### Create Mock Implementation

```typescript
// server/src/__mocks__/MockTextAnalyzer.ts
import { ITextAnalyzer, TextAnalysisResult, Chapter } from '../interfaces/ITextAnalyzer';

export class MockTextAnalyzer implements ITextAnalyzer {
  async analyzeText(text: string): Promise<TextAnalysisResult> {
    return {
      chapters: [
        {
          number: 1,
          title: 'Test Chapter',
          startIndex: 0,
          endIndex: 100,
          content: 'Test content',
          wordCount: 10
        }
      ],
      wordCount: 100,
      pageCount: 1,
      readingTime: 1,
      readingLevel: 'Easy',
      genre: 'Fiction'
    };
  }

  async detectChapters(text: string): Promise<Chapter[]> {
    return [];
  }

  estimateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 200);
  }

  isConfigured(): boolean {
    return true;
  }

  getProviderName(): string {
    return 'Mock';
  }

  estimateCost(textLength: number): number {
    return 0; // Free in tests!
  }
}
```

### Use Mock in Tests

```typescript
// server/src/__tests__/BookFormatter.test.ts
import { Container } from '../config/container';
import { MockTextAnalyzer } from '../__mocks__/MockTextAnalyzer';
import { BookFormatter } from '../services/BookFormatter';

describe('BookFormatter', () => {
  beforeEach(() => {
    // Replace real analyzer with mock
    Container.getInstance().replace(
      'ITextAnalyzer',
      () => new MockTextAnalyzer()
    );
  });

  it('should format manuscript', async () => {
    const formatter = new BookFormatter();
    const result = await formatter.formatManuscript('Test text', 'Test Book', 'Test Author');

    expect(result.chapters).toHaveLength(1);
    expect(result.wordCount).toBe(100);
    // No API calls made! Fast test!
  });
});
```

---

## 🎯 REAL-WORLD EXAMPLES

### Example 1: Formatter API Endpoint

```typescript
// server/src/routes/formatter.routes.ts
import express from 'express';
import { FormatterController } from '../controllers/FormatterController';

const router = express.Router();
const controller = new FormatterController();

router.post('/analyze', async (req, res) => {
  await controller.analyzeManuscript(req, res);
});

export default router;
```

```typescript
// server/src/controllers/FormatterController.ts
import { getService } from '../config/container';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';
import { IUserRepository } from '../interfaces/IRepository';

export class FormatterController {
  private analyzer = getService<ITextAnalyzer>('ITextAnalyzer');
  private userRepo = getService<IUserRepository>('IUserRepository');

  async analyzeManuscript(req, res) {
    const { text, userId } = req.body;

    // Check if user exists and has quota
    const user = await this.userRepo.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Analyze manuscript (uses whatever provider is configured)
    const analysis = await this.analyzer.analyzeText(text, {
      detectChapters: true,
      analyzeGenre: true
    });

    res.json({
      success: true,
      data: {
        ...analysis,
        cost: this.analyzer.estimateCost(text.length)
      }
    });
  }
}
```

### Example 2: Audiobook Generation

```typescript
// server/src/services/AudiobookService.ts
import { getService } from '../config/container';
import { IAudioGenerator } from '../interfaces/IAudioGenerator';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';

export class AudiobookService {
  private audioGenerator = getService<IAudioGenerator>('IAudioGenerator');
  private textAnalyzer = getService<ITextAnalyzer>('ITextAnalyzer');

  async generateAudiobook(text: string, voice: string) {
    // Step 1: Analyze text to get chapters
    const analysis = await this.textAnalyzer.analyzeText(text, {
      detectChapters: true
    });

    // Step 2: Generate audio for each chapter
    const chapters = analysis.chapters.map(ch => ({
      title: ch.title,
      text: ch.content
    }));

    const audioChapters = await this.audioGenerator.generateChapters(chapters, voice);

    // Step 3: Calculate total duration and cost
    const totalDuration = audioChapters.reduce((sum, ch) => sum + ch.duration, 0);
    const totalCost = this.audioGenerator.estimateCost(text.length, voice);

    return {
      chapters: audioChapters,
      totalDuration,
      totalCost,
      provider: this.audioGenerator.getProviderName()
    };
  }

  async listVoices() {
    return await this.audioGenerator.listVoices();
  }
}
```

### Example 3: User Management

```typescript
// server/src/services/UserService.ts
import { getService } from '../config/container';
import { IUserRepository, User } from '../interfaces/IRepository';

export class UserService {
  private userRepo = getService<IUserRepository>('IUserRepository');

  async createUser(clerkId: string, email: string, firstName: string, lastName: string): Promise<User> {
    // Check if user already exists
    const existing = await this.userRepo.findByClerkId(clerkId);
    if (existing) {
      return existing;
    }

    // Create new user with free tier
    return await this.userRepo.create({
      clerkId,
      email,
      firstName,
      lastName,
      subscriptionTier: 'free',
      subscriptionStatus: 'active'
    });
  }

  async upgradeSubscription(userId: string, tier: string, stripeSubscriptionId: string): Promise<User> {
    return await this.userRepo.updateSubscription(userId, {
      tier,
      status: 'active',
      stripeSubscriptionId,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findByEmail(email);
  }
}
```

---

## 💡 BEST PRACTICES

### 1. Always Use Interfaces

```typescript
// ✅ GOOD
private analyzer: ITextAnalyzer = getService<ITextAnalyzer>('ITextAnalyzer');

// ❌ BAD
private analyzer: OpenAITextAnalyzer = new OpenAITextAnalyzer();
```

### 2. Don't Import Concrete Classes in Business Logic

```typescript
// ✅ GOOD
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';

// ❌ BAD
import { OpenAITextAnalyzer } from '../providers/openai/OpenAITextAnalyzer';
```

### 3. Create Small, Focused Services

```typescript
// ✅ GOOD - Each service has ONE responsibility
class TextAnalysisService { }
class AudioGenerationService { }
class ImageGenerationService { }

// ❌ BAD - One service does everything
class AIService {
  analyzeText() { }
  generateAudio() { }
  generateImage() { }
}
```

### 4. Use Dependency Injection

```typescript
// ✅ GOOD - Inject dependencies
class BookFormatter {
  constructor(
    private analyzer: ITextAnalyzer,
    private exporter: IFileExporter
  ) {}
}

// ❌ BAD - Create dependencies inside
class BookFormatter {
  constructor() {
    this.analyzer = new OpenAITextAnalyzer(); // Tightly coupled!
  }
}
```

---

## 🔄 MIGRATION GUIDE

### Migrating Existing Code to SOLID

**Old Code:**
```typescript
// Old way - tightly coupled
import OpenAI from 'openai';

class FormatterService {
  async format(text: string) {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await openai.chat.completions.create({ /* ... */ });
    // Process response...
  }
}
```

**New Code:**
```typescript
// New way - loosely coupled with SOLID
import { getService } from '../config/container';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';

class FormatterService {
  private analyzer = getService<ITextAnalyzer>('ITextAnalyzer');

  async format(text: string) {
    const analysis = await this.analyzer.analyzeText(text);
    // Use analysis...
  }
}
```

**Benefits:**
- ✅ Can switch to Anthropic, Google, etc. without changing code
- ✅ Easy to test with mocks
- ✅ No API key management in business logic
- ✅ Clear separation of concerns

---

## 📚 NEXT STEPS

1. **Review interfaces** - Understand the contracts
2. **Use getService()** - Get dependencies from container
3. **Write tests** - Use mock implementations
4. **Add new providers** - Implement interfaces for other AI services
5. **Refactor gradually** - Move existing code to SOLID pattern

---

## 🎓 KEY TAKEAWAYS

1. **Always depend on interfaces, not implementations**
2. **Use dependency injection container**
3. **One class, one responsibility**
4. **Easy to test with mocks**
5. **Easy to switch providers**

**Following SOLID = Maintainable, testable, scalable code** 🏗️
