import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SacPageRoutingModule } from './sac-routing.module';

import { SacPage } from './sac.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SacPageRoutingModule
  ],
  declarations: [SacPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SacPageModule {}
