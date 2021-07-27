import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { PopoverController } from '@ionic/angular';

// import { Subscription } from 'rxjs';
// import { Appointment } from 'src/app/interfaces/appointment';
// import { AppointmentService } from 'src/app/services/auth/appointment.service';

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

  constructor(
    public popoverController: PopoverController
  ) {}

  // Fake data
  private appointments = [
    {
      name: 'Dr. Marcio',
      specialty: ['Clinico Geral', 'Cirurgião', 'Pediatra'],
      picture:
        'https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      description: 'Consulta de rotina.',
      price: 150,
      timeAvaliable: '2021-05-01T15:43:40.394Z',
    },
    {
      name: 'Dr. Tanga',
      specialty: ['Clinico Geral'],
      picture:
        'https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      description: 'Consulta de rotina.',
      price: null,
      timeAvaliable: '2021-05-01T15:43:40.394Z',
    },
    {
      name: 'Dr. Silva',
      specialty: ['Pediatra'],
      picture:
        'https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      description: 'Consulta de rotina.',
      price: null,
      timeAvaliable: '2021-05-01T15:43:40.394Z',
    },
    {
      name: 'Dr. Mauricio',
      specialty: ['Cirurgião'],
      picture:
        'https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
      description: 'Consulta de rotina.',
      price: null,
      timeAvaliable: '2021-05-01T15:43:40.394Z',
    },
  ];

  // private appointments =  new Array<Appointment>();
  // private appointmentsSubscription: Subscription;

  // constructor( private appointmentsService: AppointmentService ) {
  //   this.appointmentsSubscription = this.appointmentsService.getAppointments().subscribe(data => {
  //     this.appointments = data;
  //   });
  // }

  ngOnInit() {}

  // // Destroy listen
  // ngOnDestroy() {
  //   this.appointmentsSubscription.unsubscribe();
  // }

  //appointments:Array<Appointment>  
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
