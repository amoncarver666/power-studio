import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  
  // Audio Configuration
  audio: {
    sampleRate: parseInt(process.env.AUDIO_SAMPLE_RATE || '44100'),
    bitDepth: 24,
    channels: 2,
    maxFileSize: process.env.MAX_FILE_SIZE || '500MB',
    ffmpegPath: process.env.FFMPEG_PATH || '/usr/bin/ffmpeg',
  },
  
  // AI Engines
  aiEngines: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      model: 'gpt-4-turbo',
    },
    anthropic: {
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: 'claude-3-opus',
    },
    googleCloud: {
      apiKey: process.env.GOOGLE_CLOUD_API_KEY,
    },
    essentia: {
      apiKey: process.env.ESSENTIA_API_KEY,
    },
  },
  
  // Streaming Services
  streaming: {
    spotify: {
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY,
    },
  },
  
  // Music Theory Defaults
  musicTheory: {
    defaultKey: process.env.DEFAULT_KEY || 'C',
    defaultTempo: parseInt(process.env.DEFAULT_TEMPO || '120'),
    defaultTimeSignature: '4/4',
    defaultScale: 'major',
  },
  
  // Output Formats
  outputFormats: {
    flStudioDwp: process.env.SUPPORT_FL_STUDIO_DWP === 'true',
    wav: process.env.SUPPORT_WAV === 'true',
    midi: process.env.SUPPORT_MIDI === 'true',
    mp3: process.env.SUPPORT_MP3 === 'true',
  },
};

export default config;
