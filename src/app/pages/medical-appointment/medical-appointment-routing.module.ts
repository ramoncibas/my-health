import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalAppointmentPage } from './medical-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalAppointmentPageRoutingModule {}
