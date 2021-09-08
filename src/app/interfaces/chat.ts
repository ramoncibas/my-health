export interface Message {
  id: string;
  message: string;
  from: string;
  fromName: string;
  fromEmail: string;
  myMsg: boolean;
  createdAt: firebase.default.firestore.FieldValue;
}