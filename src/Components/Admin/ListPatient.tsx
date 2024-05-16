import { ToastContainer, toast } from "react-toastify";
import CommonTable from "../../Common/CommonTable";
import { useEffect, useState } from "react";
import { StaffDetailsColumn } from "../../Utils/Column";
import EnrollPatient from "./EnrollPatient";
import '../../Styles/ListStaff.css'
import { SelectedRow } from "../../Utils/Constants";

const getPatientDetails = async () => {
    let PatientDetails;
    try {
        const response = await fetch('http://localhost:3000/user_details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') as string
            }
        });

        if (response.ok) {
            PatientDetails = await response.json();
            toast.success('Data fetch successful!');
        } else {
            toast.error('Something went wrong');
        }
    } catch (error) {
        console.error('Error during loading:', error);
        toast.error('Something went wrong');
    }
    return PatientDetails;
}


const deletePatientDetails = async (userId: number) => {
    let PatientDetails;
    try {
        const response = await fetch(`http://localhost:3000/user_details/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token') as string
            }
        });

        if (response.ok) {
            PatientDetails = await response.json();
            toast.success('Data fetch successful!');
        } else {
            toast.error('Something went wrong');
        }
    } catch (error) {
        console.error('Error during loading:', error);
        toast.error('Something went wrong');
    }
    return PatientDetails;
}

const ListPatient = () => {
    const [PatientDetails, setPatientDetails] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState('add');
    const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);



    useEffect(() => {
        getPatientDetails().then((resp: any) => {
            setPatientDetails(resp.patients)
            setIsLoading(false);
        })
    }, [])

    const handleSuccess = (newPatient: any[]) => {
        getPatientDetails().then((resp: any) => {
            setPatientDetails(resp.patients)
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
                deletePatientDetails(selectedRow?.user_id).then(() => {
                    setIsLoading(true);
                    getPatientDetails().then((resp: any) => {
                        setPatientDetails(resp.Patient)
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
                    <EnrollPatient onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
                ) : (
                    <>
                        <div className="row m-2">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <h2>Patient Details</h2>
                            </div>
                            <div className="col-md-4">
                                <button style={{ float: 'right' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Patient</button>
                            </div>
                        </div>
                        <div className="row m-2">
                            <CommonTable data={PatientDetails} columns={StaffDetailsColumn} handleEdit={handleEdit} handleDelete={handleDelete} />
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

export default ListPatient;
