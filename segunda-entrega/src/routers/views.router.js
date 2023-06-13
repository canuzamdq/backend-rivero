import { Router } from 'express';
import { productService } from '../services/product.services.js';

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
	const limit = parseInt(req.query.limit); 
	const page = parseInt(req.query.page);
	try {
		const data = await productService.getAllProducts(limit, page);
		console.log(data) 
		console.log(limit, page)
		res.render('products', data);
	} catch (error) {
		res.render('error');
	}
});

export default viewsRouter;
