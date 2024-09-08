import mongoose from "mongoose";
import { IRestuarant } from "../interface/restaurant.interface";


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide restaurant name"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "Please provide the restaurant's address"],
        trim: true
    },
    postalCode: {
        type: Number,
        required: [true, "please provide your postal code"],
        trim: true
    },
    email:{
       type: String,
       required: [true, "please provide restaurant's email address"]
      },
    image:{
        type: String,
        trim: true
    }
})


const Restaurant = mongoose.model<IRestuarant>("Restaurant", restaurantSchema);

export default Restaurant;