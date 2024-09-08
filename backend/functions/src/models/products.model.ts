import mongoose from "mongoose";
import { IProducts } from "../interface/products.interface";


export const productSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Restarant",
        required: true
    },
    description: {type: String},
    price: {type: String, required: true},
    stock: {type: String, required: true},
    category: {type: String},
    image: {type: String, required: true, trim: true}
 }, { timestamps: true});



 const Products = mongoose.model<IProducts>("Prodcts", productSchema);

 export default Products;