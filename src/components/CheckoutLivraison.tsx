import { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";


const CheckoutLivraison = () => {
  const navigation = useNavigate();
  const [error, setError] = useState('');
  const { user, checkAuthStatus} = useAuth(); // Assurez-vous que useAuth renvoie la fonction login

  const [compte, setCompte] = useState({
    email: user?.email || '',
    prenom: user?.prenom || '',
    nom: user?.nom || '',
    telephone: user?.telephone || '',
});

  useEffect(() => {
    checkAuthStatus(); // Vérifie si l'utilisateur est connecté
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const prenom = form.elements.namedItem('prenom') as HTMLInputElement | null;
    const nom = form.elements.namedItem('nom') as HTMLInputElement | null;
    const adresse1 = form.elements.namedItem('adresse1') as HTMLInputElement | null;
    const adresse2 = form.elements.namedItem('adresse2') as HTMLInputElement | null;
    const ville = form.elements.namedItem('ville') as HTMLInputElement | null;
    const region = form.elements.namedItem('region') as HTMLInputElement | null;
    const cp = form.elements.namedItem('cp') as HTMLInputElement | null;
    const pays = form.elements.namedItem('pays') as HTMLInputElement | null;
    const telephone = form.elements.namedItem('telephone') as HTMLInputElement | null;
    const save = form.elements.namedItem('saveLivraison') as HTMLInputElement | null;
    const panier = JSON.parse(localStorage.getItem('panier') || '[]'); // récupérer le panier du localStorage
    const amount = JSON.parse(localStorage.getItem('TTC') || '[]'); // récupérer le amount du localStorage

    if (prenom && nom && adresse1 && ville && cp && pays && telephone) {
      const formData = {
        prenom: prenom.value,
        nom: nom.value,
        adresse1: adresse1.value,
        adresse2: adresse2?.value || '',
        ville: ville.value,
        region: region?.value || '',
        cp: cp.value,
        pays: pays.value,
        telephone: telephone.value,
        panier: panier, // inclure le panier dans les données du formulaire
        amount: parseInt(amount),
        saveLivraison: save?.checked
      };

      try {
        const response = await fetch('https://localhost:8000/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const { clientSecret } = data;

        localStorage.setItem('info-livraison', JSON.stringify(formData));

        // Stocker le clientSecret dans le localStorage ou le passer comme prop au composant suivant
        localStorage.setItem('clientSecret', clientSecret);

        // Navigate to the payment page after successful form submission
        navigation('/checkoutPayement');
      } catch (error) {
        console.error('Erreur lors de la création du PaymentIntent:', error);
        setError('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
      }
    } else {
      console.error('Please fill in all required fields.');
    }
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
                  <label className="checkout-label">Prénom :</label><br />
                  <input type="text" className="checkout-input" name="prenom" value={user?.prenom} required />
                  <label className="checkout-label">Nom :</label><br />
                  <input type="text" className="checkout-input" name="nom"  value={user?.nom} required />
                  <label className="checkout-label">Adresse 1 :</label><br />
                  <input type="text" className="checkout-input" name="adresse1" required />
                  <label className="checkout-label">Adresse 2 :</label><br />
                  <input type="text" className="checkout-input" name="adresse2" />
                  <label className="checkout-label">Ville :</label><br />
                  <input type="text" className="checkout-input" name="ville" required />
                  <label className="checkout-label">Région :</label><br />
                  <input type="text" className="checkout-input" name="region" />
                  <label className="checkout-label">Code Postal :</label><br />
                  <input type="text" className="checkout-input" name="cp" required />
                  <label className="checkout-label">Pays :</label><br />
                  <input type="text" className="checkout-input" name="pays" required />
                  <label className="checkout-label">Téléphone :</label><br />
                  <input type="text" className="checkout-input" name="telephone" required />
                </div>
                <div className="d-flex">
                  <input type="checkbox" name="saveLivraison" />
                  <p className="mt-2">sauvegerder vos informations de livraison</p>
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