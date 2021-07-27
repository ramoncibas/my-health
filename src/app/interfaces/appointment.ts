export interface Appointment {
    id?: string;
    doctorId?: string;
    specialty?: string;
    description?: string;

    // When the user makes an appointment
    userId?: string;
    healthInsurance?: boolean;
    price?: string;
    createdAt?: number;
    dayAt?: number;
}
