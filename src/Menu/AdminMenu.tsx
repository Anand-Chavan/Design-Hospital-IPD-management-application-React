import React from 'react';
import { LazyExoticComponent, ComponentType } from 'react';

interface Components {
    [key: string]: LazyExoticComponent<ComponentType<any>>;
}

const components: Components = {
    ManageRooms: React.lazy(() => import('../Components/Admin/ManageRooms')),
    ListStaff: React.lazy(() => import('../Components/Admin/ListStaff')),
};

export default components;

