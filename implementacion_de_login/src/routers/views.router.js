import { Router } from 'express';
import { isAuth, isGuest } from '../middleware/auth.middleware.js';
import {productService} from "../services/product.service.js";

const viewsRouter = Router();

viewsRouter.get('/', isAuth, async (req, res) => {
	const { user } = req.session;
	delete user.password;
	const {limit, page, status, category, sort} = req.query;
	try {
        const data = await productService.getAllProducts(limit, page, status, category, sort);
        // Agrega status y category a docs
        data.status = status;
        data.category = category;
        res.status(201).render('products', { user }, data);
    } catch (err) {
        res.status(500).send(err);
    }
	
});

viewsRouter.get('/register', isGuest, (req, res) => {
	res.render('register', {
		title: 'Registrar Nuevo Usuario',
	});
});

viewsRouter.get('/login', isGuest, (req, res) => {
	res.render('login', {
		title: 'Inicio de Sesión',
	});
});



export default viewsRouter;
