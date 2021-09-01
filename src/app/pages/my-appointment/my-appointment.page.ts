import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalMyHealthPage } from 'src/app/components/Modals/modal-my-health/modal-my-health.page';
import { UserHealthService } from 'src/app/services/user-health.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.page.html',
  styleUrls: ['./my-appointment.page.scss'],
})
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    BrowserModule
  ],
  declarations: [ModalMyHealthPage]
})
export class MyAppointmentPage implements OnInit {
  public data;
  private dataSubscription: Subscription;
  
  constructor(
    private modalControll: ModalController,
    private userService: UserHealthService
  ) {
    this.dataSubscription = this.userService.getCurrentUserDocument().subscribe(data => {
      this.data = data;
    })
  }

  ngOnInit() {
    console.log(this.data)
  }

  ngOnDestroy() {
    if(this.dataSubscription) this.dataSubscription.unsubscribe();
  }
  
  async showModal(type, data) {
    let message: string;
    switch (type) {
      case 'pills':
        message = "Meus Medicamentos";        
      break;
      case 'vaccine':
        message = "Minhas Vacinas";        
      break;
      case 'check_up':
        message = "Meus Exames";
      break;
      case 'professionals':
        message = "Meus Profissionais";        
      break;
      default:
        break;
    }
    this.presentModal(data, type);
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
