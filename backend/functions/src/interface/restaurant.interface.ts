import mongoose from "mongoose";


export interface IRestuarant extends mongoose.Document{
    name: string;
    address: string;
    postalCode: number;
    email: string;
    image: string;
}



