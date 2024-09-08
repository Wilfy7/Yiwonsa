import React from "react";
import "./PaymentDoneStyles.scss";

const PaymentDone = () => {

  return (
    <div>
     <div className="card">
        <h1 className="tittle">Payment Successful!</h1>
        <p className="message">
          Thank you for your purchase. Your payment has been successfully processed.
        </p>
        <p className="message">
          You will receive a confirmation email with your order details shortly.
        </p>
        <div className="buttonContainer">
          <button className="button" onClick={() => window.location.href = '/home'}>
            Back to Home
          </button>
          <button className="button" onClick={() => window.location.href = '/orders'}>
            View Order Details
          </button>
        </div>
      </div>
    </div>
  )
   
  
}

export default PaymentDone;
