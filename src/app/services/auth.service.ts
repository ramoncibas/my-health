import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth,private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(async (user) => {
      if(user !== null) {
        return this.currentUser = user;        
      }
      console.log('changed', user);
    });
  }

  signIn(user: User) {    
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  async signUp(user: User) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    
    this.afAuth.onAuthStateChanged(async (newUserUpdated) => {
      await newUserUpdated.updateProfile({
        displayName: user.displayName,
      }).then(() => {
        this.currentUser = newUserUpdated;
      })
      console.log("Changed", newUserUpdated);
    });

    const uid = credentials.user.uid;    
    return this.afs.doc(
      `users/${uid}`
    ).set({
      uid,
      email: credentials.user.email,
      displayName: user.displayName
    });
  }

  singOut() {
    return this.afAuth.signOut();    
  }

  getAuth() {
    return this.afAuth;
  }
}
