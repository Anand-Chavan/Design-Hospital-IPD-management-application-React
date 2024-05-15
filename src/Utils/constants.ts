export const AdminMenu = [
  {name:'Manage Rooms',key:'room_details',path:'room_details',component:'ManageRooms'},
  {name:'Staff Details',key:'staff_details',path:'staff_details',component:'ListStaff'},
];

export const StaffMenu = [
  {name:'Patient Details',key:'patient_staff',path:'patient_staff',component:''},
  {name:'Room Details ',key:'room_staff',path:'room_staff',component:''},
];

export const PatientMenu = [
  {name:'Details',key:'enroll_staff',path:'enroll_staff',component:''},
];

export interface MenuItem {
  name: string;
  key: string;
  path: string;
  component: string;
}

export interface SelectedRow {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  phone_no: string;
  role_id: number;
  updated_at: string;
  user_id?: number;
}

