import dotenv from 'dotenv';

dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  // Audio Configuration
  audio: {
    sampleRate: parseInt(process.env.AUDIO_SAMPLE_RATE) || 44100,
    bitDepth: parseInt(process.env.AUDIO_BIT_DEPTH) || 24,
    channels: parseInt(process.env.AUDIO_CHANNELS) || 2,
    maxFileSize: process.env.MAX_FILE_SIZE || '500MB',
  },

  // Music Theory Defaults
  music: {
    defaultKey: process.env.DEFAULT_KEY || 'C',
    defaultTempo: parseInt(process.env.DEFAULT_TEMPO) || 120,
    defaultTimeSignature: process.env.DEFAULT_TIME_SIGNATURE || '4/4',
    defaultScale: process.env.DEFAULT_SCALE || 'major',
  },

  // AI Engine API Keys
  apiKeys: {
    openai: process.env.OPENAI_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
    googleCloud: process.env.GOOGLE_CLOUD_API_KEY,
    essentia: process.env.ESSENTIA_API_KEY,
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

  // Format Support
  formats: {
    flStudio: process.env.SUPPORT_FL_STUDIO_DWP === 'true',
    wav: process.env.SUPPORT_WAV === 'true',
    midi: process.env.SUPPORT_MIDI === 'true',
    mp3: process.env.SUPPORT_MP3 === 'true',
  },

  // File Upload
  upload: {
    dir: process.env.UPLOAD_DIR || './uploads',
    maxRetries: parseInt(process.env.MAX_UPLOAD_RETRIES) || 3,
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'json',
  },

  // Performance
  performance: {
    workerThreads: parseInt(process.env.WORKER_THREADS) || 4,
    maxConcurrentRequests: parseInt(process.env.MAX_CONCURRENT_REQUESTS) || 10,
    requestTimeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000,
  },
};

export default config;
