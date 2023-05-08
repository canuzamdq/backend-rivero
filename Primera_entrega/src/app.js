import express from 'express';
import { productsRouter } from './routes/products.router.js';


// Creo app Express
const app = express();

// Seteo carpeta public como raiz de servidor estatico
app.use(express.static('public'));

// Middelare para parseo de json
app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

// Utilizo ruta de products para "/api/products"
app.use('/api/products', productsRouter);



// Escucho puero 8080
app.listen(8080, () => {
	console.log('Escuchando puerto 8080...');
});