// Quando o usuario for fazer uma consulta, registre em appointment
export interface Appointment {
    uid?: string;
    userUid: string;
    doctorUid: string;
    specialty: string;
    price: string;
    dayAt: any;
    createdAt: string;
}
