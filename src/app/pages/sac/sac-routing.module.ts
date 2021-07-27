import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SacPage } from './sac.page';

const routes: Routes = [
  {
    path: '',
    component: SacPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SacPageRoutingModule {}
