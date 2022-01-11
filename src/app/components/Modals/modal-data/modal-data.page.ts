import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { AppointmentService } from '../../../services/appointment.service';
import { PillService } from 'src/app/services/pill.service';
import { UserHealthService } from 'src/app/services/user-health.service';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.page.html',
  styleUrls: ['./modal-data.page.scss'],
})

export class ModalDataPage implements OnInit {
  @Input() data: any;

  private price;
  private loading: any;

  constructor(
    private loadingControll: LoadingController,
    private toastControll : ToastController,
    private modalControll: ModalController,
    private appoitmentService: AppointmentService,
    private pillsService: PillService,
    private userHealthService: UserHealthService
  ) {}

  ngOnInit() {
    // Checking if the doctor has a photo
    if (this.data.picture == null || this.data.picture == '')
      this.data.picture = "/assets/img/doctor-avatar.png";    

    // Checking if the drug has active promotion
    if(this.data.promotion) {
      this.price = (this.data.price - Number(this.data.price * this.data.promotion)/100).toFixed(2)
    } else {
      this.price = this.data.price
    }
  }

  async getCurrentId() {
    let res;
    this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      return res = data.id;
    });
    return res;
  }

  async closeModal() {
    await this.modalControll.dismiss();
  }

  // Make a medical appointment function
  async mkAppointment(data) {
    const collectionId = await this.getCurrentId();
    await this.presentLoading();
    await this.appoitmentService.addAppointment(collectionId, data);
    await this.loading.dismiss();
    await this.presentToast("Consulta marcada com sucesso!");
  }

  // Buy a drug function
  async buyPill(data) {
    const collectionId = await this.getCurrentId();
    await this.presentLoading();
    const newData = {...data, amount: 777};

    await this.pillsService.buyPills(collectionId, newData);
    await this.loading.dismiss();
    await this.presentToast("Medicamento comprado com sucesso!");
  }

  // Loading popup
  async presentLoading() {
    this.loading = await this.loadingControll.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, aguarde...'
    });
    return this.loading.present();
  }

  // Toast message
  async presentToast(message: string) {
    const toast = await this.toastControll.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
