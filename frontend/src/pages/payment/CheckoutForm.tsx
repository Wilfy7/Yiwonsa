import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../service/restaurant.service";

interface FormData {
   cardholder: string;
   email: string;
   amount: number;
}

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [paymentError, setPaymentError] = useState<string>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
      cardholder: "",
      email: "",
      amount: 0
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value }: any = e.target;
      if (name === "amount") {
         // Check if the value is a valid number, if not default to 0
         const parsedValue = parseFloat(value);
         setFormData({
             ...formData,
             [name]: isNaN(parsedValue) ? 0 : parsedValue
         });
     } else {
         setFormData({
             ...formData,
             [name]: value
         });
     }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
        
     if(!stripe || !elements) {
        // Stripe.js has not loaded yet.
        return;
     }
     const cardElement = elements.getElement(CardElement);
     if(!cardElement)  {    
       return;
     }

     try {
      // Convert amount to cents
      const amountInCents = formData.amount * 100;

      // Create a PaymentIntent on the backend
      const response = await fetch(`${baseUrl}/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           amount: amountInCents,
           currency: "dkk",
           email: formData.email,
        })
      });

      const paymentData = await response.json();
      
      if (paymentData.error) {
        setPaymentError(paymentData.error);
        return;
      }

      // Confirm the card payment on the frontend
      const { client_secret } = paymentData;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.cardholder,
            email: formData.email,
          },
        },
      });

      if (result.error) {
        // Handle error here
        setPaymentError(`Payment failed: ${result.error.message}`);
      } else {
        if (result.paymentIntent?.status === "succeeded") {
          // Payment successful
          setPaymentSuccess(true);
        }
      }
      // Reset form
      setFormData({cardholder: "", email: "", amount: 0})
     } catch (error) {
       setPaymentError("An error occurred. Please try again.");
     }
    };

    // Redirect to Payment Done page if payment succeeds
    useEffect(() => {
      if (paymentSuccess) {
        navigate("/payment-done");
      }
    }, [paymentSuccess, navigate]);

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="cardholder">Cardholder</label>
            <input
               type="text"
               className="form-control"
               id="cardholder"
               name="cardholder"
               placeholder="Enter your name"
               value={formData.cardholder}
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

         <CardElement />
         <button type="submit" disabled={!stripe}>
            Pay
         </button>

         {paymentError && <div style={{ color: 'red' }}>{paymentError}</div> }
         {paymentSuccess && <div style={{ color: 'green' }}>Payment successful!</div>}
        </form>
      </div>
    );
};

export default CheckoutForm;
