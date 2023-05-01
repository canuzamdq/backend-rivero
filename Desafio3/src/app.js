import express from 'express';
import ProductManager from '../productManager.js'

const app = express();
const productManager = new ProductManager();

app.use(express.urlencoded({extended:true}));   


// req.query: permite establecer un limiete de productos a mostrar. Ej:   http://localhost:8080/products/?limit=4

app.get('/products', async (req, res) =>{
    try {
        let allProducts = await productManager.getProducts();
        let limit = req.query.limit;

        !limit ? res.send(allProducts) : res.send(allProducts.slice(0, limit));

    } catch(err) {
        console.log(err);
    }
    
})

//req params: permite buscar un poructo por su ID- EJ: http://localhost:8080/products/2

app.get('/products/:id', async (req, res) => {
    try {
        let productById = await productManager.getProductById(parseInt(req.params.id));
        res.send(productById);
    }catch(err) {
        console.log(err);
    }
})





app.listen(8080, () => {
    console.log('Escuchando puerto 8080...');
})