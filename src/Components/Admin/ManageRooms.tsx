import React, { useState } from 'react';
import '../../Styles/ListStaff.css';
import { ToastContainer, toast } from 'react-toastify';
import CommonTable from '../../Common/CommonTable';
import { RoomDetailsColumn } from '../../Utils/Column';
import EnrollRoom from './EnrollRoom';
import { SelectedRow } from '../../Utils/Constants';
import '../../Styles/ListStaff.css'
import { RootState } from '../../Redux/Store';
import { useSelector } from 'react-redux';
import { useDeleteRoomMutation, useGetRoomsQuery } from '../../Redux/Slices/RoomApiSlices';


const ManageRooms = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mode, setMode] = useState('add');
  const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);
  const loginData: any = useSelector((state: RootState) => state.auth.user?.loginData);
  const [deleteRoom] = useDeleteRoomMutation();
  const { data: roomDetails, isLoading, refetch } = useGetRoomsQuery({});

  const handleSuccess = () => {
    refetch();
    toast.success('Room added/updated successfully!');
  };

  const handleEdit = (row: SelectedRow | undefined) => {
    setMode('edit');
    setIsDialogOpen(true);
    if (row) setSelectedRow(row);
  };

  const handleDelete = async (row: SelectedRow | undefined) => {
    if (row) {
      setSelectedRow(row);
      if (row?.id) {
        try {
          await deleteRoom(row.id).unwrap();
          refetch();
          toast.success('Room deleted successfully!');
        } catch (error) {
          console.error('Error during deletion:', error);
          toast.error('Something went wrong');
        }
      }
    }
  };

  const roomData = roomDetails?.data || [];
  const indexedRoomData = roomData.map((room:any, index:any) => ({ ...room, index }));


  return (
    <div>
      {!isLoading ? (
        isDialogOpen ? (
          <EnrollRoom onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
        ) : (
          <>
            <div className="row m-2">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <h2>Room Details</h2>
              </div>
              <div className="col-md-4">
                <button style={{ float: 'right' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Room</button>
              </div>
            </div>
            <div className="row m-4">
              {loginData?.role === 'admin' ? (
                <CommonTable
                  data={Array.isArray(indexedRoomData) ? indexedRoomData : []}
                  columns={RoomDetailsColumn}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ) : (
                <CommonTable
                  data={Array.isArray(indexedRoomData) ? indexedRoomData : []}
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
      />
    </div>
  );
};

export default ManageRooms;
