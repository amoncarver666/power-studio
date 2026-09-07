import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from './config/index.js';
import chordRoutes from './routes/chords.js';
import generatorRoutes from './routes/generator.js';
import exportRoutes from './routes/export.js';
import engineRoutes from './routes/engines.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use(express.static('public'));

// Routes
app.use('/api/chords', chordRoutes);
app.use('/api/generator', generatorRoutes);
app.use('/api/export', exportRoutes);
app.use('/api/engines', engineRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Power Studio server running on port ${PORT}`);
  console.log(`Environment: ${config.env}`);
});

export default app;
