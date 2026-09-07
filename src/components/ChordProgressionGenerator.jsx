import React, { useState } from 'react';
import './ChordProgressionGenerator.css';

const ChordProgressionGenerator = () => {
  const [genre, setGenre] = useState('2020s-pop');
  const [key, setKey] = useState('C');
  const [scale, setScale] = useState('major');
  const [mood, setMood] = useState('happy');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [scales, setScales] = useState([]);
  const [moods, setMoods] = useState([]);

  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  React.useEffect(() => {
    // Load available options
    Promise.all([
      fetch('/api/generator/genres').then(r => r.json()),
      fetch('/api/generator/scales').then(r => r.json()),
      fetch('/api/generator/moods').then(r => r.json()),
    ]).then(([genreData, scaleData, moodData]) => {
      setGenres(genreData.data);
      setScales(scaleData.data);
      setMoods(moodData.data);
    });
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generator/progression', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, key, scale, mood, difficulty }),
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chord-progression-generator">
      <h2>Chord Progression Generator</h2>

      <div className="controls">
        <div className="control-group">
          <label>Genre:</label>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            {genres.slice(0, 50).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Key:</label>
          <select value={key} onChange={(e) => setKey(e.target.value)}>
            {keys.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Scale:</label>
          <select value={scale} onChange={(e) => setScale(e.target.value)}>
            {scales.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Mood:</label>
          <select value={mood} onChange={(e) => setMood(e.target.value)}>
            {moods.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Difficulty:</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Progression'}
      </button>

      {result && (
        <div className="result">
          <h3>Generated Progression</h3>
          <div className="progression">
            {result.chords.map((chord, i) => (
              <div key={i} className="chord-box">{chord}</div>
            ))}
          </div>
          <div className="metadata">
            <p><strong>Emotion:</strong> {result.emotion}</p>
            <p><strong>Tempo:</strong> {result.tempo}</p>
            <p><strong>Key:</strong> {result.key}</p>
            <p><strong>Scale:</strong> {result.scale}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChordProgressionGenerator;
