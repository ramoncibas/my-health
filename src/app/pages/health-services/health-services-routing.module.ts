import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HealthServicesPage } from './health-services.page';

const routes: Routes = [
  {
    path: '',
    component: HealthServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthServicesPageRoutingModule {}
