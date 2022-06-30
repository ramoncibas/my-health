import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Appointment } from '../interfaces/appointment';
import { UserHealth } from '../interfaces/user-health';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private userHealthCollection: AngularFirestoreCollection<UserHealth>;

  constructor(
    private afh: AuthService,
    private afs: AngularFirestore,
  ) {
    this.userHealthCollection = this.afs.collection<UserHealth>('user_health');   
  }
  
  /**   
   * Add Appointment to database
   * @param collectionId id of collection to add
   * @param appointment data from the user's medical appointment
   */
  addAppointment(collectionId: string, appointment: Appointment) {
    const currentUser = this.afh.currentUser.uid;
    
    return this.userHealthCollection.doc(collectionId).ref.update({
      check_up: firebase.default.firestore.FieldValue.arrayUnion({
        userUid: currentUser,
        doctorUid: appointment.id,
        //price: appointment.price,
        //dayAt: appointment.dayAt,
        name: appointment.name,
        description: appointment.description,
        picture: appointment.picture,
        specialty: appointment.specialty,
        createdAt: firebase.default.firestore.Timestamp.now(),
      }),
    })
  }

  /**
   * Update Appointment Information
   * @param collectionId id of collection to update
   * @param data data from the update of the user's medical appointment
   */
  updateAppointment(collectionId: string, data: Appointment) {
    return this.userHealthCollection.doc(collectionId).ref.update({
      check_up: firebase.default.firestore.FieldValue.arrayUnion({
        name: "Consulta de Rotina",
        dayAt: data.dayAt,
        appointmentUpdated: firebase.default.firestore.Timestamp.now(),
      }),      
    })
  }

  /**
   * Clear Appointmet History
   * @param collectionId id of the collection to be deleted
   * @returns empty collection
   */
  deleteAppointmentHistory(collectionId: string) {
    return this.userHealthCollection.doc(collectionId).ref.update({
      check_up: firebase.default.firestore.FieldValue.delete()
    })
  }
}
