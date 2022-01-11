import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Pill } from '../interfaces/pills';
import { UserHealth } from '../interfaces/user-health';

interface Params {
  type?: any;
  price?: any;
}

@Injectable({
  providedIn: 'root',
})
export class PillService {
  private pillCollection: AngularFirestoreCollection<Pill>;
  private userHealthCollection: AngularFirestoreCollection<UserHealth>;
  
  constructor(
    private afs: AngularFirestore,
  ) {
    this.pillCollection = this.afs.collection<Pill>('pills');
    this.userHealthCollection = this.afs.collection<UserHealth>('user_health');
  }

  /**
   * Getting all the pills in the database
   * @returns all pills from the database
   */
  getAllPills(): Observable<Pill[]> {
    return this.pillCollection
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
   * Get Pills by Params
   * @param params type and price of pills
   * @returns pills accordingly of params("filter")
   */
  getPillByParams(params: Params): Observable<Pill[]> {
    let { type, price } = params;

    return this.getAllPills().pipe(
      switchMap(() => {
        return this.afs
          .collection('pills', (ref) =>
            ref
              .where('type', '==', type)
              .where('price', '<=', price)
          )
          .valueChanges({ idField: 'id' }) as Observable<any>;
      }),
      map((item) => {
        console.log(item, 'map')
        return item;
      })
    );
  }

  /**
   * Function that stores user purchase data
   * @param collectionId id of the collection to added pill
   * @param {Pill} data pills data
   */
  buyPills(collectionId: string, data: Pill) {
    return this.userHealthCollection
      .doc(collectionId)
      .ref
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
   * Clear Appointmet History
   * @param collectionId id of the collection to be deleted
   * @returns empty collection
   */
  deletePillHistory(collectionId: string) {
    return this.userHealthCollection
      .doc(collectionId)
      .ref
      .update({
        pill: firebase.default.firestore.FieldValue.delete()
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
