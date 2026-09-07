import express from 'express';
import multer from 'multer';
import DAWExporter from '../core/DAWExporter.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const exporter = new DAWExporter();

/**
 * POST /api/export/midi
 * Export to MIDI format
 */
router.post('/midi', (req, res) => {
  try {
    const { chords = [], tempo = 120, key = 'C' } = req.body;

    const projectData = { chords, tempo, key };
    const midiBlob = exporter.exportToMIDI(projectData);

    res.setHeader('Content-Type', 'audio/midi');
    res.setHeader('Content-Disposition', 'attachment; filename="power-studio.mid"');
    res.send(Buffer.from(midiBlob));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/export/wav
 * Export to WAV format (24-bit, 44.1kHz)
 */
router.post('/wav', (req, res) => {
  try {
    const { chords = [], tempo = 120, key = 'C' } = req.body;

    const audioBuffer = new AudioBuffer({ length: 44100, sampleRate: 44100 });
    const wavBlob = exporter.exportToWAV(audioBuffer);

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'attachment; filename="power-studio.wav"');
    res.send(Buffer.from(wavBlob));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/export/fl-studio
 * Export to FL Studio .dwp format
 */
router.post('/fl-studio', (req, res) => {
  try {
    const { chords = [], tempo = 120, key = 'C', name = 'power-studio' } = req.body;

    const projectData = { chords, tempo, key, name };
    const dwpBlob = exporter.exportToFLStudio(projectData);

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="power-studio.dwp"');
    res.send(Buffer.from(dwpBlob));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/export/multiple
 * Export to multiple formats at once
 */
router.post('/multiple', (req, res) => {
  try {
    const { chords = [], tempo = 120, key = 'C', formats = ['midi', 'wav', 'fl-studio'] } = req.body;

    const projectData = { chords, tempo, key };
    const audioBuffer = new AudioBuffer({ length: 44100, sampleRate: 44100 });
    const exports = exporter.exportMultiple(projectData, audioBuffer, formats);

    res.json({
      success: true,
      data: {
        message: 'Multiple exports prepared',
        formats: Object.keys(exports),
        ready: true,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/export/supported-formats
 * Get all supported export formats
 */
router.get('/supported-formats', (req, res) => {
  const formats = exporter.getSupportedFormats();

  res.json({
    success: true,
    data: formats,
    total: Object.keys(formats).length,
  });
});

export default router;
