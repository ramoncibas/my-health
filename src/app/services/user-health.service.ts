import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserHealth } from '../interfaces/user-health';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserHealthService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {}

  /**
   *
   * @returns all documents from the "user_health" collection
   */
  getCurrentUserDocument() {
    let uid = this.authService.currentUser.uid;

    return this.getAllDoc().pipe(
      switchMap(() => {
        return this.afs
          .collection('user_health', (ref) => ref.where('userUid', '==', uid))
          .valueChanges({ idField: 'id' }) as Observable<any[]>;
      }),
      map((item) => {
        return item[0];
      })
    );
  }

  /**
   *
   * @returns the entire collection
   */
  getAllDoc() {
    return this.afs
      .collection('user_health')
      .valueChanges({ idFliend: 'uid' }) as Observable<any[]>;
  }
}
