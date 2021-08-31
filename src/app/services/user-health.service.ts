import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserHealth } from '../interfaces/user-health';
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
  
  getUserData() {
    let uid = this.authService.currentUser.uid;
    
    return this.getAllData().pipe(
      switchMap(() => {
        return this.afs.collection('user_health',  ref => ref.where("userUid", "==", uid)).valueChanges({ idField: 'id' }) as Observable<any[]>;
      }),
      map(item => {
        console.log(item)
        return item[0];
      })
    )
  }

  getAllData() {
    return this.dataCollection.valueChanges({ idFliend: "uid"}) as Observable<any[]>;
  };
}

