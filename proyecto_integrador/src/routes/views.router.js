import { Router } from 'express';
import { productService } from '../../services/product.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	try {
		const products = await productService.getAllProducts();
		res.render('products', { products });
	} catch (err) {
		res.render('err');
	}
});

export default viewsRouter;