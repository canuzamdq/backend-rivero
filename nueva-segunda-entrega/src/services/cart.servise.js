import { cartModel } from "../models/carts.model.js";
import { productService } from "./product.service.js";

class CartService {
    constructor() {
        this.model = cartModel;
    }

    async getAllCarts() {
        return await this.model.find().lean();
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async getCartById(cartId) {
        return await this.model.findOne({ _id: cartId })
    }

    async addProductToCart(cartId, productId) {
		const cart = await this.model.findOne({ _id: cartId });
		const product = await productService.getProductById(productId);
		cart.products.push({product: product});
		return await cart.save();
	}

    async removeCart(cartId) {
        return this.model.deleteOne({ _id: cartId });
    }

}

const cartService = new CartService();
export default cartService;