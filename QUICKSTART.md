# Power Studio - Quick Start Guide

## 🚀 Quick Installation

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Git**

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/amoncarver666/power-studio.git
   cd power-studio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and settings
   nano .env
   ```

4. **Start Development Servers**
   
   **Option A: Run Both Servers Simultaneously**
   ```bash
   npm run dev:all
   ```
   
   **Option B: Run Separately (recommended for debugging)**
   
   Terminal 1 - Backend Server:
   ```bash
   npm run dev
   ```
   
   Terminal 2 - Frontend Dev Server:
   ```bash
   npm run dev:client
   ```

5. **Access the Application**
   - Open your browser
   - Navigate to: `http://localhost:5173`
   - Backend API: `http://localhost:3000/api`

## 📋 API Configuration

### Setting Up API Keys

#### OpenAI (Recommended)
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and get your API key
3. Add to `.env`:
   ```
   OPENAI_API_KEY=sk_your_key_here
   ```

#### Anthropic
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create API key
3. Add to `.env`:
   ```
   ANTHROPIC_API_KEY=sk_ant_your_key_here
   ```

#### Google Cloud
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create project and enable required APIs
3. Create API key
4. Add to `.env`:
   ```
   GOOGLE_CLOUD_API_KEY=your_key_here
   ```

## 🎵 Features & Usage

### Chord Progression Generator
1. Navigate to **"Chord Progressions"** tab
2. Select:
   - Genre (2000+ options)
   - Key (C, D, E, etc.)
   - Scale (Major, Minor, Blues, etc.)
   - Mood (Happy, Sad, Energetic, etc.)
   - Difficulty (Beginner to Expert)
3. Click **"Generate Progression"**
4. Visualize the chord sequence

### Chord Extractor
1. Go to **"Chord Extractor"** tab
2. Choose:
   - Upload audio file OR provide URL
   - AI Engine (TensorFlow, OpenAI, Anthropic, Essentia)
3. Click **"Extract Chords"**
4. View extracted chords with confidence scores

### Music Sample Generator
1. Open **"Music Sampler"** tab
2. Configure:
   - Chords (add/remove as needed)
   - Tempo (BPM)
   - Sample Type (Guitar, Piano, etc.)
   - AI Engine
3. Click **"Generate Sample"**
4. Audio is generated and ready

### DAW Exporter
1. Access **"Export DAW"** tab
2. Set:
   - Tempo (BPM)
   - Key
   - Export Formats (MIDI, WAV, FL Studio, etc.)
3. Click **"Export"**
4. Files are prepared for download

## 🔧 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
NODE_ENV=production npm start
```

### Environment Variables (Production)
```bash
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
# Add all API keys and credentials
```

## 📊 Available API Endpoints

### Health Check
```
GET /api/health
```

### Chord Operations
```
POST /api/chords/extract
GET  /api/chords/supported
POST /api/chords/analyze
```

### Generation
```
POST /api/generator/progression
GET  /api/generator/genres
GET  /api/generator/scales
GET  /api/generator/moods
POST /api/generator/batch
```

### Music Generation
```
POST /api/generate/sample
GET  /api/generate/sample-types
POST /api/generate/batch-samples
```

### Export
```
POST /api/export/midi
POST /api/export/wav
POST /api/export/fl-studio
POST /api/export/multiple
GET  /api/export/supported-formats
```

### AI Engines
```
GET  /api/engines/list
GET  /api/engines/details/:engine
POST /api/engines/test
GET  /api/engines/comparison
```

## 🎯 Common Issues & Solutions

### Port Already in Use
```bash
# Change port in .env
PORT=3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### API Key Issues
- Verify keys in `.env` are correct
- Check API key permissions
- Ensure API is enabled in respective dashboard

### CORS Errors
- Update `CORS_ORIGIN` in `.env`
- Restart server

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Tone.js Guide](https://tonejs.org/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Music Theory Basics](https://www.musictheory.net/)

## 🐛 Debugging

### Enable Debug Logging
```bash
LOG_LEVEL=debug npm run dev
```

### Check Server Logs
```bash
tail -f logs/server.log
```

### Browser Console
- Open DevTools (F12)
- Check Console and Network tabs
- Look for API errors

## 📝 Tips & Tricks

1. **Batch Generation**: Use batch endpoints for multiple chord progressions
2. **Format Selection**: WAV for highest quality, MP3 for smaller files
3. **Engine Comparison**: Test different engines to find your favorite sound
4. **Theme Toggle**: Click the sun/moon icon for light/dark theme
5. **Responsive Design**: Works on mobile devices too

## 🤝 Support

- **Issues**: [GitHub Issues](https://github.com/amoncarver666/power-studio/issues)
- **Discussions**: [GitHub Discussions](https://github.com/amoncarver666/power-studio/discussions)
- **Email**: amoncarver666@gmail.com

## 📄 License

MIT License - See [LICENSE](LICENSE) file

## 🎓 Learning Resources

- [Node.js Official Documentation](https://nodejs.org/docs/)
- [React Hooks Guide](https://react.dev/reference/react)
- [Audio Processing](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [MIDI Specification](https://www.midi.org/specifications-old)

---

**Enjoy creating with Power Studio! 🎵**
