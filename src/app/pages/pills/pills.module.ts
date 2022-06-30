import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PillsPageRoutingModule } from './pills-routing.module';

import { PillsPage } from './pills.page';
import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PillsPageRoutingModule
  ],
  declarations: [
    PillsPage,
    ListItemsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PillsPageModule {}
