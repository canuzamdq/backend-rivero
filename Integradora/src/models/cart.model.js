import mongoose from 'mongoose';
import { productSchema } from '../models/product.model.js';

const cartSchema = new mongoose.Schema({
	products: {
		default: [],
		type: [
				{
					product: {
						type: mongoose.Schema.Types.ObjectId,
						ref: 'products',			
					}
				}
		]
	}
  });

cartSchema.pre('find', function() {
	this.populate('products.product')
});


export const cartModel = mongoose.model('carts', cartSchema);

/*const cartSchema = new mongoose.Schema({
	products: {
		type: [productSchema],
		require: false,
		default: [],
	},
});*/