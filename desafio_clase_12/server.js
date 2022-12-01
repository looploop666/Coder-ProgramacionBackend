const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const handlebars = require('express-handlebars')
const Contenedor = require('./contenedor.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.engine('handlebars', handlebars.engine())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'handlebars')

const productsFile = new Contenedor("products.txt");
const messagesFile = new Contenedor("messages.txt");

// get

app.get('/', async (req, res) => {
    const products = await productsFile.getAll();
    res.render('index', { products });
})

io.on('connection', async (socket) => {
    console.log('Usuario Conectado');

    const products = await productsFile.getAll();
    const messages = await messagesFile.getAll();

    socket.emit('products', products);
    socket.emit('messages', messages);

    socket.on('newProduct', async (data) => {
        await productsFile.save(data);
        io.sockets.emit('products', await productsFile.getAll());
    })

    socket.on('newMessage', async (data) => {
        await messagesFile.save(data);
        io.sockets.emit('messages', await messagesFile.getAll());
    })
});

httpServer.listen(3000, () => console.log('SERVER ON'));