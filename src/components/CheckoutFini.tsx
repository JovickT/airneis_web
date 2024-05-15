import Layout from "./Layout";
import { Link } from 'react-router-dom';

const CheckoutFini = () => {
  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container" style={{ width: '350px' }}>
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Commande effectuée</h1>
            <p>Merci de votre achat !</p>
            <p>Votre commande a bien été enregistrée sous le numéro XXXXXX. Vous pouvez suivre son état depuis votre espace client.</p>
            <Link to="/">
              <button className="checkout-button">CONTINUER MES ACHATS</button>
            </Link>          </div>
        </div>
        <div className="line-separator"></div>
      </div>
    </Layout>
  );
};

export default CheckoutFini;