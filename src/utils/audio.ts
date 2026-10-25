// Synthesized Web Audio API sound effects for Vault-Tec terminal & ID generator
// Zero external MP3/audio files needed

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Soft tactile click for buttons and preset selection
  playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2400, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  }

  // Dual-frequency confirmation beep for barcode scan / export
  playSuccess() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, t); // D5
    osc.frequency.setValueAtTime(880, t + 0.07); // A5

    gain.gain.setValueAtTime(0.1, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(t + 0.23);
  }

  // Physical card flip sound (subtle low thud with whoosh)
  playFlip() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    // White noise buffer for whoosh
    const bufferSize = ctx.sampleRate * 0.08;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.linearRampToValueAtTime(800, t + 0.08);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Subtle bass thud
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(120, t);
    subOsc.frequency.exponentialRampToValueAtTime(40, t + 0.07);

    subGain.gain.setValueAtTime(0.18, t);
    subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);

    noise.start(t);
    subOsc.start(t);
    noise.stop(t + 0.085);
    subOsc.stop(t + 0.075);
  }

  // Vintage Pip-Boy / Holotape terminal tap
  playTerminal() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1400, ctx.currentTime);
    osc.frequency.setValueAtTime(2200, ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.045);
  }
}

export const sound = new SoundSystem();
