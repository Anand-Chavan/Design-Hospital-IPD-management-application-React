import '../../Styles/navBar.css';
import { Navbar, Container } from 'react-bootstrap';
import { BiLogOut } from 'react-icons/bi';
import { AdminLogin } from '../../Utils/ApiRes';
import { UserDetails } from '../../Utils/interface';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Slices/AuthSlice';

interface ComponentBProps {
    handleLogout: () => void;
    loginData: AdminLogin | null;
    loadInUserData:UserDetails | null
}

const Header: React.FC<ComponentBProps> = ({ handleLogout, loginData,loadInUserData }) => {
    const dispatch = useDispatch();
    const handleLogoutButon = () =>{
        handleLogout();
        dispatch(logout());
    }
    return (
        <Navbar style={{ backgroundColor: '#1976d2', color: '#ffffff' }}>
            <Container style={{ maxWidth: '100%' }}>
                <Navbar.Brand href="#home" style={{ marginRight: 'auto', color: 'white' }}>Josh Hospital Managment System</Navbar.Brand>
                <div className="d-flex align-items-center f20" style={{ textTransform: 'capitalize' }}>
                    <div className="mr-2" >{ loadInUserData?.first_name+' '+loadInUserData?.last_name+' ('+loginData?.status.role+')'}</div>
                    <BiLogOut onClick={handleLogoutButon} className="logout-icon cp ml-5" />
                </div>
            </Container>
        </Navbar>
    )
};

export default Header;