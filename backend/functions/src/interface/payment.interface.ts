import mongoose from "mongoose";

export interface IPayment extends mongoose.Document{
    userId: string;
    orderId: string;
    stripePaymentId: string;
    amount: number;
    currency: string;
    status: string;
}
