import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'

import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  //currentUser: User = null;
  private doctorCollection: AngularFirestoreCollection<Doctor>;
  
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.doctorCollection = this.afs.collection<Doctor>('doctors');
    //this.afAuth.onAuthStateChanged(user => {this.currentUser = user});
  }

  getDoctors() {
    return this.doctorCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;

          return { id, ...data };
        })
      })
    );
  }

  // Registro do doutor, sera as informaçoes dele
  // O usuario podera ver as informaçoes do doutor, e assim optar por fazer uma consulta
  doctorAppointment(data: Doctor) {
    return this.afs.collection('doctors').add({
      uid: data.uid,
      name: data.name,
      description: data.description,
      picture: data.picture,
      specialty: data.specialty
    })
  }
}
