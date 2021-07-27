import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeAnAppointmentPageRoutingModule } from './make-an-appointment-routing.module';

import { MakeAnAppointmentPage } from './make-an-appointment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeAnAppointmentPageRoutingModule
  ],
  declarations: [MakeAnAppointmentPage]
})
export class MakeAnAppointmentPageModule {}
