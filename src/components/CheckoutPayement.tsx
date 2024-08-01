import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import { useNavigate } from 'react-router-dom';
import axios from "../services/Axios";


const stripePromise = loadStripe('pk_test_oKhSR5nslBRnBZpjO6KuzZeX'); // Remplacez par votre clé publique Stripe

interface Payment {
  id: string;
  card: {
    brand: string;
    last4: string;
  };
}


interface Panier {
  email: string | null;
}

const CheckoutForm = () => {
  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<Payment[]>([]);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [commande, setCommande] = useState(() => {
    const livraison = localStorage.getItem('info-livraison');
    const amount = localStorage.getItem('TTC');
    const user = localStorage.getItem('user');
    const paiement = localStorage.getItem('payement_method');
  
    return {
      livraison: livraison ? JSON.parse(livraison) : null,
      amount: amount || '',
      user: user ? JSON.parse(user) : null,
      paiement: paiement ? JSON.parse(paiement) : null,
    };
  });

  const [userStorage, setUserStorage] = useState<Panier>({
      email: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).email : null
  });

  // useEffect(() => {
  //   const fetchPaymentMethods = async () => {
  //     const response = await fetch('https://localhost:8000/api/payment-methods', {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const data = await response.json();
  //     setSavedPaymentMethods(data.paymentMethods);
  //   };

  //   fetchPaymentMethods();
  // }, []);

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
      const { error: createPaymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
    
      if (createPaymentMethodError) {
        setError(createPaymentMethodError.message);
        console.log('Error creating payment method:', createPaymentMethodError);
        return;
      }
    
      const { id: paymentMethodId, card } = paymentMethod;
      console.log('Payment method created:', paymentMethodId);
    
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });
    
      if (error) {
        setError(`Payment failed: ${error.message}`);
        console.log('Error confirming card payment:', error);
        setProcessing(false);
        setMessage('Echec de Paiement!');
        return;
      }
    
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', paymentIntent);
    
        // Stockez uniquement les informations nécessaires
        const cardInfo = {
          brand: card?.brand,
          last4: card?.last4,
          exp_month: card?.exp_month,
          exp_year: card?.exp_year,
        };
    
        try {
          localStorage.setItem('payment_method', JSON.stringify(cardInfo));
          const response = await fetch('https://localhost:8000/api/commande', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(commande),
            credentials: 'include',
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          setMessage('Paiement réussi!');
          const data = await response.json();
          console.log('Commande response data:', data);
          localStorage.setItem('orderData', JSON.stringify(data));
          localStorage.removeItem('clientSecret');
          localStorage.removeItem('panier');
          localStorage.removeItem('TTC');
          localStorage.removeItem('info-livraison');
    
          if (saveCard) {
            const paymentMethodResponse = await stripe.createPaymentMethod({
              type: 'card',
              card: cardElement,
            });
    
            if (paymentMethodResponse.error) {
              setError(paymentMethodResponse.error.message);
              console.log('Error creating payment method for saving:', paymentMethodResponse.error);
            } else {
              try {
                console.log('Attaching payment method...');
                const response = await axios.post('https://localhost:8000/api/attach-payment-method', {
                  user: {
                    email: userStorage?.email,
                  },
                  paymentMethodId: paymentMethodResponse.paymentMethod.id,
                });
    
                if (response.status < 200 || response.status >= 300) {
                  throw new Error('Network response was not ok');
                }
    
                const data = response.data;
                console.log('Attach payment method response data:', data);
              } catch (error) {
                setMessage('Paiement Echoué!');
                console.error('Error attaching payment method:', error);
              }
            }
          }
    
          navigate('/checkoutFini');
        } catch (error) {
          console.error('Erreur lors de la création du PaymentIntent:', error);
          setError('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
        }
      } else {
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
      <button className="checkout-button" id="submit">
        <span id="button-text">
          Payer
        </span>
      </button>
      {message && <div id="payment-message" className="alert alert-info">{message}</div>}
      <div className="mt-3">
        <label htmlFor="savePayement_card">
          <input type="checkbox" className="me-2" name="savePayement_card" id="savePayement_card" onChange={(e) => setSaveCard(e.target.checked)} />
          Enregistrer ce moyen de paiement
        </label>
      </div>
      {savedPaymentMethods.length > 0 && (
        <div className="saved-payment-methods">
          <h3>Utiliser un moyen de paiement sauvegardé :</h3>
          {savedPaymentMethods.map((method) => (
            <div key={method.id}>
              <input type="radio" id={method.id} name="saved_payment_method" value={method.id} />
              <label htmlFor={method.id}>{method.card.brand} **** **** **** {method.card.last4}</label>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

const CheckoutPayment = () => {
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
              <h2 style={{ textAlign: 'center' }}>Informations de livraison</h2>
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

export default CheckoutPayment;