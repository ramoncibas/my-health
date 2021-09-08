import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation';

import { ConnectivityService } from '../../services/connectivity-service.service';
import { apiKey } from '../../../environments/environment';

declare var google;

@Component({
  selector: 'app-health-services',
  templateUrl: './health-services.page.html',
  styleUrls: ['./health-services.page.scss'],
})
export class HealthServicesPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  mapInitialised: boolean = false;
  apiKey: any = apiKey;

  constructor(
    public navController: NavController,
    public connectivityService: ConnectivityService,
    public modalControll: ModalController
  ) {
    this.loadGoogleMaps();
  }

  ngOnInit() {}

  loadGoogleMaps() {

    this.addConnectivityListeners();

    if(typeof google == "undefined" || typeof google.maps == "undefined") {
      console.log("Google maps JavaScript needs to be loaded.");
      this.disableMap();

      if(this.connectivityService.isOnLine()){
        console.log("online, loading map");

        //Load the SDK
        window['mapInit'] = () => {
          this.initMap();
          this.enableMap();
        }

        let script = document.createElement("script");
        script.id = "googleMaps";

        if(this.apiKey) {
          script.src =  `http://maps.google.com/maps/api/js?key=${this.apiKey}&callback=mapInit`;
        } else {
          script.src =  `http://maps.google.com/maps/api/js?callback=mapInit`;
        }

        document.body.appendChild(script);
      }
    }
    else {
      if (this.connectivityService.isOnLine()) {
        console.log("Showing Map");
        this.initMap();
        this.enableMap();
      } else {
        console.log("Disabling Map");
        this.disableMap();
      }
    }
  }

  initMap(){
    this.mapInitialised = true;
    Geolocation.getCurrentPosition().then(position => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.latitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    });
  }

  disableMap(){
    console.log("disable map");
  }

  enableMap(){
    console.log("enable map");
  }  

  addConnectivityListeners() {
    let onOnline = () => {
      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        } else {
          if(!this.mapInitialised) {
            this.initMap();
          }
          this.enableMap();
        }
      }, 2000);
    };

    let onOffline = () => {
      this.disableMap();
    }

    document.addEventListener("online", onOnline, false);
    document.addEventListener("offline", onOffline, false);
  }

  // map - https://talkjs.com/build/ionic-chat/?utm_source=google&utm_medium=ppc&utm_campaign=frameworks&utm_term=ionic&gclid=EAIaIQobChMI4Jqw7sve8QIVVgWRCh022gFxEAAYASAAEgJ34PD_BwE
}
