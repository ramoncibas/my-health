import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, ModalController } from '@ionic/angular';

import { ModalChatPage } from '../../components/Modals/modal-chat/modal-chat.page';


@Component({
  selector: 'app-sac',
  templateUrl: './sac.page.html',
  styleUrls: ['./sac.page.scss'],
})
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [ModalChatPage]
})
export class SacPage implements OnInit {
  constructor(
    private actionSheetController: ActionSheetController,
    private modalControll: ModalController,
    private socialSharing: SocialSharing,    
  ) { }

  ngOnInit() { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Contatar via:',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsAppToReceiver("+55","Olá! Estou precisando de Ajuda!").then(() => {
              console.log('WhatsApp clicked');
            }).catch(console.log)
          },
        },
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
            window.location.href = "https://www.facebook.com/"
          },
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
            window.location.href = "https://www.instagram.com/"            
          },
        },
        {
          text: 'LinkedIn',
          icon: 'logo-linkedin',
          handler: () => {
            window.location.href = "https://www.linkedin.com/"            
          },
        },
        {
          text: 'Email',
          icon: 'mail',
          handler: () => {
            this.socialSharing.shareViaEmail("Ola! Estou precisando de Ajuda!", "Help", ["ramon.cibas@hotmail.com"]).then(() => {
              console.log("Email clicked!");
            }).catch(console.log);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log(role);
  }

  async presentModal() {
    const modal = await this.modalControll.create({
      component: ModalChatPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }
}
