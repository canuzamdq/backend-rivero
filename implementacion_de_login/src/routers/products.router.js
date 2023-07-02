import {Router} from "express";
import {productService} from "../services/product.service.js";
import { isAuth } from "../middleware/auth.middleware.js";

const producRouter = Router();

/* 
Obtiene los productos. Se pueden pasar los siguientes parametros por URL:
limit = establece un limite de productos a mostrar por página
page = establece que pagina se quiere visualizar
category = filtra los productos por su categoría
sort = ordena por precio ascentende (sort=ascen) o precio descendente (sort=desc)
*/
producRouter.get('/', isAuth, async (req, res) => { // Middleware isAuth no permite ver los productos si el usuario no está logueado
    const {limit, page, status, category, sort} = req.query;

    try {
        const data = await productService.getAllProducts(limit, page, status, category, sort);
        // Agrega status y category a docs
        data.status = status;
        data.category = category;
       
        res.status(201).render('products', data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Obtiene un producto por su ID
producRouter.get('/:productId', async (req, res) => {
    let productId = req.params.productId;
    try {
        const product = await productService.getProductById(productId);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Carga un producto nuevo
producRouter.post('/', async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productService.addProduct(product);
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Modifica un producto existente
producRouter.put('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const product = req.body;

    try {
        const updateProduct = await productService.updateProduct(productId, product);
        res.status(201).send(updateProduct);
    } catch (err) {
        res.status(500).send(err);
    }
})

// Borra un producto
producRouter.delete('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productService.deletePruduct(productId);
        res.status(201).send(deletedProduct);
    } catch (err) {}
})

export default producRouter;
