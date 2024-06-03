import React from 'react';
import { LazyExoticComponent, ComponentType } from 'react';

interface Components {
    [key: string]: LazyExoticComponent<ComponentType<any>>;
}

const components: Components = {
    ManageRooms: React.lazy(() => import('../Components/Admin/ManageRooms')),
    ListStaff: React.lazy(() => import('../Components/Admin/ListStaff')),
    

    ListPatient: React.lazy(() => import('../Components/Admin/ListPatient')),
    ManageAdmissions: React.lazy(() => import('../Components/Staff/ManageAdmissions')),
    ListMedicines: React.lazy(() => import('../Components/Staff/ListMedicines')),

    PatientProfile: React.lazy(() => import('../Components/Patients/PatientProfile')),
};

export default components;

