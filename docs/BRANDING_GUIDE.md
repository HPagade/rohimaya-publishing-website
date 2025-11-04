# 🎨 Rohimaya Publishing - Brand Guidelines

Official brand identity and design system.

---

## Brand Story

**Rohimaya Publishing** combines the phoenix (rebirth, transformation) with the peacock (beauty, elegance) to represent authors' creative journey—transforming ideas into beautiful published works.

**Tagline:** "Where Stories Take Shape"

---

## Color Palette

### Primary Colors

**Phoenix Orange** `#FF8C42`
- Primary CTAs and actions
- Energy, creativity, transformation
- Use for: buttons, highlights, important elements

**Peacock Teal** `#4A9B9B`
- Secondary actions and calm elements
- Elegance, growth, professionalism
- Use for: secondary buttons, borders, accents

**Midnight Navy** `#1A1A2E`
- Main text and headers
- Professionalism, depth, authority
- Use for: body text, headings, dark backgrounds

### Secondary Colors

**Phoenix Gold** `#FFD700`
- Accents and highlights
- Premium feel, success
- Use sparingly for special elements

**Deep Teal** `#2F5F5F`
- Darker teal for gradients
- Depth, sophistication
- Use for: gradients, shadows

**Peacock Blue-Gray** `#7B9AA8`
- Subtle accents and borders
- Calm, balanced
- Use for: subtle UI elements

**Cream** `#FFF8E7`
- Backgrounds, light areas
- Warmth, approachability
- Use for: page backgrounds, cards

**Bronze** `#B87333`
- Alternative accent color
- Vintage, literary feel
- Use for: special occasions

---

## Typography

### Headings
**Playfair Display** (serif)
- Elegant, classic, literary
- Use for all H1, H2, H3
- Weights: Regular (400), Bold (700)

```css
font-family: 'Playfair Display', serif;
```

### Body Text
**Inter** (sans-serif)
- Clean, modern, readable
- Use for all body text, UI elements
- Weights: Light (300), Regular (400), Semibold (600)

```css
font-family: 'Inter', sans-serif;
```

### Code
**Fira Code** (monospace)
- For code blocks only

```css
font-family: 'Fira Code', monospace;
```

---

## Logo Usage

### The Medallion
- Circular design with phoenix and peacock
- Always maintain aspect ratio
- Minimum size: 40px × 40px
- Clear space: at least 10px on all sides

### Color Variations
- **Full color:** On light backgrounds
- **White:** On dark backgrounds
- **Monochrome:** When necessary

### Don'ts
- ❌ Don't stretch or distort
- ❌ Don't change colors
- ❌ Don't add effects or shadows
- ❌ Don't place on busy backgrounds

---

## UI Components

### Buttons

**Primary Button**
```css
background: linear-gradient(135deg, #FF8C42, #FFD700);
color: #1A1A2E;
border-radius: 10px;
padding: 12px 24px;
font-weight: 600;
```

**Secondary Button**
```css
background: linear-gradient(135deg, #4A9B9B, #7B9AA8);
color: white;
border-radius: 10px;
padding: 12px 24px;
```

### Cards
```css
background: white;
border: 2px solid #4A9B9B;
border-radius: 12px;
padding: 24px;
box-shadow: 0 4px 6px rgba(0,0,0,0.1);
```

### Gradients
```css
/* Phoenix Gradient */
linear-gradient(135deg, #FF8C42, #FFD700)

/* Peacock Gradient */
linear-gradient(135deg, #4A9B9B, #2F5F5F)

/* Dark Gradient */
linear-gradient(180deg, #1A1A2E, #2F5F5F)
```

---

## Voice & Tone

### Brand Voice
- **Empowering:** "You can do this"
- **Knowledgeable:** Expert but approachable
- **Magical:** Reference phoenix & peacock mythology
- **Professional:** Serious about helping authors
- **Friendly:** Like talking to a fellow author

### Writing Style
- Use active voice
- Short, clear sentences
- Avoid jargon
- Be encouraging and supportive
- Inject personality where appropriate

### Example Phrases
✅ "Transform your manuscript in minutes"
✅ "Where stories take shape"
✅ "Rise like the phoenix, shine like the peacock"
✅ "Your story deserves professional quality"

❌ "Utilize our revolutionary platform"
❌ "Synergize your workflow"
❌ "Best-in-class solutions"

---

## Iconography

### Icon Style
- Line icons preferred
- 2px stroke weight
- Rounded corners
- Consistent sizing

### Emoji Usage
- 🦚 Peacock - Brand identifier
- 🔥 Phoenix/Fire - Transformation
- ✨ Sparkles - Magic/AI
- 📚 Books - Content/Publishing
- 🎨 Art - Creativity

---

## Spacing System

Use 8px base unit:
- xs: 8px
- sm: 16px
- md: 24px
- lg: 32px
- xl: 48px
- 2xl: 64px

---

## Accessibility

### Color Contrast
- All text meets WCAG AA standards
- Important text meets AAA standards
- Never rely on color alone for meaning

### Font Sizes
- Minimum body text: 16px
- Minimum UI text: 14px
- Headings: scale up from 24px

---

## Application Examples

### Streamlit Apps
All Streamlit apps use the shared branding module:

```python
from shared import apply_rohimaya_styling, display_logo_header

apply_rohimaya_styling()
display_logo_header("App Name")
```

### Web Platform
CSS variables for consistency:

```css
:root {
    --phoenix-orange: #FF8C42;
    --phoenix-gold: #FFD700;
    --peacock-teal: #4A9B9B;
    --midnight-navy: #1A1A2E;
    --cream: #FFF8E7;
}
```

---

## Brand Assets Location

All brand assets stored in: `/assets/`

- Logo files: `/assets/logo/`
- Color swatches: `/assets/colors/`
- Font recommendations: `/assets/fonts/`

---

## Questions?

Need clarification on brand usage?
Contact: design@rohimayapublishing.com

---

**Where Stories Take Shape** 🦚🔥
