import { Router } from 'express';
import { cartServices } from '../services/cart.services.js';

const cartRouter = Router();

cartRouter.get('/', async (req, res) => {
	try {
		const cart = await cartServices.getAllCarts();
		res.status(201).send(cart);
	} catch (error) {
		res.status(500).send(error);
	}
});

cartRouter.post('/', async (req, res) => {
	const cart = req.body;
	try {
		const newCart = await cartServices.addCart(cart);
		res.status(201).send(newCart);
	} catch (error) {
		res.status(500).send(error);
	}
});
cartRouter.post('/:cartId', async (req, res) => {
	const cartId = req.params.cartId;
	const productId = req.body.pId;
	try {
		const cartAdd = await cartServices.addProductToCart(cartId, productId);
		res.status(201).send(cartAdd);
	} catch (error) {
		res.status(500).send(error);
	}
});

export default cartRouter;
