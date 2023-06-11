import mongoose from "mongoose";
import { productSchema } from "./products.model.js";


const cartSchema = new mongoose.Schema({
    products: {
        type: [productSchema],
        required: false,
        default: []
    }
    
});

export const cartModel = mongoose.model('carts', cartSchema);