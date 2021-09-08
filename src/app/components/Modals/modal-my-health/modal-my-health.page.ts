import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
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
    private pillsService: PillService,
    private userHealthService: UserHealthService,
    private appointmentService: AppointmentService
  ) {
    this.collectionId = this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      this.collectionId = data.id;
    });
  }

  ngOnInit() {
    console.log(this.data)
  }
  
  async closeModal() {
    await this.modalControll.dismiss();
  }
 
  async shareItem(data) {
    console.log(data);
  }

  async deleteItem(data) {
    console.log(data);
  }

  async cleanHistory(data) {
    await this.presentLoading();  
    if(data[0].promotion) {
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
