import mongoose from "mongoose";

export interface IProducts extends mongoose.Document{
   name: string;
   description: string;
   price: string;
   stock: string;
   category: string;
   image: string;
}