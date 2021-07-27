import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAppointmentPage } from './my-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: MyAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAppointmentPageRoutingModule {}
