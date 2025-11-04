"""
🦚 Character Creator - Rohimaya Publishing
AI-powered character development and profiling
Built with Streamlit and OpenAI
"""

import streamlit as st
from openai import OpenAI
import json
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Character Creator | Rohimaya Publishing",
    page_icon="🦚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS with Rohimaya branding
st.markdown("""
<style>
    :root {
        --phoenix-orange: #FF8C42;
        --phoenix-gold: #FFD700;
        --peacock-teal: #4A9B9B;
        --midnight-navy: #1A1A2E;
        --cream: #FFF8E7;
    }

    .main {
        background: linear-gradient(135deg, var(--cream) 0%, #ffffff 100%);
    }

    .stButton>button {
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold)) !important;
        color: white !important;
        font-weight: 600;
        border: none;
        padding: 0.75rem 2rem;
        border-radius: 8px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .stButton>button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(255, 140, 66, 0.3);
    }

    .header-container {
        background: linear-gradient(135deg, var(--midnight-navy) 0%, var(--peacock-teal) 100%);
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 2rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }

    .header-title {
        color: var(--phoenix-gold);
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0;
        text-align: center;
    }

    .header-subtitle {
        color: var(--cream);
        font-size: 1.2rem;
        text-align: center;
        margin-top: 0.5rem;
    }

    .character-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        border-left: 4px solid var(--peacock-teal);
        margin: 1rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .trait-badge {
        display: inline-block;
        background: linear-gradient(135deg, var(--phoenix-orange), var(--phoenix-gold));
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        margin: 0.25rem;
        font-size: 0.9rem;
        font-weight: 600;
    }

    .success-box {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .info-box {
        background: linear-gradient(135deg, var(--peacock-teal) 0%, #3a8a8a 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .section-header {
        color: var(--midnight-navy);
        border-bottom: 3px solid var(--phoenix-orange);
        padding-bottom: 0.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    .footer {
        text-align: center;
        padding: 2rem;
        color: var(--peacock-teal);
        font-weight: 600;
        margin-top: 3rem;
    }
</style>
""", unsafe_allow_html=True)

# Header
st.markdown("""
<div class="header-container">
    <h1 class="header-title">👤 Character Creator</h1>
    <p class="header-subtitle">Develop rich, compelling characters with AI assistance</p>
</div>
""", unsafe_allow_html=True)

# Initialize OpenAI client
def get_openai_client():
    try:
        api_key = st.secrets["OPENAI_API_KEY"]
        return OpenAI(api_key=api_key)
    except Exception as e:
        st.error(f"⚠️ OpenAI API key not found. Please add it to `.streamlit/secrets.toml`")
        st.stop()
        return None

client = get_openai_client()

# Session state initialization
if 'characters' not in st.session_state:
    st.session_state.characters = []
if 'current_character' not in st.session_state:
    st.session_state.current_character = {}

# Character archetypes
ARCHETYPES = [
    "The Hero", "The Mentor", "The Threshold Guardian", "The Herald",
    "The Shapeshifter", "The Shadow", "The Trickster", "The Ally",
    "The Everyperson", "The Lover", "The Ruler", "The Rebel",
    "The Magician", "The Sage", "The Creator", "The Innocent"
]

# Sidebar - Character Quick Settings
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### 📝 Character Gallery")

    if st.session_state.characters:
        for idx, char in enumerate(st.session_state.characters):
            if st.button(f"👤 {char.get('name', f'Character {idx+1}')}", key=f"char_{idx}", use_container_width=True):
                st.session_state.current_character = char
                st.rerun()

        st.markdown("---")

    if st.button("➕ New Character", use_container_width=True, type="primary"):
        st.session_state.current_character = {}
        st.rerun()

    if st.session_state.characters:
        if st.button("🗑️ Clear All", use_container_width=True):
            st.session_state.characters = []
            st.session_state.current_character = {}
            st.rerun()

    st.markdown("---")
    st.markdown("### 🎨 AI Settings")

    ai_creativity = st.slider(
        "Creativity Level",
        0.0, 1.0, 0.7, 0.1,
        help="Higher = more unique characters"
    )

    genre_context = st.selectbox(
        "Genre Context",
        [
            "Fantasy", "Science Fiction", "Romance", "Mystery",
            "Thriller", "Horror", "Historical", "Contemporary",
            "Young Adult", "Literary Fiction", "Western", "Dystopian"
        ]
    )

# Main content
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "📝 Basic Info", "🧠 Psychology", "📜 Background", "🤖 AI Generate", "💾 Export"
])

with tab1:
    st.markdown("### 📝 Basic Character Information")

    col1, col2 = st.columns(2)

    with col1:
        name = st.text_input(
            "Character Name",
            value=st.session_state.current_character.get('name', ''),
            placeholder="Elena Stormweaver",
            help="Full name of your character"
        )

        age = st.number_input(
            "Age",
            min_value=0,
            max_value=200,
            value=st.session_state.current_character.get('age', 25),
            help="Character's age"
        )

        gender = st.selectbox(
            "Gender",
            ["Female", "Male", "Non-binary", "Other", "Prefer not to specify"],
            index=["Female", "Male", "Non-binary", "Other", "Prefer not to specify"].index(
                st.session_state.current_character.get('gender', 'Female')
            )
        )

        role = st.selectbox(
            "Story Role",
            ["Protagonist", "Antagonist", "Deuteragonist", "Supporting Character", "Minor Character"],
            index=["Protagonist", "Antagonist", "Deuteragonist", "Supporting Character", "Minor Character"].index(
                st.session_state.current_character.get('role', 'Protagonist')
            )
        )

    with col2:
        archetype = st.selectbox(
            "Character Archetype",
            ARCHETYPES,
            index=ARCHETYPES.index(st.session_state.current_character.get('archetype', 'The Hero'))
        )

        occupation = st.text_input(
            "Occupation",
            value=st.session_state.current_character.get('occupation', ''),
            placeholder="Wizard, Detective, Teacher...",
            help="What does this character do?"
        )

        appearance = st.text_area(
            "Physical Appearance",
            value=st.session_state.current_character.get('appearance', ''),
            placeholder="Tall, athletic build with silver hair and piercing blue eyes...",
            help="Describe their physical appearance"
        )

    st.markdown("---")
    st.markdown("### 🎯 Core Character Elements")

    goal = st.text_area(
        "Primary Goal/Desire",
        value=st.session_state.current_character.get('goal', ''),
        placeholder="What does this character want more than anything?",
        help="External desire driving the character"
    )

    motivation = st.text_area(
        "Core Motivation",
        value=st.session_state.current_character.get('motivation', ''),
        placeholder="Why do they want this? What drives them?",
        help="Internal reason behind their goal"
    )

    conflict = st.text_area(
        "Internal Conflict",
        value=st.session_state.current_character.get('conflict', ''),
        placeholder="What internal struggle or contradiction do they face?",
        help="Inner turmoil or contradiction"
    )

    # Save button
    if st.button("💾 Save Basic Info", use_container_width=True):
        st.session_state.current_character.update({
            'name': name,
            'age': age,
            'gender': gender,
            'role': role,
            'archetype': archetype,
            'occupation': occupation,
            'appearance': appearance,
            'goal': goal,
            'motivation': motivation,
            'conflict': conflict
        })

        # Add to characters list if new
        if st.session_state.current_character not in st.session_state.characters:
            st.session_state.characters.append(st.session_state.current_character)

        st.success(f"✅ Saved {name}'s basic information!")

with tab2:
    st.markdown("### 🧠 Psychological Profile")

    st.markdown("""
    <div class="info-box">
        Develop your character's psychology, personality traits, and emotional depth.
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)

    with col1:
        st.markdown("#### Positive Traits")
        positive_traits = st.multiselect(
            "Select positive traits",
            [
                "Brave", "Loyal", "Intelligent", "Compassionate", "Honest",
                "Determined", "Creative", "Humorous", "Patient", "Generous",
                "Charismatic", "Wise", "Resourceful", "Kind", "Confident"
            ],
            default=st.session_state.current_character.get('positive_traits', [])
        )

        custom_positive = st.text_input(
            "Add custom positive trait",
            key="custom_pos"
        )

        if custom_positive and st.button("Add", key="add_pos"):
            if custom_positive not in positive_traits:
                positive_traits.append(custom_positive)

    with col2:
        st.markdown("#### Negative Traits/Flaws")
        negative_traits = st.multiselect(
            "Select flaws or negative traits",
            [
                "Arrogant", "Impulsive", "Stubborn", "Cowardly", "Selfish",
                "Dishonest", "Vengeful", "Impatient", "Jealous", "Insecure",
                "Reckless", "Cynical", "Manipulative", "Lazy", "Judgmental"
            ],
            default=st.session_state.current_character.get('negative_traits', [])
        )

        custom_negative = st.text_input(
            "Add custom flaw",
            key="custom_neg"
        )

        if custom_negative and st.button("Add", key="add_neg"):
            if custom_negative not in negative_traits:
                negative_traits.append(custom_negative)

    st.markdown("---")

    fears = st.text_area(
        "Fears & Phobias",
        value=st.session_state.current_character.get('fears', ''),
        placeholder="What terrifies this character? What keeps them up at night?",
        help="Deepest fears and anxieties"
    )

    desires = st.text_area(
        "Secret Desires",
        value=st.session_state.current_character.get('desires', ''),
        placeholder="What do they secretly want but won't admit?",
        help="Hidden wants and wishes"
    )

    values = st.text_area(
        "Core Values",
        value=st.session_state.current_character.get('values', ''),
        placeholder="What principles guide their decisions? What do they believe in?",
        help="Moral compass and beliefs"
    )

    quirks = st.text_area(
        "Quirks & Habits",
        value=st.session_state.current_character.get('quirks', ''),
        placeholder="Nervous tapping, always carries a lucky coin, quotes poetry...",
        help="Unique behavioral patterns"
    )

    if st.button("💾 Save Psychology", use_container_width=True):
        st.session_state.current_character.update({
            'positive_traits': positive_traits,
            'negative_traits': negative_traits,
            'fears': fears,
            'desires': desires,
            'values': values,
            'quirks': quirks
        })
        st.success("✅ Saved psychological profile!")

with tab3:
    st.markdown("### 📜 Character Background")

    backstory = st.text_area(
        "Backstory Summary",
        value=st.session_state.current_character.get('backstory', ''),
        height=200,
        placeholder="Where did they come from? What shaped who they are today?",
        help="Character's history before the story begins"
    )

    st.markdown("---")
    st.markdown("### 👨‍👩‍👧‍👦 Relationships")

    family = st.text_area(
        "Family & Origin",
        value=st.session_state.current_character.get('family', ''),
        placeholder="Parents, siblings, upbringing...",
        help="Family background"
    )

    relationships = st.text_area(
        "Key Relationships",
        value=st.session_state.current_character.get('relationships', ''),
        placeholder="Friends, enemies, lovers, mentors...",
        help="Important people in their life"
    )

    st.markdown("---")
    st.markdown("### 🎓 Skills & Abilities")

    skills = st.text_area(
        "Skills & Competencies",
        value=st.session_state.current_character.get('skills', ''),
        placeholder="Combat training, magic, hacking, persuasion...",
        help="What are they good at?"
    )

    weaknesses = st.text_area(
        "Weaknesses & Limitations",
        value=st.session_state.current_character.get('weaknesses', ''),
        placeholder="Physical limitations, knowledge gaps, vulnerabilities...",
        help="What are they bad at or vulnerable to?"
    )

    st.markdown("---")
    st.markdown("### 🌟 Character Arc")

    arc_beginning = st.text_area(
        "Character at Story Start",
        value=st.session_state.current_character.get('arc_beginning', ''),
        placeholder="Who are they when we first meet them?",
        help="Starting point of character arc"
    )

    arc_end = st.text_area(
        "Character at Story End",
        value=st.session_state.current_character.get('arc_end', ''),
        placeholder="Who have they become by the end?",
        help="End point of character arc"
    )

    transformation = st.text_area(
        "Key Transformation",
        value=st.session_state.current_character.get('transformation', ''),
        placeholder="What fundamental change occurs in this character?",
        help="Core change or growth"
    )

    if st.button("💾 Save Background", use_container_width=True):
        st.session_state.current_character.update({
            'backstory': backstory,
            'family': family,
            'relationships': relationships,
            'skills': skills,
            'weaknesses': weaknesses,
            'arc_beginning': arc_beginning,
            'arc_end': arc_end,
            'transformation': transformation
        })
        st.success("✅ Saved background and arc!")

with tab4:
    st.markdown("### 🤖 AI-Powered Character Generation")

    generation_method = st.radio(
        "Generation Method",
        ["Generate from Scratch", "Expand Existing Character", "Generate Backstory", "Suggest Character Arc"],
        horizontal=True
    )

    if generation_method == "Generate from Scratch":
        st.markdown("""
        <div class="info-box">
            Create a complete character profile from a simple description.
        </div>
        """, unsafe_allow_html=True)

        character_concept = st.text_area(
            "Character Concept",
            placeholder="A cynical detective haunted by past mistakes, trying to solve one last case...",
            help="Briefly describe your character idea"
        )

        col1, col2 = st.columns(2)
        with col1:
            char_role = st.selectbox(
                "Role",
                ["Protagonist", "Antagonist", "Supporting Character"],
                key="gen_role"
            )

        with col2:
            char_archetype = st.selectbox(
                "Archetype",
                ARCHETYPES,
                key="gen_archetype"
            )

        if st.button("✨ Generate Character", use_container_width=True, type="primary"):
            if character_concept:
                with st.spinner("🤖 Creating character profile..."):
                    try:
                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are an expert character developer for {genre_context} fiction. Create rich, complex, three-dimensional characters."},
                                {"role": "user", "content": f"""Create a detailed character profile for a {genre_context} story:

Concept: {character_concept}
Role: {char_role}
Archetype: {char_archetype}

Provide:
1. Name, age, occupation
2. Physical appearance
3. Personality (5 positive traits, 3 flaws)
4. Primary goal and motivation
5. Internal conflict
6. Backstory (2-3 sentences)
7. Key fear and secret desire
8. Character arc (beginning to end)
9. Unique quirk or habit

Make the character compelling, flawed, and believable."""}
                            ],
                            temperature=ai_creativity,
                            max_tokens=1500
                        )

                        generated_profile = response.choices[0].message.content

                        st.markdown("""
                        <div class="success-box">
                            ✅ Character generated! Copy details to other tabs or regenerate.
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown("### 📋 Generated Profile")
                        st.markdown(generated_profile)

                        if st.button("📥 Import to Character Creator"):
                            st.info("💡 Manually copy the generated details to other tabs for now.")

                    except Exception as e:
                        st.error(f"Error generating character: {str(e)}")
            else:
                st.error("⚠️ Please enter a character concept")

    elif generation_method == "Expand Existing Character":
        st.markdown("""
        <div class="info-box">
            Add depth and detail to your current character.
        </div>
        """, unsafe_allow_html=True)

        if st.session_state.current_character.get('name'):
            expand_aspect = st.selectbox(
                "What to expand?",
                [
                    "Psychological depth",
                    "Backstory details",
                    "Relationships",
                    "Skills and abilities",
                    "Motivations and fears",
                    "Unique quirks"
                ]
            )

            if st.button("✨ Expand Character", use_container_width=True):
                with st.spinner("🤖 Expanding character details..."):
                    try:
                        char_summary = f"""Name: {st.session_state.current_character.get('name')}
Role: {st.session_state.current_character.get('role')}
Age: {st.session_state.current_character.get('age')}
Archetype: {st.session_state.current_character.get('archetype')}
Goal: {st.session_state.current_character.get('goal', '')}"""

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are a character development specialist for {genre_context} fiction."},
                                {"role": "user", "content": f"""Expand the {expand_aspect} for this character:

{char_summary}

Provide detailed, specific content that adds depth and complexity. Make it concrete and actionable for the author."""}
                            ],
                            temperature=ai_creativity,
                            max_tokens=800
                        )

                        expansion = response.choices[0].message.content

                        st.markdown("""
                        <div class="success-box">
                            ✅ Expansion generated!
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown(f"### {expand_aspect.title()}")
                        st.markdown(expansion)

                    except Exception as e:
                        st.error(f"Error expanding character: {str(e)}")
        else:
            st.info("👈 Create a character in the 'Basic Info' tab first.")

    elif generation_method == "Generate Backstory":
        st.markdown("""
        <div class="info-box">
            Generate a detailed backstory for your character.
        </div>
        """, unsafe_allow_html=True)

        if st.session_state.current_character.get('name'):
            backstory_length = st.select_slider(
                "Backstory Length",
                options=["Brief (1 paragraph)", "Medium (3 paragraphs)", "Detailed (5+ paragraphs)"],
                value="Medium (3 paragraphs)"
            )

            key_events = st.text_area(
                "Key Events to Include (optional)",
                placeholder="Loss of parent, betrayal by mentor, first use of powers...",
                help="Specific events you want in the backstory"
            )

            if st.button("✨ Generate Backstory", use_container_width=True):
                with st.spinner("🤖 Writing backstory..."):
                    try:
                        char_summary = f"""Name: {st.session_state.current_character.get('name')}
Age: {st.session_state.current_character.get('age')}
Occupation: {st.session_state.current_character.get('occupation', '')}
Goal: {st.session_state.current_character.get('goal', '')}
Motivation: {st.session_state.current_character.get('motivation', '')}
Conflict: {st.session_state.current_character.get('conflict', '')}"""

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are a skilled storyteller creating character backstories for {genre_context} fiction."},
                                {"role": "user", "content": f"""Write a {backstory_length} backstory for this character:

{char_summary}

{f'Include these events: {key_events}' if key_events else ''}

Make it emotionally resonant and relevant to their current goal and conflicts. Show how their past shaped who they are today."""}
                            ],
                            temperature=ai_creativity,
                            max_tokens=1200
                        )

                        backstory = response.choices[0].message.content

                        st.markdown("""
                        <div class="success-box">
                            ✅ Backstory generated!
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown("### 📜 Generated Backstory")
                        st.markdown(backstory)

                    except Exception as e:
                        st.error(f"Error generating backstory: {str(e)}")
        else:
            st.info("👈 Create a character in the 'Basic Info' tab first.")

    elif generation_method == "Suggest Character Arc":
        st.markdown("""
        <div class="info-box">
            Get AI suggestions for your character's transformation arc.
        </div>
        """, unsafe_allow_html=True)

        if st.session_state.current_character.get('name'):
            if st.button("✨ Generate Arc", use_container_width=True):
                with st.spinner("🤖 Designing character arc..."):
                    try:
                        char_summary = f"""Name: {st.session_state.current_character.get('name')}
Role: {st.session_state.current_character.get('role')}
Goal: {st.session_state.current_character.get('goal', '')}
Conflict: {st.session_state.current_character.get('conflict', '')}
Positive Traits: {', '.join(st.session_state.current_character.get('positive_traits', []))}
Negative Traits: {', '.join(st.session_state.current_character.get('negative_traits', []))}"""

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are a story consultant specializing in character arcs for {genre_context} fiction."},
                                {"role": "user", "content": f"""Design a compelling character arc for:

{char_summary}

Provide:
1. Starting State: Who they are at the beginning
2. Catalyst: What triggers their change
3. Resistance: How they resist change
4. Turning Point: When they commit to change
5. Transformation: What fundamentally changes
6. End State: Who they become

Make it emotionally powerful and genre-appropriate."""}
                            ],
                            temperature=ai_creativity,
                            max_tokens=1000
                        )

                        arc = response.choices[0].message.content

                        st.markdown("""
                        <div class="success-box">
                            ✅ Character arc generated!
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown("### 🌟 Suggested Character Arc")
                        st.markdown(arc)

                    except Exception as e:
                        st.error(f"Error generating arc: {str(e)}")
        else:
            st.info("👈 Create a character in the 'Basic Info' tab first.")

with tab5:
    st.markdown("### 💾 Export Character Profile")

    if st.session_state.current_character.get('name'):
        character = st.session_state.current_character

        # Display character summary
        st.markdown(f"""
        <div class="character-card">
            <h2>{character.get('name', 'Unnamed Character')}</h2>
            <p><strong>{character.get('role', '')}</strong> • {character.get('archetype', '')}</p>
            <p>{character.get('age', '')} years old • {character.get('occupation', '')}</p>
        </div>
        """, unsafe_allow_html=True)

        # Export format selection
        export_format = st.selectbox(
            "Export Format",
            ["📄 Markdown (.md)", "📋 Plain Text (.txt)", "📊 JSON (.json)", "📖 Character Sheet (HTML)"]
        )

        # Generate export content
        if export_format == "📄 Markdown (.md)":
            export_content = f"# {character.get('name', 'Character Profile')}\n\n"
            export_content += f"**Role:** {character.get('role', '')}\n"
            export_content += f"**Archetype:** {character.get('archetype', '')}\n"
            export_content += f"**Age:** {character.get('age', '')} | **Gender:** {character.get('gender', '')}\n"
            export_content += f"**Occupation:** {character.get('occupation', '')}\n\n"

            export_content += f"## Appearance\n{character.get('appearance', '')}\n\n"
            export_content += f"## Core Elements\n"
            export_content += f"**Goal:** {character.get('goal', '')}\n\n"
            export_content += f"**Motivation:** {character.get('motivation', '')}\n\n"
            export_content += f"**Conflict:** {character.get('conflict', '')}\n\n"

            if character.get('positive_traits'):
                export_content += f"## Positive Traits\n"
                for trait in character.get('positive_traits', []):
                    export_content += f"- {trait}\n"
                export_content += "\n"

            if character.get('negative_traits'):
                export_content += f"## Flaws\n"
                for trait in character.get('negative_traits', []):
                    export_content += f"- {trait}\n"
                export_content += "\n"

            if character.get('backstory'):
                export_content += f"## Backstory\n{character.get('backstory', '')}\n\n"

            if character.get('arc_beginning'):
                export_content += f"## Character Arc\n"
                export_content += f"**Beginning:** {character.get('arc_beginning', '')}\n\n"
                export_content += f"**End:** {character.get('arc_end', '')}\n\n"
                export_content += f"**Transformation:** {character.get('transformation', '')}\n\n"

            file_ext = "md"

        elif export_format == "📋 Plain Text (.txt)":
            export_content = f"{character.get('name', 'CHARACTER PROFILE').upper()}\n"
            export_content += "=" * 50 + "\n\n"
            export_content += f"Role: {character.get('role', '')}\n"
            export_content += f"Archetype: {character.get('archetype', '')}\n"
            export_content += f"Age: {character.get('age', '')} | Gender: {character.get('gender', '')}\n\n"

            export_content += f"GOAL: {character.get('goal', '')}\n\n"
            export_content += f"MOTIVATION: {character.get('motivation', '')}\n\n"
            export_content += f"CONFLICT: {character.get('conflict', '')}\n\n"

            if character.get('backstory'):
                export_content += f"BACKSTORY:\n{character.get('backstory', '')}\n\n"

            file_ext = "txt"

        elif export_format == "📊 JSON (.json)":
            export_content = json.dumps(character, indent=2)
            file_ext = "json"

        elif export_format == "📖 Character Sheet (HTML)":
            export_content = f"""<!DOCTYPE html>
<html>
<head>
    <title>{character.get('name', 'Character Sheet')}</title>
    <style>
        body {{ font-family: Georgia, serif; max-width: 800px; margin: 40px auto; padding: 20px; }}
        h1 {{ color: #FF8C42; border-bottom: 3px solid #4A9B9B; }}
        .trait {{ display: inline-block; background: #4A9B9B; color: white; padding: 4px 12px; margin: 4px; border-radius: 12px; }}
        .section {{ margin: 20px 0; padding: 15px; background: #FFF8E7; border-radius: 8px; }}
    </style>
</head>
<body>
    <h1>{character.get('name', 'Character Profile')}</h1>
    <div class="section">
        <strong>Role:</strong> {character.get('role', '')} |
        <strong>Archetype:</strong> {character.get('archetype', '')} |
        <strong>Age:</strong> {character.get('age', '')}
    </div>
    <h2>Appearance</h2>
    <p>{character.get('appearance', '')}</p>
    <h2>Goal & Motivation</h2>
    <p><strong>Goal:</strong> {character.get('goal', '')}</p>
    <p><strong>Motivation:</strong> {character.get('motivation', '')}</p>
    <h2>Backstory</h2>
    <p>{character.get('backstory', '')}</p>
</body>
</html>"""
            file_ext = "html"

        # Preview
        with st.expander("📄 Preview Export", expanded=False):
            st.code(export_content[:1000] + "..." if len(export_content) > 1000 else export_content)

        # Download button
        filename = f"{character.get('name', 'character').replace(' ', '_')}_{datetime.now().strftime('%Y%m%d')}.{file_ext}"

        st.download_button(
            label=f"⬇️ Download {export_format}",
            data=export_content,
            file_name=filename,
            mime=f"text/{file_ext}",
            use_container_width=True
        )

    else:
        st.info("👈 Create a character in the 'Basic Info' tab first.")

# Character development tips
with st.expander("💡 Character Development Tips", expanded=False):
    st.markdown("""
    ### Creating Compelling Characters

    **1. Make Them Flawed**
    Perfect characters are boring. Give them weaknesses, fears, and contradictions.

    **2. Want vs. Need**
    - **Want:** External goal (save the world)
    - **Need:** Internal lesson (learn to trust others)

    **3. Backstory Shapes Behavior**
    Every quirk, fear, and motivation should tie to their history.

    **4. Character Arc**
    - **Positive Arc:** Overcome flaw, achieve need
    - **Negative Arc:** Fail to change, tragic ending
    - **Flat Arc:** Don't change, change the world

    **5. Test Their Values**
    Put characters in situations that challenge their core beliefs.

    **6. Relationships Define**
    Show who they are through how they treat others.

    **7. Specific Details**
    Don't say "brave" - show them rushing into danger despite fear.

    **8. Contradictions Create Depth**
    Ruthless warrior who loves poetry. Coward who stands up when it matters.
    """)

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
