import { cartModel } from "../models/carts.model.js";

class CartServise {
    constructor() {
        this.cartModel = cartModel;
    }


    async getAllCarts() {
		return await this.cartModel.find().lean();
	}

	async addCart(cart) {
		cart.products = [];
		return await this.cartModel.create(cart);
	}


	async getCartId(cid) {
		if (!cid) {
			throw new Error('Falta ID');
		}
		
		return await this.cartModel.findById(cid);
	}

	async addProductToCart(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productService.getProductById(productId);
		cart.products.push(product);

		return await cart.save();
	}

	async deleteCart(cid) {
		if (!cid) {
			throw new Error('Falta ID');
		}
		return await this.cartModel.deleteOne({ _id: pid });
	}
}

export const cartService = new CartServise();