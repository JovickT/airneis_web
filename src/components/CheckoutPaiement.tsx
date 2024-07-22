import Layout from "./Layout";
import { Link } from 'react-router-dom';

const CheckoutPaiement = () => {

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Paiement</h1>
          </div>
          <div className="row">
          <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center'}}>Informations de livraison</h2>
              <form className="checkout-form" style={{ width: '100%' }}>
                <label className="checkout-label">Numéro de carte :</label><br/>
                <input type="number" className="checkout-input" placeholder="1234 5678 9012 3456"/>
                <label className="checkout-label">Nom complet :</label><br/>
                <input type="text" className="checkout-input" placeholder=""/>
                <div className="d-flex flex-column flex-md-row justify-content-between w-100">
                  <div className="mb-3 mb-md-0">
                    <label className="checkout-label">Date d'expiration :</label><br/>
                    <input type="date" className="checkout-input mr-md-2" placeholder="MM/YY"/>
                  </div>
                  <div>
                    <label className="checkout-label">CVV :</label><br/>
                    <input type="number" className="checkout-input" placeholder="123"/>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Link to="/checkoutFini">
                <button className="checkout-button">PAYER</button>
              </Link>            
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
};

export default CheckoutPaiement;
