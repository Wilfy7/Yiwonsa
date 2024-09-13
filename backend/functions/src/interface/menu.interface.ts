import mongoose from "mongoose";


export interface IMenu extends mongoose.Document {
   name: string;
   price: number;
   description: string; 
}