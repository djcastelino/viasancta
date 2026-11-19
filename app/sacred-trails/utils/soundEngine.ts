/**
 * Studio-Mastered Cinematic Spatial Audio & Authentic Sacred Recordings Engine
 *
 * Combines:
 * 1. Real EBU R128 Loudness-Normalized (-16 LUFS, -2 dB True Peak) Stereo Recordings in /public/audio/:
 *    - Gregorian Chant (/audio/gregorian_chant.mp3): Real Schola Gregoriana monks singing Latin Ave Maria & Rorate Caeli
 *    - Cathedral Church Bells (/audio/church_bells.mp3): Real European monastery church bells peal
 *    - Instrumental Hymns (/audio/instrumental_hymns.mp3): Real orchestral strings performing J.S. Bach's sacred Air
 *    - Basilica Pipe Organ (/audio/cathedral_organ.mp3): Real cathedral pipe organ performing Pachelbel's Chorale
 * 2. Synthesized Cinematic Score (Choir & Cello Film Pad) through a 4.0s Stereo Cathedral Convolver & Studio Limiter
 * 3. Location-Adaptive 3D Globe Biome Foley & Documentary Voiceover Narration
 */

export type SoundEffectType =
  | 'sanctuary_bell'
  | 'gregorian_chime'
  | 'vellum_page'
  | 'compass_click'
  | 'relic_discovered'
  | 'wax_seal_stamp'
  | 'puzzle_mismatch'
  | 'pilgrimage_complete';

export type SacredAmbientPreset =
  | 'none'
  | 'cinematic_score'
  | 'gregorian_chant'
  | 'church_bells'
  | 'instrumental_hymns'
  | 'cathedral_organ'
  | 'milan_cloister_chant'
  | 'assisi_dawn_sanctuary'
  | 'montserrat_organ_drone';

export type AmbientPreset =
  | SacredAmbientPreset
  | 'venetian_observatory'
  | 'anatolian_karst'
  | 'svalbard_telegraph';

export interface SoundtrackOption {
  id: SacredAmbientPreset;
  label: string;
  subtitle: string;
}

export const SOUNDTRACK_OPTIONS: SoundtrackOption[] = [
  {
    id: 'cathedral_organ',
    label: 'Basilica Pipe Organ (Default)',
    subtitle: 'Historic Cathedral Pipe Organ Liturgical Chorale',
  },
  {
    id: 'gregorian_chant',
    label: 'Gregorian Chant',
    subtitle: 'Schola Gregoriana Monastic Choir · Ave Maria & Rorate Caeli',
  },
  {
    id: 'cinematic_score',
    label: 'Cinematic Score',
    subtitle: 'Lush Ethereal Choir & Deep Cello Film Pad',
  },
  {
    id: 'church_bells',
    label: 'Cathedral Church Bells',
    subtitle: 'Authentic European Monastery Sanctuary Bell Peal',
  },
  {
    id: 'instrumental_hymns',
    label: 'Instrumental Sacred Strings',
    subtitle: 'Contemplative Orchestral Strings · Sacred Air',
  },
];

const REAL_AUDIO_TRACK_URLS: Partial<Record<SacredAmbientPreset, string>> = {
  gregorian_chant: '/audio/gregorian_chant.mp3',
  church_bells: '/audio/church_bells.mp3',
  instrumental_hymns: '/audio/instrumental_hymns.mp3',
  cathedral_organ: '/audio/cathedral_organ.mp3',
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterDryBus: GainNode | null = null;
  private reverbSendBus: GainNode | null = null;
  private masterVolumeNode: GainNode | null = null;
  private pinkNoiseBuffer: AudioBuffer | null = null;

  private htmlAudioElement: HTMLAudioElement | null = null;
  private narrationAudioElement: HTMLAudioElement | null = null;
  private unlockListenerAttached: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.07;

  private ambientController: { stop: () => void } | null = null;
  private currentAmbient: SacredAmbientPreset = 'cathedral_organ';
  private loopTimers: number[] = [];
  private activeBiomeLabel: string = 'Basilica Pipe Organ · Liturgical Chorale';

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initSpatialMasterBus(this.ctx);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private initSpatialMasterBus(ctx: AudioContext) {
    try {
      this.masterDryBus = ctx.createGain();
      this.masterDryBus.gain.value = 0.9;

      this.reverbSendBus = ctx.createGain();
      this.reverbSendBus.gain.value = 0.85;

      const reverbReturnBus = ctx.createGain();
      reverbReturnBus.gain.value = 0.95;

      const duration = 4.0;
      const length = Math.floor(ctx.sampleRate * duration);
      const irBuffer = ctx.createBuffer(2, length, ctx.sampleRate);

      for (let ch = 0; ch < 2; ch++) {
        const data = irBuffer.getChannelData(ch);
        let lp = 0;
        let sumSquares = 0;

        for (let i = 0; i < length; i++) {
          const t = i / ctx.sampleRate;
          const early =
            i % 1300 < 10 && t < 0.08 ? (Math.random() * 2 - 1) * 0.5 : 0;
          const decay = Math.exp(-t * 1.7) * (1 - t / duration);
          const envIn = Math.min(1.0, t / 0.012);
          const raw = ((Math.random() * 2 - 1) * decay + early) * envIn;
          lp = lp * 0.82 + raw * 0.18;
          data[i] = lp;
          sumSquares += lp * lp;
        }

        const rmsEnergy = Math.sqrt(sumSquares) || 1;
        const normScale = 1.65 / rmsEnergy;
        for (let i = 0; i < length; i++) {
          data[i] *= normScale;
        }
      }

      const convolver = ctx.createConvolver();
      convolver.buffer = irBuffer;

      this.reverbSendBus.connect(convolver);
      convolver.connect(reverbReturnBus);

      this.masterVolumeNode = ctx.createGain();
      this.masterVolumeNode.gain.value = this.volume;

      const limiter = ctx.createDynamicsCompressor();
      limiter.threshold.value = -3.0;
      limiter.knee.value = 8.0;
      limiter.ratio.value = 12.0;
      limiter.attack.value = 0.002;
      limiter.release.value = 0.18;

      this.masterDryBus.connect(this.masterVolumeNode);
      reverbReturnBus.connect(this.masterVolumeNode);
      this.masterVolumeNode.connect(limiter);
      limiter.connect(ctx.destination);

      const noiseLen = ctx.sampleRate * 6;
      const pBuffer = ctx.createBuffer(2, noiseLen, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const out = pBuffer.getChannelData(ch);
        let b0 = 0,
          b1 = 0,
          b2 = 0,
          b3 = 0,
          b4 = 0,
          b5 = 0,
          b6 = 0;
        for (let i = 0; i < noiseLen; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }
      }
      this.pinkNoiseBuffer = pBuffer;
    } catch {
      // Fallback
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0.05, Math.min(1.0, val));
    const ctx = this.getContext();
    if (this.masterVolumeNode && ctx) {
      this.masterVolumeNode.gain.setTargetAtTime(this.volume * 1.25, ctx.currentTime, 0.03);
    }
    if (this.htmlAudioElement) {
      this.htmlAudioElement.volume = this.narrationAudioElement
        ? Math.min(1.0, this.volume * 0.22)
        : Math.min(1.0, this.volume);
    }
    if (this.narrationAudioElement) {
      this.narrationAudioElement.volume = Math.min(1.0, this.volume);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.htmlAudioElement) {
      this.htmlAudioElement.muted = muted;
    }
    if (this.narrationAudioElement) {
      this.narrationAudioElement.muted = muted;
    }
    if (muted) {
      this.stopAmbient();
      this.stopSpeaking();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentAmbient(): SacredAmbientPreset {
    return this.currentAmbient;
  }

  public getActiveBiomeLabel(): string {
    return this.activeBiomeLabel;
  }

  public playEffect(effect: SoundEffectType) {
    this.play(effect);
  }

  public toggleSacredDrone(active: boolean) {
    if (active) {
      this.startAmbient('cinematic_score');
    } else {
      this.stopAmbient();
    }
  }

  public playLiturgicalMelody() {
    if (this.isMuted) return;
    this.playLushCinematicPad([146.83, 220.0, 293.66, 329.63, 440.0], 3.8, 0.45);
  }

  private routeToMaster(
    sourceNode: AudioNode,
    dryAmount: number,
    wetAmount: number,
    stopTime: number
  ) {
    if (!this.ctx || !this.masterDryBus || !this.reverbSendBus) return;

    const drySend = this.ctx.createGain();
    drySend.gain.value = dryAmount;
    sourceNode.connect(drySend);
    drySend.connect(this.masterDryBus);

    const wetSend = this.ctx.createGain();
    wetSend.gain.value = wetAmount;
    sourceNode.connect(wetSend);
    wetSend.connect(this.reverbSendBus);

    const cleanupMs = Math.max(300, (stopTime - this.ctx.currentTime + 0.3) * 1000);
    window.setTimeout(() => {
      try {
        drySend.disconnect();
        wetSend.disconnect();
      } catch {
        // Ignore
      }
    }, cleanupMs);
  }

  private playLushCinematicPad(
    frequenciesHz: number[],
    durationSec: number,
    peakGain = 0.48
  ) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const padBus = ctx.createGain();
    padBus.gain.setValueAtTime(0.0001, now);
    padBus.gain.linearRampToValueAtTime(peakGain, now + durationSec * 0.35);
    padBus.gain.setValueAtTime(peakGain * 0.9, now + durationSec * 0.68);
    padBus.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    const warmFilter = ctx.createBiquadFilter();
    warmFilter.type = 'lowpass';
    warmFilter.frequency.setValueAtTime(520, now);
    warmFilter.frequency.exponentialRampToValueAtTime(1450, now + durationSec * 0.45);
    warmFilter.frequency.exponentialRampToValueAtTime(620, now + durationSec);
    warmFilter.Q.setValueAtTime(1.0, now);

    padBus.connect(warmFilter);
    this.routeToMaster(warmFilter, 0.75, 0.95, now + durationSec);

    const detuneCents = [-10, 0, 10];
    const pans = [-0.65, 0, 0.65];

    frequenciesHz.forEach((freq, noteIdx) => {
      detuneCents.forEach((cents, vIdx) => {
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();
        const panner = ctx.createStereoPanner();

        osc.type = noteIdx === 0 ? 'triangle' : vIdx === 1 ? 'triangle' : 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(cents, now);

        panner.pan.setValueAtTime(pans[vIdx], now);
        const weight = noteIdx === 0 ? 0.16 : 0.12 / Math.sqrt(noteIdx + 1);
        voiceGain.gain.setValueAtTime(weight, now);

        osc.connect(voiceGain);
        voiceGain.connect(panner);
        panner.connect(padBus);

        osc.start(now);
        osc.stop(now + durationSec + 0.1);
      });
    });
  }

  private strikeCathedralBell(
    fundamentalHz: number,
    panPos = 0,
    decaySec = 4.2,
    strikeGain = 0.42
  ) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bellBus = ctx.createGain();
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(panPos, now);
    bellBus.connect(panner);

    this.routeToMaster(panner, 0.8, 0.95, now + decaySec * 1.25);

    const partials = [
      { ratio: 0.5, amp: 0.35, decayMult: 1.2 },
      { ratio: 1.0, amp: 0.55, decayMult: 1.0 },
      { ratio: 1.183, amp: 0.32, decayMult: 0.78 },
      { ratio: 1.506, amp: 0.25, decayMult: 0.62 },
      { ratio: 2.0, amp: 0.2, decayMult: 0.48 },
      { ratio: 2.514, amp: 0.12, decayMult: 0.35 },
    ];

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(fundamentalHz * p.ratio, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1600, now);

      const pDecay = decaySec * p.decayMult;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(p.amp * strikeGain, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + pDecay);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(bellBus);

      osc.start(now);
      osc.stop(now + pDecay + 0.05);
    });
  }

  private playNaturalAtmosphereSweep(
    centerFreqHz: number,
    durationSec: number,
    panStart: number,
    panEnd: number,
    gainLevel = 0.32
  ) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.pinkNoiseBuffer) return;

    const now = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.pinkNoiseBuffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(centerFreqHz * 0.65, now);
    filter.frequency.exponentialRampToValueAtTime(centerFreqHz * 1.35, now + durationSec * 0.45);
    filter.frequency.exponentialRampToValueAtTime(centerFreqHz * 0.6, now + durationSec);
    filter.Q.setValueAtTime(1.4, now);

    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(panStart, now);
    panner.pan.linearRampToValueAtTime(panEnd, now + durationSec);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(gainLevel, now + durationSec * 0.4);
    env.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

    src.connect(filter);
    filter.connect(panner);
    panner.connect(env);

    this.routeToMaster(env, 0.75, 0.65, now + durationSec);

    src.start(now, Math.random() * 2);
    src.stop(now + durationSec + 0.05);
  }

  /**
   * Location-Adaptive 3D Globe Biome Soundscape when zooming into any of the 6 cities
   */
  public playCityBiomeAudio(stopNumber: number) {
    if (this.isMuted) return;
    // If a real recorded track (e.g. Gregorian Chant, Bells, Hymns, Organ) is actively playing,
    // play only a subtle natural breeze/bell accent so we never clash with the real recording!
    const isRealRecordingPlaying = Boolean(REAL_AUDIO_TRACK_URLS[this.currentAmbient]);

    switch (stopNumber) {
      case 1:
        this.activeBiomeLabel = 'Atlas Mountain Breeze & Warm Cello';
        this.playNaturalAtmosphereSweep(380, 2.5, -0.45, 0.45, 0.28);
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([146.83, 220.0, 293.66, 329.63, 440.0], 2.8, 0.34);
        }
        break;
      case 2:
        this.activeBiomeLabel = 'Mediterranean Harbor Waves & Deep Brass';
        this.playNaturalAtmosphereSweep(250, 3.0, 0.5, -0.4, 0.32);
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([130.81, 196.0, 261.63, 293.66, 392.0], 2.8, 0.34);
        }
        break;
      case 3:
        this.activeBiomeLabel = 'Milan Duomo Subterranean Resonance';
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([146.83, 220.0, 293.66, 349.23, 440.0], 3.0, 0.38);
        }
        break;
      case 4:
        this.activeBiomeLabel = 'Ostia Celestial Horizon Shimmer';
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([146.83, 196.0, 246.94, 293.66, 440.0, 587.33], 3.0, 0.36);
        }
        break;
      case 5:
        this.activeBiomeLabel = 'Annaba Sea Surf & Deep Cello';
        this.playNaturalAtmosphereSweep(260, 2.8, -0.5, 0.4, 0.3);
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([146.83, 220.0, 261.63, 349.23, 440.0], 2.8, 0.34);
        }
        break;
      case 6:
      default:
        this.activeBiomeLabel = 'Pavia Golden Sky Cathedral Resonance';
        this.strikeCathedralBell(220.0, -0.25, 3.5, 0.3);
        if (!isRealRecordingPlaying) {
          this.playLushCinematicPad([146.83, 220.0, 277.18, 329.63, 440.0, 554.37], 3.2, 0.36);
        }
        break;
    }
  }

  /**
   * Modern Cinematic UI & Detective Foley Effects
   */
  public play(effect: SoundEffectType) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.masterDryBus) return;

    const now = ctx.currentTime;

    switch (effect) {
      case 'compass_click': {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = 'sine';
        subOsc.frequency.setValueAtTime(115, now);
        subOsc.frequency.exponentialRampToValueAtTime(45, now + 0.065);

        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.linearRampToValueAtTime(0.32, now + 0.006);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        subOsc.connect(subGain);
        subGain.connect(this.masterDryBus);
        subOsc.start(now);
        subOsc.stop(now + 0.075);

        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(840, now);
        clickOsc.frequency.exponentialRampToValueAtTime(260, now + 0.025);
        clickGain.gain.setValueAtTime(0.14, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
        clickOsc.connect(clickGain);
        clickGain.connect(this.masterDryBus);
        clickOsc.start(now);
        clickOsc.stop(now + 0.03);
        break;
      }

      case 'vellum_page': {
        this.playNaturalAtmosphereSweep(520, 0.3, -0.35, 0.35, 0.28);
        break;
      }

      case 'gregorian_chime': {
        this.strikeCathedralBell(293.66, 0.15, 2.6, 0.26);
        break;
      }

      case 'relic_discovered': {
        const subDrop = ctx.createOscillator();
        const subGain = ctx.createGain();
        subDrop.type = 'sine';
        subDrop.frequency.setValueAtTime(98.0, now);
        subDrop.frequency.exponentialRampToValueAtTime(48.0, now + 0.55);
        subGain.gain.setValueAtTime(0.001, now);
        subGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        subDrop.connect(subGain);
        subGain.connect(this.masterDryBus);
        subDrop.start(now);
        subDrop.stop(now + 0.65);

        this.playLushCinematicPad([146.83, 220.0, 293.66, 329.63, 440.0], 2.2, 0.38);
        break;
      }

      case 'sanctuary_bell': {
        this.strikeCathedralBell(220.0, 0, 3.8, 0.38);
        break;
      }

      case 'wax_seal_stamp': {
        const boomOsc = ctx.createOscillator();
        const boomGain = ctx.createGain();
        boomOsc.type = 'sine';
        boomOsc.frequency.setValueAtTime(115, now);
        boomOsc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
        boomGain.gain.setValueAtTime(0.001, now);
        boomGain.gain.linearRampToValueAtTime(0.42, now + 0.02);
        boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        boomOsc.connect(boomGain);
        boomGain.connect(this.masterDryBus);
        boomOsc.start(now);
        boomOsc.stop(now + 0.45);

        this.playLushCinematicPad([146.83, 220.0, 293.66, 369.99, 440.0, 587.33], 2.8, 0.42);
        break;
      }

      case 'puzzle_mismatch': {
        [0, 0.14].forEach((offset, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          const f = idx === 0 ? 130.81 : 110.0;
          osc.frequency.setValueAtTime(f, now + offset);
          gain.gain.setValueAtTime(0.001, now + offset);
          gain.gain.linearRampToValueAtTime(0.26, now + offset + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
          osc.connect(gain);
          if (this.masterDryBus) gain.connect(this.masterDryBus);
          osc.start(now + offset);
          osc.stop(now + offset + 0.2);
        });
        break;
      }

      case 'pilgrimage_complete': {
        this.strikeCathedralBell(220.0, -0.35, 4.2, 0.42);
        this.playLushCinematicPad(
          [146.83, 220.0, 277.18, 329.63, 440.0, 587.33],
          4.8,
          0.45
        );
        break;
      }
    }
  }

  /**
   * Starts any of the 5 selectable Sacred Soundtrack Presets:
   * - 'cinematic_score': Synthesized Lush Ethereal Choir & Deep Cello Film Pad
   * - 'gregorian_chant': Real Schola Gregoriana Monastic Choir (/audio/gregorian_chant.mp3)
   * - 'church_bells': Real European Monastery Church Bells (/audio/church_bells.mp3)
   * - 'instrumental_hymns': Real Orchestral Strings performing Bach's Air (/audio/instrumental_hymns.mp3)
   * - 'cathedral_organ': Real Cathedral Pipe Organ Chorale (/audio/cathedral_organ.mp3)
   */
  public startAmbient(preset: SacredAmbientPreset) {
    this.stopAmbient();
    const normalizedPreset: SacredAmbientPreset =
      preset === 'milan_cloister_chant' ? 'cinematic_score' : preset;
    this.currentAmbient = normalizedPreset;

    if (normalizedPreset === 'none' || this.isMuted) {
      this.activeBiomeLabel = 'Silent Sanctuary';
      return;
    }

    // Check if this preset uses a real studio-mastered MP3 recording
    const realTrackUrl = REAL_AUDIO_TRACK_URLS[normalizedPreset];
    if (realTrackUrl && typeof window !== 'undefined') {
      const audio = new Audio(realTrackUrl);
      audio.loop = true;
      audio.volume = Math.min(1.0, this.volume);
      audio.muted = this.isMuted;
      this.htmlAudioElement = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser blocked initial autoplay before user gesture; resume on first interaction
          if (!this.unlockListenerAttached) {
            this.unlockListenerAttached = true;
            const resumeOnGesture = () => {
              this.unlockListenerAttached = false;
              window.removeEventListener('pointerdown', resumeOnGesture);
              window.removeEventListener('keydown', resumeOnGesture);
              if (this.htmlAudioElement && !this.isMuted && this.currentAmbient !== 'none') {
                this.htmlAudioElement.play().catch(() => {});
              }
            };
            window.addEventListener('pointerdown', resumeOnGesture, { once: true });
            window.addEventListener('keydown', resumeOnGesture, { once: true });
          }
        });
      }
      return;
    }

    // Otherwise run the synthesized Cinematic Score (Choir & Cello Film Pad)
    const ctx = this.getContext();
    if (!ctx) return;

    this.activeBiomeLabel = 'Cinematic Score · Choir & Cello Pad';
    const chordProgression = [
      [110.0, 146.83, 220.0, 293.66, 329.63, 440.0],   // D minor add9
      [116.54, 174.61, 220.0, 261.63, 349.23, 440.0],  // Bb major 9
      [98.0, 146.83, 196.0, 220.0, 293.66, 392.0],     // G minor 9
      [110.0, 164.81, 196.0, 246.94, 329.63, 440.0],   // A7 sus4
    ];
    let step = 0;
    const runCycle = () => {
      if (this.isMuted || this.currentAmbient !== 'cinematic_score') return;
      const chord = chordProgression[step % chordProgression.length];
      this.playLushCinematicPad(chord, 6.4, 0.46);
      if (step % 2 === 0) {
        this.playNaturalAtmosphereSweep(320, 5.2, -0.45, 0.45, 0.25);
      }
      step++;
    };
    runCycle();
    const id = window.setInterval(runCycle, 5600);
    this.loopTimers.push(id);
  }

  public stopAmbient() {
    if (this.htmlAudioElement) {
      try {
        this.htmlAudioElement.pause();
        this.htmlAudioElement.src = '';
      } catch {
        // Ignore
      }
      this.htmlAudioElement = null;
    }
    if (this.ambientController) {
      this.ambientController.stop();
      this.ambientController = null;
    }
    this.loopTimers.forEach((id) => {
      window.clearInterval(id);
      window.clearTimeout(id);
    });
    this.loopTimers = [];
    this.currentAmbient = 'none';
  }

  /**
   * Plays Azure Andrew Neural (en-US-AndrewMultilingualNeural) exclusive narration:
   * - kind === 'clue': Unprinted 2-3 sentence Spoken Insider Clue for the active case
   * - kind === 'city': Unprinted 2-3 sentence Modern-Day City Fun Fact Gem
   * Automatically ducks the background Gregorian Chant / Sacred Audio while Andrew speaks!
   */
  public playAndrewNarration(
    stopNumber: number,
    kind: 'clue' | 'city',
    onEnd?: () => void,
    saintId:
      | 'augustine'
      | 'thomas'
      | 'xavier'
      | 'paul'
      | 'francis'
      | 'ignatius'
      | 'joan' = 'augustine'
  ) {
    this.stopSpeaking();
    if (typeof window === 'undefined' || this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    // Gently duck background ambient music so Andrew's voice is warm and clear
    if (this.htmlAudioElement) {
      this.htmlAudioElement.volume = Math.min(1.0, this.volume * 0.22);
    }

    const prefix = saintId === 'augustine' ? 'stop' : `${saintId}_stop`;
    const mp3Url = `/audio/narration/${prefix}_${stopNumber}_${kind}.mp3`;
    const audio = new Audio(mp3Url);
    audio.volume = Math.min(1.0, this.volume);
    audio.muted = this.isMuted;
    this.narrationAudioElement = audio;

    const handleFinish = () => {
      if (this.narrationAudioElement === audio) {
        this.narrationAudioElement = null;
      }
      if (this.htmlAudioElement) {
        this.htmlAudioElement.volume = Math.min(1.0, this.volume);
      }
      if (onEnd) onEnd();
    };

    audio.onended = handleFinish;
    audio.onerror = handleFinish;
    audio.play().catch(handleFinish);
  }

  public speakNarration(text: string, onEnd?: () => void) {
    this.stopSpeaking();
    if (typeof window === 'undefined' || this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    if (this.htmlAudioElement) {
      this.htmlAudioElement.volume = Math.min(1.0, this.volume * 0.22);
    }

    // Attempt Azure Andrew Neural (/api/generate-audio) first
    fetch('/api/generate-audio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voice: 'en-US-AndrewMultilingualNeural',
        rate: 0.96,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Fallback');
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const audio = new Audio(blobUrl);
        audio.volume = Math.min(1.0, this.volume);
        this.narrationAudioElement = audio;
        const finish = () => {
          URL.revokeObjectURL(blobUrl);
          if (this.narrationAudioElement === audio) this.narrationAudioElement = null;
          if (this.htmlAudioElement) this.htmlAudioElement.volume = Math.min(1.0, this.volume);
          if (onEnd) onEnd();
        };
        audio.onended = finish;
        audio.onerror = finish;
        audio.play().catch(finish);
      })
      .catch(() => {
        if (this.htmlAudioElement) {
          this.htmlAudioElement.volume = Math.min(1.0, this.volume);
        }
        if (onEnd) onEnd();
      });
  }

  public stopSpeaking() {
    if (this.narrationAudioElement) {
      try {
        this.narrationAudioElement.pause();
        this.narrationAudioElement.src = '';
      } catch {
        // Ignore
      }
      this.narrationAudioElement = null;
    }
    if (this.htmlAudioElement) {
      this.htmlAudioElement.volume = Math.min(1.0, this.volume);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const soundEngine = new SoundEngine();
