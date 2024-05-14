import { toast } from "react-toastify";
import CommonTable from "../../Utils/CommonTable";
import { useEffect, useState } from "react";
import { StaffDetailsColumn } from "../../Utils/Column";
import EnrollStaff from "./EnrollStaff";


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

const ListStaff = () => {
  const [staffDetails, setStaffDetails] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    getStaffDetails().then((resp: any) => {
      setStaffDetails(resp.staff)
    })
  }, [])

  const handleAddSuccess = (newStaff: any[]) => {
    // setStaffList([...staffDetails, newStaff]);
  };

  return (
    <div>
      {isDialogOpen ? (
        <EnrollStaff
          onClose={() => setIsDialogOpen(false)}
          onAddSuccess={handleAddSuccess}
        />
      ) : (
        <>
          <div className="row m-2">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h2>Staff Details</h2>
            </div>
            <div className="col-md-4">
              <button style={{ float: 'right' }} onClick={() => setIsDialogOpen(true)}>Add Staff</button>
            </div>
          </div>
          <div className="row m-2">
            <CommonTable data={staffDetails} columns={StaffDetailsColumn} />
          </div>
        </>
      )}
    </div>

  )
};

export default ListStaff;
