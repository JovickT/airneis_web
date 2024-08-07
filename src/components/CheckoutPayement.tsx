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

interface PaymentBis {
  id: string;
  brand: string;
  last4: string;
  exp_month: string;
  exp_year: string;
}

interface Panier {
  email: string | null;
}

const CheckoutForm = () => {

  type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'diners' | 'unionpay' | 'default';

  const cardBrandIcons: Record<CardBrand, string> = {
      visa: 'fab fa-cc-visa',
      mastercard: 'fab fa-cc-mastercard',
      amex: 'fab fa-cc-amex',
      discover: 'fab fa-cc-discover',
      jcb: 'fab fa-cc-jcb',
      diners: 'fab fa-cc-diners-club',
      unionpay: 'far fa-credit-card',
      default: 'far fa-credit-card', // Icône par défaut pour les autres marques
  };

  const [error, setError] = useState<string>();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [savedPaymentMethods, setSavedPaymentMethods] = useState<PaymentBis[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [useSavedMethod, setUseSavedMethod] = useState(false); // Gestion de la méthode sauvegardée

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

  useEffect(() => {
    // Récupérer les méthodes de paiement sauvegardées
    const fetchSavedPaymentMethods = async () => {
      try {
        const response = await axios.post('/get-payment-methods', userStorage);

        if (response.status < 200 || response.status >= 300) {
          throw new Error('Network response was not ok');
        }

        const data = response.data;
        setSavedPaymentMethods(data.paymentMethods);
        
      } catch (error) {
        console.error('Error fetching saved payment methods:', error);
      }
    };

    fetchSavedPaymentMethods();
  }, [userStorage]);

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
  
    if (useSavedMethod && selectedPaymentMethod) {
      // Utilisation de la méthode de paiement sauvegardée
      
      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: selectedPaymentMethod,
        });

        console.log('je suis au bonn endroit:',paymentIntent);

        if (error) {
          setError(`Payment failed: ${error.message}`);
          setProcessing(false);
          setMessage('Echec de Paiement!');
          return;
        }
  
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          const paymentInfo = {
            id: selectedPaymentMethod,
            // On pourrait obtenir plus d'informations à partir de la méthode de paiement si nécessaire
          };
  
          // Mettre à jour les informations de la commande avec la méthode de paiement sauvegardée
          setCommande((prevCommande) => ({
            ...prevCommande,
            paiement: paymentInfo,
          }));
  
          await new Promise((resolve) => setTimeout(resolve, 0));

          const response = await axios.post('/commande', JSON.stringify({
            ...commande,
            paiement: paymentInfo,
          }));

          if (response.status < 200 || response.status >= 300) {
              throw new Error('Network response was not ok');
          }

  
          setMessage('Paiement réussi!');
          const data = response.data;
          localStorage.setItem('orderData', JSON.stringify(data));
          localStorage.removeItem('clientSecret');
          localStorage.removeItem('panier');
          localStorage.removeItem('TTC');
          localStorage.removeItem('info-livraison');
  
          navigate('/checkoutFini');
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
    } else {
      // Utilisation d'une nouvelle carte
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
          setProcessing(false);
          return;
        }
  
        const { id: paymentMethodId, card } = paymentMethod;
  
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethodId,
        });
  
        if (error) {
          setError(`Payment failed: ${error.message}`);
          setProcessing(false);
          setMessage('Echec de Paiement!');
          return;
        }
  
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          const cardInfo = {
            id: paymentMethod?.id,
            brand: card?.brand,
            last4: card?.last4,
            exp_month: card?.exp_month,
            exp_year: card?.exp_year,
          };
  
          localStorage.setItem('payment_method', JSON.stringify(cardInfo));
          setCommande((prevCommande) => ({
            ...prevCommande,
            paiement: cardInfo,
          }));
  
          await new Promise((resolve) => setTimeout(resolve, 0));
  
          const response = await fetch('https://localhost:8000/api/commande', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...commande,
              paiement: cardInfo,
            }),
            credentials: 'include',
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          setMessage('Paiement réussi!');
          const data = await response.json();
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
            } else {
              try {
                const response = await axios.post('/attach-payment-method', {
                  user: {
                    email: userStorage.email,
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
    {!useSavedMethod && (
      <div className="form-group">
        <label className="mb-2" htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" options={cardStyle} />
      </div>
    )}
    <button className="checkout-button mt-5" id="submit" type="submit" disabled={processing || !stripe || !elements}>
      <span id="button-text">
        {useSavedMethod ? 'Payer avec méthode sauvegardée' : 'Payer'}
      </span>
    </button>
    {message && <div id="payment-message" className="alert alert-info mt-2">{message}</div>}
    <div className="mt-3">
      <label htmlFor="savePayement_card">
        <input type="checkbox" className="me-2" name="savePayement_card" id="savePayement_card" onChange={(e) => setSaveCard(e.target.checked)} />
        Enregistrer ce moyen de paiement
      </label>
    </div>
    {savedPaymentMethods.length > 0 && (
      <div className="saved-payment-methods mt-5">
        <h3>Utiliser un moyen de paiement sauvegardé :</h3>
        {savedPaymentMethods.map((method) => {
          const iconClass = cardBrandIcons[method.brand as CardBrand] || cardBrandIcons.default;
          return (
            <div key={method.id} className="d-flex mt-4">
              <input 
                type="checkbox" 
                id={method.id} 
                className="me-2" 
                name="saved_payment_method" 
                checked={selectedPaymentMethod === method.id}
                onChange={() => {
                  if (selectedPaymentMethod === method.id) {
                    setSelectedPaymentMethod(null);
                    setUseSavedMethod(false); // Désactiver l'utilisation de la méthode sauvegardée
                  } else {
                    setSelectedPaymentMethod(method.id);
                    setUseSavedMethod(true); // Activer l'utilisation de la méthode sauvegardée
                  }
                }} 
              />
              <i className={`${iconClass} fa-2x me-2`}></i>
              <label htmlFor={method.id}>**** **** **** {method.last4} {method.exp_month}/{method.exp_year}</label>
            </div>
          );
        })}
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