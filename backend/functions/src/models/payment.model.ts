import mongoose from "mongoose"; 
import { IPayment } from "../interface/payment.interface";



export const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    stripePaymentId: { type: String },
    currency: { type: String, required: true },
    amount: { type: Number },
    status: { type: String },
 }, {timestamps: true
});


const Payment = mongoose.model<IPayment>("Payment", paymentSchema);

export default Payment;