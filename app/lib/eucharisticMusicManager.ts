// Global singleton for Eucharistic Miracles background music
// Persists across page navigation to provide continuous playback

class EucharisticMusicManager {
  private static instance: EucharisticMusicManager;
  private audio: HTMLAudioElement | null = null;
  private isInitialized = false;

  private constructor() {}

  static getInstance(): EucharisticMusicManager {
    if (!EucharisticMusicManager.instance) {
      EucharisticMusicManager.instance = new EucharisticMusicManager();
    }
    return EucharisticMusicManager.instance;
  }

  start() {
    if (this.isInitialized && this.audio && !this.audio.paused) {
      console.log('🎵 Music already playing, continuing...');
      return; // Already playing
    }

    if (!this.audio) {
      console.log('🎵 Creating Eucharistic music player');
      this.audio = new Audio('/audio/background/i-am-the-bread-of-life.mp3');
      this.audio.loop = true;
      this.audio.volume = 0;
    }

    this.audio.play().catch(console.error);
    this.isInitialized = true;

    // Fade in to 30% volume
    let volume = 0;
    const fadeIn = setInterval(() => {
      if (this.audio && volume < 0.30) {
        volume += 0.01;
        this.audio.volume = Math.min(volume, 0.30);
      } else {
        clearInterval(fadeIn);
        console.log('🎵 Eucharistic music playing at 30%');
      }
    }, 50);
  }

  stop() {
    if (this.audio) {
      console.log('🎵 Stopping Eucharistic music');
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.isInitialized = false;
    }
  }

  isPlaying(): boolean {
    return this.audio !== null && !this.audio.paused;
  }
}

export default EucharisticMusicManager.getInstance();
