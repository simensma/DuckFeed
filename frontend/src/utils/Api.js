import axios from 'axios';

const Api = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json',
});

export default Api;
