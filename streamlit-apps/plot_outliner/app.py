"""
🦚 Plot Outliner - Rohimaya Publishing
AI-powered story structure and plot development
Built with Streamlit and OpenAI
"""

import streamlit as st
from openai import OpenAI
import json
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Plot Outliner | Rohimaya Publishing",
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

    .plot-point-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid var(--peacock-teal);
        margin: 1rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }

    .beat-card {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        padding: 1rem;
        border-radius: 8px;
        border-left: 3px solid var(--phoenix-orange);
        margin: 0.5rem 0;
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

    .warning-box {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
    }

    .structure-diagram {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        margin: 1rem 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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
    <h1 class="header-title">📖 Plot Outliner</h1>
    <p class="header-subtitle">Structure your story with proven frameworks and AI assistance</p>
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
if 'plot_outline' not in st.session_state:
    st.session_state.plot_outline = {}
if 'story_premise' not in st.session_state:
    st.session_state.story_premise = ""
if 'generated_outlines' not in st.session_state:
    st.session_state.generated_outlines = []

# Plot structure templates
PLOT_STRUCTURES = {
    "Three-Act Structure": {
        "description": "Classic Hollywood structure: Setup, Confrontation, Resolution",
        "beats": [
            "Opening Image", "Setup", "Catalyst", "Debate",
            "Break into Act 2", "B Story", "Fun and Games", "Midpoint",
            "Bad Guys Close In", "All Is Lost", "Dark Night of the Soul",
            "Break into Act 3", "Finale", "Final Image"
        ]
    },
    "Hero's Journey": {
        "description": "Joseph Campbell's monomyth: 12 stages of transformation",
        "beats": [
            "Ordinary World", "Call to Adventure", "Refusal of the Call",
            "Meeting the Mentor", "Crossing the Threshold", "Tests, Allies, Enemies",
            "Approach to Inmost Cave", "Ordeal", "Reward",
            "The Road Back", "Resurrection", "Return with Elixir"
        ]
    },
    "Save the Cat": {
        "description": "Blake Snyder's 15 story beats",
        "beats": [
            "Opening Image", "Theme Stated", "Setup", "Catalyst",
            "Debate", "Break into Two", "B Story", "Fun and Games",
            "Midpoint", "Bad Guys Close In", "All Is Lost", "Dark Night of the Soul",
            "Break into Three", "Finale", "Final Image"
        ]
    },
    "Seven-Point Story": {
        "description": "Dan Wells' structure: Hook, Plot Turns, Pinch Points, Resolution",
        "beats": [
            "Hook", "Plot Turn 1", "Pinch Point 1", "Midpoint",
            "Pinch Point 2", "Plot Turn 2", "Resolution"
        ]
    },
    "Freytag's Pyramid": {
        "description": "Gustav Freytag's dramatic structure",
        "beats": [
            "Exposition", "Inciting Incident", "Rising Action",
            "Climax", "Falling Action", "Resolution"
        ]
    },
    "Story Circle": {
        "description": "Dan Harmon's 8-step structure based on the Hero's Journey",
        "beats": [
            "You (Comfort Zone)", "Need (Want Something)", "Go (Enter Unknown)",
            "Search (Adapt to It)", "Find (Get What You Want)", "Take (Pay Price)",
            "Return (Go Back)", "Change (You've Changed)"
        ]
    },
    "Fichtean Curve": {
        "description": "Crisis-driven structure with rising conflicts",
        "beats": [
            "Inciting Incident", "Rising Action - Crisis 1", "Rising Action - Crisis 2",
            "Rising Action - Crisis 3", "Climax", "Falling Action", "Resolution"
        ]
    },
    "In Media Res": {
        "description": "Start in the middle of action, then reveal backstory",
        "beats": [
            "Opening Action", "Flashback - Origin", "Present - Conflict",
            "Flashback - Preparation", "Present - Rising Stakes",
            "Climax", "Resolution"
        ]
    }
}

# Sidebar - Story Settings
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### 📚 Story Information")

    story_title = st.text_input(
        "Story Title",
        placeholder="The Phoenix Chronicles",
        help="Working title for your story"
    )

    genre = st.selectbox(
        "Genre",
        [
            "Fantasy", "Science Fiction", "Romance", "Mystery",
            "Thriller", "Horror", "Historical Fiction", "Literary Fiction",
            "Young Adult", "Middle Grade", "Adventure", "Drama"
        ]
    )

    word_count_target = st.selectbox(
        "Target Length",
        [
            "Flash Fiction (< 1,000 words)",
            "Short Story (1,000 - 7,500 words)",
            "Novelette (7,500 - 20,000 words)",
            "Novella (20,000 - 50,000 words)",
            "Novel (50,000 - 110,000 words)",
            "Epic (110,000+ words)"
        ]
    )

    st.markdown("---")
    st.markdown("### 🎭 Plot Structure")

    selected_structure = st.selectbox(
        "Choose Structure",
        list(PLOT_STRUCTURES.keys()),
        help="Select a story structure framework"
    )

    st.info(f"**{selected_structure}**\n\n{PLOT_STRUCTURES[selected_structure]['description']}")

    st.markdown("---")
    st.markdown("### 🎨 AI Assistance Level")

    ai_creativity = st.slider(
        "AI Creativity",
        0.0, 1.0, 0.7, 0.1,
        help="Higher = more creative suggestions"
    )

# Main content area
tab1, tab2, tab3, tab4 = st.tabs(["✍️ Story Premise", "📋 Outline Builder", "🤖 AI Generation", "💾 Export"])

with tab1:
    st.markdown("### ✍️ Define Your Story Premise")

    st.markdown("""
    <div class="info-box">
        Start by defining the core elements of your story. The clearer your premise,
        the better the AI can help structure your plot.
    </div>
    """, unsafe_allow_html=True)

    col1, col2 = st.columns(2)

    with col1:
        protagonist = st.text_area(
            "Protagonist",
            placeholder="Who is your main character? What do they want?",
            help="Describe your protagonist's goals and motivations"
        )

        antagonist = st.text_area(
            "Antagonist/Obstacle",
            placeholder="What or who stands in their way?",
            help="Describe the main conflict or opposition"
        )

    with col2:
        setting = st.text_area(
            "Setting",
            placeholder="Where and when does the story take place?",
            help="Describe the world, time period, or environment"
        )

        theme = st.text_area(
            "Theme",
            placeholder="What's your story really about?",
            help="Core themes and messages (love, redemption, power, etc.)"
        )

    st.markdown("---")

    premise = st.text_area(
        "Story Premise (One-Paragraph Summary)",
        height=150,
        placeholder="""Example:
A young wizard discovers they're the chosen one destined to defeat an ancient evil, but they must first master their powers, gather unlikely allies, and overcome their own self-doubt before the darkness consumes their world.""",
        help="Combine all elements into a cohesive premise"
    )

    if premise:
        st.session_state.story_premise = premise

    if st.button("💡 Generate Premise with AI", use_container_width=True):
        if protagonist and antagonist:
            with st.spinner("🤖 Generating story premise..."):
                try:
                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": f"You are a professional story editor specializing in {genre} fiction. Generate compelling story premises."},
                            {"role": "user", "content": f"""Create a compelling one-paragraph story premise for a {genre} story with these elements:

Protagonist: {protagonist}
Antagonist: {antagonist}
Setting: {setting}
Theme: {theme}
Target Length: {word_count_target}

Write a single paragraph premise that hooks readers and clearly establishes the central conflict."""}
                        ],
                        temperature=ai_creativity,
                        max_tokens=300
                    )

                    generated_premise = response.choices[0].message.content
                    st.session_state.story_premise = generated_premise

                    st.markdown("""
                    <div class="success-box">
                        ✅ Premise generated! Copy it to the text area above.
                    </div>
                    """, unsafe_allow_html=True)

                    st.write(generated_premise)

                except Exception as e:
                    st.error(f"Error generating premise: {str(e)}")
        else:
            st.error("⚠️ Please fill in at least Protagonist and Antagonist fields")

with tab2:
    st.markdown(f"### 📋 {selected_structure} Outline")

    structure = PLOT_STRUCTURES[selected_structure]

    st.markdown(f"""
    <div class="info-box">
        <strong>{structure['description']}</strong><br>
        Fill in each beat to build your complete plot outline.
    </div>
    """, unsafe_allow_html=True)

    # Initialize plot outline for current structure
    if selected_structure not in st.session_state.plot_outline:
        st.session_state.plot_outline[selected_structure] = {}

    # Display each beat
    for idx, beat in enumerate(structure['beats']):
        st.markdown(f"""
        <div class="beat-card">
            <strong>Beat {idx + 1}: {beat}</strong>
        </div>
        """, unsafe_allow_html=True)

        # Text area for each beat
        beat_content = st.text_area(
            f"Describe what happens in '{beat}'",
            value=st.session_state.plot_outline[selected_structure].get(beat, ""),
            key=f"beat_{idx}",
            placeholder=f"What happens during {beat}? Describe the key events, character decisions, and plot developments...",
            help=f"Fill in the details for {beat}"
        )

        st.session_state.plot_outline[selected_structure][beat] = beat_content

    # Progress indicator
    filled_beats = sum(1 for beat in structure['beats'] if st.session_state.plot_outline[selected_structure].get(beat, ""))
    total_beats = len(structure['beats'])
    progress = filled_beats / total_beats

    st.progress(progress)
    st.caption(f"Progress: {filled_beats}/{total_beats} beats completed ({progress*100:.0f}%)")

with tab3:
    st.markdown("### 🤖 AI-Powered Plot Generation")

    if st.session_state.story_premise:
        st.markdown(f"""
        <div class="plot-point-card">
            <strong>Your Premise:</strong><br>
            {st.session_state.story_premise}
        </div>
        """, unsafe_allow_html=True)

        col1, col2 = st.columns(2)

        with col1:
            if st.button("✨ Generate Full Outline", use_container_width=True, type="primary"):
                with st.spinner(f"🤖 Generating {selected_structure} outline..."):
                    try:
                        # Build prompt with structure beats
                        beats_list = "\n".join([f"{i+1}. {beat}" for i, beat in enumerate(structure['beats'])])

                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are a professional story editor and plot consultant specializing in {genre} fiction."},
                                {"role": "user", "content": f"""Create a detailed plot outline using the {selected_structure} structure for this story premise:

{st.session_state.story_premise}

Genre: {genre}
Target Length: {word_count_target}

Structure beats to fill in:
{beats_list}

For each beat, provide 2-3 sentences describing the key plot events, character decisions, and story developments. Make it specific and compelling."""}
                            ],
                            temperature=ai_creativity,
                            max_tokens=2000
                        )

                        generated_outline = response.choices[0].message.content

                        # Parse and populate beats (simplified parsing)
                        lines = generated_outline.split('\n')
                        current_beat_idx = 0

                        for line in lines:
                            if line.strip():
                                # Try to match beat names
                                for beat in structure['beats']:
                                    if beat.lower() in line.lower():
                                        current_beat_idx = structure['beats'].index(beat)
                                    elif len(line) > 50 and current_beat_idx < len(structure['beats']):
                                        # Content line
                                        beat_name = structure['beats'][current_beat_idx]
                                        if not st.session_state.plot_outline[selected_structure].get(beat_name):
                                            st.session_state.plot_outline[selected_structure][beat_name] = line.strip()
                                            current_beat_idx += 1

                        st.session_state.generated_outlines.append({
                            'structure': selected_structure,
                            'outline': generated_outline,
                            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                        })

                        st.success("✅ Outline generated! Check the 'Outline Builder' tab.")
                        st.balloons()

                        with st.expander("📄 View Generated Outline", expanded=True):
                            st.markdown(generated_outline)

                    except Exception as e:
                        st.error(f"Error generating outline: {str(e)}")

        with col2:
            if st.button("💡 Suggest Plot Twists", use_container_width=True):
                with st.spinner("🤖 Generating plot twist ideas..."):
                    try:
                        response = client.chat.completions.create(
                            model="gpt-4-turbo-preview",
                            messages=[
                                {"role": "system", "content": f"You are a creative writing consultant specializing in plot development for {genre} stories."},
                                {"role": "user", "content": f"""Based on this premise:

{st.session_state.story_premise}

Suggest 5 unexpected plot twists that would elevate the story. Make them surprising but logical."""}
                            ],
                            temperature=0.9,
                            max_tokens=500
                        )

                        twists = response.choices[0].message.content

                        st.markdown("""
                        <div class="success-box">
                            💡 Plot Twist Ideas:
                        </div>
                        """, unsafe_allow_html=True)

                        st.markdown(twists)

                    except Exception as e:
                        st.error(f"Error generating twists: {str(e)}")

        st.markdown("---")
        st.markdown("### 🎯 Additional AI Tools")

        tool_col1, tool_col2, tool_col3 = st.columns(3)

        with tool_col1:
            if st.button("⚡ Generate Opening Scene", use_container_width=True):
                st.info("Generate compelling opening scene based on your premise...")

        with tool_col2:
            if st.button("💥 Suggest Climax Ideas", use_container_width=True):
                st.info("Generate climactic scene possibilities...")

        with tool_col3:
            if st.button("🔄 Identify Plot Holes", use_container_width=True):
                st.info("Analyze outline for logic gaps and inconsistencies...")

    else:
        st.info("👈 Define your story premise in the 'Story Premise' tab first.")

with tab4:
    st.markdown("### 💾 Export Your Outline")

    if st.session_state.plot_outline.get(selected_structure):
        st.markdown("""
        <div class="success-box">
            ✅ Your outline is ready to export!
        </div>
        """, unsafe_allow_html=True)

        export_format = st.selectbox(
            "Export Format",
            ["📄 Markdown (.md)", "📋 Plain Text (.txt)", "📊 JSON (.json)", "📝 Novel Template"]
        )

        # Generate export content
        if export_format == "📄 Markdown (.md)":
            export_content = f"# {story_title if story_title else 'Story Outline'}\n\n"
            export_content += f"**Genre:** {genre}\n"
            export_content += f"**Structure:** {selected_structure}\n"
            export_content += f"**Target Length:** {word_count_target}\n\n"

            if st.session_state.story_premise:
                export_content += f"## Premise\n\n{st.session_state.story_premise}\n\n"

            export_content += f"## {selected_structure} Outline\n\n"

            for idx, beat in enumerate(structure['beats']):
                content = st.session_state.plot_outline[selected_structure].get(beat, "")
                export_content += f"### {idx + 1}. {beat}\n\n{content}\n\n"

            file_ext = "md"

        elif export_format == "📋 Plain Text (.txt)":
            export_content = f"{story_title if story_title else 'Story Outline'}\n"
            export_content += "=" * 50 + "\n\n"
            export_content += f"Genre: {genre}\n"
            export_content += f"Structure: {selected_structure}\n\n"

            if st.session_state.story_premise:
                export_content += f"PREMISE:\n{st.session_state.story_premise}\n\n"

            export_content += f"{selected_structure.upper()} OUTLINE:\n\n"

            for idx, beat in enumerate(structure['beats']):
                content = st.session_state.plot_outline[selected_structure].get(beat, "")
                export_content += f"{idx + 1}. {beat.upper()}\n{content}\n\n"

            file_ext = "txt"

        elif export_format == "📊 JSON (.json)":
            export_data = {
                "title": story_title,
                "genre": genre,
                "structure": selected_structure,
                "target_length": word_count_target,
                "premise": st.session_state.story_premise,
                "outline": st.session_state.plot_outline[selected_structure],
                "created": datetime.now().isoformat()
            }
            export_content = json.dumps(export_data, indent=2)
            file_ext = "json"

        elif export_format == "📝 Novel Template":
            export_content = f"# {story_title if story_title else 'Novel Template'}\n\n"
            export_content += "## Outline\n\n"

            for idx, beat in enumerate(structure['beats']):
                content = st.session_state.plot_outline[selected_structure].get(beat, "")
                export_content += f"### {beat}\n{content}\n\n"

            export_content += "\n---\n\n## Draft\n\n"

            for idx, beat in enumerate(structure['beats']):
                export_content += f"## Chapter {idx + 1}: {beat}\n\n"
                export_content += "[Write your chapter here...]\n\n"

            file_ext = "md"

        # Preview
        with st.expander("📄 Preview Export", expanded=False):
            st.code(export_content[:1000] + "..." if len(export_content) > 1000 else export_content)

        # Download button
        filename = f"{story_title.replace(' ', '_') if story_title else 'story_outline'}_{datetime.now().strftime('%Y%m%d')}.{file_ext}"

        st.download_button(
            label=f"⬇️ Download {export_format}",
            data=export_content,
            file_name=filename,
            mime=f"text/{file_ext}",
            use_container_width=True
        )

        # Statistics
        total_words = sum(len(content.split()) for content in st.session_state.plot_outline[selected_structure].values())

        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Beats Completed", f"{filled_beats}/{total_beats}")
        with col2:
            st.metric("Total Words", f"{total_words:,}")
        with col3:
            st.metric("Completeness", f"{progress*100:.0f}%")

    else:
        st.info("👈 Build your outline in the 'Outline Builder' tab first.")

# Structure reference section
with st.expander("📚 Plot Structure Reference Guide", expanded=False):
    for structure_name, structure_data in PLOT_STRUCTURES.items():
        st.markdown(f"### {structure_name}")
        st.write(structure_data['description'])
        st.write("**Beats:**")
        for i, beat in enumerate(structure_data['beats']):
            st.write(f"{i+1}. {beat}")
        st.markdown("---")

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
