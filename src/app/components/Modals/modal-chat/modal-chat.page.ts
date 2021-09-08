import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { Observable } from 'rxjs';
import { Message } from '../../../interfaces/chat';

@Component({
  selector: 'app-modal-chat',
  templateUrl: './modal-chat.page.html',
  styleUrls: ['./modal-chat.page.scss'],
})

export class ModalChatPage implements OnInit {
  @ViewChild(IonContent, {static: true}) content: IonContent;  

  messages: Observable<Message[]>;
  newMsg = '';
  constructor(
    private chatService: ChatService, 
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.messages = this.chatService.getChatMessage();
  }

  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.newMsg = '';
      this.content.scrollToBottom(500);
    });
  }

  async closeModal() {
    await this.modalController.dismiss();
  }
}
