import {cartModel} from "../models/carts.model.js";
import {productService} from "./product.service.js";

class CartService {
    constructor() {
        this.model = cartModel;
    }

    async getAllCarts() {
        return await this.model.find().lean().populate('products.product');
    }

    async addCart(cart) {
        return await this.model.create(cart);
    }

    async getCartById(cartId) {
        try {
            const cart = await this.model.findById(cartId).populate('products.product');;
            if (! cart) {
                throw error('Carrito no encontrado');
            }
            return cart;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    async addProductToCart(cartId, productId, quantity) {
      try {
        const cart = await this.model.findById(cartId);
       
        if (!cart) {
          throw new Error('Carrito no encontrado');
        }

        const product = await productService.getProductById(productId);
        let parsedQuantity = parseInt(quantity);
    
        if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
          parsedQuantity = 1;
        }
    
        let existingProduct = cart.products.find((item) => item.product.toString() === productId);
        if (existingProduct) {
          existingProduct.quantity += parsedQuantity; // Actualizar la cantidad si el producto ya existe en el carrito
        } else {
          existingProduct = { product: product._id, quantity: parsedQuantity };
          cart.products.push(existingProduct);
        }
    
        return await cart.save();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
    

    async deleteAllProductFromCart(cartId, productId) {
        console.log(cartId, productId)
        try {
            const cart = await this.model.findById(cartId);
            if (! cart) {
                throw new Error('Cart not found');
            }

            const product = await this.model({product: productId});
            if (! product) {
                throw new Error('Product not found');
            }

            cart.products.splice(product);
            await cart.save();

            return cart;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async removeCart(cartId) {
        return this.model.deleteOne({_id: cartId});
    }

}

const cartService = new CartService();
export default cartService;
