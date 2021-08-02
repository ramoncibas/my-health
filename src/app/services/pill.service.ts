import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";

import { Pills } from '../interfaces/pills';

@Injectable({
  providedIn: 'root'
})
export class PillService {
  private pillCollection: AngularFirestoreCollection<Pills>;

  constructor(
    private afs: AngularFirestore
  ) { 
    this.pillCollection = this.afs.collection<Pills>('pills');
  }

  getPills() {
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

  pillsInsert(data: Pills) {
    return this.afs.collection('pills').add({
      uid: data.uid,
      name: data.name,
      description: data.description,
      price: data.price,
      picture: data.picture,
      brande: data.brand,
      promotion: data.promotion,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
    })
  }


}
