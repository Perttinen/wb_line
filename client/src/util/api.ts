import axios, { AxiosError } from 'axios';

export const api =
    process.env.NODE_ENV === 'development' ?
        axios.create({ baseURL: 'http://localhost:3001/api/' })
        : axios.create({ baseURL: '/api/' });

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
})
api.interceptors.response.use(
    response => {
        // Handle the response data as needed
        return response;
    },
    error => {
        // Log the error
        console.error('API Error:', error.response.data.errors);
        // You can also send the error to an error tracking service here

        // If you want to pass the error along without handling it here
        return Promise.reject(error);
    }
);