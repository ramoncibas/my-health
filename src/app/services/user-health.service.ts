import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pill, UserPills } from '../interfaces/pills';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserHealthService {
  private dataCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.dataCollection = this.afs.collection('user_health');
  }

  /**
   * @return return my pills
   */
   getMyPills() {
    const userUid = this.authService.currentUser.uid;
    //return this.dataCollection.doc().valueChanges();
    return this.dataCollection.snapshotChanges().pipe(
      map(action => {
        return action.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;

          return { id, ...data }
        })
      })
    )
  }
}

