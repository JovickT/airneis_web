import Layout from "./Layout";
import React, { useEffect, useState, FormEvent } from "react";
import axios from "../services/Axios";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


interface FormData {
  prenom: string;
  nom: string;
  email: string;
  agreeTerms: boolean;
  plainPassword: string;
}

const Inscription = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    prenom : '',
    nom : '',
    email : '',
    agreeTerms : false,
    plainPassword : '',
  });
  

  useEffect(() =>{
    if (user) {
      navigate('/');
    }
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register',formData);
      alert('Registration succesful');
      navigate('/connexion');
    } catch (error:unknown) {
      if(error instanceof AxiosError){

        if (error.response) {
          // Le serveur a répondu avec un statut en dehors de la plage 2xx
          console.error('Error data:', error.response.data);
          alert('Registration failed: ' + JSON.stringify(error.response.data.errors));
      } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error('Error request:', error.request);
          alert('No response received from server');
      } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error('Error message:', error.message);
          alert('Error setting up the request');
      }
      }
    }
  };

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h2 className="text-color font-bolder mb-1">Inscription</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="inscription-form">
                <div className="mb-3">
                  <label className="inscription-label">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    className="inscription-input"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="inscription-label">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    className="inscription-input"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="inscription-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="inscription-input"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="inscription-label">Mot de passe</label>
                  <input
                    type="password"
                    name="plainPassword"
                    className="inscription-input"
                    value={formData.plainPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="inscription-label">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                    Agree to terms
                  </label>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="inscription-button">
                  Inscription
                </button>
                <div className="mt-3 text-center">
                  <p>
                    Vous avez déjà un compte?{" "}
                    <a href="/connexion" className="text-color">
                      Connexion
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

export default Inscription;
