import { useEffect, useState } from 'react';
import '../../Styles/sideBar.css';
import { AdminMenu, MenuItem,PatientMenu,StaffMenu } from '../../Utils/Constants';
import { AdminLogin } from '../../Utils/ApiRes';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';

interface ComponentBProps {
    handleRouteFromApp: (item: MenuItem) => void;
}

const Sidebar: React.FC<ComponentBProps> = ({ handleRouteFromApp }) => {
    const [selectedItem, setSelectedItem] = useState(AdminMenu[0]);
    const [renderMenu, setRenderedMenu] = useState(AdminMenu);
    const loginData:any = useSelector((state: RootState) => {
        return state.auth.user?.loginData
    });

    useEffect(() => {
        if(loginData != undefined){
            if (loginData?.role === 'admin') {
                setSelectedItem(AdminMenu[0]);
                setRenderedMenu(AdminMenu);
            } else if (loginData?.role === 'staff') {
                setSelectedItem(StaffMenu[0]);
                setRenderedMenu(StaffMenu);
            } else {
                setSelectedItem(PatientMenu[0]);
                setRenderedMenu(PatientMenu);
                // Handle other roles or no role scenario if needed
            }
        }
    }, []);
      

    const handleRoute = (item:any) => {
        handleRouteFromApp(item)
        setSelectedItem(item);
    }

    return (
        <div className="sidebar">
            <ul style={{ listStyleType: 'none','padding': '0px'}}>
                {renderMenu.map((link, index) => (
                    <li key={index} style={{ padding: '7px',textAlign:'center',borderRadius:'10px',margin:'7px' }} className={selectedItem === link ? 'selected cp' : 'cp'} onClick={() => handleRoute(link)}>{link.name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Sidebar;