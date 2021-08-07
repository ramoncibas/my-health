import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { map, switchMap } from "rxjs/operators";

import { AuthService } from './auth.service';
import { Pill } from '../interfaces/pills';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PillService {
  private pillCollection: AngularFirestoreCollection<Pill>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { 
    this.pillCollection = this.afs.collection<Pill>('pills');
  }

  /**   
   * @return all pills from the database
   */   
  getAllPills() {
    return this.pillCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;

          return { id, ...data };
        })
      })
    )
  }

  /**
   * @return return my pills 
   */
  getMyPills() {
    return this.afs.collection<any>('user_pills').snapshotChanges().pipe(
      map(action => {
        return action.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          
          return { id, ...data };
        })
      })
    )
  }

  /**
   * Function that stores user purchase data
   * @param {Pill} pill pills data
   *
   */ 
  buyPills(pill: Pill) {
    const userUid = this.authService.currentUser.uid;

    return this.afs.collection('user_pills').add({
      userUid: userUid,
      pill: pill,
    })
  }
  
  /**
   * Insert a pill in the database
   * @param {Pill} pill drug information
   */
  pillsInsert(pill: Pill) {
    return this.pillCollection.add({      
      name: pill.name,
      description: pill.description,
      price: pill.price,
      picture: pill.picture,
      brand: pill.brand,
      promotion: pill.promotion,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
    })
  }
}
