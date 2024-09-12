import React from "react";
import "./PaymentStyles.scss";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../config/stripeConfig";



const Payment = () => {
  return (
      <div className="payment-container">
        <h6>Pay Here
        </h6>
        <Elements stripe = {stripePromise} >
          <PaymentForm/>
        </Elements>
      </div>
  )
}

export default Payment;
