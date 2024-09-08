import React from "react";
import CheckoutForm from "./CheckoutForm";
import "./PaymentStyles.scss";


const Payment = () => {
  return (
      <div className="payment-container">
        <h6>Pay Here
        </h6>
        <CheckoutForm />
      </div>
  )
}

export default Payment;
