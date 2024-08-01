import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import axios from "../services/Axios";


interface Adresses {
  pays: string;
  ville: string;
  rue: string;
  cp: string;
}

const CheckoutLivraison = () => {
  const navigation = useNavigate();
  const [error, setError] = useState('');
  const { user, checkAuthStatus } = useAuth(); // Assurez-vous que useAuth renvoie la fonction login
  const [adresses, setAdresses] = useState<Adresses[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Adresses | null>(null);
  const userStorage = localStorage.getItem('user');

  const fetchUserAdresses = async () => {
    try {
      // Vérifie si l'utilisateur est connecté
      await checkAuthStatus();

      const response = await axios.post('/userAdresses', userStorage);

      if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok');
      }

      // Les données sont disponibles directement dans response.data
      const data = response.data;
      setAdresses(data); // Mettre à jour l'état avec les données reçues
    } catch (error) {
      // Mettre à jour l'état avec l'erreur reçue
      console.error('Error fetching addresses:', error);
    }
  };

  useEffect(() => {
    fetchUserAdresses();
  }, []);

  const handleAddressChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    const selectedAddr = adresses[Number(selectedIndex)];
    setSelectedAddress(selectedAddr);
    setFormData((prevData) => ({
      ...prevData,
      adresse1: selectedAddr.rue,
      ville: selectedAddr.ville,
      cp: selectedAddr.cp,
      pays: selectedAddr.pays,
    }));
  };

  const [formData, setFormData] = useState({
    prenom: user?.prenom || '',
    nom: user?.nom || '',
    adresse1: '',
    adresse2: '',
    ville: '',
    region: '',
    cp: '',
    pays: '',
    telephone: '',
    saveLivraison: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const panier = JSON.parse(localStorage.getItem('panier') || '[]'); // récupérer le panier du localStorage
    const amount = JSON.parse(localStorage.getItem('TTC') || '0'); // récupérer le amount du localStorage

    const formDatas = {
      ...formData,
      panier: panier, // inclure le panier dans les données du formulaire
      amount: parseInt(amount),
    };

    try {
      const response = await fetch('https://localhost:8000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDatas),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const { clientSecret } = data;

      localStorage.setItem('info-livraison', JSON.stringify(formDatas));

      // Stocker le clientSecret dans le localStorage ou le passer comme prop au composant suivant
      localStorage.setItem('clientSecret', clientSecret);

      // Navigate to the payment page after successful form submission
      navigation('/checkoutPayement');
    } catch (error) {
      console.error('Erreur lors de la création du PaymentIntent:', error);
      setError('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
    }
  };

  const handleReset = () => {
    setFormData({
      prenom: '',
      nom: '',
      adresse1: '',
      adresse2: '',
      ville: '',
      region: '',
      cp: '',
      pays: '',
      telephone: '',
      saveLivraison: false,
    });
  };

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Livraison</h1>
          </div>
          <div className="row">
            <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2>Informations de livraison</h2>
              <form onSubmit={handleSubmit}>
                <div className="checkout-form">
                  <label className="checkout-label">Adresse :</label><br />
                  <select onChange={handleAddressChange} className="checkout-input">
                    <option value="">Sélectionnez une adresse</option>
                    {adresses.map((adresse, index) => (
                      <option key={index} value={index}>
                        {adresse.rue}, {adresse.ville}, {adresse.cp}, {adresse.pays}
                      </option>
                    ))}
                  </select>
                  <label className="checkout-label">Prénom :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Nom :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Adresse 1 :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="adresse1"
                    value={formData.adresse1}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Adresse 2 :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="adresse2"
                    value={formData.adresse2}
                    onChange={handleInputChange}
                  />
                  <label className="checkout-label">Ville :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="ville"
                    value={formData.ville}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Région :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                  />
                  <label className="checkout-label">Code Postal :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="cp"
                    value={formData.cp}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Pays :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="pays"
                    value={formData.pays}
                    onChange={handleInputChange}
                    required
                  />
                  <label className="checkout-label">Téléphone :</label><br />
                  <input
                    type="text"
                    className="checkout-input"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-flex">
                  <input
                    type="checkbox"
                    name="saveLivraison"
                    checked={formData.saveLivraison}
                    onChange={handleCheckboxChange}
                  />
                  <p className="mt-2">Sauvegarder vos informations de livraison</p>
                </div>
                <div className="" style={{ display: 'flex', alignItems: 'center' }}>
                  <input type="submit" className="checkout-button" value="PASSER LA COMMANDE" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutLivraison;
