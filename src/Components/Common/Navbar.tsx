import '../../Styles/navBar.css';
import { Navbar, Container } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';


const Header = () => {
    return (
        <Navbar style={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
            <Container style={{ maxWidth: '100%' }}>
                <Navbar.Brand href="#home" style={{ marginRight: 'auto',color:'white'}}>Josh Hospital Managment System</Navbar.Brand>
                <div className="d-flex align-items-center">
                    <span className="mr-3">Admin</span>
                    <BiLogOut className="logout-icon" />
                </div>
            </Container>
        </Navbar>
    )
};

export default Header;