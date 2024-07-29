import axios, { AxiosInstance } from 'axios';

export interface UserData {
  email: string;
  prenom: string;
  nom: string;
  adresse: string;
  telephone: string;
}

const API_URL = 'https://127.0.0.1:8000/api';

// Créer une instance Axios avec la configuration de base
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Équivalent à credentials: 'include'
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API error:', error);
    return Promise.reject(error);
  }
);

const authService = {
  login: async (username: string, password: string): Promise<void> => {
    try {
      await api.post('/login_check', { username, password });
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: async (): Promise<boolean> => {
    try {
      const response = await api.post('/logout');
      return response.status === 200;
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      return false;
    }
  },
  
  fetchUserData: async (): Promise<UserData> => {
    try {
      const response = await api.get('/user');
      
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données utilisateur :', error);
      throw error;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    try {
      const response = await api.get('/check-auth');
      return response.status === 200;
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification :', error);
      return false;
    }
  },
};

export default authService;