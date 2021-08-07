import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Appointment } from '../interfaces/appointment';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  currentUser: User = null;
  private appointementCollection: AngularFirestoreCollection<Appointment>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.appointementCollection = this.afs.collection<Appointment>('appointment');
    this.afAuth.onAuthStateChanged(user => {this.currentUser = user});
  }

  getAppointments() {
    return this.appointementCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(item => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;

          return { id, ...data };
        })
      })
    );
  }

  getAppointment(id: string) {}
  
  addAppointment(appointment: Appointment) {}

  updateAppointment(id: string, appointment: Appointment) {}

  deleteAppointment(id: string) {}
}
