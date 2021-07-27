import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalMyHealthPage } from 'src/app/components/Modals/modal-my-health/modal-my-health.page';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.page.html',
  styleUrls: ['./my-appointment.page.scss'],
})
export class MyAppointmentPage implements OnInit {
  constructor(public modalControll: ModalController) { }

  ngOnInit() { }

  // Fake data
  showModal(e) {
    if (e == 'pills') {
      console.log(e);
      const type = "Meus Medicamentos";
      const data = [
        {
          about: 'Medicalmento: Paracetamol 12mg',
          description: 'Quantidade: 12mg',
          dayAt: `Cadastrado: ${new Date()}`,
        },
        {
          about: 'Medicalmento: Paracetamol 12mg',
          description: 'Quantidade: 12mg',
          dayAt: `Cadastrado: ${new Date()}`,
        },
        {
          about: 'Medicalmento: Paracetamol 12mg',
          description: 'Quantidade: 12mg',
          dayAt: `Cadastrado: ${new Date()}`,
        },
        {
          about: 'Medicalmento: Paracetamol 12mg',
          description: 'Quantidade: 12mg',
          dayAt: `Cadastrado: ${new Date()}`,
        },
      ];
      this.presentModal(data, type);

    } else if (e == 'vaccine') {
      console.log(e);
      const type = "Minhas Vacinas";
      const data = [
        {
          about: 'Vacinando contra: Covid-19',
          description: 'Vacina: CoronaVac',
          dayAt: `Vacinado em: ${new Date()}`,
        },
      ];
      this.presentModal(data, type);

    } else if (e == 'check-up') {
      const type = "Meus Exames";
      const data = [
        {
          about: 'Exame: Consulta de Rotina',
          description: 'Medico: Dr. Yang',
          dayAt: `Marcado para: ${new Date()}`,
        },
      ];
      this.presentModal(data, type);

    } else {
      console.log(e);
      const type = "Meus Profissionais";
      const data = [
        {
          about: 'Medico: Dr. Yang',
          doctorImg:
            'https://images.unsplash.com/photo-1543486958-d783bfbf7f8e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VsZmllfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
          description: 'Especialidade: Clinico Geral',
          dayAt: '',
        },
      ];
      this.presentModal(data, type);
    }
  }

  async presentModal(data:object, type:string) {
    console.log(data);
    const modal = await this.modalControll.create({
      component: ModalMyHealthPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        data, type
      },
    });
    return await modal.present();
  }

}
