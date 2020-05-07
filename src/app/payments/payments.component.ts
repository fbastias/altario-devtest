import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  code:number;
  paymentInput:number;
  ammountInput:number;
  rows: Array<{paymentInput: number, ammountInput: number}> = [];

  
  constructor(private service:SharedService) { }
  
  ngOnInit(): void {
    this.code = this.service.getCode();
  }
  
  buttonClicked() {
    this.rows.push( {paymentInput: this.paymentInput, ammountInput: this.ammountInput } );
  }

}
