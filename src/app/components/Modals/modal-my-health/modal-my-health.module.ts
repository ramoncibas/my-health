import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMyHealthPageRoutingModule } from './modal-my-health-routing.module';

import { ModalMyHealthPage } from './modal-my-health.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMyHealthPageRoutingModule
  ],
  declarations: [ModalMyHealthPage]
})
export class ModalMyHealthPageModule {}
