import { useEffect, useState } from 'react';
import '../../Styles/sideBar.css';
import { AdminMenu, MenuItem,StaffMenu } from '../../Utils/Constants';
import { AdminLogin } from '../../Utils/ApiRes';

interface ComponentBProps {
    handleRouteFromApp: (item: MenuItem) => void;
    loginData: AdminLogin | null;
}

const Sidebar: React.FC<ComponentBProps> = ({ handleRouteFromApp, loginData }) => {
    const [selectedItem, setSelectedItem] = useState(AdminMenu[0]);
    const [renderMenu, setRenderedMenu] = useState(AdminMenu);


    // useEffect(()=>{
    //     if(loginData?.status.role == 'admin'){
    //         setSelectedItem(AdminMenu[0])
    //         setRenderedMenu(AdminMenu);
    //     }
    //     if(loginData?.status.role == 'staff'){
    //         setSelectedItem(StaffMenu[0])
    //         setRenderedMenu(StaffMenu);
    //     }
    // },[])

    useEffect(() => {
        if (loginData?.status.role === 'admin') {
          setSelectedItem(AdminMenu[0]);
          setRenderedMenu(AdminMenu);
        } else if (loginData?.status.role === 'staff') {
          setSelectedItem(StaffMenu[0]);
          setRenderedMenu(StaffMenu);
        } else {
          // Handle other roles or no role scenario if needed
        }
      }, [loginData?.status.role, AdminMenu, StaffMenu]);
      

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