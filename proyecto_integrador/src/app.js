import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import productsRouter  from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from '../src/routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Configuración de archivos estáticos
app.use(express.static('public'));

// Configuración de rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Configuración de mongoose
mongoose.connect(
    'mongodb+srv://canuzamdq:boca2011@cluster0.ynmu0on.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

app.listen(8080, () => {
	console.log('Server started on port 8080..');
});