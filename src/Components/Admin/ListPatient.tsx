import { ToastContainer, toast } from "react-toastify";
import CommonTable from "../../Common/CommonTable";
import { useEffect, useState } from "react";
import { StaffDetailsColumn } from "../../Utils/Column";
import EnrollPatient from "./EnrollPatient";
import '../../Styles/ListStaff.css'
import { SelectedRow } from "../../Utils/Constants";
import { FaSearch } from "react-icons/fa";


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
            // toast.success('Data fetch successful!');
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
            // toast.success('Data fetch successful!');
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
    const [originalPatientDetails, setOriginalPatientDetails] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState('add');
    const [selectedRow, setSelectedRow] = useState<SelectedRow | null>(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        getPatientDetails().then((resp: any) => {
            setPatientDetails(resp.patients);
            setOriginalPatientDetails(resp.patients)
            setIsLoading(false);
        })
    }, [])

    const handleSuccess = (newPatient: any[]) => {
        getPatientDetails().then((resp: any) => {
            setPatientDetails(resp.patients)
            setOriginalPatientDetails(resp.patients);
            setIsLoading(false);
            toast.success('User Updated successful!');
        })
    };

    const handleEdit = (row: SelectedRow | undefined) => {
        setMode('edit')
        setIsDialogOpen(true)
        if (row)
            setSelectedRow(row)
    }

    const handleDelete = (row: SelectedRow | undefined) => {
        if (row != undefined) {
            setSelectedRow(row);
            if (selectedRow?.user_id != undefined) {
                deletePatientDetails(selectedRow?.user_id).then(() => {
                    setIsLoading(true);
                    getPatientDetails().then((resp: any) => {
                        setPatientDetails(resp.Patient)
                        setOriginalPatientDetails(resp.Patient)
                        setIsLoading(false);
                    })
                })
            }
        }
    }

    const handleSearchInput = (event: any) => {
        setSearchTerm(event.target.value);
        if(event.target.value!=''){
            const filteredAndSortedData = originalPatientDetails
                .filter((item) =>
                    Object.values(item).some((value: any) =>
                        value.toString().toLowerCase().includes(event.target.value.toLowerCase())
                    )
                )
            setPatientDetails(filteredAndSortedData);
        }
        else{
            setPatientDetails(originalPatientDetails);
        }
    };

    return (
        <div>
            {!isLoading ? (
                isDialogOpen ? (
                    <EnrollPatient onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} mode={mode} rowData={selectedRow} />
                ) : (
                    <>
                        <div className="row m-2">
                            <div className="col-md-4">
                                {/* <div className="search-bar">
                                    <FaSearch className="search-icon" ></FaSearch>
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={handleSearchInput}
                                    />
                                </div> */}
                            </div>
                            <div className="col-md-4">
                                <h2>Patient Details</h2>
                            </div>
                            <div className="col-md-4">
                                <button style={{ float: 'right', width: '140px', marginTop: '5px ' }} onClick={() => { setIsDialogOpen(true); setMode('add'); }}>Add Patient</button>
                            </div>
                        </div>
                        <div className="row m-4">
                            <CommonTable data={PatientDetails} columns={StaffDetailsColumn} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </div>
                    </>
                )
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
            <ToastContainer position="top-right"
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
