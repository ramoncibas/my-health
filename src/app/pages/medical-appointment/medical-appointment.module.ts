import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalAppointmentPageRoutingModule } from './medical-appointment-routing.module';

import { MedicalAppointmentPage } from './medical-appointment.page';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';

@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalAppointmentPageRoutingModule
  ],
  declarations: [
    MedicalAppointmentPage,
    ListItemsComponent,
  ]
})
export class MedicalAppointmentPageModule {}
