export const AdminMenu = [
  { name: 'Manage Rooms', key: 'room_details', path: 'room_details', component: 'ManageRooms' },
  { name: 'Staff Details', key: 'staff_details', path: 'staff_details', component: 'ListStaff' },
];

export const StaffMenu = [
  { name: 'Patient Details', key: 'patient_details', path: 'patient_details', component: 'ListPatient' },
  { name: 'Room Details ', key: 'room_staff', path: 'room_staff', component: 'ManageRooms' },
  { name: 'Admission Details ', key: 'manage_admission', path: 'manage_admission', component: 'ManageAdmissions' },
  { name: 'Medicine Details ', key: 'medicine_details', path: 'medicine_details', component: 'ListMedicines' },

];

export const PatientMenu = [
  { name: 'Profile Profile', key: 'patient_details', path: 'patient_details', component: 'PatientProfile' },
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

