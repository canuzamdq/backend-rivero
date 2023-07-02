import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import userRouter from './routers/user.router.js';
import viewsRouter from './routers/views.router.js';
import productRouter from './routers/products.router.js';
import cartRouter from './routers/carts.router.js';


const app = express();

app.use(express.json());
// Utilizamos el middleware para parsear los datos de la petición
app.use(express.urlencoded({extended: true}));

// Set handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', 'views/');

// Seteo el directorio de archivos estáticos
app.use(express.static('public'));

// Middleware cookies parser
//app.use(cookieParser());
app.use(cookieParser('B2zdY3B$pHmxW%'));

// Session
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				'mongodb+srv://canuzamdq:boca2011@cluster0.ynmu0on.mongodb.net/ecommerce?retryWrites=true&w=majority',
			mongoOptions: {
				useNewUrlParser: true,
			},
			ttl: 6000,
		}),
		secret: 'B2zdY3B$pHmxW%',
		resave: true,
		saveUninitialized: true,
	})
);

mongoose.connect(
    'mongodb+srv://canuzamdq:boca2011@cluster0.ynmu0on.mongodb.net/ecommerce?retryWrites=true&w=majority'
);


//Routes
app.use('/', viewsRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
// app.use('/', realtimeProducts )
// app.use('/api/chat', chatRouter);

app.listen(8080, () => {
    console.log('Escuchando puerto 8080...');
});
