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

  // Select the pill
  setPillName(event) {
    let data = event.target.value;
    this.pillName = data;
  }

  // Select the price of pill
  setPrice(event) {
    let data = event.target.value;
    this.price = data >= 10 && data;
  }

  // Select the amount of pill
  setAmount(event){
    let data = event.target.value;
    this.amount = data > 1 && data;
  }

  // Closing the filter and passing the data
  setFilter() {
    const data = {
      pillName: this.pillName != undefined && this.pillName,
      price: this.price != undefined && this.price,
      amount: this.amount != undefined && this.amount,      
    };
    this.popover.dismiss(data);        
  }
}
