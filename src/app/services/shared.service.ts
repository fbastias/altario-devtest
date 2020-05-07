import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public userInput:any; //Character input page 1
  public generateClick:any; //Generate 2D Grid Button page 1
  public tiles:any; //Visual grid page 1
  public code:any; //Final code for both pages
  public table:any; //Data table for both pages
  public rows: Array<{paymentInput: any, ammountInput: any, code: any, table:any }>; //Payment table page 2

  constructor() { }

  public getUserInput() {
    return this.userInput;
  }

  public setUserInput(userInput:any) {
    this.userInput = userInput;
  }

  public getTiles() {
    return this.tiles;
  }

  public setTiles(tiles:any) {
    this.tiles = tiles;
  }

  public getGenerateClick() {
    return this.generateClick;
  }

  public setGenerateClick(generateClick:boolean) {
    this.generateClick = generateClick;
  }

  public getTable() {
    return this.table;
  }

  public setTable(table:any) {
    this.table = table;
  }

  public getCode() {
    return this.code;
  }

  public setCode(code:any) {
    this.code = code;
  }

  public getRows() {
    return this.rows;
  }

  public setRows(rows:any) {
    this.rows = rows;
  }

}
