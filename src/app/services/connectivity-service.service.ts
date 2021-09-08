import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from '@ionic/angular';

declare var Connection;

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  onDevice: boolean;

  constructor(
    public platform: Platform,
  ) {
    this.onDevice = this.platform.is('cordova');
  }

  /**
   * Checking if the network is active
   * @returns a boolean saying if it is online
   */
  isOnLine(): boolean {
    if (this.onDevice && Network.onConnect) {
      return Network.onConnect !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  /**
   * Checking if the network is turned off
   * @returns a boolean saying if it is offline
   */
  isOffLine(): boolean {
    if (this.onDevice && Network.onConnect) {
      return Network.onConnect !== Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
