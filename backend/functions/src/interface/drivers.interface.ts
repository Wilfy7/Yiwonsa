import mongoose from "mongoose";

export interface IDrivers extends mongoose.Document{
    name: string;
    vehicle: string;
    available: boolean;
    location: string;

}