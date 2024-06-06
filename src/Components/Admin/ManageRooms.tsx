import React, { useEffect, useState } from 'react';
import '../../Styles/ListStaff.css';
import { ToastContainer, toast } from 'react-toastify';
import CommonTable from '../../Common/CommonTable';
import { RoomDetailsColumn } from '../../Utils/Column';
import EnrollRoom from './EnrollRoom';
import { SelectedRow } from '../../Utils/Constants';
import '../../Styles/ListStaff.css'
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';


const getRoomDetails = async () => {
  let roomDetails;
  try {
    const response = await fetch('http://localhost:3000/rooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') as string
      }
    });

    if (response.ok) {
      roomDetails = await response.json();
      // toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return roomDetails;
}

const deleteRoomDetails = async (roomId: number) => {
  let roomDetails;
  try {
    const response = await fetch(`http://localhost:3000/rooms/${roomId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') as string
      }
    });

    if (response.ok) {
      roomDetails = await response.json();
      toast.success('Room deleted successfully!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    toast.error('Something went wrong');
  }
  return roomDetails;
}

const ManageRooms = () => {
  const [roomDetails, setRoomDetails] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);

  const [roomOriginlDetails, setOriginalRoomDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const loginData: any = useSelector((state: RootState) => {
    return state.auth.user?.loginData
  });


  useEffect(() => {
    if (roomDetails.length == 0) {
      const fetchRoomDetails = async () => {
        try {
          const resp = await getRoomDetails();
          setRoomDetails(resp.data);
          setOriginalRoomDetails(resp.data);
        } catch (error) {
          console.error('Error fetching room details:', error);
          toast.error('Failed to fetch room details');
        } finally {
          setIsLoading(false);
        }
      };
      fetchRoomDetails();
    }
  }, []);



  const handleSuccess = () => {
    getRoomDetails().then((resp: any) => {
      setRoomDetails(resp.data);
      setOriginalRoomDetails(resp.data);
      setIsLoading(false);
      toast.success('Room added/updated successfully!');
    })
  };

  const handleEdit = (row: SelectedRow | undefined) => {
    setMode('edit');
    setIsDialogOpen(true);
    if (row) setSelectedRow(row);
  }

  const handleDelete = (row: SelectedRow | undefined) => {
    if (row) {
      setSelectedRow(row);
      if (selectedRow?.id) {
        deleteRoomDetails(selectedRow.id).then(() => {
          setIsLoading(true);
          getRoomDetails().then((resp: any) => {
            setRoomDetails(resp.rooms);
            setOriginalRoomDetails(resp.rooms);
            setIsLoading(false);
          })
        })
      }
    }
  }

  const handleSearchInput = (event: any) => {
    setSearchTerm(event.target.value);
    if (event.target.value != '') {
      const filteredAndSortedData = roomOriginlDetails
        .filter((item) =>
          Object.values(item).some((value: any) =>
            value.toString().toLowerCase().includes(event.target.value.toLowerCase())
          )
        )
      setRoomDetails(filteredAndSortedData);
    }
    else {
      setRoomDetails(roomOriginlDetails);
    }
  };

  return (
    <div>
      {!isLoading ? (
        isDialogOpen ? (
          <EnrollRoom onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
        ) : (
          <>
            <div className="row m-2">
              <div className="col-md-4">
              </div>
              <div className="col-md-4">
                <h2>Room Details</h2>
              </div>
              <div className="col-md-4">
                <button style={{ float: 'right' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Room</button>
              </div>
            </div>
            <div className="row m-4">
              {loginData?.role == 'admin' ? (
                <CommonTable
                  data={roomDetails}
                  columns={RoomDetailsColumn}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ) : (
                <CommonTable
                  data={roomDetails}
                  columns={RoomDetailsColumn}
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
  )
};

export default ManageRooms;
