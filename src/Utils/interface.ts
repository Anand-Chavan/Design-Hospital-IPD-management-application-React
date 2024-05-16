export interface AdmissionData {
    status: string;
    data: AdmissionDetail[];
}

export interface AdmissionDetail {
    id: number;
    patient: string;
    staff: string;
    room: string;
    dignostic: string;
    admission_date: string;
}

export interface AdmissionDataById {
    status: string;
    data: AdmissionDetailById;
}

export interface AdmissionDetailById {
    id: number;
    admission_date: string;
    discharge_date: string;
    dignostic: string;
    admission_status: string;
    patient_id: number;
    staff_id: number;
    created_at: string;
    updated_at: string;
    room_id: number;
}

export interface InvoiceData {
    room_charges: {
        room_type: string;
        charges: number;
        no_of_days: number;
        room_total: number;
    };
    medicine_charges: { name: string; amount: number }[];
    total: number;
}


export interface MedicineAPIData {
    status: string;
    data: MedicineData[];
}

export interface MedicineData {
    id: number;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
}

export interface UserDetails {
    id: number;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    phone_no: string;
    created_at: string;
    updated_at: string;
    role_id: number;
    user_id: number;
}




