import mongoose from "mongoose";
import { IOrder } from "../interface/order.interface";


export const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drivers",
    },
    items: 
        {
         type: Array,
         productName: String,
         productId: String, 
         quantity: Number
        },
    address: {type: String},
    totalAmount: {type: Number},
    status: {
        type: String,
        enum: ["pending", "dispatched", "delivered"],
        default: "pending"
    }, 
    
}, { timestamps: true });


const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;