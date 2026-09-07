import config from './config/index.js';

export const validateConfig = () => {
  const errors = [];
  const warnings = [];

  // Check required Node environment
  if (config.env === 'production') {
    if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
      errors.push('At least one AI API key must be configured in production');
    }
  }

  // Check port
  if (config.port < 1024 || config.port > 65535) {
    errors.push('Invalid port number. Must be between 1024 and 65535');
  }

  // Check audio configuration
  if (config.audio.sampleRate !== 44100 && config.audio.sampleRate !== 48000) {
    warnings.push(`Non-standard sample rate: ${config.audio.sampleRate}Hz`);
  }

  if (config.audio.bitDepth !== 16 && config.audio.bitDepth !== 24 && config.audio.bitDepth !== 32) {
    warnings.push(`Non-standard bit depth: ${config.audio.bitDepth}-bit`);
  }

  // Check if upload directory exists
  if (!config.upload.dir) {
    errors.push('Upload directory not configured');
  }

  return { valid: errors.length === 0, errors, warnings };
};

export const logConfig = () => {
  console.log('\n🎵 Power Studio Configuration:');
  console.log('================================');
  console.log(`Environment: ${config.env}`);
  console.log(`Port: ${config.port}`);
  console.log(`CORS Origin: ${config.corsOrigin}`);
  console.log(`\nAudio Settings:`);
  console.log(`  Sample Rate: ${config.audio.sampleRate}Hz`);
  console.log(`  Bit Depth: ${config.audio.bitDepth}-bit`);
  console.log(`  Channels: ${config.audio.channels}`);
  console.log(`  Max File Size: ${config.audio.maxFileSize}`);
  console.log(`\nMusic Defaults:`);
  console.log(`  Key: ${config.music.defaultKey}`);
  console.log(`  Tempo: ${config.music.defaultTempo} BPM`);
  console.log(`  Time Signature: ${config.music.defaultTimeSignature}`);
  console.log(`  Scale: ${config.music.defaultScale}`);
  console.log(`\nSupported Formats:`);
  console.log(`  FL Studio: ${config.formats.flStudio}`);
  console.log(`  WAV: ${config.formats.wav}`);
  console.log(`  MIDI: ${config.formats.midi}`);
  console.log(`  MP3: ${config.formats.mp3}`);
  console.log('\n');
};

export default config;
