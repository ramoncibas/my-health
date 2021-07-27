import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PillsPage } from './pills.page';

const routes: Routes = [
  {
    path: '',
    component: PillsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PillsPageRoutingModule {}
