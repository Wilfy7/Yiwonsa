import mongoose from "mongoose";
import { IDrivers } from "../interface/drivers.interface";



export const driversSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
    },
    vehicle: {
        type: String,
        required: [true, "Please provide vehicle"],
        trim: true
    },
    available: {
        type: Boolean,
        default: true
    },
    location: {
        type: {type: String, enum: ["Point"], default: "Point"}, 
        coordinates: [Number] }
    }, {timestamps: true
});

const Drivers = mongoose.model<IDrivers>("Drivers", driversSchema);

export default Drivers;