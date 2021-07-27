import { Component, OnInit, NgModule, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ModalController, PopoverController, IonInfiniteScroll } from '@ionic/angular';

import { ModalDataPage } from '../Modals/modal-data/modal-data.page';
import { FilterDoctorsComponent } from '../Popovers/filter-doctors/filter-doctors.component';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss'],
})

@NgModule({
  imports: [CommonModule, FormsModule, BrowserModule],
  declarations: [FilterDoctorsComponent, ModalDataPage, ListItemsComponent],
})

export class ListItemsComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @Input() data: any;

  constructor(
    private modalControll: ModalController,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}  

  // Show Modal with options (make-appointment and show time of doctor)
  async presentModal(data) {
    const modal = await this.modalControll.create({
      component: ModalDataPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        data
      }
    });
    return await modal.present();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 5) {
        event.target.disabled = true;        
      }
    }, 500);
  }
}
