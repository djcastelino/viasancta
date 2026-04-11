// Global singleton for Marian Apparitions background music
// Persists across page navigation to provide continuous playback

class MarianMusicManager {
  private static instance: MarianMusicManager;
  private audio: HTMLAudioElement | null = null;
  private isInitialized = false;
  private stopTimeout: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): MarianMusicManager {
    if (!MarianMusicManager.instance) {
      MarianMusicManager.instance = new MarianMusicManager();
    }
    return MarianMusicManager.instance;
  }

  start() {
    // Cancel any pending stop - we're staying in Marian section
    if (this.stopTimeout) {
      console.log('🎵 Canceling stop - staying in Marian Apparitions section');
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }

    if (this.isInitialized && this.audio && !this.audio.paused) {
      console.log('🎵 Hail Mary music already playing, continuing...');
      return; // Already playing
    }

    if (!this.audio) {
      console.log('🎵 Creating Marian music player');
      this.audio = new Audio('/audio/background/Hail Mary Gentle Woman.mp3');
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
        console.log('🎵 Hail Mary music playing at 30%');
      }
    }, 50);
  }

  duck() {
    // Lower volume to 15% when narration is playing
    if (this.audio) {
      console.log('🎵 Ducking Hail Mary music to 15% for narration');
      let volume = this.audio.volume;
      const duckDown = setInterval(() => {
        if (this.audio && volume > 0.15) {
          volume -= 0.02;
          this.audio.volume = Math.max(volume, 0.15);
        } else {
          clearInterval(duckDown);
        }
      }, 50);
    }
  }

  unduck() {
    // Restore volume to 30% when narration ends
    if (this.audio) {
      console.log('🎵 Restoring Hail Mary music to 30%');
      let volume = this.audio.volume;
      const duckUp = setInterval(() => {
        if (this.audio && volume < 0.30) {
          volume += 0.02;
          this.audio.volume = Math.min(volume, 0.30);
        } else {
          clearInterval(duckUp);
        }
      }, 50);
    }
  }

  stopDelayed() {
    // Delay stop by 300ms - if start() is called during this time, stop is cancelled
    console.log('🎵 Scheduling Hail Mary music stop in 300ms...');
    this.stopTimeout = setTimeout(() => {
      this.stop();
    }, 300);
  }

  stop() {
    // Clear any pending delayed stop
    if (this.stopTimeout) {
      clearTimeout(this.stopTimeout);
      this.stopTimeout = null;
    }

    if (this.audio) {
      console.log('🎵 Stopping Hail Mary music');
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

export default MarianMusicManager.getInstance();
