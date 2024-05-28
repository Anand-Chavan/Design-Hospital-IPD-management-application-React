export const StaffDetailsColumn = [
    { Header: 'ID', accessor: 'id', dataType: 'string' },
    { Header: 'First Name', accessor: 'first_name', dataType: 'string' },
    { Header: 'Last Name', accessor: 'last_name', dataType: 'string' },
    { Header: 'DOB', accessor: 'date_of_birth', dataType: 'string' },
    { Header: 'Gender', accessor: 'gender', dataType: 'string' },
    { Header: 'Phone', accessor: 'phone_no', dataType: 'string' },
    { Header: 'Created At', accessor: 'created_at', dataType: 'date' },
    { Header: 'Updated At', accessor: 'updated_at', dataType: 'date' }
];

export const RoomDetailsColumn = [
    { Header: 'ID', accessor: 'id', dataType: 'string' },
    { Header: 'Room Type', accessor: 'room_type', dataType: 'string' },
    { Header: 'Description', accessor: 'description', dataType: 'string' },
    { Header: 'Charges', accessor: 'charges', dataType: 'string' },
    { Header: 'Capacity', accessor: 'capacity', dataType: 'string' },
    { Header: 'Created At', accessor: 'created_at', dataType: 'date' },
    { Header: 'Updated At', accessor: 'updated_at', dataType: 'date' },
];

export const AdmissionDetailsColumn = [
    { Header: 'ID', accessor: 'id', dataType: 'string' },
    { Header: 'Patient', accessor: 'patient', dataType: 'string' },
    { Header: 'Staff', accessor: 'staff', dataType: 'string' },
    { Header: 'Room', accessor: 'room', dataType: 'string' },
    { Header: 'Diagnostic', accessor: 'dignostic', dataType: 'string' },
    { Header: 'Admission Date', accessor: 'admission_date', dataType: 'date' },
];

export const MedicineDetailsColumn = [
    { Header: 'ID', accessor: 'id', dataType: 'string' },
    { Header: 'Name', accessor: 'name', dataType: 'string' },
    { Header: 'Price', accessor: 'price', dataType: 'string' },
    { Header: 'Created At', accessor: 'created_at', dataType: 'date' },
    { Header: 'Updated At', accessor: 'updated_at', dataType: 'date' },
];
