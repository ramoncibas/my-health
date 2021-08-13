export interface Pill {
  name?: string;
  description?: string;
  price?: string;
  picture?: string;
  brand?: string;
  promotion?: number;
  createdAt: any;
}

export interface UserPills {
  pill?: {
    amount: number,
    brand: string,
    createdAt: any,
    description: string,
    id: string,
    name: string,
    picture: string,
    price: string,
    promotion?: any,
  };
  boughtBy?: string;
}