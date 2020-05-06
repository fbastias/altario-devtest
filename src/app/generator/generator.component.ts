import { Component, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription} from 'rxjs';

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

  mySubscription: Subscription
  tiles: Tile[] = [];
  table:any = "";
  code; //Final user code
  userInput; //Character
  userPressedEnter:boolean = false;
  disableInput:boolean = false;
  
  constructor() {
    //Call generate function every 2 seconds
    this.mySubscription= interval(2000).subscribe((x =>{
      this.generate();
    }));
  }

  ngOnInit(): void {
    
  }

  onKeyUp() {
    this.userPressedEnter = true;
    console.log(this.userInput);
    this.disableInput = true;
    setTimeout(()=>{ 
      this.avaliableInput()
    }, 4000);
  }

  avaliableInput() {
    this.disableInput = false;
  }
  
  generate() {
    
    //Clean variables
    this.table = "";
    this.tiles = [];

    // Create a multidimensional array
    this.table = new Array(10);               // 10 rows of the table
    for (let i = 0; i < this.table.length; i++)
    this.table[i] = new Array(10);            // Each row has 10 columns
    
    // Initialize the array
    for (let row = 0; row < this.table.length; row++) {
      let countIterations = 0;
      for (let col = 0; col < this.table[row].length; col++) {
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        let letter = characters.charAt(Math.floor(Math.random() * charactersLength));

        //20% equals 20cells. So each 5 cells I introduze the user input.
        countIterations++;
        if (countIterations == 5 && this.userPressedEnter) {
          if (this.userInput != "") {
            letter = this.userInput;
            this.tiles.push({ text: [letter], cols: 1, rows: 1, color: 'lightblue' }); //Builds the visual grid
            this.table[row][col] = letter; //Builds the array to get the data
            countIterations = 0;
          } else {
            this.tiles.push({ text: [letter], cols: 1, rows: 1, color: 'lightblue' });
            this.table[row][col] = letter;
          }
        } else {
          this.tiles.push({ text: [letter], cols: 1, rows: 1, color: 'lightblue' });
          this.table[row][col] = letter;
        }
      }
    }
    
    setTimeout(()=>{ 
      this.generateCode();
    }, 500);
  }

  
  generateCode() {

    let time = new Date();
    let seconds = time.getSeconds().toString();
    let secondsArray = [];
    for (let i = 0; i < seconds.length; i++) {
      secondsArray.push(+seconds.charAt(i));
    }
  
    let letter1 = this.table[secondsArray[0]][secondsArray[1]];
    let letter2 = this.table[secondsArray[1]][secondsArray[0]];
  
    let count1 = 0;
    let count2 = 0;
    for (let row = 0; row < this.table.length; row++) {
      for (let col = 0; col < this.table[row].length; col++) {
        if (letter1 == this.table[row][col]) {
          count1++;
        } else if (letter2 == this.table[row][col]) {
          count2++;
        }
      }
    }
  
    //FAZER A DIVISAO SE SUPERIOR A 9
  
    this.code = count1.toString() + count2.toString();
  }

}
