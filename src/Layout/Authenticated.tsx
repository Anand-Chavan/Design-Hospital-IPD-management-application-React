import { Suspense, useEffect, useState } from "react";
import Header from "../Components/Common/Navbar";
import Sidebar from "../Components/Common/Sidebar";
import components from '../Menu/AdminMenu';
import { AdminLogin } from "../Utils/ApiRes";
import { getUserDetailsById } from "../Utils/GetUserDetailsById";
import { MenuItem } from "../Utils/Constants";
import { UserDetails } from "../Utils/interface";
import { AdminMenu, StaffMenu } from '../Utils/Constants';
import Footer from "../Components/Common/Footer";

const Authenticated = () => {
    const [loginData, setLoginData] = useState<AdminLogin | null>(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loadInUserData, setLoggedInUsedData] = useState<UserDetails | null>(null);
    const [content, setContent] = useState<string>('');


    const handleLogin = (newToken: string, loginData: any) => {
        setToken(newToken);
        setLoginData(loginData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('loginData', JSON.stringify(loginData));
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loginData');
        setContent('')
    };

    useEffect(() => {
        if (loginData == null) {
            let data = localStorage.getItem('loginData') as string;
            setLoginData(JSON.parse(data));
        }
    }, []);

    
    const setLoggedInUserDataIn = async () => {
        if (loginData?.status.data.id)
            setLoggedInUsedData(await getUserDetailsById(loginData?.status.data.id))
    }

    useEffect(() => {
        if (content == '' && loginData) {
            if (loginData?.status.role === 'admin') {
                setContent(AdminMenu[0].component);
            } else if (loginData?.status.role === 'staff') {
                setContent(StaffMenu[0].component);
            } else {
                // Handle other roles or no role scenario
            }
            setLoggedInUserDataIn();
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
                <Suspense fallback={<div>Loading...</div>}>
                    <Component />
                </Suspense>
            );
        }
        return null;
    };

    const handleRouteFromApp = (item: MenuItem) => {
        if (item.component != content && loginData)
            setContent(item.component)
    };
    
    return (<>
        <Header loginData={loginData} loadInUserData={loadInUserData} handleLogout={handleLogout} />
        <div style={{ flex: '1 0 80%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '0 0 15%', backgroundColor: '#f9f9f9', color: '#0d0d0d' }}>
                <Sidebar loginData={loginData} handleRouteFromApp={handleRouteFromApp} />
            </div>
            <div style={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}>
                {renderComponent(content)}
            </div>
        </div>
        <Footer />
    </>)
}

export default Authenticated