import React from "react";
import "./App.css";
import Index from "./route/Index";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./config/stripeConfig";



function App() {
  return (
    <Elements stripe = {stripePromise} >
    <div className="App">
      <Index />
    </div>
    </Elements>
   
  );
}

export default App;
