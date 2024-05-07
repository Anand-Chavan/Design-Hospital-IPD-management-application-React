import '../../Styles/sideBar.css';
import { Nav } from 'react-bootstrap';
import { AdminMenu } from '../../Utils/constants';



const Sidebar = () => {
    return(
        <Nav defaultActiveKey="/home" className="flex-column">
            {AdminMenu.map((link, index) => (
                <Nav.Link key={index} href={link.path}>{link.name}</Nav.Link>
            ))}
      </Nav>
    )
};
  
  export default Sidebar;