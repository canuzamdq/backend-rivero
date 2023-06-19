import {Router} from "express";
import {productService} from "../services/product.service.js";

const producRouter = Router();


producRouter.get('/', async (req, res) => {
    const {limit, page, status, category} = req.query;

    try {
        const products = await productService.getAllProducts(limit, page, status, category);
        // Agrega status y category a docs
        products.status = status;
        products.category = category;
        console.log(products)
        res.status(201).render('products', products);
    } catch (err) {
        res.status(500).send(err);
    }
});

producRouter.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const product = await productService.getProductById(productId);
        res.status(201).send(product);
    } catch (err) {
        res.status(500).send(err);
    }
});


producRouter.post('/', async (req, res) => {
    const product = req.body;
    try {
        const newProduct = await productService.addProduct(product);
        res.status(201).send(newProduct);
    } catch (err) {
        res.status(500).send(err);
    }
})

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

producRouter.delete('/:productId', async (req, res) => {
    const productId = req.params.productId;
    try {
        const deletedProduct = await productService.deletePruduct(productId);
        res.status(201).send(deletedProduct);
    } catch (err) {}
})

export default producRouter;
