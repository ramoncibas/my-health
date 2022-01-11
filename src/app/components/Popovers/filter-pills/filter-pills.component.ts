import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter-pills',
  templateUrl: './filter-pills.component.html',
  styleUrls: ['./filter-pills.component.scss'],
})

@NgModule({
  imports: [CommonModule, FormsModule, BrowserModule],
  declarations: [FilterPillsComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class FilterPillsComponent implements OnInit {
  private pillType: any;
  private price: any = 10;
  // private amount: any = 1;
  private data: any = [];

  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() { }

  closePopover() {
    this.popover.dismiss();
  }

  // Select the pill
  setPillType(event) {
    let data = event.target.value;
    this.pillType = data;
  }

  // Select the price of pill
  setPrice(event) {
    let data = event.target.value;
    this.price = data >= 10 && data;
  }

  // Select the amount of pill
  // setAmount(event) {
  //   let data = event.target.value;
  //   this.amount = data > 1 && data;
  // }

  // Closing the filter and passing the data
  setFilter() {
    const data = {
      type: this.pillType != undefined && this.pillType,
      price: this.price != undefined && this.price
    };
    this.popover.dismiss(data);
  }
}
