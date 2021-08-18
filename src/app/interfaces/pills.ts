export interface Pill {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  picture?: string;
  brand?: string;
  promotion?: number;
  createdAt: firebase.default.firestore.Timestamp;
}

export interface UserPills {
  pill?: [
    {
      id?: string;
      name?: string;
      brand?: string;
      description?: string;
      picture?: string;
      amount?: any;
      price: string;
      promotion?: any;
      boughtBy?: string;
      createdAt?: firebase.default.firestore.Timestamp;
    }
  ];
  vaccine?: [
    {
      id: string;
      name: string;
      brand: string;
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
  check_up?: [
    {
      id: string;
      name: string;
      doctor: { doctorId?: string; doctorSpecialty: any };
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
  professionals?: [
    {
      id: string;
      doctor: { doctor: any };
    }
  ];
}
