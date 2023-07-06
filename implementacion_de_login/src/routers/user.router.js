import {Router} from 'express';
import userService from '../services/user.service.js';
import {isAuth, isGuest} from '../middleware/auth.middleware.js';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

usersRouter.post('/auth', isGuest, async (req, res) => {
    const {email, password} = req.body;
    try {
        if (email == 'adminCoder@coder.com' && password == 'adminCod3r123') { // Verifico usario coder
            const user = {
				first_name: 'Coder',
                email: email,
                rol: 'admin',
            }

			req.session.user = user;
			res.redirect('/');
        } else {
            const user = await userService.getByEmail(email);

            // Chequeo de datos
            if (! user)
                throw new Error('Invalid data');  // Existe el usuario?
            
            if (user.password !== password)   // La contraseña es correcta?
                throw new Error('Invalid data');

            // Si todo está bien, guardo el usuario en la sesión
            req.session.user = user;

            // res.status(201).json(user);
            res.redirect('/');
        }


    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

usersRouter.post('/logout', (req, res) => {
    req.session.destroy();
    // res.status(200).json({ message: 'Logged out' });
    res.redirect('/login');
});

export default usersRouter;
