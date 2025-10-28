# AI Book Formatter - MVP Wireframes

**Project**: AI Book Formatter (MVP)
**Launch Target**: Nov 4-5, 2025
**Designer**: Claude Code
**Date**: Oct 28, 2025

---

## Design Philosophy

**Clean. Simple. Fast.**
- Minimal steps: Upload → Process → Download
- No user accounts for MVP
- Clear progress indicators
- Professional but approachable
- Mobile-responsive

---

## Color Palette

```
Primary Blue:   #2563EB (Call-to-action buttons)
Success Green:  #10B981 (Complete states)
Warning Orange: #F59E0B (Processing states)
Error Red:      #EF4444 (Errors)
Neutral Gray:   #6B7280 (Secondary text)
Dark Gray:      #1F2937 (Primary text)
Light Gray:     #F3F4F6 (Backgrounds)
White:          #FFFFFF (Cards, modals)
```

---

## Screen 1: Landing Page / Homepage

```
┌──────────────────────────────────────────────────────────────────┐
│                      [Logo] AI Book Formatter                     │
│                                                                    │
│   [Home]  [Pricing]  [Examples]  [FAQ]               [Get Started]│
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                    HERO SECTION                                   │
│                                                                    │
│           Transform Your Manuscript Into                          │
│           Publish-Ready Books in Minutes                          │
│                                                                    │
│     AI-powered formatting for PDF, Kindle, and Audiobooks         │
│                                                                    │
│              [📄 Upload Your Manuscript]                          │
│                                                                    │
│                    .docx  .pdf  .txt                              │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                  HOW IT WORKS                                     │
│                                                                    │
│      ┌───────────┐      ┌───────────┐      ┌───────────┐        │
│      │    📤     │      │    🤖     │      │    📚     │        │
│      │  Upload   │  →   │  AI Magic │  →   │  Download │        │
│      │   File    │      │  Formats  │      │   Books   │        │
│      └───────────┘      └───────────┘      └───────────┘        │
│      1. Upload your      2. AI analyzes     3. Get PDF,          │
│         manuscript          & formats          Kindle, Audio     │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                  PRICING PACKAGES                                 │
│                                                                    │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐      │
│   │  ESSENTIAL   │    │   COMPLETE   │    │   PREMIUM    │      │
│   │              │    │              │    │              │      │
│   │     $79      │    │    $149      │    │    $249      │      │
│   │              │    │              │    │              │      │
│   │ ✓ PDF Export │    │ ✓ Everything │    │ ✓ Everything │      │
│   │ ✓ Kindle     │    │   in Essential│   │   in Complete│      │
│   │              │    │ ✓ Audiobook  │    │ ✓ Priority   │      │
│   │              │    │ ✓ All Voices │    │ ✓ 24hr Rush  │      │
│   │              │    │              │    │ ✓ Revisions  │      │
│   │              │    │              │    │              │      │
│   │  [Select]    │    │  [Select] ⭐ │    │  [Select]    │      │
│   └──────────────┘    └──────────────┘    └──────────────┘      │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                     FEATURES                                      │
│                                                                    │
│  📖 Smart Chapter Detection  |  📐 Professional Formatting         │
│  🎨 Custom Styling Options   |  📱 Mobile-Optimized eBooks        │
│  🎙️ Multiple Voice Options   |  ⚡ 5-Minute Processing            │
│  💾 Secure File Handling     |  ✅ KDP & IngramSpark Ready        │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                     FOOTER                                        │
│                                                                    │
│         © 2025 AI Book Formatter | Privacy | Terms                │
│              support@publishforge.com                             │
└──────────────────────────────────────────────────────────────────┘
```

---

## Screen 2: Upload Screen (Step 1 of 3)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                    │
│                      AI Book Formatter                            │
│                                                                    │
│             ●━━━━━━━━○━━━━━━━━○━━━━━━━━                          │
│           Upload    Process    Download                           │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│          ┌────────────────────────────────────────┐               │
│          │                                        │               │
│          │           📄                           │               │
│          │                                        │               │
│          │     Drop your manuscript here          │               │
│          │              or                        │               │
│          │        [Browse Files]                  │               │
│          │                                        │               │
│          │   Accepts: .docx, .pdf, .txt           │               │
│          │   Max size: 50MB                       │               │
│          │                                        │               │
│          └────────────────────────────────────────┘               │
│                                                                    │
│                                                                    │
│          Book Details (Optional)                                  │
│          ┌────────────────────────────────────────┐               │
│          │ Book Title: [________________]         │               │
│          │ Author:     [________________]         │               │
│          │ Genre:      [▼ Select Genre  ]         │               │
│          └────────────────────────────────────────┘               │
│                                                                    │
│          Genre Options:                                           │
│          • Fiction         • Children's Books                     │
│          • Non-Fiction     • Cookbooks                            │
│          • Poetry          • Memoir                               │
│          • Self-Help       • Business                             │
│                                                                    │
│                                                                    │
│          What outputs do you need?                                │
│          ☑ PDF (Print-Ready)       $29                            │
│          ☑ Kindle (MOBI/KF8)       $29                            │
│          ☐ Audiobook (MP3)         $99                            │
│                                                                    │
│          Audiobook Voice: [▼ Select Voice]                        │
│          • Female - Natural (Alloy)                               │
│          • Male - Professional (Onyx)                             │
│          • Female - Warm (Nova) ⭐ Recommended                     │
│          • Male - Deep (Echo)                                     │
│          • Custom Upload (Your own narration)                     │
│                                                                    │
│                                                                    │
│                        Subtotal: $157                             │
│                                                                    │
│                    [← Back]  [Continue →]                         │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Screen 3: Processing Screen (Step 2 of 3)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                    │
│                      AI Book Formatter                            │
│                                                                    │
│             ○━━━━━━━━●━━━━━━━━○━━━━━━━━                          │
│           Upload    Process    Download                           │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                    🤖 AI is working...                            │
│                                                                    │
│               ████████████████░░░░░░░░░░  73%                     │
│                                                                    │
│                                                                    │
│          ┌────────────────────────────────────────┐               │
│          │                                        │               │
│          │  Your Book: "My Amazing Novel.docx"    │               │
│          │  Pages: 287 | Words: 83,542            │               │
│          │                                        │               │
│          │  Current Step:                         │               │
│          │  ✅ Manuscript uploaded                │               │
│          │  ✅ AI analyzing structure             │               │
│          │  ✅ Detecting 24 chapters              │               │
│          │  ✅ Optimizing formatting              │               │
│          │  🔄 Generating PDF export...           │               │
│          │  ⏳ Generating Kindle format...        │               │
│          │                                        │               │
│          │  Estimated time: 2 minutes             │               │
│          │                                        │               │
│          └────────────────────────────────────────┘               │
│                                                                    │
│                                                                    │
│               What We're Doing:                                   │
│                                                                    │
│          • Analyzing your manuscript structure                    │
│          • Detecting chapters and sections automatically          │
│          • Applying professional formatting rules                 │
│          • Optimizing for each platform (KDP, IngramSpark)        │
│          • Generating high-quality export files                   │
│                                                                    │
│                                                                    │
│           ℹ️ This window will automatically update                │
│              when your files are ready!                           │
│                                                                    │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Screen 4: Export/Download Screen (Step 3 of 3)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                    │
│                      AI Book Formatter                            │
│                                                                    │
│             ○━━━━━━━━○━━━━━━━━●━━━━━━━━                          │
│           Upload    Process    Download                           │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                    ✅ Formatting Complete!                        │
│                                                                    │
│                                                                    │
│          ┌────────────────────────────────────────┐               │
│          │                                        │               │
│          │  Your Book: "My Amazing Novel"         │               │
│          │  Formatted: Oct 28, 2025 3:45 PM      │               │
│          │  Pages: 287 | Chapters: 24            │               │
│          │                                        │               │
│          │  Download Your Files:                  │               │
│          │                                        │               │
│          │  📕 PDF (Print-Ready)                  │               │
│          │  ├─ 6x9 Trade Paperback - KDP          │               │
│          │  └─ With bleed & margins               │               │
│          │  File: novel-print.pdf (8.3 MB)       │               │
│          │  [📥 Download PDF]                     │               │
│          │                                        │               │
│          │  📱 Kindle (eBook)                     │               │
│          │  ├─ MOBI & KF8 formats                 │               │
│          │  └─ Optimized for Kindle devices       │               │
│          │  File: novel-kindle.mobi (1.2 MB)     │               │
│          │  [📥 Download Kindle]                  │               │
│          │                                        │               │
│          │  [📥 Download All as ZIP]              │               │
│          │                                        │               │
│          └────────────────────────────────────────┘               │
│                                                                    │
│                                                                    │
│          Next Steps:                                              │
│                                                                    │
│          📤 Upload to KDP (Kindle Direct Publishing)              │
│             Your files are ready for direct upload!               │
│                                                                    │
│          📤 Upload to IngramSpark                                 │
│             PDF meets IngramSpark's print requirements            │
│                                                                    │
│          📤 Upload to B&N Press                                   │
│             Compatible with all major platforms                   │
│                                                                    │
│                                                                    │
│                        Total: $157                                │
│                                                                    │
│              [💳 Pay & Download Files]                            │
│                                                                    │
│          ⚠️ Files available for 7 days after payment              │
│                                                                    │
│                                                                    │
│                    [Format Another Book]                          │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Screen 5: Payment Modal (Stripe Checkout)

```
┌─────────────────────────────────────────────┐
│                                             │
│    Complete Your Order                      │
│                                             │
│    Order Summary:                           │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│    PDF Export              $29              │
│    Kindle Export           $29              │
│    Audiobook (Female)      $99              │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│    Subtotal:              $157              │
│    Processing fee:         $3               │
│    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━      │
│    Total:                 $160              │
│                                             │
│                                             │
│    Email for receipt:                       │
│    [_____________________________]          │
│                                             │
│                                             │
│    [💳 Pay with Stripe]                     │
│                                             │
│    🔒 Secure payment via Stripe             │
│    We never see your card details           │
│                                             │
│                                             │
│    [Cancel]                                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Screen 6: Success/Receipt Page

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                    │
│                      AI Book Formatter                            │
│                                                                    │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│                                                                    │
│                    ✅ Payment Successful!                         │
│                                                                    │
│                                                                    │
│          Your files are ready for download                        │
│                                                                    │
│                                                                    │
│          ┌────────────────────────────────────────┐               │
│          │                                        │               │
│          │  Receipt #RF-20251028-A4B9C            │               │
│          │  Date: Oct 28, 2025 3:47 PM           │               │
│          │  Email: author@example.com             │               │
│          │                                        │               │
│          │  Charged: $160.00                      │               │
│          │  Payment Method: Visa •••• 4242        │               │
│          │                                        │               │
│          │  Receipt sent to your email ✓          │               │
│          │                                        │               │
│          └────────────────────────────────────────┘               │
│                                                                    │
│                                                                    │
│          Your Formatted Book:                                     │
│                                                                    │
│          [📥 Download PDF]                                        │
│          [📥 Download Kindle]                                     │
│          [📥 Download Audiobook]                                  │
│          [📥 Download All (ZIP)]                                  │
│                                                                    │
│                                                                    │
│          Quick Publishing Guide:                                  │
│                                                                    │
│          📖 Amazon KDP                                            │
│             1. Go to kdp.amazon.com                               │
│             2. Upload novel-kindle.mobi                           │
│             3. Upload novel-print.pdf for paperback               │
│                                                                    │
│          📖 IngramSpark                                           │
│             1. Go to ingramspark.com                              │
│             2. Upload novel-print.pdf                             │
│             3. Your file meets all requirements ✓                 │
│                                                                    │
│          📖 Barnes & Noble Press                                  │
│             1. Go to press.barnesandnoble.com                     │
│             2. Upload novel-kindle.epub (auto-converted)          │
│                                                                    │
│                                                                    │
│          Need help? support@publishforge.com                      │
│                                                                    │
│                                                                    │
│                    [Format Another Book]                          │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Mobile View (Responsive Design)

```
┌─────────────────────────┐
│   📱 Mobile Version      │
├─────────────────────────┤
│                         │
│  [☰]  AI Book Formatter │
│                         │
│  ●──○──○                │
│  Upload                 │
│                         │
│  ┌────────────────────┐ │
│  │                    │ │
│  │       📄           │ │
│  │                    │ │
│  │  Drop file or      │ │
│  │  [Browse]          │ │
│  │                    │ │
│  │  .docx .pdf .txt   │ │
│  │                    │ │
│  └────────────────────┘ │
│                         │
│  Book Details           │
│  [________________]     │
│  Title                  │
│                         │
│  [________________]     │
│  Author                 │
│                         │
│  [▼ Genre      ]        │
│                         │
│                         │
│  Export Options         │
│  ☑ PDF        $29       │
│  ☑ Kindle     $29       │
│  ☐ Audiobook  $99       │
│                         │
│  Total: $58             │
│                         │
│  [Continue →]           │
│                         │
└─────────────────────────┘
```

---

## Genre-Specific Formatting Presets

### Fiction
- Standard novel formatting
- Chapter headers: Centered, 14pt
- First line indent: 0.5"
- Line spacing: 1.15
- Margins: 0.75" all sides

### Non-Fiction
- Numbered chapters
- Subheadings: Bold
- Table of contents: Auto-generated
- Footnotes: Supported
- Index support

### Children's Books
- Larger fonts (14-16pt)
- Extra spacing between lines
- Image placeholders for illustrations
- Age-appropriate layout

### Cookbooks
- Recipe template formatting
- Ingredients list styling
- Step numbering
- Prep time/Cook time boxes
- Serving size formatting

---

## Error States

### Upload Error
```
┌────────────────────────────────────────┐
│   ⚠️ Upload Failed                     │
│                                        │
│   File too large (52MB)                │
│   Maximum size: 50MB                   │
│                                        │
│   Try:                                 │
│   • Compress images in your document   │
│   • Remove unnecessary content         │
│   • Split into multiple uploads        │
│                                        │
│   [Try Again]  [Get Help]              │
└────────────────────────────────────────┘
```

### Processing Error
```
┌────────────────────────────────────────┐
│   ❌ Processing Failed                 │
│                                        │
│   We couldn't read your file           │
│   Error: Corrupted document structure  │
│                                        │
│   What to do:                          │
│   • Try saving as .docx (not .doc)     │
│   • Check if file opens in Word        │
│   • Contact support with error code:   │
│     #ERR-20251028-A4B9C                │
│                                        │
│   [Try Another File]  [Contact Support]│
└────────────────────────────────────────┘
```

### Payment Error
```
┌────────────────────────────────────────┐
│   ⚠️ Payment Failed                    │
│                                        │
│   Your card was declined               │
│                                        │
│   Common reasons:                      │
│   • Insufficient funds                 │
│   • Card expired                       │
│   • Security check failed              │
│                                        │
│   Your files are saved for 1 hour      │
│                                        │
│   [Try Different Card]  [Contact Bank] │
└────────────────────────────────────────┘
```

---

## Loading States

### Small Spinner
```
  ⠋ Processing...
  ⠙ Processing...
  ⠹ Processing...
  ⠸ Processing...
  ⠼ Processing...
  ⠴ Processing...
  ⠦ Processing...
  ⠧ Processing...
```

### Progress Bar
```
████████████████░░░░░░░░░░ 60%
```

### Step Indicator
```
✅ Uploaded
✅ Analyzed
🔄 Formatting... (Current)
⏳ Exporting
⏳ Complete
```

---

## Key User Flows

### Happy Path (Essential Package)
1. User lands on homepage
2. Clicks "Upload Your Manuscript"
3. Drags .docx file
4. Fills book details (optional)
5. Selects: PDF + Kindle ($58)
6. Clicks "Continue"
7. Waits 2-3 minutes (processing)
8. Redirected to download page
9. Clicks "Pay & Download"
10. Stripe checkout modal
11. Pays $58
12. Downloads files
13. Success page with upload instructions

### Alternative: Add Audiobook
- At step 5: User also checks Audiobook
- Selects voice: "Female - Warm (Nova)"
- Total becomes $157
- Processing takes 8-10 minutes (longer for audio)
- Downloads include MP3 audiobook files

### Error Recovery
- File too large → Show compression tips
- Corrupted file → Suggest file format change
- Payment fails → Allow retry with different card
- Processing fails → Automatic refund + support contact

---

## Technical Notes for Developer

### Frontend Framework
- React 18 (already installed)
- React Router for page navigation
- Axios for API calls
- Framer Motion for animations

### File Upload
- Drag & drop: react-dropzone
- Progress indicator during upload
- Client-side file validation (type, size)

### API Endpoints Needed
```
POST /api/formatter/upload
POST /api/formatter/process
GET  /api/formatter/status/:jobId
GET  /api/formatter/download/:jobId/:format
POST /api/payments/create-checkout
GET  /api/payments/verify/:sessionId
```

### State Management
- useState for local component state
- Context API for global state (upload progress)
- No Redux needed for MVP

### Responsive Breakpoints
```css
Mobile:  < 640px
Tablet:  640px - 1024px
Desktop: > 1024px
```

---

## Design Assets Needed

### Icons
- 📄 Upload/Document icon
- 🤖 AI/Processing icon
- ✅ Success checkmark
- ⚠️ Warning triangle
- 📕 PDF file icon
- 📱 Kindle file icon
- 🎙️ Audiobook icon
- 💳 Payment icon

### Illustrations
- Hero section: Book transformation visual
- Empty state: Drag & drop area
- Processing: Animated loader
- Success: Celebration animation

### Fonts
- Headings: Inter Bold
- Body: Inter Regular
- Code/Technical: JetBrains Mono

---

## Accessibility Notes

- All buttons have clear labels
- Form inputs have associated labels
- Error messages are screen-reader friendly
- Keyboard navigation supported throughout
- ARIA labels for icons
- Color contrast ratio > 4.5:1
- Focus indicators visible

---

## Next Steps for Implementation

1. ✅ Wireframes complete
2. → Build backend API (docx parser, OpenAI integration)
3. → Build frontend React components
4. → Integrate Stripe payments
5. → Test with real manuscripts
6. → Deploy to cloud
7. → Launch!

---

**Questions? Suggestions?**
Contact: support@publishforge.com

**Version**: 1.0 MVP
**Last Updated**: Oct 28, 2025
