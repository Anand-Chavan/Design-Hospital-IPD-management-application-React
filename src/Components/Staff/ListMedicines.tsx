import React, { useEffect, useState } from 'react';
import '../../Styles/ListStaff.css';
import { ToastContainer, toast } from 'react-toastify';
import CommonTable from '../../Common/CommonTable';
import { MedicineDetailsColumn } from '../../Utils/Column';
import { SelectedRow } from '../../Utils/Constants';
import { MedicineAPIData, MedicineData } from '../../Utils/interface';
import AddMedicine from './AddMedicine';

// Sample object structure for medicine
const medicineObj = {
  name: 'string',
  price: 'Unknown Type: float',
};



const getAdmissionDetails = async () => {
  let admissionDetails: MedicineData[] = [];
  try {
    const response = await fetch('http://localhost:3000/medicines', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') as string,
      },
    });

    if (response.ok) {
      let responseFromApi: MedicineAPIData = await response.json();
      admissionDetails = responseFromApi.data;
      // toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return admissionDetails;
};


const ListMedicines = () => {
  const [admissionDetails, setAdmissionDetails] = useState<MedicineData[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);


  useEffect(() => {
    const fetchAdmissionDetails = async () => {
      try {
        const resp = await getAdmissionDetails();
        setAdmissionDetails(resp);
      } catch (error) {
        console.error('Error fetching admission details:', error);
        toast.error('Failed to fetch admission details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmissionDetails();
  }, []);

  const handleSuccess = (newAdmission: any[]) => {
    getAdmissionDetails().then((resp: any) => {
      setAdmissionDetails(resp);
      setIsLoading(false);
      toast.success('Admission added/updated successfully!');
    });
  };

  const handleEdit = (row: SelectedRow | undefined) => {
    setMode('edit');
    setIsDialogOpen(true);
    if (row) setSelectedRow(row);
  };


  return (
    <div>
      {!isLoading ? (
        isDialogOpen ? (
          <AddMedicine onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
        ) : (
          <>
            <div className="row m-2">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h2>Medicines Details</h2>
              </div>
              <div className="col-md-4">
                <button style={{ float: 'right',width:'140px' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Medicines</button>
              </div>
            </div>
            <div className="row m-2">
              <CommonTable
                data={admissionDetails}
                columns={MedicineDetailsColumn} // Change this to AdmissionDetailsColumn if needed
                handleEdit={handleEdit}
              />
            </div>
          </>
        )
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
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

export default ListMedicines;
