import { Request, Response } from "express";
import Payment from "../models/payment.model";
import Stripe from "stripe";


const secret_stripeKey = String(process.env.STRIPE_SECRET_KEY)

const stripe = new Stripe(secret_stripeKey, {
    apiVersion: "2024-04-10"
});


export const createPayment = async (req: Request, res: Response) => {

 const {amount, currency} = req.body;

    try {
    //Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
    });
    
    
    //Return the client secret for frontend
    const paymentIntentResponse = paymentIntent.client_secret;
    res.status(200).send({ 
      clientSecret: paymentIntentResponse 
    });
     return
     
    } catch (error: any) {
      return res.status(500).json({
      message: "Server error"
      });  
    }
}; 


export const getAllPayment = async (req: Request, res: Response) => {
    try {
        //Get all payments from the database
        const allPayments = await Payment.find({});

        if(!allPayments) {
            res.status(400).json({
                message: "Payments could not be fetched"
            });
        }

        return res.status(200).json({
            message: "All payments fetched successfully",
            data: allPayments
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      });  
    }
};

export const getSinglePayment = async (req: Request, res: Response) => {
    try {
        //Get the id of the payment from the request params
        const { id } = req.params;

        const existingPayment = await Payment.findById(id);

        if(!existingPayment) {
            return res.status(400).json({
                message: "No such payment made"
            });
        }

        return res.status(200).json({
            message: "Payment Fetched successfully",
            data: existingPayment
        });

    } catch (error) {
      return res.status(500).json({
        message: "Server error"
      }); 
    }
};