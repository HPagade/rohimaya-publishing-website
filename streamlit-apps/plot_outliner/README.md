# 🦚 Plot Outliner - Rohimaya Publishing

**Structure Your Story with Proven Frameworks and AI**

## Overview

Plan and structure your story using 8 proven plot frameworks. Define your premise, build your outline beat by beat, and use AI to generate complete plot structures, suggest twists, and identify potential issues.

## Features

- **8 Plot Structures:** Three-Act, Hero's Journey, Save the Cat, Seven-Point, and more
- **AI Plot Generation:** Generate complete outlines from your premise
- **Beat-by-Beat Builder:** Fill in each story beat systematically
- **Plot Twist Generator:** AI suggests unexpected story twists
- **Multiple Export Formats:** Markdown, Plain Text, JSON, Novel Template
- **Progress Tracking:** See completion percentage
- **Structure Reference:** In-app guide to all frameworks

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get OpenAI API Key

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
git commit -m "Add Plot Outliner app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/plot_outliner/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### 1. Define Story Premise

In the **Story Premise** tab:
- Fill in protagonist, antagonist, setting, theme
- Write or generate a one-paragraph premise
- This becomes the foundation for your outline

### 2. Choose Plot Structure

In the sidebar:
- Select from 8 proven frameworks
- Each has its own beats and structure
- Read descriptions to find the best fit

### 3. Build Your Outline

In the **Outline Builder** tab:
- Fill in each beat one by one
- Write 2-3 sentences per beat
- Track progress with completion percentage

### 4. Use AI Assistance

In the **AI Generation** tab:
- Generate complete outline from premise
- Get plot twist suggestions
- Generate opening scenes
- Suggest climax ideas

### 5. Export

In the **Export** tab:
- Choose format (Markdown, Text, JSON, Template)
- Preview before downloading
- Download your complete outline

## Plot Structures

### 1. Three-Act Structure
**Best for:** Most genres, especially screenplays
**Beats:** 14 beats from Opening Image to Final Image
**Description:** Classic Hollywood structure dividing story into Setup, Confrontation, Resolution

### 2. Hero's Journey
**Best for:** Fantasy, Adventure, Epic stories
**Beats:** 12 stages from Ordinary World to Return with Elixir
**Description:** Joseph Campbell's monomyth showing transformation

### 3. Save the Cat
**Best for:** Commercial fiction, screenplays
**Beats:** 15 beats including Theme Stated, B Story, Dark Night
**Description:** Blake Snyder's detailed beat sheet

### 4. Seven-Point Story
**Best for:** Novelists, structured plotting
**Beats:** 7 key points including Hook, Pinch Points, Resolution
**Description:** Dan Wells' streamlined structure

### 5. Freytag's Pyramid
**Best for:** Literary fiction, classical drama
**Beats:** 6 stages from Exposition to Resolution
**Description:** Gustav Freytag's dramatic arc

### 6. Story Circle
**Best for:** Episodic stories, TV shows
**Beats:** 8 steps from Comfort Zone to Change
**Description:** Dan Harmon's simplified Hero's Journey

### 7. Fichtean Curve
**Best for:** Thrillers, action stories
**Beats:** Multiple crises building to climax
**Description:** Crisis-driven structure with rising conflicts

### 8. In Media Res
**Best for:** Thrillers, literary fiction
**Beats:** Start in action, reveal backstory through flashbacks
**Description:** Non-linear narrative structure

## When to Use Each Structure

### For Beginners:
- **Three-Act Structure:** Most intuitive and universal
- **Story Circle:** Simple 8-step process

### For Commercial Fiction:
- **Save the Cat:** Proven bestseller structure
- **Seven-Point Story:** Clear turning points

### For Epic Stories:
- **Hero's Journey:** Perfect for transformative quests
- **Fichtean Curve:** Rising action and multiple crises

### For Literary/Experimental:
- **Freytag's Pyramid:** Classical dramatic structure
- **In Media Res:** Non-linear storytelling

## AI Features

### Generate Full Outline
- Input your premise
- AI creates 2-3 sentences for each beat
- Customizable creativity level
- Based on your genre and target length

### Plot Twist Generator
- Suggests 5 unexpected twists
- Logical but surprising
- Genre-appropriate

### Opening Scene Generator
- Creates compelling first scene
- Hooks readers immediately
- Sets tone and introduces conflict

### Plot Hole Identifier
- Analyzes outline for logic gaps
- Checks character motivations
- Ensures consistency

## Export Formats

### Markdown (.md)
```markdown
# Story Title

## Premise
Your premise here...

## Three-Act Structure Outline

### 1. Opening Image
What happens...
```

### Plain Text (.txt)
```
STORY TITLE
===================

PREMISE:
Your premise...

1. OPENING IMAGE
What happens...
```

### JSON (.json)
```json
{
  "title": "Story Title",
  "genre": "Fantasy",
  "structure": "Hero's Journey",
  "outline": {...}
}
```

### Novel Template (.md)
- Outline + Chapter structure
- Ready to start drafting
- Beat-by-chapter organization

## Best Practices

### 1. Start with Premise
Don't skip the premise! Clear premise = better outline.

### 2. Choose Right Structure
Match structure to your genre and story type.

### 3. Fill Beats Sequentially
Work through beats in order for better flow.

### 4. Use AI for Inspiration
Let AI suggest ideas, but make them yours.

### 5. Iterate
Generate multiple outlines, combine best elements.

### 6. Don't Over-Plan
Outline enough to start, but allow flexibility.

## Genre-Specific Tips

### Fantasy/Sci-Fi
- Hero's Journey or Three-Act
- Focus on world-building beats
- Include training/preparation sequences

### Romance
- Save the Cat or Three-Act
- Emphasize relationship beats
- Plan key emotional moments

### Mystery/Thriller
- Seven-Point or Fichtean Curve
- Plant clues in each beat
- Build suspense progressively

### Literary Fiction
- Freytag's Pyramid or Story Circle
- Focus on character arc
- Emphasize theme and meaning

## Cost Information

- Uses OpenAI GPT-4 Turbo
- ~$0.01-0.03 per outline generation
- ~$0.005 per plot twist generation
- Monitor usage at: https://platform.openai.com/usage

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**AI Generation Not Matching Structure:**
- Be more specific in premise
- Adjust AI creativity slider
- Manually edit generated content

**Lost Progress:**
- App uses session state (resets on refresh)
- Export frequently to save work
- Consider copying to external document

**Structure Doesn't Fit My Story:**
- Try different structure
- Customize beats manually
- Combine elements from multiple structures

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Advanced Tips

### Combining Structures
You can use multiple structures:
1. Outline with Three-Act
2. Map to Hero's Journey beats
3. Add Save the Cat refinements

### Character-Driven Plots
For character arcs:
1. Map external plot (structure beats)
2. Map internal arc (character change)
3. Ensure they intersect at key moments

### Subplot Integration
1. Outline main plot first
2. Create separate outline for subplot
3. Weave together in final structure

## Support

Questions? Contact: support@rohimayapublishing.com

## Resources

- Save the Cat! by Blake Snyder
- The Hero with a Thousand Faces by Joseph Campbell
- Story Genius by Lisa Cron
- The Anatomy of Story by John Truby

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
