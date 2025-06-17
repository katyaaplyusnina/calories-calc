import axios from 'axios';

const jwt = localStorage.getItem('authToken');

const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {
        Authorization: `Bearer ${jwt}`
    }
});

export default instance;
