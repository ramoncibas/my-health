import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Doctor } from '../interfaces/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorCollection: AngularFirestoreCollection<Doctor>;
  
  constructor(    
    private afs: AngularFirestore,
  ) {
    this.doctorCollection = this.afs.collection<Doctor>('doctors');
  }

  /**
   * Getting data from doctors for consultation
   * @returns returning all doctor collection data
   */
  getDoctors(): Observable<Doctor[]> {
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

  /**
   * Inserting a doctor in firestore
   * @param data doctor's information
   * @returns a new doctor in firestore
   */
  doctorAppointment(data: Doctor) {
    return this.doctorCollection.add({
      name: data.name,
      description: data.description,
      picture: data.picture,
      specialty: data.specialty
    })
  }
}
