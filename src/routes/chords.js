import express from 'express';
import multer from 'multer';
import ChordExtractor from '../core/ChordExtractor.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const chordExtractor = new ChordExtractor();

/**
 * POST /api/chords/extract
 * Extract chords from audio file or URL
 */
router.post('/extract', upload.single('audio'), async (req, res) => {
  try {
    const { url, engine = 'tensorflow' } = req.body;
    const audioSource = req.file ? req.file.path : url;

    if (!audioSource) {
      return res.status(400).json({ error: 'No audio file or URL provided' });
    }

    const result = await chordExtractor.extractChords(audioSource, engine);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * POST /api/chords/analyze
 * Analyze chord progression
 */
router.post('/analyze', (req, res) => {
  try {
    const { chords, key = 'C', tempo = 120 } = req.body;

    if (!chords || !Array.isArray(chords)) {
      return res.status(400).json({ error: 'Chords must be an array' });
    }

    const analysis = {
      chords,
      key,
      tempo,
      totalDuration: chords.length * (60 / tempo),
      quality: 'analyzed',
      timestamp: new Date().toISOString(),
    };

    res.json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/chords/supported
 * Get supported chord types
 */
router.get('/supported', (req, res) => {
  const supportedChords = {
    major: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'],
    minor: ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii'],
    sevenths: ['maj7', 'min7', 'dom7', 'min7b5'],
    extensions: ['add9', 'sus2', 'sus4', 'aug', 'dim'],
  };

  res.json({
    success: true,
    data: supportedChords,
  });
});

export default router;
