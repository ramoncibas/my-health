import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Pill } from '../interfaces/pills';
import { UserHealthService } from './user-health.service';
import { UserHealth } from '../interfaces/user-health';

@Injectable({
  providedIn: 'root',
})
export class PillService {  
  collectionId = null;

  constructor(
    private afs: AngularFirestore,
    private userHealthService: UserHealthService
  ) {
    this.collectionId = this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      this.collectionId = data.id;
    });
  }

  /**
   * @return all pills from the database
   */
  getAllPills() {
    return this.afs
      .collection<Pill>('pills')
      .snapshotChanges()
      .pipe(
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
   * @param pill pills data
   */
  buyPills(data: Pill) {
    console.log(data)
    console.log(this.collectionId)
    return this.afs
      .collection('user_health')
      .doc(this.collectionId)
      .update({
        pill: firebase.default.firestore.FieldValue.arrayUnion({
          name: data.name,          
          description: data.description,
          picture: data.picture,
          amount: data.amount,
          price: data.price,
          promotion: data.promotion,
          createdAt: firebase.default.firestore.Timestamp.now(),
        }),
      });    
  }

  /**
   * Insert a pill in the database
   * @param {Pill} pill drug information
   */
  pillsInsert(pill: Pill) {
    return this.afs.collection<Pill>('pills').add({
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
