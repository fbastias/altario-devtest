import { Component, OnInit } from '@angular/core';
import { interval, Subscription} from 'rxjs';
import { SharedService } from '../services/shared.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: [string];
}

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html', 
  styleUrls: ['./generator.component.scss']
})

export class GeneratorComponent implements OnInit {

  mySubscription: Subscription
  tiles: Tile[] = [];
  table:any = "";
  code; //Final user code
  userInput; //Character
  userPressedEnter:boolean = false; //Character input
  disableInput:boolean = false;  //Character input
  generateClick:boolean = false; //Proibs the user to click a second time the generator button
  
  constructor(private service:SharedService) { 
    this.mySubscription= interval(2000).subscribe((x =>{
      this.refreshCode();
    }));
  }
  
  ngOnInit(): void {
    this.generateClick = this.service.getGenerateClick();
    this.userInput = this.service.getUserInput();
  }
  
  //Generate 2D Grid
  btnGenerate() {
    this.generateClick = true;
    this.service.setGenerateClick(this.generateClick);
    this.generate();

    //Call generate function every 2 seconds
    this.mySubscription = interval(2000).subscribe((x =>{
      this.generate();
    }));
  }

  //Loads the character input in table and disables the input for 4 seconds
  onKeyUp() {
    this.userPressedEnter = true;
    this.disableInput = true;
    setTimeout(()=>{ 
      this.avaliableInput()
    }, 4000);
  }

  //Permits the character input again
  avaliableInput() {
    this.disableInput = false;
  }
  
  //Generates the table
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
          if (this.service.getUserInput() != "") {
            letter = this.service.getUserInput();
            this.tiles.push({ text: [this.service.getUserInput()], cols: 1, rows: 1, color: 'lightblue' }); //Builds the visual grid
            this.table[row][col] = this.service.getUserInput(); //Builds the array to get the data
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
    
    //Store variables in service to don't loose information when changing pages
    this.service.setTable(this.table);
    this.service.setTiles(this.tiles);
    
    //Timeout to give time to all data from array load and then get the final code
    setTimeout(()=>{ 
      this.generateCode();
    }, 300);
    
  }
  
  //Generates the final code
  generateCode() {

    //Get time from host system clock
    let time = new Date();
    let seconds = this.seconds_with_leading_zeros(time);
    let secondsArray = [];
    for (let i = 0; i < seconds.length; i++) {
      secondsArray.push(+seconds.charAt(i));
    }
    
    //Get letters from the array with the seconds of the clock
    let letter1 = this.table[secondsArray[0]][secondsArray[1]];
    let letter2 = this.table[secondsArray[1]][secondsArray[0]];

    //Letters counters
    let count1 = 0;
    let count2 = 0;
    for (let row = 0; row < this.table.length; row++) {
      for (let col = 0; col < this.table[row].length; col++) {
        if (letter1 == this.table[row][col]) {
          count1++;
        } 
      }
    }
    
    for (let row = 0; row < this.table.length; row++) {
      for (let col = 0; col < this.table[row].length; col++) {
        if (letter2 == this.table[row][col]) {
          count2++;
        } 
      }
    }
    
    //Divider if letter counter bigger than 9
    let result1 = count1;
    let divider = 1;
    if (count1 > 9) {
      while (result1 > 9) {
        result1 = count1/divider;
        divider++;
        count1 = Math.floor(result1);
      }
    }

    let result2 = count2;
    if (count2 > 9) {
      while (result2 > 9) {
        result2 = count2/divider;
        divider++;
        count2 = Math.floor(result2);
      }
    }
  
    //Final code
    this.code = count1.toString() + count2.toString();
    this.service.setCode(this.code);
  }

  //Method to get the left 0 of the first 10 seconds
  seconds_with_leading_zeros(time) { 
    return (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
  }

  //Keeps the visual grid and the final code if the user came from payments page
  refreshCode() {
    this.code = this.service.getCode();
    this.tiles = this.service.getTiles();
    this.service.setUserInput(this.userInput);
  }

}