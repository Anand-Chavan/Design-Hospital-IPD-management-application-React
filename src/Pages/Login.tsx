import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../Styles/login.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../Redux/Slices/AuthSlice';
import { RootState } from '../Redux/Store';

const Login = ({ onLogin }: any) => {
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.auth.error);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            const requestBody = {
                user: {
                    email: values.username,
                    password: values.password,
                },
            };

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
                        dispatch(loginSuccess({ token: localStorage.getItem('token') as string }));
                        onLogin(authorizationHeader, data);
                        toast.success('Login successful!');
                    } else {
                        console.error('Authorization header not found in response');
                        toast.error('Something went wrong');
                    }
                } else {
                    toast.error('Something went wrong');
                }
            } catch (error) {
                console.error('Error during login:', error);
                toast.error('Something went wrong');
            }
        },
    });

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={formik.handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="error-message">{formik.errors.username}</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />
                    {formik.touched.password && formik.errors.password && (
                        <p className="error-message">{formik.errors.password}</p>
                    )}
                </div>
                <button type="submit">Login</button>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                toastStyle={{ width: '400px' }}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default Login;
