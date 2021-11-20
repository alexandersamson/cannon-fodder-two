export class Random {
  static getRandomArrayValue<T>(array: Array<T>):T{
    if(array.length === 1){
      return array[0];
    }
    return array[Math.floor(Math.random()*array.length)];
  }
}
