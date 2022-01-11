import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
import { Doctor } from '../interfaces/doctor';
import { Appointment } from '../interfaces/appointment';

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
  getAllDoctors(): Observable<Doctor[]> {
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
   * Get all doctos accordingly filter set by user
   * @param params filter set by user
   * @returns list of doctors accordingly of params
   */
  getDoctorsByFilter(params: any) {
    const { specialty, price, date } = params;

    return this.getAllDoctors().pipe(
      switchMap(() => {
        return this.afs.collection('doctors', (ref) =>
          ref
            // .where('specialty', 'array-contains-any', specialty)
            .where('specialty', 'array-contains', specialty)
            .where('price', '<=', price)
            .where('dayAt', '<=', date)
        ).valueChanges({ idField: 'id' }) as Observable<any>;
      }),
      map((item) => {
        console.log(item, 'map')
        return item;
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