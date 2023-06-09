import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import cartRouter from './routers/cart.router.js';
import productRouter from './routers/product.router.js';
import chatRouter from './routers/chat.router.js';
import viewsRouter from './routers/views.router.js';

import { productService } from './services/product.services.js'; 
import { chatServices } from './services/chat.services.js';

const app = express();
const messages = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de handlebars

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Configuración de archivos estáticos
app.use(express.static('public'));

// Configuración de rutas
app.use('/api/products', productRouter);
app.use('/', viewsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', chatRouter)

// Configuración de mongoose
mongoose.connect(
	'mongodb+srv://canuzamdq:boca2011@cluster0.ynmu0on.mongodb.net/ecommerce?retryWrites=true&w=majority'
);

const server = app.listen(8080, () => {
	console.log('Server started on port 8080');
});

const io = new Server(server);

io.on('connection', async (socket) => {
	try {
		socket.emit('realTimeProducts', await productService.getAllProducts());
	} catch (error) {
		console.log(error);
	}


	socket.on('carga', async (product) => {
		try {
			const newProduct = await productService.addProduct(product);
			const updatedProducts = await productService.getAllProducts();

			io.emit('realTimeProducts', updatedProducts);
		} catch (error) {
			console.log(error);
		}
	});
	try {
			// Envio los mensajes al cliente que se conectó
	socket.emit('messages', messages);
	} catch(err) {
		console.log(err)
	}


	socket.on('message', async (message) => {
		try {
		  const chatData = {
			user: message.user,
			message: message.msj,
		  };
		  // Agrego el mensaje al array de mensajes
		  messages.push(message);
	  
		  // Propago el evento a todos los clientes conectados
		  io.emit('messages', messages);
	  
		  // Guardo el chat en la base de datos
		  await chatServices.saveChat(chatData);
	
		} catch (err) {
		  console.log(err);
		}
	  });
	  

	socket.on('sayhello', (data) => {
		socket.broadcast.emit('connected', data);
	});
});




