import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PaymentDone from "./PaymentDone";
import { useNavigate } from "react-router-dom";

interface FormData {
   cardholder: string;
   email: string;
   amount: number;
}



const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate()
    const [paymentError, setPaymentError] = useState<string>();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData,setFormData] = useState<FormData>({
      cardholder: "",
      email: "",
      amount: 0
    })

     


    const handleChange = async (e: React.FormEvent<HTMLInputElement>) => {
      const { name, value }: any = e.target;
      setFormData({
         ...formData,
         [name]: name === "amount" ? parseInt(value) : value
      });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
        
     if(!stripe || !elements) {
        //Stripe not loaded yet
        return;
     }
     const cardElement = elements.getElement(CardElement)
     console.log(cardElement)
     if(!cardElement)  {    
       return;
     }
         
     const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
     });

     if(error) {
        setPaymentError("error");
     } else {
        setPaymentSuccess(true);
        setPaymentError("");
     }
    };


    useEffect(() =>{
      if (paymentSuccess) {
 
        navigate("/payment-done")
      }
       }, [paymentSuccess, navigate])
    

  return (
    <div className="">
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
          <label htmlFor="email">email</label>
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
         <CardElement />
        <button type="submit" disabled={!stripe}>
            Pay
        </button>
        {paymentError && <div>{paymentError}</div> }
        {paymentSuccess && <div>Payment successful!</div>}
      </form>
   </div>

  )
}

export default CheckoutForm;
