import mongoose from "mongoose";
import { IMenu } from "../interface/menu.interface";


export const MenuSchema = new mongoose.Schema({
    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Restaurant" 
    },
    items: [
        {
            name: String,
            price: Number,
            description: String
        }
    ]


});




const Menu = mongoose.model<IMenu>("Menu", MenuSchema );

export default Menu;