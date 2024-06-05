import axios from 'axios';

console.log(localStorage.getItem('token'))
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token'),
    },
});

export default axiosInstance;
