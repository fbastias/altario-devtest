import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Tile } from '../generator/generator.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public code:any;
  public rows: Array<{paymentInput: any, ammountInput: any, code: any}>;

  constructor() { }

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
