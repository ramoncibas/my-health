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
  collectionId = null;

  constructor(
    private loadingControll: LoadingController,
    private toastControll : ToastController,
    private modalControll: ModalController,
    private appoitmentService: AppointmentService,
    private pillsService: PillService,
    private userHealthService: UserHealthService
  ) {
    this.collectionId = this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      this.collectionId = data.id;
    });
  }

  ngOnInit() {
    // Tratando se o medico tem foto.
    if (this.data.picture == null || this.data.picture == '')
      this.data.picture = "/assets/img/doctor-avatar.png";    

    // Tratando se o medicamento tem uma promoção ativa.
    if(this.data.promotion) {
      this.price = (this.data.price - Number(this.data.price * this.data.promotion)/100).toFixed(2)
    } else {
      this.price = this.data.price
    }
  }

  async closeModal() {
    await this.modalControll.dismiss();
  }

  async mkAppointment(data) {
    console.log(data)
    await this.presentLoading();
    await this.appoitmentService.addAppointment(this.collectionId, data);
    await this.loading.dismiss();
    await this.presentToast("Consulta marcada com sucesso!");
  }

  async buyPill(data) {
    await this.presentLoading();
    const newData = {...data, amount: 777};

    await this.pillsService.buyPills(this.collectionId, newData);
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
