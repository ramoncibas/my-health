import { Component, Input, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ActionSheetController, LoadingController, ModalController } from '@ionic/angular';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PillService } from 'src/app/services/pill.service';
import { UserHealthService } from 'src/app/services/user-health.service';
@Component({
  selector: 'app-modal-my-health',
  templateUrl: './modal-my-health.page.html',
  styleUrls: ['./modal-my-health.page.scss'],
})
export class ModalMyHealthPage implements OnInit {  
  @Input() data: any;
  @Input() title: any;

  private loading: any;
  collectionId = null;

  constructor(
    private loadingControll: LoadingController,
    private modalControll: ModalController,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private pillsService: PillService,
    private userHealthService: UserHealthService,
    private appointmentService: AppointmentService,
  ) {
    this.collectionId = this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      this.collectionId = data.id;
    });
  }

  ngOnInit() {}
  
  async closeModal() {
    await this.modalControll.dismiss();
  } 

  // Share health data
  async shareItem(data) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Contatar via:',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            this.socialSharing.shareViaWhatsAppToReceiver("+55", data).then(() => {
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
            this.socialSharing.shareViaEmail(data, "Help", ["ramon.cibas@hotmail.com"]).then(() => {
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

  async deleteItem(data) {
    console.log(data);
  }

  // Clean all data
  async cleanHistory(data) {
    await this.presentLoading();  
    if(data[0].amount) {
      this.pillsService.deletePillHistory(this.collectionId);
    } else {
      this.appointmentService.deleteAppointmentHistory(this.collectionId);
    }
    await this.loading.dismiss();
    await this.closeModal();
  }

  // Loading popup
  async presentLoading() {
    this.loading = await this.loadingControll.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }
}
