import { ToastContainer, toast } from "react-toastify";
import CommonTable from "../../Common/CommonTable";
import { useEffect, useState } from "react";
import { StaffDetailsColumn } from "../../Utils/Column";
import EnrollStaff from "./EnrollStaff";
import '../../Styles/ListStaff.css'
import { SelectedRow } from "../../Utils/Constants";



const getStaffDetails = async () => {
  let staffDetails;
  try {
    const response = await fetch('http://localhost:3000/user_details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') as string
      }
    });

    if (response.ok) {
      staffDetails = await response.json();
      toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return staffDetails;
}


const deleteStaffDetails = async (userId: number) => {
  let staffDetails;
  try {
    const response = await fetch(`http://localhost:3000/user_details/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') as string
      }
    });

    if (response.ok) {
      staffDetails = await response.json();
      toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return staffDetails;
}

const ListStaff = () => {
  const [staffDetails, setStaffDetails] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);


  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const resp = await getStaffDetails();
        setStaffDetails(resp.staff);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setIsLoading(false);
      }
    };
    fetchStaffDetails();
  }, []);

  const handleSuccess = (newStaff: any[]) => {
    getStaffDetails().then((resp: any) => {
      setStaffDetails(resp.staff)
      setIsLoading(false);
      toast.success('User Updated successful!');
    })
  };

  const handleEdit = (row: SelectedRow | undefined) => {
    setMode('edit')
    setIsDialogOpen(true)
    console.log(row, mode)
    if (row)
      setSelectedRow(row)
  }

  const handleDelete = (row: SelectedRow | undefined) => {
    if (row != undefined) {
      setSelectedRow(row);
      console.log(row)
      if (selectedRow?.user_id != undefined) {
        console.log(selectedRow)
        deleteStaffDetails(selectedRow?.user_id).then(() => {
          setIsLoading(true);
          getStaffDetails().then((resp: any) => {
            setStaffDetails(resp.staff)
            setIsLoading(false);
          })
        })
      }
    }
  }

  return (
    <div>
      {!isLoading ? (
        isDialogOpen ? (
          <EnrollStaff onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
        ) : (
          <>
            <div className="row m-2">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h2>Staff Details</h2>
              </div>
              <div className="col-md-4">
                <button style={{ float: 'right' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Staff</button>
              </div>
            </div>
            <div className="row m-2">
              <CommonTable data={staffDetails} columns={StaffDetailsColumn} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          </>
        )
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <ToastContainer position="top-left"
        autoClose={5000}
        toastStyle={{ width: '400px' }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"></ToastContainer>
    </div>

  )
};

export default ListStaff;
