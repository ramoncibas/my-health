export interface Appointment {
    id?: string;
    userUid: string;
    doctorUid: string;
    specialty: string;
    price?: string;
    dayAt: any;
    name: string;
    description: string;
    picture: string;
    createdAt?: string;
}