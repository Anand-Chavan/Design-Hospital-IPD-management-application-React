// src/components/Admin/ManageRooms.js

import React, { useEffect, useState } from "react";
import generateDummyRooms from "../../Utils/Schema";
import '../../Styles/Room.css'
import CommonTable from "../../Common/CommonTable";
import { RoomDetailsColumn } from "../../Utils/Column";
import { toast } from "react-toastify";

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
      toast.success('Data fetch successful!');
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return roomDetails;
}

const ManageRooms = () => {
  const [roomDetails, setRoomDetails] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    getRoomDetails().then((resp: any) => {
      console.log(resp.data)
      setRoomDetails(resp.data)
      setIsLoading(false);
    })
  }, [])

  // const data = React.useMemo(() => generateDummyRooms(100), []);
  return <CommonTable data={roomDetails} columns={RoomDetailsColumn} />;
};

export default ManageRooms;
