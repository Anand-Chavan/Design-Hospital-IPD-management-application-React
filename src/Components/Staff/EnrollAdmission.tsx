import React, { useEffect, useState } from 'react';
import '../../Styles/Modal.css';
import { ToastContainer, toast } from 'react-toastify';
import '../../Styles/Room.css';
import { AdminLogin } from '../../Utils/ApiRes';
import { AdmissionDataById, AdmissionDetailById } from '../../Utils/interface';

interface EnrollRoomProps {
    onClose: () => void;
    onSuccess: (newAdmission: any) => void;
    mode: string;
    rowData?: any;
    admissionData?: {
        admission_date: string;
        discharge_date: string;
        dignostic: string;
        admission_status: string;
        staff_id?: number; // Make staff_id optional
        room_id?: number; // Make room_id optional
        patient_id?: number; // Make patient_id optional
    };
}

interface PatientData {
    created_at: string;
    date_of_birth: string;
    first_name: string;
    gender: string;
    id: number;
    last_name: string;
    phone_no: string;
    role_id: number;
    updated_at: string;
    user_id: number;
}


interface ApiResponseForUsers {
    status: {
        message: string;
        data: {
            id: number;
            email: string;
            created_at: string;
            updated_at: string;
            jti: string;
        };
        errors: [];
    };
}

interface RoomData {
    capacity: number;
    charges: number;
    created_at: string;
    description: string;
    id: number;
    room_type: string;
    updated_at: string;
}


const EnrollAdmission: React.FC<EnrollRoomProps> = ({ onClose, onSuccess, mode, rowData }) => {
    const [loginData, setLoginData] = useState<AdminLogin | null>(null);
    const [rooms, setRooms] = useState<any[]>([]);
    const [patients, setPatients] = useState<any[]>([]);
    const [formData, setFormData] = useState<EnrollRoomProps['admissionData']>({
        admission_date: '',
        discharge_date: '',
        dignostic: '',
        admission_status: '',
        staff_id: loginData?.status?.data?.id,
        room_id: 0,
        patient_id: 0,
    });

    useEffect(() => {
        fetchRoomsData();
        fetchPatientsData();
    }, []);
    useEffect(() => {
        const storedLoginData = JSON.parse(localStorage.getItem('loginData') as string);
        setLoginData(storedLoginData);
    }, []);

    useEffect(() => {
        if (loginData && loginData.status && loginData.status.data) {
            setFormData({
                admission_date: '',
                discharge_date: '',
                dignostic: '',
                admission_status: '',
                staff_id: loginData.status.data.id,
                room_id: 0,
                patient_id: 0,
            });
        }
    }, [loginData]);


    useEffect(() => {
        if (mode === 'edit') {
            fetchAdmissionDataById(rowData?.id);
        }
    }, []);

    const fetchRoomsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/rooms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                }
            });
            const data = await response.json();
            if (data?.data) {
                setRooms(data?.data);
            }
        } catch (error) {
            console.error('Error fetching rooms data:', error);
        }
    };

    const fetchPatientsData = async () => {
        try {
            const response = await fetch('http://localhost:3000/user_details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                }
            });
            const data = await response.json();
            if (data?.patients)
                setPatients(data?.patients);
        } catch (error) {
            console.error('Error fetching patients data:', error);
        }
    };

    const fetchAdmissionDataById = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/admissions/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                }
            });
            const apiResById: AdmissionDataById = await response.json();
            if (apiResById.data) {
                const detailsById = apiResById.data;
                if (detailsById != null) {
                    const editObj = {
                        admission_date: detailsById?.admission_date,
                        discharge_date: detailsById?.discharge_date,
                        dignostic: detailsById?.dignostic,
                        admission_status: detailsById?.admission_status,
                        staff_id: loginData?.status?.data?.id,
                        room_id: detailsById?.room_id,
                        patient_id: detailsById?.patient_id,
                    };
                    setFormData(editObj);
                }
            }
        } catch (error) {
            console.error('Error fetching rooms data:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mode === 'add') handleAdd();
        if (mode === 'edit') handleEdit();
    };

    const handleAdd = async () => {
        try {
            const requestBody = {
                "admission": formData
            }
            const responseForUser = await fetch('http://localhost:3000/admissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(requestBody),
            });
            const dataForUsers = await responseForUser.json();
            onSuccess(dataForUsers);
            toast.success('Room Added successful!');
            onClose();
        }
        catch (error) {
            console.error('Error adding Patient:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const requestBody = {
                "admission": formData
            }
            const responseForUser = await fetch(`http://localhost:3000/admissions/${rowData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(requestBody),
            });
            const dataForUsers = await responseForUser.json();
            onSuccess(dataForUsers);
            toast.success('Admission Added successful!');
            onClose();
        }
        catch (error) {
            console.error('Error adding Patient:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8 text-center'>
                        <h2>{mode === 'add' ? 'Add' : 'Update'} Admission</h2>
                    </div>
                    <div className='col-2'>
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="admission_date" value={formData?.admission_date} onChange={handleChange} placeholder="Admission Date" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="discharge_date" value={formData?.discharge_date} onChange={handleChange} placeholder="Discharge Date" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="dignostic" value={formData?.dignostic} onChange={handleChange} placeholder="Diagnostic" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="admission_status" value={formData?.admission_status} onChange={handleChange} placeholder="Admission Status" />
                    </div>
                    <div className="input-group">
                        <select name="room_id" value={formData?.room_id} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                            <option value="">Select Room</option>
                            {rooms && rooms.length > 0 && rooms.map((room) => (
                                <option key={room.id} value={room.id}>{room?.room_type}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select name="patient_id" value={formData?.patient_id} onChange={handleChange} style={{ width: '100%', padding: '8px' }}>
                            <option value="">Select Patient</option>
                            {patients?.map((patient) => (
                                <option key={patient.id} value={patient.id}>{patient?.first_name + " " + patient?.last_name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                toastStyle={{ width: '400px' }}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            ></ToastContainer>
        </div>
    );
};

export default EnrollAdmission;
