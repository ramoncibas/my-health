import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/interfaces/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

import { ListItemsComponent } from '../../components/list-items/list-items.component';
import { FilterDoctorsComponent } from 'src/app/components/Popovers/filter-doctors/filter-doctors.component';

@Component({
  selector: 'app-medical-appointment',
  templateUrl: './medical-appointment.page.html',
  styleUrls: ['./medical-appointment.page.scss'],
})
@NgModule({
  imports: [
    CommonModule, 
    FormsModule, 
    BrowserModule
  ],
  declarations: [ListItemsComponent, FilterDoctorsComponent],
})
export class MedicalAppointmentPage implements OnInit {
  private doctors = new Array<Doctor>();
  private doctorsSubscription: Subscription;

  constructor( 
    public popoverController: PopoverController,  
    private doctorsService: DoctorService,
  ) {
    this.doctorsSubscription = this.doctorsService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  ngOnInit() {}

  // Destroy listen
  ngOnDestroy() {
    this.doctorsSubscription.unsubscribe();
  }
  
  // Filter by name
  searchByName(event:any) {
    const query = event.target.value.toLowerCase();
    const items = Array.from(document.querySelector("ion-list").children as HTMLCollectionOf<HTMLElement>);
    
    requestAnimationFrame(() => {
      items.forEach(item => {
        console.log(item.textContent)
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  // Filter
  async filterData(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterDoctorsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log(data);
  }
}
