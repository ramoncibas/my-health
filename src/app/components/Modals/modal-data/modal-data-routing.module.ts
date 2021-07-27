import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDataPage } from './modal-data.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDataPageRoutingModule {}
