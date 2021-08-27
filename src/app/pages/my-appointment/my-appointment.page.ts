import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalMyHealthPage } from 'src/app/components/Modals/modal-my-health/modal-my-health.page';
import { UserPills } from 'src/app/interfaces/pills';
import { PillService } from 'src/app/services/pill.service';
import { UserHealthService } from 'src/app/services/user-health.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.page.html',
  styleUrls: ['./my-appointment.page.scss'],
})
export class MyAppointmentPage implements OnInit {
  public data = new Array<UserPills>();
  private dataSubscription: Subscription;
  
  private whereData = new Array();
  private whereDataSubscription: Subscription;
  
  constructor(
    private modalControll: ModalController,
    private userService: UserHealthService
  ) {
    this.dataSubscription = this.userService.getMyPills().subscribe(data => {
      this.data = data;
      console.log(this.data)
    })

    this.whereDataSubscription = this.userService.getWhere().subscribe(data => {
      this.whereData = data;
    })
  }

  ngOnInit() {
    console.log(this.whereData)
  }

  ngOnDestroy() {
    if(this.dataSubscription) this.dataSubscription.unsubscribe();
  }
  
  async showModal(e) {        
    let message: string;
    switch (e) {
      case 'pills':
        message = "Meus Medicamentos";
      break;
      case 'vaccine':
        message = "Minhas Vacinas";
      break;
      case 'check-up':
        message = "Meus Exames";
      break;
      case 'professionals':
        message = "Meus Profissionais";
      break;
      default:
        break;
    }
    await this.presentModal(this.data[0].pill, message)
  }

  async presentModal( data:any, type:string) {
    const modal = await this.modalControll.create({
      component: ModalMyHealthPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: { data, type },
    });
    return await modal.present();
  }

}
