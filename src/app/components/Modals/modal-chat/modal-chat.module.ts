import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChatPageRoutingModule } from './modal-chat-routing.module';

import { ModalChatPage } from './modal-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChatPageRoutingModule
  ],
  declarations: [ModalChatPage]
})
export class ModalChatPageModule {}
