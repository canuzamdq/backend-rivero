import { Router } from 'express';
import { chatServices } from '../services/chat.services.js';

// Instanciamos el router
const chatRouter = Router();

// Definimos la ruta para el home
chatRouter.get('/', (req, res) => {
	// Renderizamos la vista index
	res.render('chat');
});

chatRouter.get('/savedchats/', async (req, res) => {
	res.send(chatServices.getChat());
});

// Exportamos el router
export default chatRouter;
