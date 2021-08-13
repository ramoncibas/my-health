import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Pill } from 'src/app/interfaces/pills';
import { PillService } from 'src/app/services/pill.service';

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

  private pills = new Array<Pill>();
  private pillSubscription: Subscription;

  constructor(
    public popoverController: PopoverController,
    private pillService: PillService
  ) {
    this.pillSubscription = this.pillService.getAllPills().subscribe(data => {
      this.pills = data;
    })
  }

  ngOnInit() {
    console.log(this.pills)
  }
  
  // Destroy listen
  ngOnDestroy() {
    this.pillSubscription.unsubscribe();
  }

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
