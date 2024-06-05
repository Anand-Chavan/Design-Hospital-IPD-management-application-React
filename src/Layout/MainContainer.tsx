import '../App.css';
import Login from '../Pages/Login';
import { useEffect, useState } from 'react';
import { AdminLogin } from '../Utils/ApiRes';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import Authenticated from './Authenticated';
import { UserDetails } from '../Utils/interface';
import { getUserDetailsById } from '../Utils/GetUserDetailsById';

const MainContainer = () => {
    const [loadInUserData, setLoggedInUsedData] = useState<UserDetails | null>(null);
    const isAuthenticated = useSelector((state: RootState) => {
        return state.auth.isAuthenticated
    });
    const loginData:any = useSelector((state: RootState) => {
        return state.auth.user?.loginData
    });

    const getUserDetails = async() =>{
        setLoggedInUsedData(await getUserDetailsById(loginData?.data?.id))
    }

    useEffect(()=>{
        if(loadInUserData == null){
            getUserDetails()
        }
    },[])

    const onLogin = (data:UserDetails | null) =>{
        setLoggedInUsedData(data)  
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {isAuthenticated && loadInUserData ? (
                <div>
                    <Authenticated loadInUserData={loadInUserData}></Authenticated>
                </div>) : (
                <Login onLogin={onLogin}></Login>
            )}
        </div>
    );
}

export default MainContainer;
