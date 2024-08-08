import React from 'react';
import { CardElement, useStripe, useElements, CardElementProps } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';

interface PaymentFormProps {
    onPaymentMethodAdded: (paymentMethod: any) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onPaymentMethodAdded }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement as StripeCardElement,
        });

        if (error) {
            console.error(error);
        } else {
            onPaymentMethodAdded(paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Carte de crédit</label>
                <CardElement />
            </div>
            <button type="submit" className="btn me-2">Ajouter</button>
        </form>
    );
};

export default PaymentForm;
