import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserHealthService {
  @Input() data: string;
  private dataCollection: AngularFirestoreCollection<any>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) {
  }

  /**
   * @return return my pills
   */
   getMyPills() {
    const userUid = this.authService.currentUser.uid;

    return this.dataCollection.snapshotChanges().pipe(
      map(data => {
        return data.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }
}

