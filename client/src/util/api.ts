import axios from 'axios';

export const api =
    process.env.NODE_ENV === 'development' ?
        axios.create({ baseURL: 'http://localhost:3001/api/' })
        : axios.create({ baseURL: '/api/' });

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});