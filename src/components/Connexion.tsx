import Layout from "./Layout";
import React, { useEffect, useState,ChangeEvent, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { user, login} = useAuth(); // Assurez-vous que useAuth renvoie la fonction login
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [lePanier, setLePanier] = useState(() => {
    const savedPanier = localStorage.getItem('panier');
    return savedPanier ? JSON.parse(savedPanier) : [];
  });

  const leUser = JSON.parse(localStorage.getItem('user') || '[]');

  useEffect(() => {
    if(user) {
      
      let from = location.state?.from || '/';
      console.log('location:', from);
      if (from === '/checkoutLivraison') {
        navigate(from);
  
      } else {
        navigate('/');
      }
    }
  },[user]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);

      if (!login) {
        setError("Erreur de configuration de l'authentification");
        return;
      }

      try {
        await login(username, password);
      } catch (err) {
        setError("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    
    };

    useEffect(() => {
      if (lePanier.length > 0 && (leUser !== undefined || leUser.length !== null)) {
        const sendPanierData = async () => {
          try {
            const encodedLePanier = encodeURIComponent(JSON.stringify(lePanier));
            const encodedLeUser = encodeURIComponent(JSON.stringify(leUser));
  
  
            const url = `https://localhost:8000/api/panier?test=${encodedLePanier}&user=${encodedLeUser}`;
  
            const response = await fetch(url, {
              method: 'GET', // Utilisez POST si nécessaire
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Ajoute les credentials pour envoyer les cookies
            });
  
            if (!response.ok) {
              throw new Error('Erreur lors de l\'envoi des données au serveur');
            }
  
            const result = await response.json();
            console.log('Réponse du serveur:', result?.success);
            localStorage.setItem('panier', JSON.stringify(result?.success));
          } catch (error) {
            console.error('Erreur:', error);
          }
        };
  
        sendPanierData();
      }
    }, [lePanier, leUser]);

 


  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
  };

  useEffect(() =>{
    if (user) {
      navigate('/');
    }
  },[user,navigate]);

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h2 className="text-color font-bolder mb-1">Connexion</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form
                action="#"
                id="login"
                onSubmit={handleSubmit}
                className="connexion-form"
              >
                <div className="mb-3">
                  <label className="connexion-label">Email</label>
                  <input
                    type="text"
                    name="username" 
                    value={username} 
                    onChange={handleUsernameChange}
                    required
                    className="connexion-input"
                  />
                </div>
                <div className="mb-3">
                  <label className="connexion-label">Mot de passe</label>
                  <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handlePasswordChange}
                    className="connexion-input" 
                    required  
                  />
                </div>
                <button type="submit" form="login" className="connexion-button">
                  Connexion
                </button>
                <div>
                  <Link className="mdp-forget" to="/PasswordForgotten">
                      <p>Mot de passe oublié ?</p>
                  </Link>
                </div>
                <div className="mt-3 text-center">
                  <p>
                    Pas de compte?{" "}
                    <a href="/inscription" className="text-color">
                      Inscription
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
