import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-data',
  templateUrl: './modal-data.page.html',
  styleUrls: ['./modal-data.page.scss'],
})

export class ModalDataPage implements OnInit {
  @Input() data: any;  
  constructor(private modalControll: ModalController) { }

  ngOnInit() {    
    console.log(this.data.specialty)

     if (this.data.picture == null || this.data.picture == '') {
      this.data.picture = "/assets/img/doctor-avatar.png";
    }
  }

  async closeModal() {
    await this.modalControll.dismiss();
  }

  async mkAppointment(data) {
    console.log(data)
  }

  buyPill(data) {
    console.log(data)
  }
}
