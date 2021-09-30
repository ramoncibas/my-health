import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { Specialty, Price } from './filter-list';

@Component({
  selector: 'app-filter-doctors',
  templateUrl: './filter-doctors.component.html',
  styleUrls: ['./filter-doctors.component.scss'],
})

export class FilterDoctorsComponent implements OnInit {
  private specialty: any;
  private price: any;  
  private date: any;
  
  private data = Specialty;
  private dataPrice = Price;
  
  constructor(
    private popover: PopoverController
  ) { }

  ngOnInit() {}

  closePopover() {
    this.popover.dismiss();
  }

  // Select the specialty of doctor
  setSpecialty(event) {
    let data = event.target.value;
    this.specialty = data;
  }

  // Select the price of appointment
  setPrice(event) {
    let data = event.target.value;
    if (data.length <= 1) {
      this.price = data;

    } else if(data.length > 1) {
      data.length > 2 ? alert("Selecione somente dois valores!") : this.price = data;
    }
  }

  // Select the date of appointment
  setDate(event){
    let data = event.target.value;
    this.date = data;
  }

  // Closing the filter and passing the data
  setFilter() {
    const data = {
      specialty: this.specialty != undefined && this.specialty,      
      price: this.price != undefined && this.price,
      date: this.date != undefined && this.date
    };    
    
    this.popover.dismiss(data);
  }
}
