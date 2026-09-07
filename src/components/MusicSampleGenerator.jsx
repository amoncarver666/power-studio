import React, { useState } from 'react';
import './MusicSampleGenerator.css';

const MusicSampleGenerator = () => {
  const [chords, setChords] = useState(['C', 'F', 'G']);
  const [tempo, setTempo] = useState(120);
  const [key, setKey] = useState('C');
  const [duration, setDuration] = useState(8);
  const [sampleType, setSampleType] = useState('soulful-guitar');
  const [engine, setEngine] = useState('tone-js');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sampleTypes, setSampleTypes] = useState([]);
  const [engines, setEngines] = useState({});

  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  React.useEffect(() => {
    Promise.all([
      fetch('/api/generate/sample-types').then(r => r.json()),
      fetch('/api/engines/list').then(r => r.json()),
    ]).then(([typesData, enginesData]) => {
      setSampleTypes(typesData.data);
      setEngines(enginesData.data);
    });
  }, []);

  const handleAddChord = () => {
    setChords([...chords, 'C']);
  };

  const handleRemoveChord = (index) => {
    setChords(chords.filter((_, i) => i !== index));
  };

  const handleChordChange = (index, value) => {
    const newChords = [...chords];
    newChords[index] = value;
    setChords(newChords);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chords,
          tempo,
          key,
          duration,
          sampleType,
          engine,
        }),
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
    <div className="music-sample-generator">
      <h2>Music Sample Generator</h2>

      <div className="controls">
        <div className="control-group">
          <label>Chords:</label>
          <div className="chords-input">
            {chords.map((chord, i) => (
              <div key={i} className="chord-input-row">
                <select value={chord} onChange={(e) => handleChordChange(i, e.target.value)}>
                  {keys.map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
                {chords.length > 1 && (
                  <button onClick={() => handleRemoveChord(i)}>Remove</button>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleAddChord}>+ Add Chord</button>
        </div>

        <div className="control-group">
          <label>Tempo (BPM):</label>
          <input type="number" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value))} min="40" max="240" />
        </div>

        <div className="control-group">
          <label>Duration (seconds):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} min="1" max="60" />
        </div>

        <div className="control-group">
          <label>Sample Type:</label>
          <select value={sampleType} onChange={(e) => setSampleType(e.target.value)}>
            {sampleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>AI Engine:</label>
          <select value={engine} onChange={(e) => setEngine(e.target.value)}>
            {Object.entries(engines).map(([id, eng]) => (
              <option key={id} value={id}>{eng.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Sample'}
      </button>

      {result && (
        <div className="result">
          <h3>Sample Generated</h3>
          <div className="result-info">
            <p>{result.data.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicSampleGenerator;
