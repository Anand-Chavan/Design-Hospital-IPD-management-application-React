import React, { useEffect, useState } from 'react';
import '../../Styles/Modal.css';
import { ToastContainer, toast } from 'react-toastify';
import '../../Styles/Room.css';


interface EnrollRoomProps {
    onClose: () => void;
    onSuccess: (newRoom: any) => void;
    mode: string;
    rowData?: any;
    roomData?: {
        room_type: string;
        description: string;
        charges: number;
        capacity: number;
    };
}

interface RoomData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    phone_no: string;
    email: string;
    password: string;
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

const EnrollRoom: React.FC<EnrollRoomProps> = ({ onClose, onSuccess, mode, rowData }) => {
    const [formData, setFormData] = useState<RoomData & {
        room_type: string;
        description: string;
        charges: number;
        capacity: number;
    }>({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        gender: '',
        phone_no: '',
        email: '',
        password: '',
        room_type: '',
        description: '',
        charges: 0,
        capacity: 0,
    });

    useEffect(() => {
        if (mode === 'edit') {
            const editObj = {
                first_name: rowData?.first_name,
                last_name: rowData?.last_name,
                date_of_birth: rowData?.date_of_birth,
                gender: rowData?.gender,
                phone_no: rowData?.phone_no,
                email: '',
                password: '',
                room_type: rowData?.room_type || '',
                description: rowData?.description || '',
                charges: rowData?.charges || 0,
                capacity: rowData?.capacity || 0,
            };
            setFormData(editObj);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
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
                room: {
                    room_type: formData.room_type,
                    description: formData.description,
                    charges: formData.charges,
                    capacity: formData.capacity,
                },
            };

            const responseForUser = await fetch('http://localhost:3000/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(requestBody),
            });
            const dataForUsers = await responseForUser.json();
            if (dataForUsers?.status?.errors && dataForUsers?.status?.errors?.length > 0) {
                dataForUsers.status.errors.forEach((ele: string) => {
                    toast.success(ele)
                })
            }
            onSuccess(dataForUsers);
            toast.success('Room Added successful!');
            onClose();

        } catch (error) {
            console.error('Error adding Room:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const requestBody = {
                room: {
                    room_type: formData.room_type,
                    description: formData.description,
                    charges: formData.charges,
                    capacity: formData.capacity,
                },
            };
            const responseForUserDetails = await fetch(`http://localhost:3000/rooms/${rowData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },

                body: JSON.stringify(requestBody),
            });
            onSuccess(responseForUserDetails);
            toast.success('User Updated successful!');
            onClose();
        } catch (error) {
            console.error('Error updating Room:', error);
        }
    };

    return (
        <div className="modal" style={{display:'block'}}>
            <div className="modal-content">
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8 text-center'>
                        <h2>{mode === 'add' ? 'Add' : 'Update'} Room</h2>
                    </div>
                    <div className='col-2'>
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="room_type" value={formData.room_type} onChange={handleChange} placeholder="Room Type" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                    </div>
                    <div className="input-group">
                        <input type="number" name="charges" value={formData.charges} onChange={handleChange} placeholder="Charges" />
                    </div>
                    <div className="input-group">
                        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" />
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

export default EnrollRoom;
