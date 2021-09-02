import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { UserHealthService } from './user-health.service';
import { Appointment } from '../interfaces/appointment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {  
  private collectionId;

  constructor(
    private afh: AuthService,
    private afs: AngularFirestore,
    private userHealthService: UserHealthService,    
  ) {    
    this.collectionId = this.userHealthService.getCurrentUserDocument().subscribe((data) => {
      this.collectionId = data.id;
    });
  }
  
  /**   
   * @param appointment data from the user's medical appointment
   * @returns
   */
  addAppointment(appointment: Appointment) {
    const currentUser = this.afh.currentUser.uid;
    return this.afs.collection('user_health').doc(this.collectionId).update({
      check_up: firebase.default.firestore.FieldValue.arrayUnion({
        userUid: currentUser,
        doctorUid: appointment.uid,
        specialty: appointment.specialty,
        //price: appointment.price,
        //dayAt: appointment.dayAt,
        createdAt: firebase.default.firestore.Timestamp.now(),
      }),
    })
  }

  /**
   * @param data data from the update of the user's medical appointment
   */
  updateAppointment(data: Appointment) {
    return this.afs.collection('user_health').doc(this.collectionId).update({
      check_up: firebase.default.firestore.FieldValue.arrayUnion({
        name: "Consulta de Rotina",
        dayAt: data.dayAt,
        appointmentUpdated: firebase.default.firestore.Timestamp.now(),
      }),      
    })
  }

  deleteAllOfCollection() {
    return this.afs.collection('user_health').doc(this.collectionId).update({
      check_up: firebase.default.firestore.FieldValue.delete()
    })
  }
}
