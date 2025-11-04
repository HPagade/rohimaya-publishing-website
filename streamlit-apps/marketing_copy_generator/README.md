# 🦚 Marketing Copy Generator - Rohimaya Publishing

**Create Compelling Book Marketing Content with AI**

## Overview

Generate professional marketing copy for your books in seconds. Create book blurbs, social media posts, email campaigns, ad copy, and press releases tailored to your genre and audience. Perfect for self-published authors who need to wear many hats.

## Features

- **Book Blurbs:** 4 length options (short, medium, long, back cover)
- **Social Media Posts:** 8 platforms (Instagram, Facebook, Twitter, TikTok, etc.)
- **Email Campaigns:** 9 campaign types (launch, pre-order, newsletter, etc.)
- **Ad Copy:** 7 platforms (Facebook, Amazon, Google, BookBub, etc.)
- **Press Releases:** Professional PR for launches, awards, milestones
- **Generation History:** Track and reuse previous copies
- **Copy to Clipboard:** Easy export to any platform
- **Best Practices Guide:** In-app marketing tips

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get OpenAI API Key

**Note:** Claude API is recommended for better creative copywriting in production.

1. Go to https://platform.openai.com/api-keys
2. Create a new secret key
3. Copy the key (starts with `sk-`)

### 3. Configure Secrets

Create `.streamlit/secrets.toml` and add your API key:

```toml
OPENAI_API_KEY = "sk-YOUR_KEY_HERE"
```

**Important:** Never commit secrets.toml to Git!

### 4. Add Logo File

Place `rohimaya-publishing-circle-logo.png` in the same directory as app.py.

### 5. Run Locally

```bash
streamlit run app.py
```

App will open at http://localhost:8501

## Deployment to Streamlit Cloud

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Marketing Copy Generator app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/marketing_copy_generator/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### Getting Started

**1. Enter Book Information (Sidebar):**
- Book title and author name
- Genre
- Target audience
- Logline (1-2 sentence summary)
- Key themes/tropes
- Comparable titles
- Voice/tone preference

**2. Choose Content Type (Tabs):**
- Book Blurbs
- Social Media
- Email Campaigns
- Ad Copy
- Press Release

**3. Customize Settings:**
Each tab has specific options for:
- Platform/length
- Style/tone
- Elements to include
- Campaign goals

**4. Generate & Refine:**
- Click "Generate" button
- Review AI-generated copy
- Copy to clipboard
- Generate variations if needed

### Book Blurbs

**4 Length Options:**
1. **Short (50-75 words)** - Amazon search results, quick hooks
2. **Medium (150-200 words)** - Amazon product page, most common
3. **Long (300-400 words)** - Website, Goodreads, detailed description
4. **Back Cover (200 words)** - Print book back cover

**Pro Tips:**
- Focus on emotional hooks, not plot summary
- End with intrigue, not resolution
- Use power words and sensory language
- Match genre conventions (readers expect certain elements)

### Social Media Posts

**8 Platforms Supported:**
- Instagram (visual-first, hashtags)
- Facebook (community-focused)
- Twitter/X (concise, trending)
- TikTok (very short, attention-grabbing)
- LinkedIn (professional tone)
- Pinterest (descriptive, searchable)
- Threads (conversational)
- BlueSky (Twitter alternative)

**10 Post Types:**
- Book announcement
- Cover reveal
- Release countdown
- Behind the scenes
- Character spotlight
- Quote from book
- Reader testimonial
- Writing process
- Pre-order announcement
- Sale/promotion

**Best Practices:**
- Match platform culture
- Use platform-appropriate length
- Include relevant hashtags
- Add call to action
- Post consistently (not just when selling)

### Email Campaigns

**9 Campaign Types:**
- New release announcement
- Pre-order campaign
- Launch day email
- Sale/promotion
- Reader magnet offer
- Monthly newsletter
- Behind-the-scenes
- Series announcement
- Thank you to readers

**Email Structure:**
- Compelling subject line
- Personal greeting
- Engaging body (300-500 words)
- Clear call to action
- Author sign-off

**Conversion Tips:**
- Personalize when possible
- Keep paragraphs short
- Use bullets for readability
- One clear CTA per email
- Mobile-optimize

### Ad Copy

**7 Ad Platforms:**
- Facebook/Instagram Ads
- Amazon Ads (Sponsored Products)
- Amazon Ads (Sponsored Brands)
- Google Ads
- BookBub Featured Deal
- Newsletter ads
- TikTok Ads

**5 Campaign Goals:**
- Drive pre-orders
- Increase sales
- Build awareness
- Grow email list
- Promote sale/discount

**High-Converting Ad Copy:**
- Attention-grabbing headline
- Benefit-focused (not feature-focused)
- Create urgency or scarcity
- Strong, clear CTA
- Match audience to ad creative

### Press Releases

**7 Press Release Types:**
- Book launch/release
- Book award or recognition
- Bestseller list achievement
- Series announcement
- Movie/TV adaptation
- Author milestone
- Special edition release

**Professional Structure:**
- "FOR IMMEDIATE RELEASE"
- Dateline
- Compelling headline
- Lead paragraph (5 W's)
- Supporting details
- Author bio
- Book information
- Contact details
- Boilerplate

**Distribution Channels:**
- Local newspapers
- Book industry publications
- Genre-specific blogs
- Press release services
- Your email list
- Social media

## Marketing Strategy Guide

### Pre-Launch (3-6 months before)

**Goals:** Build anticipation, grow audience

**Actions:**
1. Announce book with cover reveal
2. Share behind-the-scenes content
3. Build email list with reader magnet
4. Engage in genre communities
5. Start social media presence

**Marketing Copy Needed:**
- Announcement posts (all platforms)
- Cover reveal posts
- Email list welcome sequence
- Reader magnet blurb

### Pre-Order Campaign (1-3 months before)

**Goals:** Drive pre-orders, build momentum

**Actions:**
1. Launch pre-order with incentives
2. Share excerpts and teasers
3. Run ARC campaign
4. Build review team
5. Start paid ads testing

**Marketing Copy Needed:**
- Pre-order announcement
- Excerpt teasers
- ARC application post
- Email sequence (weekly)
- Test ad variations

### Launch Week (Release ± 3 days)

**Goals:** Maximize visibility, spike sales rank

**Actions:**
1. Email your full list
2. Social media blitz
3. Scale winning ads
4. Reach out to bloggers
5. Virtual launch party
6. Request reviews

**Marketing Copy Needed:**
- Launch day email
- Multiple social posts
- Thank you messages
- Review request emails
- Ad copy at scale

### Post-Launch (Ongoing)

**Goals:** Sustain sales, build long-term audience

**Actions:**
1. Continue ads (if profitable)
2. Engage with readers
3. Plan next release
4. Build series momentum
5. Expand to new platforms

**Marketing Copy Needed:**
- Monthly newsletters
- Sale announcements
- Reader engagement posts
- Series teasers
- Platform-specific content

## Platform-Specific Best Practices

### Amazon Marketing

**Product Page Optimization:**
- Compelling book description (medium blurb)
- 7 keywords maximum
- Categories: Choose 2
- A+ Content (if available)

**Amazon Ads:**
- Sponsored Products (keyword targeting)
- Sponsored Brands (brand awareness)
- Target comp titles exactly
- Optimize for mobile
- Monitor ACOS (Advertising Cost of Sale)

### Facebook/Instagram Ads

**Targeting:**
- Interest-based (genre keywords, comp authors)
- Lookalike audiences (from email list)
- Retargeting (website visitors)

**Creative:**
- Eye-catching cover image
- Video ads outperform static
- Multiple ad variations
- Clear value proposition

**Budget:**
- Start with $5-10/day
- Scale winners
- Kill losers quickly
- Target ROAS 2-3x minimum

### Email Marketing

**List Building:**
- Reader magnets (free book/story)
- Website pop-ups
- Social media promotion
- Cross-promotion with other authors

**Engagement:**
- Welcome sequence (5-7 emails)
- Monthly newsletter minimum
- Launch sequences
- Sale announcements
- Personal updates (build relationship)

**Deliverability:**
- Use reputable ESP (MailChimp, ConvertKit, etc.)
- Clean list regularly
- Avoid spam words
- Mobile-optimize
- A/B test subject lines

### Social Media Strategy

**Platform Selection:**
- Choose 1-2 primary platforms
- Post consistently (3-5x/week)
- Engage with community
- Don't spread too thin

**Content Mix (80/20 rule):**
- 80% value/entertainment (not selling)
- 20% promotional
- Behind-the-scenes content
- Reader interaction
- Writing tips/process

## A/B Testing Framework

### What to Test

**Headlines:**
- Question vs. statement
- Benefit-focused vs. curiosity
- Short vs. long
- With/without power words

**Body Copy:**
- Long-form vs. short-form
- Emotional vs. logical appeal
- Feature vs. benefit focus
- Different opening hooks

**Calls to Action:**
- "Buy now" vs. "Get your copy"
- "Pre-order today" vs. "Reserve your copy"
- Button vs. text link
- Different colors/sizes

**Offers:**
- Price points
- Discount vs. bonus
- Urgency tactics
- Risk reversal (guarantee)

### Testing Process

1. **Hypothesis:** "Emotional appeal will outperform logical"
2. **Create Variations:** A (emotional) vs. B (logical)
3. **Split Traffic:** 50/50
4. **Measure Results:** CTR, conversion rate, sales
5. **Analyze:** Statistical significance
6. **Implement Winner:** Scale the winner
7. **Test Next Element:** Continuous improvement

## Metrics to Track

### Awareness Metrics
- Social media impressions
- Website traffic
- Email list growth
- Brand mentions

### Engagement Metrics
- Social media engagement rate
- Email open rate
- Email click rate
- Time on page

### Conversion Metrics
- Click-through rate (CTR)
- Conversion rate
- Sales rank
- Reviews generated

### Revenue Metrics
- Total sales
- Ad spend
- Return on ad spend (ROAS)
- Customer lifetime value (LTV)
- Profit margin

## Cost Information

- Uses OpenAI GPT-4 Turbo
- ~$0.01-0.03 per marketing copy generation
- Unlimited generations with API key
- Monitor usage at: https://platform.openai.com/usage

**ROI Perspective:**
- Hiring copywriter: $50-500 per piece
- DIY with AI: $0.01-0.03 per piece
- Time saved: Hours → Seconds

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**Generated Copy Too Generic:**
- Provide more specific book details
- Add unique angles in sidebar
- Mention what makes your book different
- Generate multiple variations, combine best parts

**Copy Doesn't Match Voice:**
- Adjust voice/tone selector
- Try different AI creativity settings
- Edit generated copy to match your style
- Use as starting point, not final copy

**Platform Character Limits:**
- App accounts for platform limits
- Twitter/TikTok automatically shorter
- Longer platforms allow more detail
- Edit if needed for specific constraints

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Support

Questions? Contact: support@rohimayapublishing.com

## Resources

### Marketing Books
- Write. Publish. Repeat. by Sean Platt & Johnny B. Truant
- Newsletter Ninja by Tammi Labrecque
- Guerrilla Publishing by Derek Murphy

### Marketing Tools
- BookBub (email ads, featured deals)
- Written Word Media (newsletter promo)
- Amazon Ads (direct sales)
- Facebook Ads Library (spy on competitors)

### Communities
- 20BooksTo50K (Facebook group)
- Wide for the Win (Facebook group)
- r/selfpublish (Reddit)
- Kboards Writer's Cafe

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
