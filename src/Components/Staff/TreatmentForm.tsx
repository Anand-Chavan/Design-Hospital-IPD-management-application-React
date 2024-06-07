import React, { useState, useEffect } from 'react';
import '../../Styles/TreatmentForm.css'
import { ToastContainer, toast } from 'react-toastify';

const TreatmentForm = ({ onClose, selectedRow }: any) => {
    const [medicines, setMedicines] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [selectedMedicine, setSelectedMedicine] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/medicines', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') as string
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch medicines');
                }
                return response.json();
            })
            .then(data => {
                setMedicines(data.data);
            })
            .catch(error => {
                console.error('Error fetching medicines:', error);
            });
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const treatmentData = {
            treatment: {
                quantity,
                admission_id: (selectedRow?.id), // Assuming this value comes from somewhere
                medicine_id: selectedMedicine,
            }
        };

        fetch('http://localhost:3000/treatments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') as string
            },
            body: JSON.stringify(treatmentData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to submit treatment');
                }
                toast.success("Treatement Added Successfully")
                // Close the popup after successful API call
                onClose();
            })
            .catch(error => {
                console.error('Error submitting treatment:', error);
            });
    };

    return (
        <div className="overlay">
            <div className="modal-treatment" style={{ display: 'block' }}>
                <div className="invoice-header">
                    <h2>Treatment</h2>
                    <button onClick={onClose}>X</button>
                </div>
                {/* <button className="close-btn" onClick={onClose}>X</button> */}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="text" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                    <label htmlFor="medicine">Medicine:</label>
                    <select id="medicine" value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
                        <option value="">Select Medicine</option>
                        {medicines.map((medicine: any) => (
                            <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                        ))}
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
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

export default TreatmentForm;
