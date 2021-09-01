export interface Pill {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  picture?: string;
  brand?: string;
  amount?: string;
  promotion?: number;
  createdAt: firebase.default.firestore.Timestamp;
}