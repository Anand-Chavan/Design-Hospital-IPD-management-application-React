import '../App.css';
import Login from '../Pages/Login';
import { useState } from 'react';
import { AdminLogin } from '../Utils/ApiRes';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Authenticated from './Authenticated';

const MainContainer = () => {
    const isAuthenticated = useSelector((state: RootState) => {
        console.log(state)
        return state.auth.isAuthenticated
    });

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loginData, setLoginData] = useState<AdminLogin | null>(null);

    const handleLogin = (newToken: string, loginData: any) => {
        setToken(newToken);
        setLoginData(loginData);
        localStorage.setItem('token', newToken);
        localStorage.setItem('loginData', JSON.stringify(loginData));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {isAuthenticated ? (
                <div>
                    <Authenticated></Authenticated>
                </div>) : (
                <Login onLogin={handleLogin}></Login>
            )}
        </div>
    );
}

export default MainContainer;
