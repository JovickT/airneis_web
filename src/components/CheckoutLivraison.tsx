import Layout from "./Layout";
import { Link } from 'react-router-dom';

const CheckoutLivraison = () => {
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
              <form className="checkout-form">
                <label className="checkout-label">Prénom :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre prénom"/>
                <label className="checkout-label">Nom :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre nom"/>
                <label className="checkout-label">Adresse 1 :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre adresse"/>
                <label className="checkout-label">Adresse 2 :</label><br/>
                <input type="text" className="checkout-input" placeholder="Complément d'adresse"/>
                <label className="checkout-label">Ville :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre ville"/>
                <label className="checkout-label">Région :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre région"/>
                <label className="checkout-label">Code Postal :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre code postal"/>
                <label className="checkout-label">Pays :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre pays"/>
                <label className="checkout-label">Téléphone :</label><br/>
                <input type="text" className="checkout-input" placeholder="Votre téléphone"/>
              </form>
            </div>
            <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/checkoutPayement">
                <button className="checkout-button">PASSER LA COMMANDE</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutLivraison;
