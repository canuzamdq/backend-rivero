import { Router } from 'express';
import { productService } from '../services/product.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const data = await productService.getAllProducts();
		console.log(data)
		res.render('products', data);
	} catch (error) {
		res.render('error');
	}
});

export default viewsRouter;
