import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDataPageRoutingModule } from './modal-data-routing.module';

import { ModalDataPage } from './modal-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDataPageRoutingModule
  ],
  declarations: [ModalDataPage]
})
export class ModalDataPageModule {}
