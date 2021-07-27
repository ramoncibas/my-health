import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMyHealthPage } from './modal-my-health.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMyHealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMyHealthPageRoutingModule {}
