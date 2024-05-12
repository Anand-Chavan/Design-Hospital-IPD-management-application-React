import './App.css';
import Footer from './Components/Common/Footer';
import MainBody from './Components/Common/MainBody';
import Header from './Components/Common/Navbar';
import Sidebar from './Components/Common/Sidebar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login';
import { AdminMenu, MenuItem } from './Utils/constants';
import { Suspense, useEffect, useState } from 'react';
import ManageRooms from './Components/Admin/ManageRooms';
import components from './Menu/AdminMenu';


function App() {
  const [content, setContent] = useState('ManageRooms');

  useEffect(() => {
    console.log(content)
    setTimeout(() => {
      setContent(AdminMenu[0].component)
      renderComponent(content)
    }, 2000);
  }, []);

  const handleRouteFromApp = (item:MenuItem) => {
    setContent(item.component)
    console.log(content)
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
      <Header />
      <div style={{ flex: '1 0 80%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: '0 0 15%', backgroundColor: '#f9f9f9', color: '#0d0d0d' }}>
          <Sidebar  handleRouteFromApp={handleRouteFromApp}/>
        </div>
        <div style={{ flex: '1 0 75%', display: 'flex', flexDirection: 'column' }}>
          {renderComponent(content)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
