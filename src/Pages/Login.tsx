import React, { useState } from 'react';
import '../Styles/login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = ({ onLogin }:any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const requestBody = {
            "user": {
                "email": username,
                "password": password
            }
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                const authorizationHeader = response.headers.get('Authorization');
                if (authorizationHeader) {
                    onLogin(authorizationHeader,data);
                    toast.success('Login successful!');
                } else {
                    console.error('Authorization header not found in response');
                    toast.error('Something went wrong');
                }
            } else {
                setError('Invalid username or password');
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Something went wrong');
        }
    };


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer position="top-right"
                autoClose={5000}
                toastStyle={{ width: '400px' }}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"></ToastContainer>
        </div>
    );
};

export default Login;
