import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Pill, UserPills } from '../interfaces/pills';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PillService {
  private pillCollection: AngularFirestoreCollection<Pill>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.pillCollection = this.afs.collection<Pill>('pills');
  }

  /**
   * @return all pills from the database
   */
  getAllPills() {
    return this.pillCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  /**
   * Function that stores user purchase data
   * @param data pills data
   *
   */
  buyPills(data: any) {
    const dataCollection = this.afs.collection('user_health');
    const userUid = this.authService.currentUser.uid;

    return dataCollection.doc('gbnIJM32jFouEYsVTf8x').update({
      pill: firebase.default.firestore.FieldValue.arrayUnion({
        id: data.id,
        name: data.name,
        brand: data.brande,
        description: data.description,
        picture: data.picture,
        amount: data.amount,
        price: data.price,
        promotion: data.promotion,
        boughtBy: userUid,
        createdAt: firebase.default.firestore.Timestamp.now(),
      }),
    });
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
      createdAt: firebase.default.firestore.Timestamp.now(),
    });
  }
}