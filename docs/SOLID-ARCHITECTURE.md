# 🏗️ SOLID Architecture - PhoenixForge Platform

**Date:** November 2, 2025
**Goal:** Maintainable, testable, scalable code following SOLID principles

---

## 📚 SOLID PRINCIPLES EXPLAINED

### S - Single Responsibility Principle
**"A class should have one, and only one, reason to change"**

**Before (BAD):**
```javascript
// OpenAI service does EVERYTHING
class OpenAIService {
  analyzeManuscript() { }
  generateCover() { }
  generateImage() { }
  generateVideo() { }
  textToSpeech() { }
}
```

**After (GOOD):**
```javascript
// Each service has ONE responsibility
class TextAnalysisService { analyzeManuscript() { } }
class ImageGenerationService { generateImage() { } }
class AudioGenerationService { textToSpeech() { } }
```

---

### O - Open/Closed Principle
**"Open for extension, closed for modification"**

**Before (BAD):**
```javascript
// Have to modify this function for every new AI provider
function generateImage(prompt) {
  if (provider === 'openai') {
    // OpenAI code
  } else if (provider === 'anthropic') {
    // Anthropic code
  } else if (provider === 'gemini') {
    // Google code
  }
}
```

**After (GOOD):**
```javascript
// Add new providers without modifying existing code
interface ImageProvider {
  generateImage(prompt: string): Promise<string>;
}

class OpenAIImageProvider implements ImageProvider { }
class AnthropicImageProvider implements ImageProvider { }
class GeminiImageProvider implements ImageProvider { }

// Use any provider without changing code
const provider: ImageProvider = new OpenAIImageProvider();
const image = await provider.generateImage(prompt);
```

---

### L - Liskov Substitution Principle
**"Subtypes must be substitutable for their base types"**

**Before (BAD):**
```javascript
class OpenAIProvider {
  generateImage(prompt, size) { } // Takes size parameter
}

class AnthropicProvider {
  generateImage(prompt) { } // No size parameter - BREAKS CONTRACT
}
```

**After (GOOD):**
```javascript
interface ImageProvider {
  generateImage(options: ImageOptions): Promise<ImageResult>;
}

// Both follow the same contract
class OpenAIProvider implements ImageProvider {
  generateImage(options: ImageOptions): Promise<ImageResult> { }
}

class AnthropicProvider implements ImageProvider {
  generateImage(options: ImageOptions): Promise<ImageResult> { }
}

// Can swap providers without breaking code
let provider: ImageProvider = new OpenAIProvider();
provider = new AnthropicProvider(); // Works perfectly
```

---

### I - Interface Segregation Principle
**"Many client-specific interfaces are better than one general-purpose interface"**

**Before (BAD):**
```javascript
interface AIProvider {
  generateText();
  generateImage();
  generateAudio();
  generateVideo();
  analyzeText();
  // Every provider must implement ALL methods even if not supported
}
```

**After (GOOD):**
```javascript
// Small, focused interfaces
interface TextGenerator {
  generateText(prompt: string): Promise<string>;
}

interface ImageGenerator {
  generateImage(options: ImageOptions): Promise<ImageResult>;
}

interface AudioGenerator {
  generateAudio(options: AudioOptions): Promise<AudioResult>;
}

// Providers only implement what they support
class OpenAIProvider implements TextGenerator, ImageGenerator, AudioGenerator { }
class StabilityAI implements ImageGenerator { } // Only images
class ElevenLabs implements AudioGenerator { } // Only audio
```

---

### D - Dependency Inversion Principle
**"Depend on abstractions, not concretions"**

**Before (BAD):**
```javascript
class BookFormatter {
  constructor() {
    this.openai = new OpenAI(process.env.OPENAI_API_KEY); // Tightly coupled
  }

  async format(text) {
    return await this.openai.analyzeText(text); // Can't test, can't swap
  }
}
```

**After (GOOD):**
```javascript
interface TextAnalyzer {
  analyzeText(text: string): Promise<Analysis>;
}

class BookFormatter {
  constructor(private analyzer: TextAnalyzer) { } // Depends on abstraction

  async format(text) {
    return await this.analyzer.analyzeText(text); // Can inject any analyzer
  }
}

// Usage
const analyzer = new OpenAIAnalyzer(); // or AnthropicAnalyzer, or MockAnalyzer
const formatter = new BookFormatter(analyzer);
```

---

## 🏗️ NEW ARCHITECTURE

### Directory Structure

```
server/
├── src/
│   ├── interfaces/          # Contracts/Abstractions (D)
│   │   ├── ITextAnalyzer.ts
│   │   ├── IImageGenerator.ts
│   │   ├── IAudioGenerator.ts
│   │   ├── IDocumentParser.ts
│   │   ├── IFileExporter.ts
│   │   └── IRepository.ts
│   │
│   ├── services/            # Business Logic (S)
│   │   ├── formatter/
│   │   │   ├── DocumentFormatter.ts
│   │   │   └── ChapterDetector.ts
│   │   ├── audiobook/
│   │   │   ├── AudiobookGenerator.ts
│   │   │   └── VoiceSelector.ts
│   │   ├── covers/
│   │   │   ├── CoverGenerator.ts
│   │   │   └── TemplateManager.ts
│   │   └── images/
│   │       ├── ImageGenerator.ts
│   │       └── StyleManager.ts
│   │
│   ├── providers/           # AI Provider Implementations (O, L, I)
│   │   ├── openai/
│   │   │   ├── OpenAITextAnalyzer.ts
│   │   │   ├── OpenAIImageGenerator.ts
│   │   │   └── OpenAIAudioGenerator.ts
│   │   ├── anthropic/
│   │   │   └── AnthropicTextAnalyzer.ts
│   │   └── stability/
│   │       └── StabilityImageGenerator.ts
│   │
│   ├── repositories/        # Data Access Layer (S, D)
│   │   ├── UserRepository.ts
│   │   ├── JobRepository.ts
│   │   └── UsageRepository.ts
│   │
│   ├── parsers/             # File Parsing (S, O)
│   │   ├── PDFParser.ts
│   │   ├── DOCXParser.ts
│   │   └── TXTParser.ts
│   │
│   ├── exporters/           # File Export (S, O)
│   │   ├── PDFExporter.ts
│   │   ├── EPUBExporter.ts
│   │   └── MP3Exporter.ts
│   │
│   ├── controllers/         # HTTP Handlers
│   │   ├── FormatterController.ts
│   │   └── AudiobookController.ts
│   │
│   └── config/              # Configuration & DI Container
│       ├── container.ts     # Dependency Injection
│       └── providers.ts     # Provider Selection
```

---

## 💉 DEPENDENCY INJECTION

### Container Setup

```typescript
// config/container.ts
import { Container } from 'inversify';
import { ITextAnalyzer } from '../interfaces/ITextAnalyzer';
import { OpenAITextAnalyzer } from '../providers/openai/OpenAITextAnalyzer';

const container = new Container();

// Bind interfaces to implementations
container.bind<ITextAnalyzer>('ITextAnalyzer').to(OpenAITextAnalyzer);
container.bind<IImageGenerator>('IImageGenerator').to(OpenAIImageGenerator);
container.bind<IAudioGenerator>('IAudioGenerator').to(OpenAIAudioGenerator);

// Switch providers easily
if (process.env.USE_ANTHROPIC === 'true') {
  container.rebind<ITextAnalyzer>('ITextAnalyzer').to(AnthropicTextAnalyzer);
}

export { container };
```

### Service with DI

```typescript
// services/formatter/DocumentFormatter.ts
import { injectable, inject } from 'inversify';

@injectable()
class DocumentFormatter {
  constructor(
    @inject('ITextAnalyzer') private analyzer: ITextAnalyzer,
    @inject('IDocumentParser') private parser: IDocumentParser,
    @inject('IFileExporter') private exporter: IFileExporter
  ) {}

  async formatDocument(file: File): Promise<FormattedDocument> {
    const text = await this.parser.parse(file);
    const analysis = await this.analyzer.analyzeText(text);
    const formatted = this.applyFormatting(text, analysis);
    return await this.exporter.export(formatted);
  }
}
```

---

## 📝 INTERFACES (CONTRACTS)

### ITextAnalyzer.ts

```typescript
export interface TextAnalysisResult {
  chapters: Chapter[];
  wordCount: number;
  readingLevel: string;
  genre?: string;
}

export interface ITextAnalyzer {
  analyzeText(text: string, options?: AnalysisOptions): Promise<TextAnalysisResult>;
  detectChapters(text: string): Promise<Chapter[]>;
  estimateReadingTime(wordCount: number): number;
}
```

### IImageGenerator.ts

```typescript
export interface ImageGenerationOptions {
  prompt: string;
  style?: string;
  size?: '1024x1024' | '1024x1792' | '1792x1024';
  quality?: 'standard' | 'hd';
}

export interface ImageResult {
  url: string;
  width: number;
  height: number;
  format: string;
  cost?: number;
}

export interface IImageGenerator {
  generateImage(options: ImageGenerationOptions): Promise<ImageResult>;
  generateBatch(options: ImageGenerationOptions, count: number): Promise<ImageResult[]>;
  estimateCost(options: ImageGenerationOptions): number;
}
```

### IAudioGenerator.ts

```typescript
export interface AudioGenerationOptions {
  text: string;
  voice: string;
  speed?: number;
  format?: 'mp3' | 'wav';
}

export interface AudioResult {
  url: string;
  duration: number;
  size: number;
  format: string;
  cost?: number;
}

export interface IAudioGenerator {
  generateAudio(options: AudioGenerationOptions): Promise<AudioResult>;
  listVoices(): Promise<Voice[]>;
  estimateCost(textLength: number, voice: string): number;
}
```

### IRepository.ts

```typescript
export interface IRepository<T> {
  findById(id: string): Promise<T | null>;
  findAll(filter?: any): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
}

// Specific repositories extend base
export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByClerkId(clerkId: string): Promise<User | null>;
}

export interface IJobRepository extends IRepository<Job> {
  findByUserId(userId: string): Promise<Job[]>;
  findPending(): Promise<Job[]>;
}
```

---

## 🔧 PROVIDER IMPLEMENTATIONS

### OpenAITextAnalyzer.ts

```typescript
import { injectable } from 'inversify';
import { ITextAnalyzer, TextAnalysisResult } from '../../interfaces/ITextAnalyzer';
import OpenAI from 'openai';

@injectable()
export class OpenAITextAnalyzer implements ITextAnalyzer {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async analyzeText(text: string, options?: AnalysisOptions): Promise<TextAnalysisResult> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Analyze this manuscript and detect chapters.' },
        { role: 'user', content: text.substring(0, 15000) }
      ],
      temperature: 0.3
    });

    return this.parseResponse(response);
  }

  async detectChapters(text: string): Promise<Chapter[]> {
    // Implementation
  }

  estimateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 200); // 200 words per minute
  }

  private parseResponse(response: any): TextAnalysisResult {
    // Parse OpenAI response
  }
}
```

### AnthropicTextAnalyzer.ts

```typescript
import { injectable } from 'inversify';
import { ITextAnalyzer, TextAnalysisResult } from '../../interfaces/ITextAnalyzer';
import Anthropic from '@anthropic-ai/sdk';

@injectable()
export class AnthropicTextAnalyzer implements ITextAnalyzer {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }

  async analyzeText(text: string, options?: AnalysisOptions): Promise<TextAnalysisResult> {
    const response = await this.client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: `Analyze this manuscript: ${text.substring(0, 15000)}`
      }]
    });

    return this.parseResponse(response);
  }

  async detectChapters(text: string): Promise<Chapter[]> {
    // Implementation
  }

  estimateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 200);
  }

  private parseResponse(response: any): TextAnalysisResult {
    // Parse Anthropic response
  }
}
```

---

## 🎯 REACT COMPONENTS (SOLID)

### Single Responsibility in React

**Before (BAD):**
```typescript
// Component does EVERYTHING
function FormatterPage() {
  const [file, setFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // Upload logic
  const handleUpload = async () => { /* ... */ };

  // API calls
  const analyzeFile = async () => { /* ... */ };

  // Processing logic
  const processDocument = async () => { /* ... */ };

  // Rendering logic
  return <div>{/* ... */}</div>;
}
```

**After (GOOD):**
```typescript
// Separate concerns into custom hooks and services

// Custom hook for file upload
function useFileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File) => { /* ... */ };

  return { file, uploading, upload };
}

// Custom hook for document processing
function useDocumentProcessor() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const process = async (file: File) => { /* ... */ };

  return { processing, result, process };
}

// Service layer (separate from UI)
class DocumentService {
  constructor(private apiClient: ApiClient) {}

  async analyze(file: File): Promise<AnalysisResult> {
    return await this.apiClient.post('/analyze', file);
  }
}

// Component only handles UI
function FormatterPage() {
  const { file, uploading, upload } = useFileUpload();
  const { processing, result, process } = useDocumentProcessor();

  return (
    <div>
      <FileUploader onUpload={upload} loading={uploading} />
      {file && <ProcessButton onClick={() => process(file)} loading={processing} />}
      {result && <ResultDisplay result={result} />}
    </div>
  );
}
```

---

## ✅ BENEFITS OF SOLID ARCHITECTURE

### 1. Easy to Switch AI Providers

```typescript
// Development: Use OpenAI
container.bind<ITextAnalyzer>('ITextAnalyzer').to(OpenAITextAnalyzer);

// Production: Switch to Anthropic
container.bind<ITextAnalyzer>('ITextAnalyzer').to(AnthropicTextAnalyzer);

// No code changes needed in services!
```

### 2. Easy to Test

```typescript
// Mock implementation for testing
class MockTextAnalyzer implements ITextAnalyzer {
  async analyzeText(text: string): Promise<TextAnalysisResult> {
    return {
      chapters: [{ title: 'Test Chapter', content: 'Test content' }],
      wordCount: 1000,
      readingLevel: 'intermediate'
    };
  }
}

// Test with mock
const mockAnalyzer = new MockTextAnalyzer();
const formatter = new DocumentFormatter(mockAnalyzer, mockParser, mockExporter);
const result = await formatter.formatDocument(testFile);
// No API calls, instant tests!
```

### 3. Easy to Add Features

```typescript
// Add new provider without touching existing code
class GeminiTextAnalyzer implements ITextAnalyzer {
  async analyzeText(text: string): Promise<TextAnalysisResult> {
    // Google Gemini implementation
  }
}

// Register and use
container.bind<ITextAnalyzer>('ITextAnalyzer').to(GeminiTextAnalyzer);
```

### 4. Easy to Maintain

```typescript
// Each file has ONE responsibility
// Bug in chapter detection? Fix ChapterDetector.ts only
// Need better images? Update ImageGenerator.ts only
// Want different database? Update Repository.ts only
```

### 5. Easy to Scale

```typescript
// Add caching layer without changing services
class CachedImageGenerator implements IImageGenerator {
  constructor(
    private generator: IImageGenerator,
    private cache: ICache
  ) {}

  async generateImage(options: ImageGenerationOptions): Promise<ImageResult> {
    const cached = await this.cache.get(options.prompt);
    if (cached) return cached;

    const result = await this.generator.generateImage(options);
    await this.cache.set(options.prompt, result);
    return result;
  }
}
```

---

## 🧪 TESTING STRATEGY

### Unit Tests (Services)

```typescript
describe('DocumentFormatter', () => {
  let formatter: DocumentFormatter;
  let mockAnalyzer: ITextAnalyzer;
  let mockParser: IDocumentParser;
  let mockExporter: IFileExporter;

  beforeEach(() => {
    mockAnalyzer = new MockTextAnalyzer();
    mockParser = new MockDocumentParser();
    mockExporter = new MockFileExporter();
    formatter = new DocumentFormatter(mockAnalyzer, mockParser, mockExporter);
  });

  it('should format document correctly', async () => {
    const file = createTestFile();
    const result = await formatter.formatDocument(file);

    expect(result.chapters).toHaveLength(3);
    expect(result.wordCount).toBeGreaterThan(0);
  });

  it('should handle errors gracefully', async () => {
    mockParser.parse = jest.fn().mockRejectedValue(new Error('Parse error'));

    await expect(formatter.formatDocument(testFile)).rejects.toThrow('Parse error');
  });
});
```

### Integration Tests (API)

```typescript
describe('Formatter API', () => {
  it('should process uploaded file', async () => {
    const response = await request(app)
      .post('/api/formatter/upload')
      .attach('file', 'test-manuscript.docx')
      .field('title', 'Test Book');

    expect(response.status).toBe(200);
    expect(response.body.jobId).toBeDefined();
  });
});
```

---

## 📦 IMPLEMENTATION PLAN

### Phase 1: Core Interfaces (Week 1)
- [ ] Create all interface definitions
- [ ] Set up dependency injection container
- [ ] Create base implementations

### Phase 2: Refactor Services (Week 2)
- [ ] Refactor OpenAI services to implement interfaces
- [ ] Extract business logic from controllers
- [ ] Implement repository pattern

### Phase 3: Add Tests (Week 3)
- [ ] Write unit tests for all services
- [ ] Create mock implementations
- [ ] Add integration tests

### Phase 4: Alternative Providers (Future)
- [ ] Implement Anthropic provider
- [ ] Implement Stability AI provider
- [ ] Add provider selection UI

---

## 🎓 SUMMARY

**SOLID Makes Your Code:**
- ✅ **Maintainable** - Easy to understand and modify
- ✅ **Testable** - Can test without external dependencies
- ✅ **Flexible** - Easy to add new features
- ✅ **Scalable** - Can grow without rewriting
- ✅ **Future-proof** - Easy to switch technologies

**Key Takeaways:**
1. **S**eparate concerns - One class, one job
2. **O**pen for extension - Add features without modifying existing code
3. **L**iskov substitution - Interfaces must be consistent
4. **I**nterface segregation - Small, focused contracts
5. **D**ependency injection - Depend on abstractions

**Next Steps:**
1. Review this document
2. I'll implement the core interfaces
3. Refactor existing services
4. Add tests
5. Deploy with confidence!

---

**Following SOLID = Professional, maintainable, scalable software** 🏗️
