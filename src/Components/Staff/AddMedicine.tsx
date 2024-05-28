import React, { useEffect, useState } from 'react';
import '../../Styles/Modal.css';
import { ToastContainer, toast } from 'react-toastify';
import '../../Styles/Room.css';

interface EnrollMedicineProps {
    onClose: () => void;
    onSuccess: (newMedicine: any) => void;
    mode: string;
    rowData?: any;
}

interface MedicineData {
    name: string;
    price: string;
}

interface ApiResponseForMedicines {
    status: {
        message: string;
        data: {
            id: number;
            name: string;
            price: string;
            created_at: string;
            updated_at: string;
            jti: string;
        };
        errors: [];
    };
}

const AddMedicine: React.FC<EnrollMedicineProps> = ({ onClose, onSuccess, mode, rowData }) => {
    const [formData, setFormData] = useState<MedicineData>({
        name: '',
        price: '',
    });

    useEffect(() => {
        if (mode === 'edit') {
            const editObj = {
                name: rowData?.name || '',
                price: rowData?.price || '',
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
                medicine: {
                    name: formData.name,
                    price: formData.price,
                },
            };

            const responseForMedicine = await fetch('http://localhost:3000/medicines', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(requestBody),
            });
            const dataForMedicine = await responseForMedicine.json();

            if (dataForMedicine?.status?.errors && dataForMedicine?.status?.errors?.length > 0) {
                dataForMedicine.status.errors.forEach((error: string) => {
                    toast.error(error);
                });
            }
            onSuccess(dataForMedicine);
            toast.success('Medicine added successfully!');
            onClose();
        } catch (error) {
            console.error('Error adding Medicine:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const requestBody = {
                medicine: {
                    name: formData.name,
                    price: formData.price,
                },
            };

            const responseForMedicineDetails = await fetch(`http://localhost:3000/medicines/${rowData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token') as string
                },
                body: JSON.stringify(requestBody),
            });
            onSuccess(responseForMedicineDetails);
            toast.success('Medicine updated successfully!');
            onClose();
        } catch (error) {
            console.error('Error updating Medicine:', error);
        }
    };

    return (
        <div className="modal" style={{display:'block'}}>
            <div className="modal-content">
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-8 text-center'>
                        <h2>{mode === 'add' ? 'Add' : 'Update'} Medicine</h2>
                    </div>
                    <div className='col-2'>
                        <span className="close" onClick={onClose}>&times;</span>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Medicine Name" />
                    </div>
                    <div className="input-group">
                        <input type="text" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
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

export default AddMedicine;
