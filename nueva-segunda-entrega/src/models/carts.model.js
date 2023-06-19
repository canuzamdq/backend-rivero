import mongoose from "mongoose";

export const cartShema = new mongoose.Schema({
    products: [
        {
            products: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ]
});

export const cartModel = mongoose.model('carts', cartShema);