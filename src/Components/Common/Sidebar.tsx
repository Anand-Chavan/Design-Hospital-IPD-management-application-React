import '../../Styles/sideBar.css';
import { AdminMenu } from '../../Utils/constants';


const Sidebar = ({handleRouteFromApp}:any) => {

    const handleRoute = (item:any) => {
        console.log("Item",item)
        handleRouteFromApp(item)
    }

    return (
        <div className="sidebar">
            <ul style={{ listStyleType: 'none' }}>
                {AdminMenu.map((link, index) => (
                    <li key={index} style={{ padding: '10px' }} onClick={() => handleRoute(link)}>{link.name}</li>
                ))}
            </ul>
        </div>
    )
};

export default Sidebar;