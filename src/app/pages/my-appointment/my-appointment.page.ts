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
    switch (e) {
      case 'pills':
        await this.presentModal(this.data[0].pill,"Meus Medicamentos");
      break;
      case 'vaccine':
        await this.presentModal(this.data[0].vaccine,"Minhas Vacinas");
      break;
      case 'check-up':
        await this.presentModal(this.data[0].check_up,"Meus Exames");
      break;
      case 'professionals':
        await this.presentModal(this.data[0].professionals,"Meus Profissionais");
      break;
      default:
        break;
    }
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
