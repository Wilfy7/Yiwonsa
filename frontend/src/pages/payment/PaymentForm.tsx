import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../service/payment.service";
import { useNavigate } from "react-router-dom";



interface FormData {
    name: string;
    email: string;
    amount: number;
  }

const PaymentForm = () => {
   const stripe = useStripe();
   const elements = useElements() 
   const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    amount: 0
   });
   const [paymentStatus, setPaymentStatus] = useState<string>('');

   const navigate = useNavigate();


   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({
     ...formData,
     [name]: name === 'amount' ? parseInt(value) : value,
    })  
}

   const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();


     if (!stripe || !elements) {
        return; // Stripe.js has not loaded yet.
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
        // Convert amount from dollars to cents
        const amountInCents = formData.amount * 100;

        // Call the backend to create a payment intent
        const response = await fetch(`${baseUrl }/payment/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: amountInCents, // Send dynamic amount
                currency: 'usd',
            }),
        });

        const { clientSecret } = await response.json();

        // Confirm the payment on the front-end using the client secret
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: formData.name,
                    email: formData.email,
                },
            },
        });

        if (result.error) {
            // Show error message
            setPaymentStatus(`Payment failed: ${result.error.message}`);
        } else if (result.paymentIntent?.status === 'succeeded') {
            // Show success message
            setPaymentStatus('Payment succeeded!');
        }

        // Reset the form
        setFormData({ name: '', email: '', amount: 0 });

        // Clear the card element
        cardElement.clear();
    } catch (error) {
        setPaymentStatus('Error processing payment.');
    }

   };


    // Redirect to Payment Done page if payment succeeds
    useEffect (() => {
        if (paymentStatus) {
          navigate("/payment-done");
        }
      }, [paymentStatus, navigate]);
  

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
               type="text"
               className="form-control"
               id="name"
               name="name"
               placeholder="Enter your name"
               value={formData.name}
               onChange={handleChange}
               required
            />
         </div>

         <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
               type="email"
               className="form-control"
               id="email"
               name="email"
               placeholder="Enter your email"
               value={formData.email}
               onChange={handleChange}
               required
            />
         </div>

         <div className="form-group mb-3">
            <label htmlFor="amount">Amount</label>
            <input
               type="number"
               className="form-control"
               id="amount"
               name="amount"
               placeholder="Enter amount"
               value={formData.amount}
               onChange={handleChange}
               required
            />
         </div>


         <div className="form-group mb-3">
           <label htmlFor="cardElement">Card Details</label>
             <CardElement id="cardElement" className="form-control" />
         </div>

         <button type="submit" disabled={!stripe}>
            Pay
         </button>
         {paymentStatus && <div className="alert alert-info mt-3">{paymentStatus}</div>}
       </form>
    </div>
  )
}

export default PaymentForm;
