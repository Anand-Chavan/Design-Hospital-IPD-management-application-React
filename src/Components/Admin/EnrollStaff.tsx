import React, { useState } from 'react';
import '../../Styles/Modal.css'; // Import your CSS file


interface EnrollStaffProps {
  onClose: () => void;
  onAddSuccess: (newStaff: any) => void;
}

interface StaffData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_no: string;
  email: string;
  password: string;
}

const EnrollStaff: React.FC<EnrollStaffProps> = ({ onClose, onAddSuccess }) => {
  const [formData, setFormData] = useState<StaffData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone_no: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('your-api-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      onAddSuccess(data);
      onClose();
    } catch (error) {
      console.error('Error adding staff:', error);
    }
  };

  return (

    <div className="modal" style={{ display: 'block' }}>
      <form onSubmit={handleSubmit}>
        <div className="modal-content">
          <div className='row'>
            <div className='col-4'>
            </div>
            <div className='col-4 text-center'>
              <h2>Add Staff</h2>
            </div>
            <div className='col-4'>
              <span className="close" onClick={onClose}>&times;</span>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
            </div>
            <div className="input-group">
              <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
            </div>
            <div className="input-group">
              <input type="text" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} placeholder="Date of Birth" />
            </div>
            <div className="input-group">
              <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
            </div>
            <div className="input-group">
              <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Phone Number" />
            </div>
            <div className="input-group">
              <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            </div>
            <div className="input-group">
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default EnrollStaff;
