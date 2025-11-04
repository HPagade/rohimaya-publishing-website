"""
🦚 Marketing Copy Generator - Rohimaya Publishing
AI-powered book marketing content creation
Built with Streamlit and OpenAI
"""

import streamlit as st
from openai import OpenAI
from datetime import datetime
import json

# Page configuration
st.set_page_config(
    page_title="Marketing Copy Generator | Rohimaya Publishing",
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

    .copy-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid var(--peacock-teal);
        margin: 1rem 0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
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

    .platform-badge {
        display: inline-block;
        background: var(--peacock-teal);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 20px;
        margin: 0.25rem;
        font-size: 0.85rem;
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
    <h1 class="header-title">📢 Marketing Copy Generator</h1>
    <p class="header-subtitle">Create compelling book marketing content with AI</p>
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
if 'generated_copies' not in st.session_state:
    st.session_state.generated_copies = []

# Sidebar - Book Information
with st.sidebar:
    st.image("rohimaya-publishing-circle-logo.png", use_container_width=True)
    st.markdown("### 📚 Book Information")

    book_title = st.text_input(
        "Book Title",
        placeholder="The Phoenix Chronicles",
        help="Your book's title"
    )

    author_name = st.text_input(
        "Author Name",
        placeholder="Hannah Pagade",
        help="Your author name"
    )

    genre = st.selectbox(
        "Genre",
        [
            "Fantasy", "Science Fiction", "Romance", "Mystery/Thriller",
            "Horror", "Historical Fiction", "Young Adult", "Middle Grade",
            "Non-Fiction", "Biography/Memoir", "Self-Help", "Business"
        ]
    )

    st.markdown("---")
    st.markdown("### 🎯 Target Audience")

    target_audience = st.multiselect(
        "Who is this book for?",
        [
            "Adult readers (25-54)",
            "Young adults (16-24)",
            "Teens (13-17)",
            "Middle grade (8-12)",
            "Women readers",
            "Men readers",
            "LGBTQ+ readers",
            "Genre fans (specify in logline)"
        ]
    )

    st.markdown("---")
    st.markdown("### 📖 Book Details")

    logline = st.text_area(
        "Logline (1-2 sentences)",
        placeholder="A young wizard must master forbidden magic to stop an ancient evil...",
        help="Brief summary of your book's core story"
    )

    key_themes = st.text_input(
        "Key Themes/Tropes",
        placeholder="Chosen one, magic school, found family, enemies to lovers",
        help="Main themes or popular tropes"
    )

    comp_titles = st.text_input(
        "Comparable Titles",
        placeholder="Harry Potter, Mistborn, The Name of the Wind",
        help="Books similar to yours"
    )

    st.markdown("---")
    st.markdown("### 🎨 Voice & Tone")

    voice_style = st.selectbox(
        "Marketing Voice",
        [
            "Exciting & Epic", "Mysterious & Dark", "Romantic & Emotional",
            "Humorous & Light", "Serious & Literary", "Adventurous & Bold",
            "Inspiring & Uplifting"
        ]
    )

# Main content area
tab1, tab2, tab3, tab4, tab5 = st.tabs([
    "📖 Book Blurbs", "📱 Social Media", "📧 Email Campaigns", "💰 Ad Copy", "📰 Press Release"
])

with tab1:
    st.markdown("### 📖 Book Blurbs / Descriptions")

    st.markdown("""
    <div class="info-box">
        Generate compelling book descriptions for various platforms and lengths.
    </div>
    """, unsafe_allow_html=True)

    blurb_length = st.selectbox(
        "Blurb Length",
        [
            "Short (50-75 words) - Amazon search results",
            "Medium (150-200 words) - Amazon product page",
            "Long (300-400 words) - Website, Goodreads",
            "Back Cover (200 words) - Print book back"
        ]
    )

    include_elements = st.multiselect(
        "Include in Blurb",
        [
            "Hook (opening sentence)",
            "Protagonist introduction",
            "Stakes (what's at risk)",
            "Conflict/Challenge",
            "Unique selling point",
            "Emotional appeal",
            "Call to action",
            "Comparison to popular books"
        ],
        default=["Hook (opening sentence)", "Stakes (what's at risk)", "Conflict/Challenge"]
    )

    if st.button("✨ Generate Book Blurb", use_container_width=True, type="primary"):
        if book_title and logline:
            with st.spinner("📝 Writing compelling book description..."):
                try:
                    # Determine word count target
                    word_targets = {
                        "Short (50-75 words) - Amazon search results": "50-75 words",
                        "Medium (150-200 words) - Amazon product page": "150-200 words",
                        "Long (300-400 words) - Website, Goodreads": "300-400 words",
                        "Back Cover (200 words) - Print book back": "exactly 200 words"
                    }

                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": f"You are a bestselling book marketer specializing in {genre} fiction. Write compelling book descriptions that make readers want to buy."},
                            {"role": "user", "content": f"""Write a {word_targets[blurb_length]} book blurb for:

Title: {book_title}
Author: {author_name}
Genre: {genre}
Logline: {logline}
Themes: {key_themes}
Comparable to: {comp_titles}
Voice/Tone: {voice_style}
Target Audience: {', '.join(target_audience)}

Include these elements:
{chr(10).join(['- ' + elem for elem in include_elements])}

Make it compelling, intriguing, and commercially appealing. Focus on emotional hooks and stakes, not plot summary."""}
                        ],
                        temperature=0.8,
                        max_tokens=600
                    )

                    blurb = response.choices[0].message.content

                    st.markdown("""
                    <div class="success-box">
                        ✅ Book blurb generated!
                    </div>
                    """, unsafe_allow_html=True)

                    st.markdown("### 📄 Generated Blurb")
                    st.markdown(f"""
                    <div class="copy-card">
                        {blurb}
                    </div>
                    """, unsafe_allow_html=True)

                    # Copy to clipboard
                    st.code(blurb, language=None)

                    # Save to session
                    st.session_state.generated_copies.append({
                        'type': 'Book Blurb',
                        'length': blurb_length,
                        'content': blurb,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                except Exception as e:
                    st.error(f"Error generating blurb: {str(e)}")
        else:
            st.error("⚠️ Please enter book title and logline")

    # Generate variations
    if st.button("🔄 Generate 3 Variations", use_container_width=True):
        if book_title and logline:
            with st.spinner("📝 Creating multiple variations..."):
                st.info("Generating 3 different approaches to the same blurb...")

with tab2:
    st.markdown("### 📱 Social Media Posts")

    st.markdown("""
    <div class="info-box">
        Create engaging social media posts for book promotion across platforms.
    </div>
    """, unsafe_allow_html=True)

    platform = st.selectbox(
        "Platform",
        [
            "Instagram",
            "Facebook",
            "Twitter/X",
            "TikTok caption",
            "LinkedIn",
            "Pinterest",
            "Threads",
            "BlueSky"
        ]
    )

    post_type = st.selectbox(
        "Post Type",
        [
            "Book announcement",
            "Cover reveal",
            "Release countdown",
            "Behind the scenes",
            "Character spotlight",
            "Quote from book",
            "Reader testimonial",
            "Writing process",
            "Pre-order announcement",
            "Sale/promotion"
        ]
    )

    include_in_post = st.multiselect(
        "Include",
        ["Hashtags", "Emojis", "Call to action", "Link", "Question to audience"],
        default=["Hashtags", "Call to action"]
    )

    if st.button("✨ Generate Social Post", use_container_width=True, type="primary"):
        if book_title and logline:
            with st.spinner(f"📱 Creating {platform} post..."):
                try:
                    # Platform-specific character limits
                    char_limits = {
                        "Instagram": "2,200 characters (but keep under 300 for readability)",
                        "Facebook": "400 characters (ideal length)",
                        "Twitter/X": "280 characters maximum",
                        "TikTok caption": "150 characters (short attention span)",
                        "LinkedIn": "1,300 characters (professional tone)",
                        "Pinterest": "500 characters description",
                        "Threads": "500 characters",
                        "BlueSky": "300 characters"
                    }

                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": f"You are a social media marketing expert for {genre} books. Create engaging, platform-appropriate content."},
                            {"role": "user", "content": f"""Create a {platform} post for:

Title: {book_title}
Author: {author_name}
Genre: {genre}
Logline: {logline}
Post Type: {post_type}
Voice: {voice_style}

Character limit: {char_limits[platform]}

Include: {', '.join(include_in_post)}

Make it engaging, authentic, and compelling. Match the platform's culture and audience expectations."""}
                        ],
                        temperature=0.9,
                        max_tokens=400
                    )

                    social_post = response.choices[0].message.content

                    st.markdown("""
                    <div class="success-box">
                        ✅ Social media post generated!
                    </div>
                    """, unsafe_allow_html=True)

                    st.markdown(f"### 📱 {platform} Post")
                    st.markdown(f"""
                    <div class="copy-card">
                        <span class="platform-badge">{platform}</span>
                        <p style="margin-top: 1rem;">{social_post.replace(chr(10), '<br>')}</p>
                    </div>
                    """, unsafe_allow_html=True)

                    # Copy to clipboard
                    st.code(social_post, language=None)

                    # Save to session
                    st.session_state.generated_copies.append({
                        'type': f'{platform} Post',
                        'post_type': post_type,
                        'content': social_post,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                except Exception as e:
                    st.error(f"Error generating post: {str(e)}")
        else:
            st.error("⚠️ Please enter book title and logline")

with tab3:
    st.markdown("### 📧 Email Campaigns")

    st.markdown("""
    <div class="info-box">
        Generate email content for newsletters, announcements, and reader engagement.
    </div>
    """, unsafe_allow_html=True)

    email_type = st.selectbox(
        "Email Type",
        [
            "New release announcement",
            "Pre-order campaign",
            "Launch day email",
            "Sale/promotion announcement",
            "Reader magnet offer",
            "Newsletter (monthly update)",
            "Behind-the-scenes content",
            "Series announcement",
            "Thank you to readers"
        ]
    )

    email_tone = st.selectbox(
        "Tone",
        ["Excited & Enthusiastic", "Personal & Intimate", "Professional & Polished", "Casual & Friendly"]
    )

    if st.button("✨ Generate Email", use_container_width=True, type="primary"):
        if book_title and logline:
            with st.spinner("📧 Writing email content..."):
                try:
                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": f"You are an email marketing expert for {genre} authors. Write emails that engage readers and drive action."},
                            {"role": "user", "content": f"""Write a {email_type} email for:

Title: {book_title}
Author: {author_name}
Genre: {genre}
Logline: {logline}
Themes: {key_themes}
Tone: {email_tone}

Include:
- Compelling subject line
- Email body (300-500 words)
- Clear call to action
- Sign-off

Make it personal, engaging, and actionable."""}
                        ],
                        temperature=0.8,
                        max_tokens=800
                    )

                    email_content = response.choices[0].message.content

                    st.markdown("""
                    <div class="success-box">
                        ✅ Email campaign generated!
                    </div>
                    """, unsafe_allow_html=True)

                    st.markdown("### 📧 Email Content")
                    st.markdown(f"""
                    <div class="copy-card">
                        {email_content.replace(chr(10), '<br>')}
                    </div>
                    """, unsafe_allow_html=True)

                    # Copy to clipboard
                    st.code(email_content, language=None)

                    # Save to session
                    st.session_state.generated_copies.append({
                        'type': 'Email Campaign',
                        'email_type': email_type,
                        'content': email_content,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                except Exception as e:
                    st.error(f"Error generating email: {str(e)}")
        else:
            st.error("⚠️ Please enter book title and logline")

with tab4:
    st.markdown("### 💰 Ad Copy")

    st.markdown("""
    <div class="info-box">
        Create compelling ad copy for paid advertising campaigns.
    </div>
    """, unsafe_allow_html=True)

    ad_platform = st.selectbox(
        "Ad Platform",
        [
            "Facebook/Instagram Ads",
            "Amazon Ads (Sponsored Products)",
            "Amazon Ads (Sponsored Brands)",
            "Google Ads",
            "BookBub Featured Deal",
            "Newsletter ads (BookBub, Bargain Booksy, etc.)",
            "TikTok Ads"
        ]
    )

    ad_goal = st.selectbox(
        "Campaign Goal",
        ["Drive pre-orders", "Increase sales", "Build awareness", "Grow email list", "Promote sale/discount"]
    )

    if st.button("✨ Generate Ad Copy", use_container_width=True, type="primary"):
        if book_title and logline:
            with st.spinner(f"💰 Creating {ad_platform} ad copy..."):
                try:
                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": f"You are a direct-response copywriter specializing in book advertising for {genre} titles. Write high-converting ad copy."},
                            {"role": "user", "content": f"""Write ad copy for {ad_platform}:

Title: {book_title}
Author: {author_name}
Genre: {genre}
Logline: {logline}
Goal: {ad_goal}
Comparable to: {comp_titles}

Include:
- Attention-grabbing headline
- Compelling body copy (concise!)
- Strong call to action
- Character limits appropriate for platform

Focus on benefits, emotional hooks, and urgency. Make readers want to click NOW."""}
                        ],
                        temperature=0.8,
                        max_tokens=500
                    )

                    ad_copy = response.choices[0].message.content

                    st.markdown("""
                    <div class="success-box">
                        ✅ Ad copy generated!
                    </div>
                    """, unsafe_allow_html=True)

                    st.markdown(f"### 💰 {ad_platform} Ad Copy")
                    st.markdown(f"""
                    <div class="copy-card">
                        <span class="platform-badge">{ad_platform}</span>
                        <p style="margin-top: 1rem;">{ad_copy.replace(chr(10), '<br>')}</p>
                    </div>
                    """, unsafe_allow_html=True)

                    # Copy to clipboard
                    st.code(ad_copy, language=None)

                    # A/B testing suggestion
                    st.info("💡 **Pro Tip:** Generate 2-3 variations and A/B test to find what converts best!")

                    # Save to session
                    st.session_state.generated_copies.append({
                        'type': f'{ad_platform} Ad',
                        'goal': ad_goal,
                        'content': ad_copy,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                except Exception as e:
                    st.error(f"Error generating ad copy: {str(e)}")
        else:
            st.error("⚠️ Please enter book title and logline")

with tab5:
    st.markdown("### 📰 Press Release")

    st.markdown("""
    <div class="info-box">
        Generate professional press releases for book launches, awards, or major news.
    </div>
    """, unsafe_allow_html=True)

    press_reason = st.selectbox(
        "Press Release For",
        [
            "Book launch/release",
            "Book award or recognition",
            "Bestseller list achievement",
            "Series announcement",
            "Movie/TV adaptation news",
            "Author milestone",
            "Special edition release"
        ]
    )

    additional_info = st.text_area(
        "Additional Information",
        placeholder="Include any awards, achievements, special recognitions, or unique angles...",
        help="Extra details that make this newsworthy"
    )

    if st.button("✨ Generate Press Release", use_container_width=True, type="primary"):
        if book_title and logline:
            with st.spinner("📰 Writing press release..."):
                try:
                    response = client.chat.completions.create(
                        model="gpt-4-turbo-preview",
                        messages=[
                            {"role": "system", "content": "You are a professional PR writer. Create newsworthy, professional press releases following AP style guidelines."},
                            {"role": "user", "content": f"""Write a press release for:

Title: {book_title}
Author: {author_name}
Genre: {genre}
Logline: {logline}
Reason: {press_reason}
Additional Context: {additional_info}
Comparable Titles: {comp_titles}

Include:
- Attention-grabbing headline
- Dateline (FOR IMMEDIATE RELEASE)
- Lead paragraph (who, what, when, where, why)
- Supporting paragraphs with details
- Author bio
- Book details (price, where to buy)
- Contact information placeholder
- Boilerplate about author/publisher

Professional, newsworthy tone. 400-600 words."""}
                        ],
                        temperature=0.7,
                        max_tokens=1000
                    )

                    press_release = response.choices[0].message.content

                    st.markdown("""
                    <div class="success-box">
                        ✅ Press release generated!
                    </div>
                    """, unsafe_allow_html=True)

                    st.markdown("### 📰 Press Release")
                    st.markdown(f"""
                    <div class="copy-card">
                        {press_release.replace(chr(10), '<br>')}
                    </div>
                    """, unsafe_allow_html=True)

                    # Copy to clipboard
                    st.code(press_release, language=None)

                    st.markdown("---")
                    st.markdown("### 📬 Distribution Tips")
                    st.info("""
                    **Where to send your press release:**
                    - Local newspapers and media outlets
                    - Book industry publications (Publishers Weekly, etc.)
                    - Genre-specific blogs and websites
                    - Your email list
                    - Press release distribution services (PR Newswire, etc.)
                    """)

                    # Save to session
                    st.session_state.generated_copies.append({
                        'type': 'Press Release',
                        'reason': press_reason,
                        'content': press_release,
                        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                    })

                except Exception as e:
                    st.error(f"Error generating press release: {str(e)}")
        else:
            st.error("⚠️ Please enter book title and logline")

# Generation history
if st.session_state.generated_copies:
    st.markdown("---")
    st.markdown("## 📜 Generation History")

    for idx, item in enumerate(reversed(st.session_state.generated_copies)):
        with st.expander(f"{item['type']} - {item['timestamp']}", expanded=False):
            st.markdown(item['content'])

            if st.button(f"📋 Copy", key=f"copy_{idx}"):
                st.code(item['content'], language=None)

# Marketing tips section
with st.expander("💡 Marketing Best Practices", expanded=False):
    st.markdown("""
    ### Book Marketing Strategy

    **1. Build Anticipation (3-6 months before release)**
    - Announce book with cover reveal
    - Share behind-the-scenes content
    - Build email list with reader magnet
    - Engage with genre community

    **2. Pre-Order Campaign (1-3 months before)**
    - Launch pre-order with incentives
    - Share excerpts and teasers
    - Run ARC (Advance Reader Copy) campaign
    - Build hype on social media

    **3. Launch Week (Release day ± 3 days)**
    - Email your list
    - Social media blitz
    - Run ads (Facebook, Amazon)
    - Reach out to book bloggers
    - Host virtual launch party

    **4. Post-Launch (Ongoing)**
    - Request reviews
    - Continue ads (if ROI positive)
    - Engage with readers
    - Plan next release

    ### Platform-Specific Tips

    **Amazon Ads:**
    - Target comp titles (books like yours)
    - Use exact match keywords
    - Optimize for mobile
    - Test multiple ad variations

    **Facebook/Instagram:**
    - Use eye-catching cover images
    - Video ads perform better
    - Target genre-specific interests
    - Retarget website visitors

    **BookBub:**
    - Build your author page
    - Apply for Featured Deals
    - Run BookBub Ads
    - Grow your followers

    **Email Marketing:**
    - Grow list with reader magnets
    - Email consistently (monthly minimum)
    - Personalize when possible
    - Always include book links

    ### Conversion Optimization

    **A/B Testing:**
    - Test different headlines
    - Try various calls to action
    - Test long vs. short copy
    - Compare emotional vs. logical appeals

    **Copy That Converts:**
    - Lead with benefits, not features
    - Use power words (discover, secret, revealed)
    - Create urgency (limited time, pre-order price)
    - Address reader desires directly
    - Include social proof (reviews, rankings)

    ### Metrics to Track

    - Click-through rate (CTR)
    - Conversion rate (clicks → sales)
    - Cost per acquisition (CPA)
    - Return on ad spend (ROAS)
    - Email open rates
    - Email click rates
    - Sales rank on Amazon
    - Review velocity
    """)

# Footer
st.markdown("""
<div class="footer">
    <p>Built with 🦚 by <strong>Rohimaya Publishing</strong></p>
    <p><em>Ascend • Flourish • Enlighten</em></p>
</div>
""", unsafe_allow_html=True)
