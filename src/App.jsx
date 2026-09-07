import React, { useState } from 'react';
import ChordExtractor from './components/ChordExtractor';
import ChordProgressionGenerator from './components/ChordProgressionGenerator';
import MusicSampleGenerator from './components/MusicSampleGenerator';
import DAWExporter from './components/DAWExporter';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>🎵 Power Studio</h1>
          <p className="tagline">Advanced AI Music Production Platform</p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <nav className="app-nav">
        <button
          className={`nav-button ${activeTab === 'generator' ? 'active' : ''}`}
          onClick={() => setActiveTab('generator')}
        >
          🎼 Chord Progressions
        </button>
        <button
          className={`nav-button ${activeTab === 'extractor' ? 'active' : ''}`}
          onClick={() => setActiveTab('extractor')}
        >
          🎧 Chord Extractor
        </button>
        <button
          className={`nav-button ${activeTab === 'sampler' ? 'active' : ''}`}
          onClick={() => setActiveTab('sampler')}
        >
          🎹 Music Sampler
        </button>
        <button
          className={`nav-button ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
        >
          💾 Export DAW
        </button>
      </nav>

      <main className="app-main">
        {activeTab === 'generator' && <ChordProgressionGenerator />}
        {activeTab === 'extractor' && <ChordExtractor />}
        {activeTab === 'sampler' && <MusicSampleGenerator />}
        {activeTab === 'export' && <DAWExporter />}
      </main>

      <footer className="app-footer">
        <p>Power Studio © 2026 | Powered by 10+ AI Engines | Music Theory Engine v1.0</p>
        <p>Supports 2000+ Genres | 2000+ Chord Progressions | Peak Audio Quality (24-bit, 44.1kHz)</p>
      </footer>
    </div>
  );
}

export default App;
