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
    console.log(this.date)
  }

  // Select the specialty of doctor
  setSpecialty(event) {
    let data = event.target.value;
    console.log(data)
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

  setDate(event){
    let data = event.target.value;
    this.date = data;
  }

  setFilter() {
    const data = {
      specialty: this.specialty != undefined && this.specialty,      
      price: this.price != undefined && this.price,
      date: this.date != undefined && this.date
    };    
    
    this.popover.dismiss(data);
  }
}
