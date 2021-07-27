import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-pills',
  templateUrl: './filter-pills.component.html',
  styleUrls: ['./filter-pills.component.scss'],
})

export class FilterPillsComponent implements OnInit {
  private pillName: any;
  private price: any = 10;
  private amount: any = 1;
  private data: any = [];
  
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  closePopover() {
    this.popover.dismiss();
  }

  // Select the specialty of doctor
  setPillName(event) {
    let data = event.target.value;
    this.pillName = data;
  }

  // Select the price of appointment
  setPrice(event) {
    let data = event.target.value;
    this.price = data >= 10 && data;
  }

  setAmount(event){
    let data = event.target.value;
    this.amount = data > 1 && data;
  }

  setFilter() {
    const data = {
      pillName: this.pillName != undefined && this.pillName,
      price: this.price != undefined && this.price,
      amount: this.amount != undefined && this.amount,      
    };
    this.popover.dismiss(data);        
  }
}
