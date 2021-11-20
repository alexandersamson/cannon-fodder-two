import {SoundObject} from "./sound-object";

export class SoundsContainer {
  preloadedAudio : Array<HTMLAudioElement> = []
  sounds: Array<SoundObject> = []
  constructor() {
  }

  add(audioFile: string){
    if(!audioFile || audioFile == ''){
      return;
    }
    let audio = this.preloadedAudio.find( element => {
      if(element.id === audioFile && element.paused){
        return element;
      }
      return null;
    })
    if(!audio){
      return;
    }
    let newSound = new SoundObject(audio)
    this.sounds.push(newSound);
    newSound.audio.muted = false;
    newSound.play();
  }

  removeEndedSounds(){
    let i = this.sounds.length;
    while (i--){ //We need to do a reversed array-lookup, since splices will shift the indexes to the left
      if(this.sounds[i].audio.ended){
        delete this.sounds[i]; //Delete the object
        this.sounds.splice(i,1); //Remove the space the object uses in the array
      }
    }
  }
}
