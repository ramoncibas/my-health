import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';

import { AppointmentService } from '../../../services/appointment.service';
import { PillService } from 'src/app/services/pill.service';

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
    private appoitment: AppointmentService,
    private pills: PillService,        
  ) {}

  ngOnInit() {        
     if (this.data.picture == null || this.data.picture == '') {
      this.data.picture = "/assets/img/doctor-avatar.png";
    }

    if(this.data.promotion) {
      this.price = this.data.price - Number(this.data.price * this.data.promotion)/100
    } else {
      this.price = this.data.price
    }
  }

  async closeModal() {
    await this.modalControll.dismiss();
  }

  async mkAppointment(data) {
    //await this.presentLoading();
    console.log(data)
    await this.appoitment.addAppointment(data);
  }

  async buyPill(data) {
    console.log(data)
    await this.presentLoading();
    const newData = {
      ...data,
      amount: 777
    }
    await this.pills.buyPills(newData);
    //console.log(dados)
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
