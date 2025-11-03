# 🎧 Audiobook Producer  
**From raw text to ready-to-listen. Automatically.**  

Audiobook Producer takes your long-form `.txt` manuscripts and transforms them into polished, lifelike audiobooks — in just three effortless steps.  

Under the hood, it handles every technical layer you’d rather not think about: **text formatting, pre-processing, intelligent chunking, speech synthesis, and seamless post-production merging.**  

---

## 🚀 How It Works

### 1️⃣ Pre-process & Format  
Smartly cleans your source `.txt`, removes artifacts, trims whitespace, and prepares it for voice synthesis.  

### 2️⃣ Chunk & Synthesize  
Splits the book into optimized segments and sends each to the TTS engine (`tts_inworld.py`) for natural-sounding narration.  

### 3️⃣ Merge & Finalize  
Automatically stitches all audio parts back together into one continuous, high-quality `.mp3` — ready to publish or stream.  

---

## 🎧 Sample Output

Experience the result — real audiobook samples generated automatically by **Audiobook Producer**.

<audio controls>
  <source src="https://github.com/prasadpagade/audiobook-producer/raw/main/output/output_part_001.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<audio controls>
  <source src="https://github.com/prasadpagade/audiobook-producer/raw/main/output/output_part_002.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<audio controls>
  <source src="https://github.com/prasadpagade/audiobook-producer/raw/main/output/output_part_003.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

Each clip above was automatically generated from the text source in `input/`, chunked, processed, and merged using InWorld TTS.  
The final output is production-ready audio — no manual editing required.  

---

## 🧠 Why It’s Different  
- **Formatting-aware:** Preserves structure and paragraphs intelligently.  
- **Voice-flexible:** Works with configurable TTS providers (ElevenLabs, Inworld, etc.).  
- **Fail-safe merging:** Handles large text sources without hitting token or API limits.  
- **Zero setup friction:** One command — `python src/main.py` — runs the full production pipeline.  

---

## ⚙️ Behind the Scenes  

The core script, `src/main.py`, orchestrates the full flow:  

TXT → Clean Text → Chunker → TTS → Merge → Final MP3

Each stage is modular:  
- `chunker.py` → Slices text intelligently.  
- `text_cleaner.py` → Handles formatting & punctuation cleanup.  
- `tts_inworld.py` → Generates speech per chunk.  
- `merge_audio.py` → Post-processes and merges MP3s seamlessly.  

---

## 🎬 Example Workflow

# Install dependencies
```
pip install -r requirements.txt
```

# Run the main script
```bash

### Clone the repository

git clone https://github.com/prasadpagade/audiobook-producer.git
cd audiobook-producer

python src/main.py
## 🛠️ Setup & Run
```

✅ Cleans and chunks input/mybook.txt  
✅ Generates voice files (output_part_001.mp3, output_part_002.mp3, …)  
✅ Outputs a single merged_audiobook.mp3 ready for playback

## 🧩 Tech Stack
- **Python 3.10+**  
- **nltk / regex** — text cleaning and chunking  
- **ElevenLabs / Inworld API** — voice generation  
- **pydub** — audio merging and conversion  
- **dotenv** — API key management  

---

## 💡 Perfect For
- 📚 Indie authors turning novels into audio  
- 🎙️ Podcasters and storytellers  
- 👩‍💻 Developers building AI-narration pipelines  
- 🎧 Anyone who wants text → audio automation done right  

---

## 🔮 Coming Soon
This is just the beginning. The next generation of **Audiobook Producer** will push storytelling automation even further with:  

- ✨ **Voice Cloning:** Train the voice on your own narration or a custom character voice.  
- 💫 **Emotional Tone Modeling:** Add emotion-driven speech that matches the narrative’s mood.  
- 🌌 **Dynamic Background Soundscapes:** Automatically layer ambient music and scene effects for immersive listening.  
- ⚡ **Batch Mode:** Process entire libraries of `.txt` files in one run.  
- ☁️ **Cloud Deployment:** Streamline audiobook creation directly from Google Drive or GitHub.  

---






