import express from 'express';
import ChordProgressionGenerator from '../core/ChordProgressionGenerator.js';

const router = express.Router();
const generator = new ChordProgressionGenerator();

/**
 * POST /api/generator/progression
 * Generate chord progression
 */
router.post('/progression', (req, res) => {
  try {
    const {
      genre = '2020s-pop',
      key = 'C',
      scale = 'major',
      mood = 'happy',
      length = 4,
      difficulty = 'intermediate',
    } = req.body;

    const progression = generator.generate({
      genre,
      key,
      scale,
      mood,
      length,
      difficulty,
    });

    res.json({
      success: true,
      data: progression,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/generator/genres
 * Get all available genres
 */
router.get('/genres', (req, res) => {
  const genres = generator.getGenres();
  res.json({
    success: true,
    data: genres,
    total: genres.length,
  });
});

/**
 * GET /api/generator/scales
 * Get all available scales
 */
router.get('/scales', (req, res) => {
  const scales = generator.getScales();
  res.json({
    success: true,
    data: scales,
    total: scales.length,
  });
});

/**
 * GET /api/generator/moods
 * Get all available moods
 */
router.get('/moods', (req, res) => {
  const moods = generator.getMoods();
  res.json({
    success: true,
    data: moods,
    total: moods.length,
  });
});

/**
 * POST /api/generator/batch
 * Generate multiple progressions
 */
router.post('/batch', (req, res) => {
  try {
    const { count = 5, ...options } = req.body;
    const progressions = [];

    for (let i = 0; i < count; i++) {
      progressions.push(generator.generate(options));
    }

    res.json({
      success: true,
      data: progressions,
      count: progressions.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
