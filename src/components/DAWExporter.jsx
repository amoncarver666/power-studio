import React, { useState } from 'react';
import './DAWExporter.css';

const DAWExporter = () => {
  const [chords, setChords] = useState(['C', 'F', 'G', 'C']);
  const [tempo, setTempo] = useState(120);
  const [key, setKey] = useState('C');
  const [selectedFormats, setSelectedFormats] = useState(['midi', 'wav']);
  const [loading, setLoading] = useState(false);
  const [exportedFormats, setExportedFormats] = useState([]);
  const [supportedFormats, setSupportedFormats] = useState({});

  const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  React.useEffect(() => {
    fetch('/api/export/supported-formats')
      .then(r => r.json())
      .then(data => setSupportedFormats(data.data));
  }, []);

  const handleFormatToggle = (format) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter(f => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/export/multiple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chords,
          tempo,
          key,
          formats: selectedFormats,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setExportedFormats(data.data.formats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="daw-exporter">
      <h2>DAW Exporter</h2>

      <div className="project-settings">
        <div className="setting-group">
          <label>Tempo (BPM):</label>
          <input type="number" value={tempo} onChange={(e) => setTempo(parseInt(e.target.value))} />
        </div>

        <div className="setting-group">
          <label>Key:</label>
          <select value={key} onChange={(e) => setKey(e.target.value)}>
            {keys.map(k => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="export-formats">
        <h3>Export Formats</h3>
        <div className="format-list">
          {Object.entries(supportedFormats).map(([format, details]) => (
            <div key={format} className="format-item">
              <input
                type="checkbox"
                id={format}
                checked={selectedFormats.includes(format)}
                onChange={() => handleFormatToggle(format)}
              />
              <label htmlFor={format}>
                {details.ext.toUpperCase()} - {format}
              </label>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleExport} disabled={loading || selectedFormats.length === 0}>
        {loading ? 'Exporting...' : 'Export'}
      </button>

      {exportedFormats.length > 0 && (
        <div className="exported">
          <h3>Exported Formats</h3>
          <ul>
            {exportedFormats.map(fmt => (
              <li key={fmt}>{fmt}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DAWExporter;
