import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { Message } from '../interfaces/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
  }

  addChatMessage(msg) {
    return this.afs.collection('messages').add({
      msg,
      from: this.currentUser.uid,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      displayName: this.currentUser.displayName,
    });
  }
  
  getChatMessage() {
    let users = [];

    return this.getUsers().pipe(
      switchMap(res => {
        users = res;
        return this.afs.collection('messages', ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
      }),      
      map(messages => {
        for (let m of messages) {          
          m.fromName = this.getUserForMsg('displayName', m.from, users);
          m.fromEmail = this.getUserForMsg('email', m.from, users);
          m.myMsg = this.currentUser.uid === m.from;
        }
        return messages;
      })
    )
  }
  
  getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }

  getUserForMsg(type, msgFromId, users: User[]): string {
    for(let user of users) {
      if (user.uid == msgFromId) {
        return type === 'displayName' ? user.displayName : user.email;
      }
    }
    return 'Deleted';
  }
}
