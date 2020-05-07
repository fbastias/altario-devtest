import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Subscription, interval } from 'rxjs';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  mySubscription: Subscription;
  code:number;
  paymentInput:number;
  ammountInput:number;
  rows: Array<{paymentInput: number, ammountInput: number, code: number}> = [];

  
  constructor(private service:SharedService) {
    this.mySubscription= interval(2000).subscribe((x =>{
      this.refreshCode();
    }));
  }
  
  ngOnInit(): void {
  }
  
  refreshCode() {
    this.code = this.service.getCode();
  }

  buttonClicked() {
    this.rows.push( {paymentInput: this.paymentInput, ammountInput: this.ammountInput, code: this.code} );
  }

}
