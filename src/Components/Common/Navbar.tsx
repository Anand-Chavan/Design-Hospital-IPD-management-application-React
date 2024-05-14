import '../../Styles/navBar.css';
import { Navbar, Container } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import { AdminLogin } from '../../Utils/ApiRes';

interface ComponentBProps {
    handleLogout: () => void;
    loginData: AdminLogin | null;
}

const Header: React.FC<ComponentBProps> = ({ handleLogout, loginData }) => {
    const handleLogoutButon = () =>{
        handleLogout()
    }
    return (
        <Navbar style={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
            <Container style={{ maxWidth: '100%' }}>
                <Navbar.Brand href="#home" style={{ marginRight: 'auto', color: 'white' }}>Josh Hospital Managment System</Navbar.Brand>
                <div className="d-flex align-items-center" style={{ textTransform: 'capitalize' }}>
                    <span className="mr-3" >{loginData?.status.role}</span>
                    <BiLogOut onClick={handleLogoutButon} className="logout-icon cp ml-4" />
                </div>
            </Container>
        </Navbar>
    )
};

export default Header;