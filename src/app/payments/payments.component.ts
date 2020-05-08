import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { Subscription, interval } from 'rxjs';

@Component({
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  mySubscription: Subscription;
  code:any;
  table:any;
  paymentInput:any;
  ammountInput:any;
  rows: Array<{paymentInput: any, ammountInput: any, code: any, table:any}> = [];

  
  constructor(private service:SharedService) {
    this.mySubscription= interval(2000).subscribe((x =>{
      this.refreshCode();
    }));
  }
  
  ngOnInit(): void {
    if (this.service.getRows() != undefined) {
      this.getTable();
    }
  }
  
  refreshCode() {
    this.code = this.service.getCode();
    this.table = this.service.getTable();
  }

  addRow() {
    this.rows.push( {paymentInput: this.paymentInput, ammountInput: this.ammountInput, code: this.code, table: this.table} );
    this.service.setRows(this.rows);
    console.log(this.rows);
    
  }

  getTable() {
    this.rows = this.service.getRows();
  }

}
