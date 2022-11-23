const express = require('express');

const app = express();

const productos = [];

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'pug');
app.set("views", "./views");

// get

app.get('/', (req, res) => {
    res.render('producto', { productos })
});

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('escuchando en el puerto ' + PORT)
})
server.on("error", error => console.log(error))