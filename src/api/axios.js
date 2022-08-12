import Axios from 'axios';

const axios = Axios.create({
    baseURL: 'http://localhost:3001'
});

axios.defaults.withCredentials = true;

export default axios;