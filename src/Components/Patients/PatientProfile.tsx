import { useState, useEffect } from 'react';
import '../../Styles/PatientProfile.css'; // Import CSS file for styling
import { UserDetails } from '../../Utils/interface';
import { getUserDetailsById } from '../../Utils/GetUserDetailsById';
import { FaPhone, FaBirthdayCake, FaGenderless } from 'react-icons/fa'; // Import icons

const PatientProfile = () => {
  const [patientData, setPatientData] = useState<UserDetails>({
    id: 1,
    first_name: 'Anand',
    last_name: 'Chavan',
    date_of_birth: '1998-09-23',
    gender: 'Male',
    phone_no: '9689091503',
    created_at: '2024-05-13T06:13:13.373Z',
    updated_at: '2024-05-13T06:13:13.373Z',
    role_id: 1,
    user_id: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await getUserDetailsById(22);
        setPatientData(response);
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
        <div>loading....</div>
      ) : (
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="profile-picture"
            />
            <h2>{patientData?.first_name + ' ' + patientData?.last_name}</h2>
          </div>
          <div className="profile-details">
            <p>
              <FaBirthdayCake /> <strong>DOB:</strong> {patientData?.date_of_birth}
            </p>
            <p>
              <FaPhone /> <strong>Phone:</strong> {patientData?.phone_no}
            </p>
            <p>
              <FaGenderless /> <strong>Gender:</strong> {patientData?.gender}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
