"""
Image utility functions for PhoenixForge demos
Creates placeholder images when OpenAI API is not available
"""

from PIL import Image, ImageDraw, ImageFont
import io
import base64

def create_placeholder_image(width, height, bg_color, text, text_color='white'):
    """
    Create a placeholder image with text

    Args:
        width (int): Image width in pixels
        height (int): Image height in pixels
        bg_color (tuple): RGB color tuple, e.g., (102, 126, 234)
        text (str): Text to display on image
        text_color (str): Color of the text

    Returns:
        PIL.Image: Generated image
    """
    # Create image
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Try to use a nice font, fall back to default if not available
    try:
        # Try different font sizes based on image size
        font_size = min(width, height) // 10
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
            except:
                font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # Calculate position to center text
    x = (width - text_width) // 2
    y = (height - text_height) // 2

    # Draw text
    draw.text((x, y), text, fill=text_color, font=font)

    return img

def create_book_cover(title, author, genre, style, variation_num, width=400, height=600):
    """
    Create a book cover placeholder with title and author

    Args:
        title (str): Book title
        author (str): Author name
        genre (str): Book genre
        style (str): Cover style
        variation_num (int): Variation number (1-6)
        width (int): Image width
        height (int): Image height

    Returns:
        PIL.Image: Generated book cover
    """
    # Color schemes based on variation number
    color_schemes = [
        (102, 126, 234),   # Blue/Purple
        (78, 205, 196),    # Teal
        (118, 75, 162),    # Purple
        (255, 107, 107),   # Red/Pink
        (255, 215, 0),     # Gold
        (255, 154, 158),   # Pink
    ]

    bg_color = color_schemes[(variation_num - 1) % len(color_schemes)]

    # Create base image
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Add title
    try:
        title_font_size = width // 20
        author_font_size = width // 25

        try:
            title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", title_font_size)
            author_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", author_font_size)
        except:
            title_font = ImageFont.load_default()
            author_font = ImageFont.load_default()
    except:
        title_font = ImageFont.load_default()
        author_font = ImageFont.load_default()

    # Wrap title text
    max_width = width - 40
    words = title.split()
    lines = []
    current_line = []

    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        bbox = draw.textbbox((0, 0), test_line, font=title_font)
        if bbox[2] - bbox[0] > max_width:
            if len(current_line) > 1:
                current_line.pop()
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(word)
                current_line = []

    if current_line:
        lines.append(' '.join(current_line))

    # Draw title lines
    y_offset = height // 3
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=title_font)
        text_width = bbox[2] - bbox[0]
        x = (width - text_width) // 2
        draw.text((x, y_offset), line, fill='white', font=title_font)
        y_offset += title_font_size + 10

    # Draw author
    author_y = height * 2 // 3
    bbox = draw.textbbox((0, 0), author, font=author_font)
    author_width = bbox[2] - bbox[0]
    author_x = (width - author_width) // 2
    draw.text((author_x, author_y), author, fill='white', font=author_font)

    # Draw genre/style tag
    tag_text = f"{genre} • {style}"
    try:
        tag_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", width // 40)
    except:
        tag_font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), tag_text, font=tag_font)
    tag_width = bbox[2] - bbox[0]
    tag_x = (width - tag_width) // 2
    tag_y = height - 50
    draw.text((tag_x, tag_y), tag_text, fill='rgba(255,255,255,0.8)', font=tag_font)

    # Draw variation number
    var_text = f"Variation {variation_num}"
    bbox = draw.textbbox((0, 0), var_text, font=tag_font)
    var_width = bbox[2] - bbox[0]
    var_x = (width - var_width) // 2
    var_y = 20
    draw.text((var_x, var_y), var_text, fill='white', font=tag_font)

    return img

def pil_to_bytes(img, format='PNG'):
    """
    Convert PIL Image to bytes

    Args:
        img (PIL.Image): Image to convert
        format (str): Image format (PNG, JPEG, etc.)

    Returns:
        bytes: Image as bytes
    """
    buf = io.BytesIO()
    img.save(buf, format=format)
    buf.seek(0)
    return buf.getvalue()

def create_character_portrait(character_name, style, width=512, height=512):
    """
    Create a character portrait placeholder

    Args:
        character_name (str): Name of the character
        style (str): Art style
        width (int): Image width
        height (int): Image height

    Returns:
        PIL.Image: Generated character portrait
    """
    # Color based on character name hash
    name_hash = sum(ord(c) for c in character_name)
    colors = [
        (102, 126, 234),   # Blue
        (255, 107, 107),   # Red
        (78, 205, 196),    # Teal
        (255, 215, 0),     # Gold
        (118, 75, 162),    # Purple
    ]
    bg_color = colors[name_hash % len(colors)]

    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)

    # Draw circle for face
    padding = width // 4
    draw.ellipse([padding, padding, width-padding, height-padding], fill='white', outline=bg_color, width=5)

    # Add character name
    try:
        font_size = width // 15
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", font_size)
    except:
        font = ImageFont.load_default()

    # Draw name
    bbox = draw.textbbox((0, 0), character_name, font=font)
    text_width = bbox[2] - bbox[0]
    x = (width - text_width) // 2
    y = height - 60

    # Draw text background
    draw.rectangle([x-10, y-5, x+text_width+10, y+font_size+5], fill='white')
    draw.text((x, y), character_name, fill=bg_color, font=font)

    # Draw style tag
    try:
        style_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size // 2)
    except:
        style_font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), style, font=style_font)
    style_width = bbox[2] - bbox[0]
    style_x = (width - style_width) // 2
    style_y = 30
    draw.text((style_x, style_y), style, fill='white', font=style_font)

    return img
