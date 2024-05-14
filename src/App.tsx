import './App.css';
import Footer from './Components/Common/Footer';
import MainBody from './Components/Common/MainBody';
import Header from './Components/Common/Navbar';
import Sidebar from './Components/Common/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import { AdminMenu, MenuItem } from './Utils/Constants';
import { Suspense, useEffect, useState } from 'react';
import ManageRooms from './Components/Admin/ManageRooms';
import components from './Menu/AdminMenu';


function App() {
  const [content, setContent] = useState('ManageRooms');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginData, setLoginData] = useState(null);


  const handleLogin = (newToken: string,loginData:any) => {
    setToken(newToken);
    setLoginData(loginData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('loginData', JSON.stringify(loginData));
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {
    setTimeout(() => {
      setContent(AdminMenu[0].component)
      const loginData = localStorage.getItem('loginData') as string;
      setLoginData(JSON.parse(loginData));
      renderComponent(content)
    }, 2000);
  }, []);

  const handleRouteFromApp = (item: MenuItem) => {
    setContent(item.component)
  };

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



  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {token ? (
        <div >
          <Header loginData={loginData} handleLogout={handleLogout}  />
          <div style={{ flex: '1 0 80%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '0 0 15%', backgroundColor: '#f9f9f9', color: '#0d0d0d' }}>
              <Sidebar handleRouteFromApp={handleRouteFromApp} />
            </div>
            <div style={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}>
              {renderComponent(content)}
            </div>
          </div>
          <Footer />
        </div>) : (
        <Login onLogin={handleLogin}></Login>
      )}
    </div>
  );
}

export default App;
