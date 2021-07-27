import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeAnAppointmentPage } from './make-an-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: MakeAnAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeAnAppointmentPageRoutingModule {}
