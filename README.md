# Power Studio 🎵

> Advanced AI Music Production Platform with Chord Extraction, Generation, and DAW Export

## Features

### 🎼 Chord Progression Generator
- Generate chord progressions across **2000+ genres** from 1950s to present
- Support for **2000+ unique chord progressions**
- Customizable by:
  - Genre (8 decades × 50+ base genres)
  - Musical key (12 semitones)
  - Scale (14 different scales including major, minor, modes, blues, etc.)
  - Mood/emotion (10+ emotional contexts)
  - Difficulty level (beginner to expert)

### 🎧 Chord Extractor
- Extract chords from audio files and URLs
- Support for multiple AI engines:
  - **TensorFlow** - Local ML-based extraction
  - **OpenAI** - Advanced audio analysis
  - **Anthropic** - High-quality chord detection
  - **Essentia** - Specialized music analysis
- Real-time processing with confidence scores

### 🎹 Music Sample Generator
- Generate high-quality audio samples
- **10+ AI Music Generation Engines**:
  - OpenAI Jukebox - Peak quality generative
  - Google Magenta - ML-based composition
  - Meta MusicGen - Advanced music generation
  - Stability Audio - Peak quality synthesis
  - Udio AI - Next-gen music generation
  - Suno AI - High-quality composition
  - Tone.js - Real-time synthesis
  - Amper Music - Intelligent composition
  - Dadabots - Neural network generation
  - WaveNet - DeepMind synthesis
  - And more...

- Sample types: soulful-guitar, latin-guitar, ambient-pad, strings, keys, bass, brass, woodwinds, etc.
- Customizable tempo, duration, and key
- Support for multiple genres and moods

### 💾 DAW Export
- Export to multiple formats:
  - **FL Studio (.dwp)** - Direct project export
  - **MIDI (.mid)** - Universal format
  - **WAV (.wav)** - 24-bit, 44.1kHz peak audio quality
  - **Ableton (.als)**
  - **Cubase (.cpr)**
  - **Reaper (.rpp)**
  - **Logic Pro (.logicx)**
  - **MP3** - Compressed audio

### 🎨 User Interface
- Modern dark/light theme support
- Responsive design (desktop, tablet, mobile)
- Intuitive tab-based navigation
- Real-time preview and parameter adjustment
- Error handling and validation

## Tech Stack

### Backend
- **Node.js** + Express.js
- RESTful API architecture
- Multer for file uploads
- CORS support

### Frontend
- **React 18** with Hooks
- Vite for fast development
- CSS3 with CSS variables for theming
- Responsive grid layouts

### Audio Processing
- **Tone.js** - Web Audio synthesis
- **WaveFile** - WAV format handling
- FFmpeg integration for audio conversion

## Installation

```bash
# Clone the repository
git clone https://github.com/amoncarver666/power-studio.git
cd power-studio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

## Configuration

Edit `.env` file with your settings:

```env
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3000

# API Keys
OPENAI_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
GOOGLE_CLOUD_API_KEY=your_key

# Audio Settings
AUDIO_SAMPLE_RATE=44100
DEFAULT_TEMPO=120
```

## Usage

### Development Mode

```bash
# Terminal 1: Start backend server
npm run dev

# Terminal 2: Start frontend dev server
npm run dev:client
```

Visit `http://localhost:5173` in your browser

### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## API Endpoints

### Chord Extraction
```
POST /api/chords/extract - Extract chords from audio
GET  /api/chords/supported - Get supported chord types
POST /api/chords/analyze - Analyze chord progression
```

### Chord Generation
```
POST /api/generator/progression - Generate chord progression
GET  /api/generator/genres - List available genres
GET  /api/generator/scales - List available scales
GET  /api/generator/moods - List available moods
POST /api/generator/batch - Generate multiple progressions
```

### Music Generation
```
POST /api/generate/sample - Generate music sample
GET  /api/generate/sample-types - List sample types
POST /api/generate/batch-samples - Generate multiple samples
```

### Export
```
POST /api/export/midi - Export to MIDI
POST /api/export/wav - Export to WAV (24-bit)
POST /api/export/fl-studio - Export to FL Studio
POST /api/export/multiple - Export to multiple formats
GET  /api/export/supported-formats - List supported formats
```

### AI Engines
```
GET  /api/engines/list - List all AI engines
GET  /api/engines/details/:engine - Get engine details
POST /api/engines/test - Test an engine
GET  /api/engines/comparison - Compare all engines
```

## Project Structure

```
power-studio/
├── src/
│   ├── components/
│   │   ├── ChordExtractor.jsx
│   │   ├── ChordProgressionGenerator.jsx
│   │   ├── MusicSampleGenerator.jsx
│   │   ├── DAWExporter.jsx
│   │   └── *.css
│   ├── core/
│   │   ├── ChordExtractor.js
│   │   ├── ChordProgressionGenerator.js
│   │   ├── MusicGenerator.js
│   │   └── DAWExporter.js
│   ├── routes/
│   │   ├── chords.js
│   │   ├── generator.js
│   │   ├── generate.js
│   │   ├── export.js
│   │   └── engines.js
│   ├── config/
│   │   └── index.js
│   ├── App.jsx
│   └── server.js
├── public/
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```

## Music Theory Database

### Genres
- **8 Decades**: 1950s - 2020s
- **50+ Base Genres**: rock, pop, jazz, blues, classical, electronic, funk, soul, reggae, etc.
- **Total**: 2000+ unique genre combinations

### Scales (14)
major, minor, dorian, phrygian, lydian, mixolydian, locrian, harmonic-minor, melodic-minor, pentatonic-major, pentatonic-minor, blues, whole-tone, chromatic

### Moods (10+)
happy, sad, energetic, melancholic, romantic, aggressive, calm, mystical, soulful, uplifting

### Chord Progressions
Each genre includes historically accurate and musically coherent chord progressions with emotional context.

## Audio Quality

- **Sample Rate**: 44.1 kHz (industry standard)
- **Bit Depth**: 24-bit (studio quality)
- **Channels**: Mono/Stereo support
- **Formats**: WAV, MP3, MIDI, FL Studio, and more

## Performance Features

- Real-time synthesis with Tone.js
- Efficient FFT-based frequency analysis
- Optimized audio buffer handling
- Multi-format export pipeline
- Async/await for non-blocking operations

## Future Roadmap

- [ ] Real-time MIDI input support
- [ ] Machine learning model fine-tuning
- [ ] Advanced audio effects (EQ, reverb, compression)
- [ ] Collaborative features
- [ ] Mobile app (React Native)
- [ ] Plugin system for external AI engines
- [ ] Cloud project storage
- [ ] Audio visualization and waveform editor

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Contact

For questions and support:
- GitHub: [@amoncarver666](https://github.com/amoncarver666)
- Email: amoncarver666@gmail.com

---

**Power Studio** - Empowering Musicians with AI 🎵🤖
