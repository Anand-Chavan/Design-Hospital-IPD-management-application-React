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


export interface User {
    id: number;
    email: string;
    encrypted_password: string;
    reset_password_token: string | null;
    reset_password_sent_at: string | null;
    remember_created_at: string | null;
    created_at: string;
    updated_at: string;
    jti: string | null;
}

export interface Prescription {
    id: number;
    quantity: number;
    created_at: string;
    updated_at: string;
    admission_id: number;
    medicine_id: number;
}

export interface Room {
    id: number;
    room_type: string;
    description: string;
    charges: number;
    capacity: number;
    created_at: string; 
    updated_at: string;  
}

export interface Role {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Medicines {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    price:string
}

export interface Locality {
    id: number;
    locality: string;
    city: string;
    state: string;
    pin: string;
    created_at: string; 
    updated_at: string;
    user_detail_id: number;
}

export interface Admission {
    id: number;
    admission_date: string; 
    discharge_date: string | null; 
    dignostic: string; 
    admission_status: string; 
    patient_id: number;
    staff_id: number;
    created_at: string; 
    updated_at: string; 
    room_id: number;
}

export interface RoomCapacity {
    id: number;
    available_capacity: number;
    created_at: string; 
    updated_at: string; 
    room_id: number;
}


// Generate dummy data for Room interface
const generateDummyRooms = (count: number): Room[] => {
    const rooms: Room[] = [];
    for (let i = 1; i <= count; i++) {
        const room: Room = {
            id: i,
            room_type: `Room Type ${i}`,
            description: `Description for Room ${i}`,
            charges: Math.floor(Math.random() * 1000) + 100,
            capacity: Math.floor(Math.random() * 5) + 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        rooms.push(room);
    }
    return rooms;
};

export default generateDummyRooms;
  
  
  
  
  
  
  