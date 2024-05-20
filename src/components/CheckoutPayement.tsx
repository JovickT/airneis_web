import Layout from "./Layout";
import { Link } from 'react-router-dom';

const CheckoutPayement = () => {

  return (
    <Layout>
      <div className="bg-page">
        <div className="line-separator"></div>
        <div className="container">
          <div className="text-center">
            <h1 className="text-color font-bolder mb-5">Payement</h1>
          </div>
          <div className="row">
          <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ textAlign: 'center'}}>Informations de livraison</h2>
              <form className="checkout-form" style={{ width: '100%' }}>
                <label className="checkout-label">Numéro de carte :</label><br/>
                <input type="number" className="checkout-input"/>
                <label className="checkout-label">Nom complet :</label><br/>
                <input type="text" className="checkout-input"/>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <div>
                    <label className="checkout-label">Date d'expiration :</label><br/>
                    <input type="date" className="checkout-input" style={{ marginRight: '10px' }}/>
                  </div>
                  <div>
                    <label className="checkout-label">CVV :</label><br/>
                    <input type="number" className="checkout-input"/>
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

export default CheckoutPayement;
