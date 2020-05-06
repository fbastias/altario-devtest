import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: [string];
}

@Component({
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {

  tiles: Tile[] = [

  ];


  constructor() { }

  ngOnInit(): void {
    
    // Create a multidimensional array
    let table = new Array(10);               // 10 rows of the table
    for (let i = 0; i < table.length; i++)
      table[i] = new Array(10);            // Each row has 10 columns

    // Initialize the array
    for (let row = 0; row < table.length; row++) {
      for (let col = 0; col < table[row].length; col++) {
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        let letter = characters.charAt(Math.floor(Math.random() * charactersLength));
        this.tiles.push({ text: [letter], cols: 1, rows: 1, color: 'lightblue' });
        table[row][col] = letter;
        
      }
    }
    
    let time = new Date();
    let seconds = time.getSeconds().toString();
    let secondsArray = [];
    for (let i = 0; i < seconds.length; i++) {
      console.log(seconds);
      secondsArray.push(+seconds.charAt(i));
    }
    console.log(secondsArray);
    console.log(secondsArray[0]);

    let letter1 = table[secondsArray[0]][secondsArray[1]];
    console.log(letter1);
    
    let letter2 = table[secondsArray[1]][secondsArray[0]];
    console.log(letter2);

    let count1 = 0;
    let count2 = 0;
    for (let row = 0; row < table.length; row++) {
      for (let col = 0; col < table[row].length; col++) {
        if (letter1 == table[row][col]) {
          count1++;
        } else if (letter2 == table[row][col]) {
          count2++;
        }
      }
    }
    console.log(count1);
    console.log(count2);

    let code = count1.toString() + count2.toString();
    console.log(code);
    
    
    
    

  }

}
