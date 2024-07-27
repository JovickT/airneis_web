import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://127.0.0.1:8000/api',
    withCredentials: true, // Ceci est crucial pour les cookies HTTP-only
    headers: {
      'Content-Type': 'application/json',
    },
});

export default instance;