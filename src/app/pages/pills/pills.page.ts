import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

import { ListItemsComponent } from 'src/app/components/list-items/list-items.component';
import { FilterPillsComponent } from 'src/app/components/Popovers/filter-pills/filter-pills.component';

@Component({
  selector: 'app-pills',
  templateUrl: './pills.page.html',
  styleUrls: ['./pills.page.scss'],
})
@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    BrowserModule
  ],
  declarations: [ListItemsComponent, FilterPillsComponent]
})
export class PillsPage implements OnInit {

  private pills = [
    {
      name: 'Paracetamol 750mg',
      description: '20 comprimidos',
      price: '12,99',
      lastPrice: '15,99',
      picture: 'https://img.drogaraia.com.br/catalog/product/p/a/paracetamol-750mg-com-20-comprimidos-prati-donaduzzi.jpg?width=520&height=520&quality=50&type=resize',
      type: 'pills'
    },
    {
      name: 'Diporona 75mg',
      description: '20 comprimidos',
      price: '12,99',
      lastPrice: '15,99',
      picture: 'https://img.drogaraia.com.br/catalog/product/p/a/paracetamol-750mg-com-20-comprimidos-prati-donaduzzi.jpg?width=520&height=520&quality=50&type=resize',
      type: 'pills'      
    },
    {
      name: 'Irineu 750mg',
      description: '20 comprimidos',
      price: '12,99',
      lastPrice: '15,99',
      picture: 'https://img.drogaraia.com.br/catalog/product/p/a/paracetamol-750mg-com-20-comprimidos-prati-donaduzzi.jpg?width=520&height=520&quality=50&type=resize',
      type: 'pills'
    }
  ]
  constructor(
    public popoverController: PopoverController
  ) { }

  ngOnInit() {}

  // Filter by name
  searchByName(event:any) {
    const query = event.target.value.toLowerCase();
    const items = Array.from(document.querySelector("ion-list").children as HTMLCollectionOf<HTMLElement>);
    
    requestAnimationFrame(() => {
      items.forEach(item => {
        console.log(item.textContent)
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }

  // Filter
  async filterData(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterPillsComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log(data);
  }
}
