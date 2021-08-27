import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserHealthService } from 'src/app/services/user-health.service';
@Component({
  selector: 'app-modal-my-health',
  templateUrl: './modal-my-health.page.html',
  styleUrls: ['./modal-my-health.page.scss'],
})
export class ModalMyHealthPage implements OnInit {  
  @Input() data: any;
  @Input() type: any;

  constructor(
    private modalControll: ModalController,
  ) {}

  ngOnInit() {
    console.table(this.data)
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
    console.log(data);
  }
}
