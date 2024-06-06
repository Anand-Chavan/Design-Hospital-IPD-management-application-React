import { Suspense, useEffect, useState } from "react";
import Header from "../Components/Common/Navbar";
import Sidebar from "../Components/Common/Sidebar";
import components from '../Menu/AdminMenu';
import { MenuItem } from "../Utils/Constants";
import { UserDetails } from "../Utils/interface";
import { AdminMenu, StaffMenu, PatientMenu } from '../Utils/Constants';
import Footer from "../Components/Common/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../Redux/Store";

interface AuthenticatedProps {
    loadInUserData: UserDetails;
  }


const Authenticated = ({ loadInUserData }: AuthenticatedProps) => {
    const [content, setContent] = useState<string>('');
    const loginData:any = useSelector((state: RootState) => {
        return state.auth.user?.loginData
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loginData');
        setContent('')
    };


    useEffect(() => {
        if (content == '' && loginData) {
            if (loginData?.role === 'admin') {
                setContent(AdminMenu[0].component);
            } else if (loginData?.role === 'staff') {
                setContent(StaffMenu[0].component);
            } else {
                // Handle other roles or no role scenario
            }
        }
    }, [loginData]);

    useEffect(() => {
        if (content == '' && loginData) {
            renderComponent(content);
        }
    }, [content]);

    const renderComponent = (componentName: string) => {
        const Component = components[componentName];
        if (Component) {
            return (
                <Router>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            <Route path={'/'} element={<Component />} />
                        </Routes>
                    </Suspense>
                </Router>
            );
        }
        return null;
    };

    const handleRouteFromApp = (item: MenuItem) => {
        if (item.component != content && loginData){
            setContent(item.component)
        }
    };

    return (<>
        <Header loginData={loginData} loadInUserData={loadInUserData} handleLogout={handleLogout} />
        <div style={{ flex: '1 0 80%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '0 0 15%', backgroundColor: '#f9f9f9', color: '#0d0d0d' }}>
                <Sidebar handleRouteFromApp={handleRouteFromApp} />
            </div>
            <div style={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}>
                {renderComponent(content)}
            </div>
        </div>
        <Footer />
    </>)
}

export default Authenticated