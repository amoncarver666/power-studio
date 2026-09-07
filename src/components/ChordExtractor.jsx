import React, { useState } from 'react';
import './ChordExtractor.css';

const ChordExtractor = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [engine, setEngine] = useState('tensorflow');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setAudioUrl('');
    }
  };

  const handleExtract = async () => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (audioFile) {
        formData.append('audio', audioFile);
      } else if (audioUrl) {
        formData.append('url', audioUrl);
      } else {
        setError('Please provide an audio file or URL');
        setLoading(false);
        return;
      }
      formData.append('engine', engine);

      const response = await fetch('/api/chords/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Extraction failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chord-extractor">
      <h2>Chord Extractor</h2>
      
      <div className="input-section">
        <div className="input-group">
          <label>Audio File:</label>
          <input type="file" accept="audio/*" onChange={handleFileUpload} />
          {audioFile && <span className="file-name">{audioFile.name}</span>}
        </div>

        <div className="or-divider">OR</div>

        <div className="input-group">
          <label>Audio URL:</label>
          <input
            type="url"
            placeholder="https://example.com/audio.mp3"
            value={audioUrl}
            onChange={(e) => setAudioUrl(e.target.value)}
            disabled={audioFile !== null}
          />
        </div>

        <div className="input-group">
          <label>AI Engine:</label>
          <select value={engine} onChange={(e) => setEngine(e.target.value)}>
            <option value="tensorflow">TensorFlow</option>
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
            <option value="essentia">Essentia</option>
          </select>
        </div>
      </div>

      <button onClick={handleExtract} disabled={loading}>
        {loading ? 'Extracting...' : 'Extract Chords'}
      </button>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result">
          <h3>Extracted Chords</h3>
          <div className="chords-list">
            {result.chords.map((chord, i) => (
              <div key={i} className="chord-item">
                <span className="chord">{chord}</span>
                <span className="confidence">{result.confidence[i]}%</span>
              </div>
            ))}
          </div>
          <p className="engine">Engine: {result.engine}</p>
        </div>
      )}
    </div>
  );
};

export default ChordExtractor;
