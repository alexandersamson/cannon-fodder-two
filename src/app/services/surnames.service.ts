import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SurnamesService {

  private surNames: any ={
    'generic':[
      'John',
      'James',
      'Jerry',
      'Tom',
      'Philip',
      'Theodore "Teddy"',
      'Kenzel',
      'Fred',
      'Omar',
      'Jenny',
      'Remi',
      'Khalid',
      'Quinten',
      'Zeneb',
      'Olaf',
      'Patty',
      'Xi',
      'Joo',
      'Hyang',
      'Tara',
      'Masha',
      'Dean',
      'Cora',
      'Amarelys',
      'Jirad',
      'Jack',
      'Jaqueline',
      'Xena',
      'Rochelle',
      'Renata',
      'Isabelle',
      'Rani',
      'Shakiri',
      'Job',
      'Darryl'
    ]
  };
  private familyNames: any ={
    'generic':[
      'Wilkinson',
      'Jenkins',
      'Johnson',
      'Taylor',
      'Smith',
      'Jazeera',
      'Mohammed',
      'Ahmed',
      'Bouzambou',
      'Good',
      'Bang Lee',
      'Li',
      'Zouhair',
      'Bella',
      'Park',
      'Hue',
      'Philips',
      'Kuyper',
      'Offred',
      'Ofsteven',
      'Ozberg',
      'Kreznar',
      'Reznov',
      'Jagurdzija',
      'Hendriks',
      'Hammer',
      'Von Hell',
      'Blueberry',
      'Thistle',
      'Barn',
      'Bernstein'
    ]
  };


  constructor() { }


  getRandomSurname(style: string = ''): string {
    style = style.toLowerCase();
    let pos = (Math.random() * (this.surNames[style].length)) << 0;
    const randomSurName = this.surNames[style][pos];
    pos = (Math.random() * (this.familyNames[style].length)) << 0;
    const randomFamName = this.familyNames[style][pos];
    return (randomSurName + ' ' + randomFamName);
  }

}
