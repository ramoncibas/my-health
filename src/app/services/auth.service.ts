import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: User = null;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
  ) {
    this.afAuth.onAuthStateChanged(async (user) => {
      if(user !== null) return this.currentUser = user;
    });
  }

  /**
   * Logging in user with email and password
   * @param {User} user user data
   * @returns logged in user
   */
  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password);
  }

  /**
   * Registering user in both authentication and firestore
   * @param {User} user user data
   * @returns 
   */
  async signUp(user: User) {
    const credentials = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    
    // Updated display name from user.
    this.afAuth.onAuthStateChanged(async (newUserUpdated) => {
      await newUserUpdated.updateProfile({
        displayName: user.displayName,
      }).then(() => {
        this.currentUser = newUserUpdated;
      })
    });

    // Adding User Data to CloudFirestore
    const uid = credentials.user.uid;
    return this.afs.doc(`users/${uid}`).set({
      uid,
      email: credentials.user.email,
      displayName: user.displayName,
    }), this.afs.collection('user_health').add({
      userUid: uid,
    });
  }

  /**
   * Method log out user   
   * @returns logged out user
   */
  singOut() {
    return this.afAuth.signOut();
  }

  /**
   * Getting user authentication data
   * @returns user authentication data
   */
  getAuth() {
    return this.afAuth;
  }
  
}
