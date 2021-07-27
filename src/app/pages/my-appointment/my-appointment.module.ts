import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyAppointmentPageRoutingModule } from './my-appointment-routing.module';

import { MyAppointmentPage } from './my-appointment.page';
import { ModalMyHealthPage } from '../../components/Modals/modal-my-health/modal-my-health.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyAppointmentPageRoutingModule
  ],
  declarations: [MyAppointmentPage, ModalMyHealthPage]
})
export class MyAppointmentPageModule {}
