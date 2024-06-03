import React, { useEffect, useState } from 'react';
import '../../Styles/ListStaff.css';
import { ToastContainer, toast } from 'react-toastify';
import CommonTable from '../../Common/CommonTable';
import { AdmissionDetailsColumn, RoomDetailsColumn } from '../../Utils/Column';
import { SelectedRow } from '../../Utils/Constants';
import { AdminLogin } from '../../Utils/ApiRes';
import EnrollAdmission from './EnrollAdmission';
import { AdmissionData, AdmissionDetail, InvoiceData } from '../../Utils/interface';
import InvoicePopup from './InvoicePopup';
import TreatmentForm from './TreatmentForm';

// Sample object structure for admission
const admissionObj = {
  admission_date: 'Unknown Type: date',
  discharge_date: 'Unknown Type: date',
  dignostic: 'string',
  admission_status: 'string',
  staff_id: 0,
  room_id: 0,
  patient_id: 0,
};

const downloadInvoiceAPI = async (id: number) => {
  let responseFromApi!: InvoiceData;
  try {
    const response = await fetch(`http://localhost:3000/admissions/invoice/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') as string,
      },
    });

    if (response.ok) {
      responseFromApi = await response.json();
      // toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return responseFromApi
};

const getAdmissionDetails = async () => {
  let admissionDetails: AdmissionDetail[] = [];
  try {
    const response = await fetch('http://localhost:3000/admissions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') as string,
      },
    });

    if (response.ok) {
      let responseFromApi: AdmissionData = await response.json();
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

const deleteAdmissionDetails = async (admissionId: number) => {
  let admissionDetails;
  try {
    const response = await fetch(`http://localhost:3000/admissions/${admissionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') as string,
      },
    });

    if (response.ok) {
      admissionDetails = await response.json();
      toast.success('Admission deleted successfully!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    toast.error('Something went wrong');
  }
  return admissionDetails;
};

const ManageAdmissions = () => {
  const sampleData: InvoiceData = {
    room_charges: {
      room_type: "Special",
      charges: 100,
      no_of_days: 361950,
      room_total: 36195000,
    },
    medicine_charges: [],
    total: 36195000,
  };
  const [admissionDetails, setAdmissionDetails] = useState<AdmissionDetail[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);
  const [loginData, setLoginData] = useState<AdminLogin | null>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(sampleData);
  const [showPopup, setShowPopup] = useState(false);


  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

  useEffect(() => {
    const fetchAdmissionDetails = async () => {
      try {
        const resp = await getAdmissionDetails();
        setAdmissionDetails(resp);
        setLoginData(JSON.parse(localStorage.getItem('loginData') as string));
      } catch (error) {
        console.error('Error fetching admission details:', error);
        toast.error('Failed to fetch admission details'); // Add a toast for error handling
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdmissionDetails();
  }, []); // Empty dependency array for componentDidMount-like behavior

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

  const downloadInvoice = async (row: SelectedRow | undefined) => {
    if (row) {
      let data = null as InvoiceData | null;
      data = await downloadInvoiceAPI(row?.id)
      if (data != null)
        setInvoiceData(data);
      setShowInvoice(true);
    }
  };

  const showTretment = (row: any) => {
    setSelectedRow(row)
    setShowPopup(true);
  }

  const handleDelete = (row: SelectedRow | undefined) => {
    if (row) {
      setSelectedRow(row);
      if (selectedRow?.id) {
        deleteAdmissionDetails(selectedRow.id).then(() => {
          setIsLoading(true);
          getAdmissionDetails().then((resp: any) => {
            setAdmissionDetails(resp);
            setIsLoading(false);
          });
        });
      }
    }
  };

  return (
    <div>
      {!isLoading ? (
        isDialogOpen ? (
          <EnrollAdmission onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
        ) : (
          <>
            <div className="row m-2">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h2>Admission Details</h2>
              </div>
              <div className="col-md-4">
                <button style={{ float: 'right' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Admission</button>
              </div>
            </div>
            <div className="row m-2">
              {loginData?.status.role == 'staff' ? (
                <CommonTable
                  data={admissionDetails}
                  columns={AdmissionDetailsColumn} // Change this to AdmissionDetailsColumn if needed
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  downloadInvoice={downloadInvoice}
                  showTretment={showTretment}
                />
              ) : (
                <CommonTable
                  data={admissionDetails}
                  columns={AdmissionDetailsColumn} // Change this to AdmissionDetailsColumn if needed
                />
              )}

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
      {showInvoice && (
        <InvoicePopup invoiceData={invoiceData} onClose={handleCloseInvoice} />
      )}
      {showPopup && <TreatmentForm selectedRow={selectedRow}  onClose={() => setShowPopup(false)} />}

    </div>
  );
};

export default ManageAdmissions;
