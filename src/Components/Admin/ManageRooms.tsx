// src/components/Admin/ManageRooms.js

import React from "react";
import generateDummyRooms from "../../Utils/Schema";
import '../../Styles/Room.css'
import CommonTable from "../../Utils/CommonTable";
import { RoomDetailsColumn } from "../../Utils/Column";


const ManageRooms = () => {
  const data = React.useMemo(() => generateDummyRooms(100), []);
  return <CommonTable data={data} columns={RoomDetailsColumn} />;
};

export default ManageRooms;
