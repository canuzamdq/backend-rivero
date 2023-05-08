import { Router } from "express";
import ProductManager from "../../productManager.js";

const productsRouter = Router();

const productManager = new ProductManager();

//uso de middleware para que evitar que se modifique o elimine el ID de un producto
productsRouter.use((req, res, next) => {
	// si se recibe el ID en el body se envía emnsaje de error
	if (req.body.id) {
		// Retorno un error
		res.status(403).send('Campo ID reservado. No se puede actualizar o agregar');
	}
	next();
});

// req.query: permite establecer un limite de productos a mostrar. Ej:   http://localhost:8080/api/products/?limit=4
// Si no se especifica limite muestra todos los productos
productsRouter.get('/', async (req, res) =>{
    try {
        let allProducts = await productManager.getProducts();
        let limit = req.query.limit;

        !limit ? res.send(allProducts) : res.send(allProducts.slice(0, limit));

    } catch(err) {
        console.log(err);
    }
    
})

//req.params: permite buscar un producto por su ID EJ: http://localhost:8080/api/products/2
productsRouter.get('/:pid', async (req, res) => {
    try {
        let productById = await productManager.getProductById(parseInt(req.params.pid));
        res.status(201).send(productById);
    }catch(err) {
        console.log(err);
    }
})

// put para modificar productos por su ID
productsRouter.put('/:pid', async (req, res) => {
    try {
        const product = req.body;
        await productManager.updateProduct(parseInt(req.params.pid), product);
        res.status(201).send(product);
    }catch(err){
        console.log(err);
    }
    
})

// post para agregar productos
productsRouter.post('/', (req, res) => {
	const product = req.body;
	productManager.addProduct(product);
	res.status(201).send(product);
});


// delete para eliminar productos por ID
productsRouter.delete('/:pid', (req, res) => {
    productManager.deleteProduct(parseInt(req.params.pid));
    res.status(201).send('Producto eliminado')
})

export { productsRouter };