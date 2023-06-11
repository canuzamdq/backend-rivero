import { Router } from 'express';
import { productService } from '../../services/product.services.js';

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
	try {
		const products = await productService.getAllProducts();
		res.status(201).send(products);
	} catch (err) {
		res.status(500).send({err});
	}
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const productById = await productService.getProductById(req.params.pid);
        res.status(201).send(productById);
    } catch (err) {
        res.status(500).send(err);
    }
})

productsRouter.post('/', async (req, res) => {
	const product = req.body;
	try {
		const newProduct = await productService.addProduct(product);
		res.status(201).send(newProduct);
	} catch (error) {
		res.status(500).send(error);
	}
});

productsRouter.put('/:pid', async (req, res) => {
	const product = req.body;
	try {
		const updateOne = await productService.updateProduct(req.params.pid, product);
		res.status(201).send(updateOne);
	} catch (err) {
		res.status(500).send(err);
	}
})

export default productsRouter;