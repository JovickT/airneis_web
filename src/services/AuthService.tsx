import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface RefreshTokenResponse {
  access: string;
}

export interface UserData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  // Ajoutez d'autres propriétés selon vos besoins
}

interface RefreshTokenResponse {
  access: string;
}

const authService = {
  login: async (username: string, password: string): Promise<UserData> => {
    const response = await axios.post<LoginResponse>('http://localhost:8000/api/token/', { username, password });
    const { access, refresh } = response.data;
    Cookies.set('access_token', access, { httpOnly: true });
    Cookies.set('refresh_token', refresh, { httpOnly: true });

    const userData = await fetchUserData(access);
    // Vous pouvez stocker les données de l'utilisateur dans le state de votre application
    // ou les renvoyer à votre composant d'authentification
    return userData;
  },

  logout: () => {
    Cookies.remove('access_token', { httpOnly: true });
    Cookies.remove('refresh_token', { httpOnly: true });
  },

  refreshToken: async (): Promise<UserData> => {
    try {
      const response = await axios.post<RefreshTokenResponse>('http://localhost:8000/api/token/refresh/', null, {
        withCredentials: true,
      });
      const { access } = response.data;
      Cookies.set('access_token', access, { httpOnly: true });
  
      const userData = await fetchUserData(access);
      return userData;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du jeton :', error);
      throw error; // Ou gérer l'erreur de manière appropriée (rediriger vers la page de connexion, etc.)
    }
  },
};

const fetchUserData = async (accessToken: string): Promise<UserData> => {
  try {
    const response = await axios.get<UserData>('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur :', error);
    throw error;
  }
};

export default authService;
