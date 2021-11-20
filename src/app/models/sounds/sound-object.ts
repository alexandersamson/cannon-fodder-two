export class SoundObject {
  audio: HTMLAudioElement

  constructor(audioObject: HTMLAudioElement) {
    this.audio = audioObject;
  }

  load(){
  }

  play(){
    if(!this.audio.error) {
      this.audio.play();
    } else {
      console.log(this.audio.error);
    }
  }

  pause(){
    if(!this.audio.error) {
      this.audio.pause();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }


}
