import { Injectable } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Tile } from '../generator/generator.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public code:any;

  constructor() { }

  public getCode() {
    return this.code;
  }

  public setCode(code:number) {
    this.code = code;
  }

}
