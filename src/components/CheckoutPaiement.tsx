import { loadStripe } from "@stripe/stripe-js";
import Layout from "./Layout";
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX'); // Remplacez par votre clé publique Stripe

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigation = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [commande, setCommande] = useState(() => {
    const livraison = localStorage.getItem('info-livraison');
    const amount = localStorage.getItem('TTC');
    const user = localStorage.getItem('user');
  
    return {
      livraison: livraison ? JSON.parse(livraison) : null,
      amount: amount || '',
      user: user ? JSON.parse(user) : null,
    };
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
        setError('Stripe.js has not loaded yet.');
        setProcessing(false);
        return;
    }

    setIsLoading(true);

    const clientSecret = localStorage.getItem('clientSecret');
    if (!clientSecret) {
      setError('Client secret not found.');
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found.');
      setProcessing(false);
      return;
    }
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });
     

      if(paymentIntent && paymentIntent.status ==='succeeded') {
        setMessage('Paiement réussi!');
        
        try {
          console.log('commande:', JSON.stringify(commande));
          
          const response = await fetch('https://localhost:8000/api/commande', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commande),
            credentials: 'include', // Ajoute les credentials pour envoyer les cookies
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();

          localStorage.setItem('orderData', JSON.stringify(data));

          

          // if (document.getElementById('savePayement_card').checked) {
          //   const { paymentMethod } = await stripe.createPaymentMethod({
          //     type: 'card',
          //     card: cardElement,
          //   });
          // }

          localStorage.removeItem('clientSecret');
          localStorage.removeItem('panier');
          localStorage.removeItem('TTC');
          localStorage.removeItem('info-livraison');
          navigation('/checkoutFini'); // Redirect to the success page
        
        } catch (error) {
          console.error('Erreur lors de la création du PaymentIntent:', error);
          setError('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
        }
       
      }else{
        setError(`Payment failed: ${paymentIntent?.status}`);
        setProcessing(false);
        setMessage('Echec de Paiement!');

      }
      
    
    } catch (error) {
      console.error('Error confirming card payment:', error);
      setError('An error occurred while processing your payment. Please try again.');
      setProcessing(false);
    }    

    
};

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  }
};

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label className="mb-2" htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" options={cardStyle} />
      </div>
      <button className="checkout-button" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="alert alert-danger">{message}</div>}
      <div className="mt-3">
        <label htmlFor="enregistrement_card"><input type="checkbox" className="me-2" name="savePayement_card" id="savePayement_card" />
            Enregistrer ce moyen de paiement
        </label>
      </div>
    </form>
  );
};

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
              <Elements stripe={stripePromise}>
                  <CheckoutForm />
              </Elements>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
};

export default CheckoutPaiement;
