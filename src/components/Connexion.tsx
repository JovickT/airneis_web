import Layout from "./Layout";
import React, { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { email: email, mot_de_passe: mdp };

    try {
      const response = await axios.post(
        "https://127.0.0.1:8000/api/login_check",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      Cookies.set("jwt_token", token);
      console.log("Authentification réussie");
      setSuccessMessage("Connexion réussie");
      setError(null);
      navigate("/");
    } catch (error) {
      //setError(error.response.data.message || 'Une erreur est survenue');
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    const wrapper = document.querySelector(".wrapper") as HTMLDivElement;
    const registerLink = document.querySelector(
      ".register-link"
    ) as HTMLAnchorElement | null;
    const loginLink = document.querySelector(
      ".login-link"
    ) as HTMLAnchorElement | null;

    if (wrapper && registerLink) {
      registerLink.onclick = () => {
        wrapper.classList.add("active");
      };
    }
    if (wrapper && loginLink) {
      loginLink.onclick = () => {
        wrapper.classList.remove("active");
      };
    }

    // Nettoyage des effets lors du démontage du composant
    return () => {
      if (registerLink) {
        registerLink.onclick = null; // Supprimer l'événement onclick
      }
      if (loginLink) {
        loginLink.onclick = null; // Supprimer l'événement onclick
      }
    };
  }, []);

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
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="connexion-input"
                  />
                </div>
                <div className="mb-3">
                  <label className="connexion-label">Mot de passe</label>
                  <input
                    type="password"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                    required
                    className="connexion-input" 
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
