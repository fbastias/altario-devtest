import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private code:number;

  constructor() { }

  public getCode() {
    return this.code;
  }

  public setCode(code:number) {
    this.code = code;
  }
}
