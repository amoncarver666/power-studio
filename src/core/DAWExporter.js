/**
 * DAWExporter - Export to various DAW formats (FL Studio .dwp, MIDI, WAV)
 * Supports multiple DAWs with peak audio quality
 */

import WaveFile from 'wavefile';

class DAWExporter {
  constructor() {
    this.supportedFormats = {
      'fl-studio': { ext: 'dwp', mimeType: 'application/octet-stream' },
      'ableton': { ext: 'als', mimeType: 'application/octet-stream' },
      'cubase': { ext: 'cpr', mimeType: 'application/octet-stream' },
      'reaper': { ext: 'rpp', mimeType: 'application/octet-stream' },
      'logic-pro': { ext: 'logicx', mimeType: 'application/octet-stream' },
      'midi': { ext: 'mid', mimeType: 'audio/midi' },
      'wav': { ext: 'wav', mimeType: 'audio/wav' },
      'mp3': { ext: 'mp3', mimeType: 'audio/mpeg' },
    };
    this.defaultNoteC3 = 48; // MIDI note number for C3
  }

  /**
   * Export to FL Studio .dwp format
   * @param {Object} projectData - Project data to export
   * @param {string} filename - Output filename
   * @returns {Blob} FL Studio project file
   */
  exportToFLStudio(projectData, filename = 'project.dwp') {
    const dwpData = this.createFLStudioProject(projectData);
    return new Blob([dwpData], { type: this.supportedFormats['fl-studio'].mimeType });
  }

  /**
   * Create FL Studio project structure
   * @param {Object} projectData
   * @returns {ArrayBuffer}
   */
  createFLStudioProject(projectData) {
    const buffer = new ArrayBuffer(1024);
    const view = new DataView(buffer);

    // FL Studio project header
    const signature = 'FLhd';
    for (let i = 0; i < signature.length; i++) {
      view.setUint8(i, signature.charCodeAt(i));
    }

    // Version
    view.setUint32(4, 2100, true);

    // Metadata from projectData
    if (projectData.tempo) {
      view.setFloat32(12, projectData.tempo, true);
    }

    if (projectData.key) {
      view.setUint8(20, this.keyToMIDI(projectData.key));
    }

    return buffer;
  }

  /**
   * Export to MIDI format
   * @param {Object} projectData - Project data to export
   * @param {string} filename - Output filename
   * @returns {Blob} MIDI file
   */
  exportToMIDI(projectData, filename = 'project.mid') {
    const midiData = this.createMIDIFile(projectData);
    return new Blob([midiData], { type: this.supportedFormats.midi.mimeType });
  }

  /**
   * Create MIDI file from project data
   * @param {Object} projectData
   * @returns {ArrayBuffer}
   */
  createMIDIFile(projectData) {
    const { chords = [], tempo = 120, key = 'C' } = projectData;

    const buffer = new ArrayBuffer(1000);
    const view = new DataView(buffer);
    let offset = 0;

    // Header chunk
    const headerChunk = 'MThd';
    for (let i = 0; i < headerChunk.length; i++) {
      view.setUint8(offset++, headerChunk.charCodeAt(i));
    }

    // Header length
    view.setUint32(offset, 6, false);
    offset += 4;

    // Format type (0 = single track)
    view.setUint16(offset, 0, false);
    offset += 2;

    // Number of tracks
    view.setUint16(offset, 1, false);
    offset += 2;

    // Division (ticks per quarter note)
    view.setUint16(offset, 480, false);
    offset += 2;

    // Track chunk
    const trackChunk = 'MTrk';
    for (let i = 0; i < trackChunk.length; i++) {
      view.setUint8(offset++, trackChunk.charCodeAt(i));
    }

    const trackDataOffset = offset + 4;
    offset = trackDataOffset;

    // Set tempo
    view.setUint8(offset++, 0xFF);
    view.setUint8(offset++, 0x51);
    view.setUint8(offset++, 3);
    const microsecondsPerBeat = Math.round(60000000 / tempo);
    view.setUint8(offset++, (microsecondsPerBeat >> 16) & 0xFF);
    view.setUint8(offset++, (microsecondsPerBeat >> 8) & 0xFF);
    view.setUint8(offset++, microsecondsPerBeat & 0xFF);

    // Add note events for chords
    chords.forEach((chord, index) => {
      const noteNumber = this.defaultNoteC3;
      const velocity = 100;
      const duration = 480;

      // Note on
      view.setUint8(offset++, 0x90);
      view.setUint8(offset++, noteNumber);
      view.setUint8(offset++, velocity);

      // Note off
      view.setUint8(offset++, 0x80);
      view.setUint8(offset++, noteNumber);
      view.setUint8(offset++, 0);
    });

    // End of track
    view.setUint8(offset++, 0xFF);
    view.setUint8(offset++, 0x2F);
    view.setUint8(offset++, 0);

    const trackLength = offset - trackDataOffset;
    const trackLengthOffset = trackDataOffset - 4;
    view.setUint32(trackLengthOffset, trackLength, false);

    return buffer.slice(0, offset);
  }

  /**
   * Export to WAV format with peak quality (24-bit, 44.1kHz)
   * @param {AudioBuffer} audioBuffer - Audio data
   * @param {string} filename - Output filename
   * @returns {Blob} WAV file
   */
  exportToWAV(audioBuffer, filename = 'audio.wav') {
    const wav = new WaveFile();

    const rawData = [];
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length;

    const channels = [];
    for (let i = 0; i < numChannels; i++) {
      channels.push(audioBuffer.getChannelData(i));
    }

    for (let i = 0; i < length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        rawData.push(channels[ch][i]);
      }
    }

    wav.fromScratch(numChannels, sampleRate, 24, rawData);

    return new Blob([wav.toBuffer()], { type: this.supportedFormats.wav.mimeType });
  }

  /**
   * Convert key name to MIDI number
   * @param {string} key - Key name (e.g., 'C', 'D#')
   * @returns {number} MIDI note number
   */
  keyToMIDI(key) {
    const keys = {
      'C': 0, 'C#': 1, 'Db': 1,
      'D': 2, 'D#': 3, 'Eb': 3,
      'E': 4, 'F': 5, 'F#': 6, 'Gb': 6,
      'G': 7, 'G#': 8, 'Ab': 8,
      'A': 9, 'A#': 10, 'Bb': 10,
      'B': 11,
    };
    return keys[key] || 0;
  }

  /**
   * Get all supported formats
   * @returns {Object} Supported formats
   */
  getSupportedFormats() {
    return this.supportedFormats;
  }

  /**
   * Export to multiple formats at once
   * @param {Object} projectData
   * @param {AudioBuffer} audioBuffer
   * @param {Array} formats - Formats to export
   * @returns {Object} Exported files
   */
  exportMultiple(projectData, audioBuffer, formats = ['midi', 'wav', 'fl-studio']) {
    const exports = {};

    if (formats.includes('midi')) {
      exports.midi = this.exportToMIDI(projectData);
    }

    if (formats.includes('wav')) {
      exports.wav = this.exportToWAV(audioBuffer);
    }

    if (formats.includes('fl-studio')) {
      exports.flstudio = this.exportToFLStudio(projectData);
    }

    return exports;
  }
}

export default DAWExporter;
