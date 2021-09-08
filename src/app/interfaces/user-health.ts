export interface UserHealth {
  id?: string,
  pill?: [
    {
      name: string;
      brand: string;
      description: string;
      picture: string;
      amount?: any;
      price: string;
      promotion?: any;
      boughtBy: string;
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
  vaccine?: [
    {
      name: string;
      brand: string;
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
  check_up?: [
    {
      name: string;
      doctor: { doctorId: string; doctorSpecialty: any };
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
  professionals?: [
    {
      doctor: any;
      createdAt: firebase.default.firestore.Timestamp;
    }
  ];
}
