import mongoose from "mongoose";


export interface IOrder extends mongoose.Document{
   userId: string;
   items: [];
   totalAmount: number;
   address: string;
   status: string;
   driverId: string;
}