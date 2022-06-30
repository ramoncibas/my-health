import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthServicesPageRoutingModule } from './health-services-routing.module';

import { HealthServicesPage } from './health-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthServicesPageRoutingModule
  ],
  declarations: [HealthServicesPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HealthServicesPageModule {}
