# 🦚 Character Creator - Rohimaya Publishing

**Develop Rich, Compelling Characters with AI**

## Overview

Create detailed, three-dimensional characters using AI assistance. Build psychological profiles, develop backstories, design character arcs, and even generate character portraits. Perfect for novelists, screenwriters, and game designers.

## Features

- **16 Character Archetypes:** From Hero to Trickster
- **Complete Psychology Profile:** Positive traits, flaws, fears, desires
- **AI-Powered Generation:**
  - Generate complete character from concept
  - Expand existing characters
  - Create detailed backstories
  - Suggest character arcs
- **Visual Portraits:** AI-generated character images
- **Relationship Mapping:** Track connections between characters
- **Character Gallery:** Save and manage multiple characters
- **Multiple Export Formats:** Markdown, Text, JSON, HTML character sheets

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Get OpenAI API Key

**Note:** While this app uses OpenAI, we recommend **Claude API** for better creative writing results in production.

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
git commit -m "Add Character Creator app"
git push
```

### Step 2: Deploy

1. Go to https://streamlit.io/cloud
2. Sign in with GitHub
3. Click "New app"
4. Select your repository
5. Set app path: `streamlit-apps/character_creator/app.py`
6. Click "Deploy"

### Step 3: Add Secrets in Cloud

1. In Streamlit Cloud dashboard, click your app
2. Click "Settings" → "Secrets"
3. Paste your secrets.toml content
4. Save

### Step 4: Upload Logo

Upload `rohimaya-publishing-circle-logo.png` through Streamlit Cloud's file manager or include it in your repository.

## Usage Guide

### 1. Basic Info Tab

Enter fundamental character details:
- **Name, age, gender, role**
- **Archetype** (16 options based on Campbell/Jung)
- **Occupation and appearance**
- **Core elements:**
  - Primary goal (what they want)
  - Motivation (why they want it)
  - Internal conflict (what holds them back)

### 2. Psychology Tab

Develop psychological depth:
- **Positive Traits:** Select or add custom
- **Negative Traits/Flaws:** Essential for believable characters
- **Fears & Phobias:** What terrifies them
- **Secret Desires:** Hidden wants
- **Core Values:** Moral compass
- **Quirks & Habits:** Unique behaviors

### 3. Background Tab

Create character history:
- **Backstory:** Where they came from
- **Family & Origin:** Upbringing, parents, siblings
- **Key Relationships:** Friends, enemies, lovers
- **Skills & Abilities:** What they're good at
- **Weaknesses:** Vulnerabilities
- **Character Arc:**
  - Beginning state
  - End state
  - Transformation

### 4. AI Generate Tab

Use AI for rapid development:

**Generate from Scratch:**
- Enter character concept
- Select role and archetype
- AI creates complete profile
- Copy details to other tabs

**Expand Existing:**
- Add depth to current character
- Choose aspect to expand
- AI provides detailed content

**Generate Backstory:**
- Brief, medium, or detailed
- Include specific events
- Emotionally resonant story

**Suggest Character Arc:**
- Starting state → End state
- Catalyst, turning points
- Transformation details

### 5. Export Tab

Download character profiles:
- **Markdown:** Formatted character sheet
- **Plain Text:** Simple text format
- **JSON:** Machine-readable data
- **HTML:** Printable character sheet

## Character Archetypes

### Primary Archetypes (Campbell/Jung):
1. **The Hero** - Protagonist on journey
2. **The Mentor** - Wise guide
3. **The Threshold Guardian** - Tests worthiness
4. **The Herald** - Announces change
5. **The Shapeshifter** - Uncertain loyalty
6. **The Shadow** - Antagonist/dark side
7. **The Trickster** - Comic relief, chaos
8. **The Ally** - Loyal companion

### Extended Archetypes:
9. **The Everyperson** - Relatable, ordinary
10. **The Lover** - Driven by passion
11. **The Ruler** - Seeks control
12. **The Rebel** - Breaks rules
13. **The Magician** - Transforms reality
14. **The Sage** - Seeks truth
15. **The Creator** - Builds new things
16. **The Innocent** - Pure, optimistic

## Character Development Tips

### Creating Believable Characters

**1. Contradiction is Key**
- Ruthless warrior who loves poetry
- Cowardly person who stands up for others
- Cold detective with soft spot for kids

**2. Want vs. Need**
- **Want:** External goal (save the world)
- **Need:** Internal lesson (learn to trust)
- Best characters get need, not always want

**3. Flaws Matter**
- Perfect characters are boring
- Flaws create conflict
- Flaws drive character arc
- Make flaws meaningful, not cosmetic

**4. Backstory Informs Present**
- Every fear has an origin
- Every quirk has a reason
- Backstory explains behavior
- Don't info-dump - reveal gradually

**5. Test Their Values**
- Put them in moral dilemmas
- Force difficult choices
- Show what they'd sacrifice
- Reveal character through decisions

### Character Arc Types

**Positive Arc:**
- Character overcomes flaw
- Learns internal lesson
- Becomes better person
- Most common in stories

**Negative Arc:**
- Character succumbs to flaw
- Refuses to change
- Tragic ending
- Think Walter White

**Flat Arc:**
- Character doesn't change
- But changes the world around them
- Strong moral center
- Think Captain America

## Genre-Specific Tips

### Fantasy Characters
- Unique magic/abilities
- Cultural background matters
- Species/race considerations
- Relationship to magic system

### Romance Characters
- Clear emotional wounds
- Specific love language
- What prevents intimacy
- Growth through relationship

### Thriller/Mystery Characters
- Hidden secrets
- Questionable morals
- Skills relevant to plot
- Dark past elements

### Literary Fiction Characters
- Complex psychology
- Subtle character traits
- Symbolic elements
- Interior life emphasis

## Cost Information

- Uses OpenAI GPT-4 Turbo for character generation
- ~$0.02-0.05 per character profile
- ~$0.08 for character portrait (DALL-E 3)
- Monitor usage at: https://platform.openai.com/usage

**Note:** Consider using **Claude API** for production - often provides better creative writing results for character development.

## Troubleshooting

**API Key Error:**
- Check key is correct in secrets.toml
- Verify key has sufficient credits
- Ensure key starts with `sk-`

**Generation Not Detailed Enough:**
- Be more specific in character concept
- Use "Expand Existing Character" to add depth
- Adjust AI creativity slider
- Generate multiple times, combine best elements

**Lost Progress:**
- App uses session state (resets on refresh)
- Export frequently to save work
- Save to character gallery
- Download as file backup

**Character Feels Generic:**
- Add specific quirks and contradictions
- Give them unique voice/dialogue style
- Create unexpected trait combinations
- Base on real people (traits, not identity)

**App won't start:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade

# Clear cache
streamlit cache clear

# Run again
streamlit run app.py
```

## Advanced Features

### Character Consistency
- Save character to gallery
- Reference when writing
- Use "Does this fit?" checker
- Track character voice

### Multiple Characters
- Create full cast
- Map relationships
- Identify conflicts
- Balance character types

### Character Bible
- Export all characters
- Combine into master document
- Share with co-writers
- Reference during writing

## Support

Questions? Contact: support@rohimayapublishing.com

## Resources

- The Anatomy of Story by John Truby
- Creating Character Arcs by K.M. Weiland
- 45 Master Characters by Victoria Lynn Schmidt
- The Writer's Journey by Christopher Vogler

---

**Built with 🦚 by Rohimaya Publishing**
*Ascend • Flourish • Enlighten*
