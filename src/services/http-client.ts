import axios from "axios";

const instance = axios.create({
    baseURL: '',
    timeout: 3000,
    headers: {
        Authorization: `Bearer qweqwe`
    }
});

export default instance;
