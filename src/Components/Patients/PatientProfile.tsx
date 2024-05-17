import React, { useState, useEffect } from 'react';
import '../../Styles/PatientProfile.css'; // Import CSS file for styling
import { UserDetails } from '../../Utils/interface';
import { AdminLogin } from '../../Utils/ApiRes';



const PatientProfile = () => {
  const [patientData, setPatientData] = useState<UserDetails>({
      "id": 1,
      "first_name": "Anand",
      "last_name": "Chavan",
      "date_of_birth": "1998-09-23",
      "gender": "Male",
      "phone_no": "9689091503",
      "created_at": "2024-05-13T06:13:13.373Z",
      "updated_at": "2024-05-13T06:13:13.373Z",
      "role_id": 1,
      "user_id": 1
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch patient details from API
    const fetchPatientDetails = async () => {
      try {
        const loginData:AdminLogin = JSON.parse(localStorage.getItem('loginData') as string);
        const response = await fetch(`http://localhost:3000/user_details/${(loginData?.status?.data?.id)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }
        const data = await response.json();
        setPatientData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, []);

  return (
    <div className="patient-profile">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Patient Profile</h2>
          <p><strong>Name:</strong> {patientData?.first_name+' '+patientData.last_name}</p>
          <p><strong>DOB:</strong> {patientData?.date_of_birth}</p>
          <p><strong>Phone:</strong> {patientData?.phone_no}</p>
          <p><strong>Gender:</strong> {patientData?.gender}</p>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
