export const StaffDetailsColumn = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'First Name', accessor: 'first_name' },
    { Header: 'Last Name', accessor: 'last_name' },
    { Header: 'DOB', accessor: 'date_of_birth' },
    { Header: 'Gender', accessor: 'gender' },
    { Header: 'Phone', accessor: 'phone_no' },
    { Header: 'Created At', accessor: 'created_at' },
    { Header: 'Updated At', accessor: 'updated_at' }
];

export const RoomDetailsColumn = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Room Type', accessor: 'room_type' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Charges', accessor: 'charges' },
    { Header: 'Capacity', accessor: 'capacity' },
    { Header: 'Created At', accessor: 'created_at' },
    { Header: 'Updated At', accessor: 'updated_at' },
];

export const AdmissionDetailsColumn = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Patient', accessor: 'patient' },
    { Header: 'Staff', accessor: 'staff' },
    { Header: 'Room', accessor: 'room' },
    { Header: 'Diagnostic', accessor: 'dignostic' },
    { Header: 'Admission Date', accessor: 'admission_date' },
];

export const MedicineDetailsColumn = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Created At', accessor: 'created_at' },
    { Header: 'Updated At', accessor: 'updated_at' },
  ]
