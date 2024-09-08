import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";



const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide your full name"],
        trim: true,
        minlength: [3, "Fullname must be at least 3 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        trim: true,
        unique: true
    },
    phone: {
        type: String,
        required: [true, "Please provide yuor phone number"],
        trim: true,
        minlength: [10, "Phone number must be 10 digits"]
    },
    password: {
        type: String,
        required: [true, "Please provide your password"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    address : {
        type: String,
        required: [true, "Please provide your address"],
        trim : true,
    },
    postalCode: {
        type: Number,
        required: [true, "Please provide postal code"],
        trim: true
    },
    isAdmin: {
        type: Boolean,
        trim: true,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Number
    },
    imageurl: {
        type: String
    },
},
{timestamps: true}
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;