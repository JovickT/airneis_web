import Layout from "./Layout";
import React, { useEffect, useState,ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { isAuthenticated, login } = useAuth();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

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

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

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
