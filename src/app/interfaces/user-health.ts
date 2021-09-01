export interface UserHealth {
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
      doctor: any;
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
}
