import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserHealth } from '../interfaces/user-health';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserHealthService {
  private userhealthCollection: AngularFirestoreCollection<UserHealth>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
    this.userhealthCollection = this.afs.collection<UserHealth>('user_health');
  }

  /**
   * Getting the current document from the logged in user
   * @returns all documents from the "user_health" collection
   */
  getCurrentUserDocument() {
    let uid = this.authService.currentUser.uid;
        
    return this.getAllDoc().pipe(
      switchMap(() => {
        return this.afs
          .collection('user_health', (ref) => ref.where('userUid', '==', uid))
          .valueChanges({ idField: 'id' }) as Observable<UserHealth[]>;
      }),
      map((item) => {
        console.log(item)
        return item[0];
      })
    );
  }

  /**
   * Taking the documents from the collection "user_health"
   * @returns the entire collection
   */
  getAllDoc() {
    return this.userhealthCollection
      .valueChanges({ idFliend: 'uid' }) as Observable<UserHealth[]>;
  }
}
