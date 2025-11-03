# Contributing to PhoenixForge AI

Thank you for your interest in contributing to PhoenixForge AI! 🔥

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Pull Request Process](#pull-request-process)
- [Community](#community)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers
- ✅ Provide constructive feedback
- ✅ Focus on what's best for the community
- ✅ Show empathy towards others

### Unacceptable Behavior

- ❌ Harassment or discrimination
- ❌ Trolling or insulting comments
- ❌ Personal or political attacks
- ❌ Publishing others' private information
- ❌ Other unprofessional conduct

---

## Getting Started

### Prerequisites

```bash
Node.js 20+
npm or yarn
PostgreSQL 15+
Redis 7+
Git
```

### Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rohimaya-publishing-website.git
   cd rohimaya-publishing-website
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env
   # Add your API keys
   ```
5. **Run database migrations**
   ```bash
   npm run db:migrate
   ```
6. **Start development server**
   ```bash
   npm run dev
   ```

---

## How to Contribute

### Report Bugs 🐛

1. Check if the bug already exists in Issues
2. If not, create a new issue with:
   - Clear title
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggest Features 💡

1. Open a GitHub Discussion
2. Describe the feature
3. Explain the use case
4. Provide examples
5. Tag as `enhancement`

### Submit Code 🔧

1. Find an issue to work on (or create one)
2. Comment that you're working on it
3. Fork and create a branch
4. Make your changes
5. Test thoroughly
6. Submit a pull request

---

## Development Guidelines

### Code Style

**TypeScript:**
```typescript
// Use descriptive names
const generateBookCover = async (request: CoverRequest): Promise<Cover[]> => {
  // Implementation
}

// Add JSDoc comments
/**
 * Generates book covers using AI
 * @param request - Cover generation parameters
 * @returns Array of generated cover variations
 */
```

**React Components:**
```typescript
// Use functional components with hooks
export function CoverGenerator({ userId }: CoverGeneratorProps) {
  const [covers, setCovers] = useState<Cover[]>([]);
  
  return (
    <div className="space-y-4">
      {/* Component content */}
    </div>
  );
}
```

### File Structure

```
src/
├── components/      # React components
├── pages/          # Next.js pages
├── lib/            # Utilities & helpers
├── hooks/          # Custom React hooks
├── services/       # API services
├── types/          # TypeScript types
└── styles/         # Global styles
```

### Naming Conventions

- **Files:** `kebab-case.ts`
- **Components:** `PascalCase.tsx`
- **Functions:** `camelCase()`
- **Constants:** `UPPER_SNAKE_CASE`
- **Types:** `PascalCase`

### Testing

```bash
# Run all tests
npm test

# Run specific test
npm test CoverGenerator

# Watch mode
npm test -- --watch

# Coverage
npm run test:coverage
```

**Write tests for:**
- New features
- Bug fixes
- Edge cases
- Error handling

### Commit Messages

Format: `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
feat(covers): add romance genre template
fix(api): resolve rate limiting bug
docs(readme): update installation steps
test(format): add chapter detection tests
```

---

## Pull Request Process

### Before Submitting

✅ Code follows style guidelines
✅ Tests pass (`npm test`)
✅ Linting passes (`npm run lint`)
✅ Documentation updated
✅ CHANGELOG.md updated
✅ Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Tests pass
- [ ] Docs updated
- [ ] CHANGELOG updated
```

### Review Process

1. Automated checks must pass
2. At least 1 maintainer approval required
3. Address review feedback
4. Squash commits before merge
5. Maintainer merges PR

---

## Community

### Get Help

- **Discord:** https://discord.gg/phoenixforge
- **Discussions:** GitHub Discussions
- **Email:** dev@phoenixforge.ai

### Stay Updated

- **Twitter:** @phoenixforge
- **Blog:** blog.phoenixforge.ai
- **Newsletter:** phoenixforge.ai/newsletter

---

## Recognition

Contributors are recognized in:
- README.md Contributors section
- Release notes
- Annual contributor awards
- Swag for significant contributions!

---

**Thank you for helping make PhoenixForge AI better!** 🔥

*Where Stories Take Shape*
