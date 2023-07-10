import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

// Cookie normal
//app.use(cookieParser());

// Signed Cookie
app.use(cookieParser('CoderS3cR3tC0D3'));

app.get('/setSignedCookie', (req, res) => {
    res.cookie('SignedCookie', 'Esta es una cookie muy poderosa', {maxAge:10000, signed:true}).send('SignedCookie');
})

app.get('/getSignedCookie', (req, res) => {
    res.send(req.signedCookies);
})

// Seteo de cookie
app.get('/setCookie', (req, res) => {
    // res.cookie(nombre_de_la_cookie, valor_de_la_cookie), {maxAge: tiempo_de_vida_en_milisegundos}
    res.cookie('CoderCookie', 'Esta es una cookie muy poderosa', {maxAge:10000}).send('cookie_name');
});

// Obtener una cookie
app.get('/getCookies', (req, res) => {
    // Obtenemos las req.cookies y las enviamos al cliente para cooroborar que hay almacenado
    res.send(req.cookies);
})

const server = app.listen(8080, () => {
	console.log('Server started on port 8080');
});

// Borrar una cookie
app.get('/deletecookie', (req, res) => {
    res.clearCookie('CoderCookie').send('Cookie removed');
})
