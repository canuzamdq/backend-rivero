import { Router } from "express";
import { cartService } from "../../services/cart.servises.js";

const cartsRouter = Router();

cartsRouter.get('/', async (req, res) => {
    try {
        const carts = await cartService.getAllCarts();
        res.status(201).send(carts);
    } catch(err) {
        res.status(500).send(err);
    }
})

cartsRouter.get('/:cid', async (req, res) => {
    try {
        const cartId = await cartService.getCartId(req.params.cid);
        console.log(cartId)
        res.status(201).send(cartId);
    } catch(err) {
        res.status(500).send(err);
    }
    
})

cartsRouter.post('/', async (req, res) => {
    const cart = req.body
    try {
        const newCart = await cartService.addCart(cart);
		res.status(201).send(newCart);
    } catch(err) {
        res.status(500).send(err)
    }
})

cartsRouter.post('/:cartId/products/:pId', async (req, res) => {
	const cartId = req.params.cartId;
	const productId = req.params.pId;
	try {
		const cartAdd = await cartService.addProductToCart(cartId, productId);
		res.send(cartAdd);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default cartsRouter;