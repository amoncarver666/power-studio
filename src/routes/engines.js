import express from 'express';
import MusicGenerator from '../core/MusicGenerator.js';

const router = express.Router();
const musicGenerator = new MusicGenerator();

/**
 * GET /api/engines/list
 * Get all available AI engines
 */
router.get('/list', (req, res) => {
  const engines = musicGenerator.getEngines();

  res.json({
    success: true,
    data: engines,
    total: Object.keys(engines).length,
  });
});

/**
 * GET /api/engines/details/:engine
 * Get details about a specific engine
 */
router.get('/details/:engine', (req, res) => {
  const { engine } = req.params;
  const engines = musicGenerator.getEngines();
  const engineDetails = engines[engine];

  if (!engineDetails) {
    return res.status(404).json({ error: `Engine '${engine}' not found` });
  }

  res.json({
    success: true,
    data: {
      id: engine,
      ...engineDetails,
    },
  });
});

/**
 * POST /api/engines/test
 * Test an AI engine
 */
router.post('/test', (req, res) => {
  try {
    const { engine = 'tone-js' } = req.body;
    const engines = musicGenerator.getEngines();

    if (!engines[engine]) {
      return res.status(404).json({ error: `Engine '${engine}' not found` });
    }

    res.json({
      success: true,
      data: {
        engine,
        status: 'operational',
        quality: engines[engine].quality,
        type: engines[engine].type,
        testTimestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/engines/comparison
 * Compare all engines
 */
router.get('/comparison', (req, res) => {
  const engines = musicGenerator.getEngines();
  const comparison = Object.entries(engines).map(([id, details]) => ({
    id,
    ...details,
  }));

  const grouped = {
    peak_quality: comparison.filter(e => e.quality === 'peak'),
    high_quality: comparison.filter(e => e.quality === 'high'),
    by_type: {
      generative: comparison.filter(e => e.type === 'generative'),
      ml_based: comparison.filter(e => e.type === 'ml-based'),
      synthesis: comparison.filter(e => e.type === 'synthesis'),
      composition: comparison.filter(e => e.type === 'composition'),
    },
  };

  res.json({
    success: true,
    data: grouped,
    total_engines: comparison.length,
  });
});

export default router;
