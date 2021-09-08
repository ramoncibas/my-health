import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Appointment } from '../interfaces/appointment';
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {  
  constructor(
    private afh: AuthService,
    private afs: AngularFirestore,
  ) {}
  
  /**   
   * Add Appointment to database
   * @param appointment data from the user's medical appointment
   * @returns return new appointment
   */
  addAppointment(collectionId: string, appointment: Appointment) {
    const currentUser = this.afh.currentUser.uid;
    return this.afs.collection('user_health').doc(collectionId).update({
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
   * @param data data from the update of the user's medical appointment
   */
  updateAppointment(collectionId: string, data: Appointment) {
    return this.afs.collection('user_health').doc(collectionId).update({
      check_up: firebase.default.firestore.FieldValue.arrayUnion({
        name: "Consulta de Rotina",
        dayAt: data.dayAt,
        appointmentUpdated: firebase.default.firestore.Timestamp.now(),
      }),      
    })
  }

  /**
   * Clear Appointmet History
   * @param collectionId this parameter has the id of the collection to be deleted
   */
  deleteAppointmentHistory(collectionId: string) {
    return this.afs.collection('user_health').doc(collectionId).update({
      check_up: firebase.default.firestore.FieldValue.delete()
    })
  }
}
