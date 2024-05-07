import './App.css';
import Footer from './Components/Common/Footer';
import MainBody from './Components/Common/MainBody';
import Header from './Components/Common/Navbar';
import Sidebar from './Components/Common/Sidebar';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Login';
import { AdminMenu } from './Utils/constants';

// import Login from './Pages/Login';

const createUser = async () => {
    const formData = {
      user: {
        email: 'anand.chavan@joshsoftware.com',
        password: 'Anand@123',
      },
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Handle response data as needed
    } catch (error) {
      console.error('Error:', error);
    }
}

function App() {
  return (
    // <Router>
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
          <BrowserRouter>
            <Routes>
            {AdminMenu.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
              {/* <Route path="/login" Component={Login} /> */}
            </Routes>
          </BrowserRouter> 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  // </Router>
  );
}

export default App;
