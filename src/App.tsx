import './App.css';
import Footer from './Components/Common/Footer';
import Header from './Components/Common/Navbar';
import Sidebar from './Components/Common/Sidebar';
import Login from './Pages/Login';
import { AdminMenu, MenuItem, StaffMenu } from './Utils/Constants';
import { Suspense, useEffect, useState } from 'react';
import components from './Menu/AdminMenu';
import { AdminLogin } from './Utils/ApiRes';
import { toast } from 'react-toastify';
import { UserDetails } from './Utils/interface';

const getUserDetailsById = async (id:number) => {
  let responseFromApi!: UserDetails;
  try {
    const response = await fetch(`http://localhost:3000/user_details/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') as string,
      },
    });

    if (response.ok) {
      responseFromApi = await response.json();
    } else {
      toast.error('Something went wrong');
    }
  } catch (error) {
    console.error('Error during loading:', error);
    toast.error('Something went wrong');
  }
  return responseFromApi;
};


function App() {
  const [content, setContent] = useState<string>('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loginData, setLoginData] = useState<AdminLogin | null>(null);
  const [loadInUserData, setLoggedInUsedData] = useState<UserDetails | null>(null);



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
    let data = localStorage.getItem('loginData') as string;
    setLoginData(JSON.parse(data));
    setLoggedInUserDataIn()
  }, []);

  const setLoggedInUserDataIn = async() =>{
    if(loginData?.status.data.id)
      setLoggedInUsedData(await getUserDetailsById(loginData?.status.data.id))
  }

  useEffect(() => {
    if (loginData?.status.role === 'admin') {
      setContent(AdminMenu[0].component);
    } else if (loginData?.status.role === 'staff') {
      setContent(StaffMenu[0].component);
    } else {
      // Handle other roles or no role scenario
    }
  }, [loginData]);

  useEffect(() => {
    renderComponent(content);
  }, [content]);


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
        </div>) : (
        <Login onLogin={handleLogin}></Login>
      )}
    </div>
  );
}

export default App;
