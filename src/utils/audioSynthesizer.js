// COSMOS - Web Audio API Procedural Ambient Synthesizer & Telemetry Sound System

class CosmosAudioSystem {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.droneGain = null;
    this.isMuted = true;
    this.volume = 0.4;
    this.oscillators = [];
    this.pulsarInterval = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);

      this.setupDeepSpaceDrone();
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  setupDeepSpaceDrone() {
    if (!this.ctx) return;

    // Sub-bass fundamental (54 Hz)
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(54, this.ctx.currentTime);
    subGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    subOsc.connect(subGain);
    subGain.connect(this.droneGain);
    subOsc.start();
    this.oscillators.push(subOsc);

    // Warm atmospheric harmonic (108 Hz)
    const midOsc = this.ctx.createOscillator();
    const midGain = this.ctx.createGain();
    midOsc.type = 'triangle';
    midOsc.frequency.setValueAtTime(108, this.ctx.currentTime);
    midGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    midOsc.connect(midGain);
    midGain.connect(this.droneGain);
    midOsc.start();
    this.oscillators.push(midOsc);

    // Cosmic shimmer filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(432, this.ctx.currentTime);
    this.droneGain.connect(filter);
  }

  toggleMute() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.1);
    }
    return !this.isMuted;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  // Telemetry holographic UI click
  playChime(freq = 880, duration = 0.15) {
    if (!this.ctx || this.isMuted) return;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio error safety
    }
  }

  // Solar flare whoosh
  playSolarFlare() {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.8);
      filter.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 2.0);

      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.0);
    } catch (e) {}
  }

  // Pulsar periodic radio pulse
  startPulsarBeats(bpm = 180) {
    this.stopPulsarBeats();
    if (this.isMuted || !this.ctx) return;
    const interval = (60 / bpm) * 1000;
    this.pulsarInterval = setInterval(() => {
      this.playChime(1200, 0.04);
    }, interval);
  }

  stopPulsarBeats() {
    if (this.pulsarInterval) {
      clearInterval(this.pulsarInterval);
      this.pulsarInterval = null;
    }
  }

  // Discovery Unlock Fanfare
  playDiscoverySound() {
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playChime(freq, 0.3);
      }, idx * 90);
    });
  }
}

export const cosmosAudio = new CosmosAudioSystem();
