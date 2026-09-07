# Power Studio - API Documentation

## Base URL
```
http://localhost:3000/api
```

## Response Format

All responses return JSON with the following structure:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "timestamp": "2026-09-07T20:00:00.000Z"
}
```

### Error Response
```json
{
  "error": "Error message",
  "timestamp": "2026-09-07T20:00:00.000Z"
}
```

## Endpoints

### Health Check

**Get Server Status**
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "timestamp": "2026-09-07T20:00:00.000Z"
}
```

---

## Chord Extraction

### Extract Chords from Audio
```
POST /chords/extract
Content-Type: multipart/form-data
```

Parameters:
- `audio` (file) - Audio file (MP3, WAV, OGG)
- `url` (string, optional) - Audio URL if file not provided
- `engine` (string, optional) - AI engine: `tensorflow`, `openai`, `anthropic`, `essentia` (default: `tensorflow`)

Response:
```json
{
  "success": true,
  "data": {
    "chords": ["C", "F", "G", "C"],
    "confidence": [0.95, 0.89, 0.92, 0.96],
    "engine": "tensorflow",
    "duration": 45.2
  }
}
```

### Get Supported Chord Types
```
GET /chords/supported
```

Response:
```json
{
  "success": true,
  "data": {
    "major": ["I", "II", "III", "IV", "V", "VI", "VII"],
    "minor": ["i", "ii", "iii", "iv", "v", "vi", "vii"],
    "sevenths": ["maj7", "min7", "dom7", "min7b5"],
    "extensions": ["add9", "sus2", "sus4", "aug", "dim"]
  }
}
```

### Analyze Chord Progression
```
POST /chords/analyze
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G", "C"],
  "key": "C",
  "tempo": 120
}
```

Response:
```json
{
  "success": true,
  "data": {
    "chords": ["C", "F", "G", "C"],
    "key": "C",
    "tempo": 120,
    "totalDuration": 2,
    "quality": "analyzed"
  }
}
```

---

## Chord Generation

### Generate Chord Progression
```
POST /generator/progression
Content-Type: application/json
```

Body:
```json
{
  "genre": "2020s-pop",
  "key": "C",
  "scale": "major",
  "mood": "happy",
  "length": 4,
  "difficulty": "intermediate"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "chords": ["C", "G", "Am", "F"],
    "emotion": "uplifting",
    "tempo": 120,
    "key": "C",
    "scale": "major"
  }
}
```

### Get Available Genres
```
GET /generator/genres
```

Response:
```json
{
  "success": true,
  "data": ["1950s-rock", "1960s-pop", "1970s-funk", ...],
  "total": 2000
}
```

### Get Available Scales
```
GET /generator/scales
```

Response:
```json
{
  "success": true,
  "data": ["major", "minor", "dorian", "phrygian", ...],
  "total": 14
}
```

### Get Available Moods
```
GET /generator/moods
```

Response:
```json
{
  "success": true,
  "data": ["happy", "sad", "energetic", "melancholic", ...],
  "total": 10
}
```

### Generate Multiple Progressions
```
POST /generator/batch
Content-Type: application/json
```

Body:
```json
{
  "count": 5,
  "genre": "2020s-pop",
  "key": "C",
  "scale": "major",
  "mood": "happy"
}
```

Response:
```json
{
  "success": true,
  "data": [{...}, {...}, {...}, {...}, {...}],
  "count": 5
}
```

---

## Music Generation

### Generate Music Sample
```
POST /generate/sample
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G"],
  "tempo": 120,
  "key": "C",
  "duration": 8,
  "sampleType": "soulful-guitar",
  "genre": "rnb",
  "mood": "soulful",
  "engine": "tone-js"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "Sample generation initiated",
    "parameters": {...}
  }
}
```

### Get Sample Types
```
GET /generate/sample-types
```

Response:
```json
{
  "success": true,
  "data": [
    "soulful-guitar",
    "latin-guitar",
    "ambient-pad",
    "strings",
    "keys",
    "bass",
    "brass",
    "woodwinds",
    "electric-piano",
    "organ",
    "synth-lead",
    "synth-pad",
    "plucked-strings",
    "flute",
    "oboe"
  ],
  "total": 15
}
```

---

## Export

### Export to MIDI
```
POST /export/midi
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G"],
  "tempo": 120,
  "key": "C"
}
```

Response: MIDI file (audio/midi)

### Export to WAV (24-bit, 44.1kHz)
```
POST /export/wav
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G"],
  "tempo": 120,
  "key": "C"
}
```

Response: WAV file (audio/wav)

### Export to FL Studio
```
POST /export/fl-studio
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G"],
  "tempo": 120,
  "key": "C",
  "name": "power-studio"
}
```

Response: FL Studio project file (.dwp)

### Export to Multiple Formats
```
POST /export/multiple
Content-Type: application/json
```

Body:
```json
{
  "chords": ["C", "F", "G"],
  "tempo": 120,
  "key": "C",
  "formats": ["midi", "wav", "fl-studio"]
}
```

Response:
```json
{
  "success": true,
  "data": {
    "message": "Multiple exports prepared",
    "formats": ["midi", "wav", "fl-studio"],
    "ready": true
  }
}
```

### Get Supported Formats
```
GET /export/supported-formats
```

Response:
```json
{
  "success": true,
  "data": {
    "midi": { "name": "MIDI", "ext": ".mid" },
    "wav": { "name": "WAV (24-bit)", "ext": ".wav" },
    "fl-studio": { "name": "FL Studio", "ext": ".dwp" },
    "mp3": { "name": "MP3", "ext": ".mp3" }
  },
  "total": 4
}
```

---

## AI Engines

### List All Engines
```
GET /engines/list
```

Response:
```json
{
  "success": true,
  "data": {
    "openai-jukebox": {
      "name": "OpenAI Jukebox",
      "quality": "peak",
      "type": "generative"
    },
    "google-magenta": {
      "name": "Google Magenta",
      "quality": "high",
      "type": "ml-based"
    },
    ...
  },
  "total": 12
}
```

### Get Engine Details
```
GET /engines/details/:engine
```

Example: `/engines/details/tone-js`

Response:
```json
{
  "success": true,
  "data": {
    "id": "tone-js",
    "name": "Tone.js",
    "quality": "high",
    "type": "synthesis",
    "description": "Real-time synthesis engine"
  }
}
```

### Test Engine
```
POST /engines/test
Content-Type: application/json
```

Body:
```json
{
  "engine": "tone-js"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "engine": "tone-js",
    "status": "operational",
    "quality": "high",
    "type": "synthesis"
  }
}
```

### Compare Engines
```
GET /engines/comparison
```

Response:
```json
{
  "success": true,
  "data": {
    "peak_quality": [...],
    "high_quality": [...],
    "by_type": {
      "generative": [...],
      "ml_based": [...],
      "synthesis": [...],
      "composition": [...]
    }
  },
  "total_engines": 12
}
```

---

## Error Handling

### Common Error Responses

**Bad Request (400)**
```json
{
  "error": "Invalid input parameters"
}
```

**Not Found (404)**
```json
{
  "error": "Engine not found"
}
```

**Internal Server Error (500)**
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Standard**: 100 requests per minute
- **Authenticated**: 1000 requests per minute

---

## Authentication

Future versions will include API key authentication. For now, all endpoints are public.

---

## Versioning

Current API version: **v1**

All endpoints are prefixed with `/api/v1` for future compatibility.

---

For more information, visit the [GitHub Repository](https://github.com/amoncarver666/power-studio)
