import { loadStripe } from "@stripe/stripe-js"




export const stripePromise = loadStripe(String(process.env.REACT_APP_STRIPE_SECRET_PUBLISH)) 

