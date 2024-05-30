import mongoose from "mongoose";

export interface IUser extends mongoose.Document{
    fullName: string;
    email: string;
    password: string;
    verified: boolean;
    isAdmin: boolean;
    resetPasswordToken: any;
    resetPasswordExpires: any;
    phone: number;
}