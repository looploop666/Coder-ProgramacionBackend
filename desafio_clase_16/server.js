import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import handlebars from 'express-handlebars';
import { optionsMDB, optionsSqlite3 } from "./options/mysqlconn.js";
import ClienteSQL from "./sqlContainer.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const productos = new ClienteSQL(optionsMDB, "productos");
const mensajes = new ClienteSQL(optionsSqlite3, "mensajes");

app.engine('handlebars', handlebars.engine())
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'handlebars')

productos.crearTabla("productos");
mensajes.crearTabla("mensajes");

// get

app.get('/', async (req, res) => {
    const products = await  productos.getAll("productos");
    res.render('index', { products });
})

io.on('connection', async (socket) => {
    console.log('Usuario Conectado');

    const products = await productos.getAll("productos");
    const messages = await mensajes.getAll("mensajes");

    socket.emit('products', products);
    socket.emit('messages', messages);

    socket.on('newProduct', async (data) => {
        await productos.save(data, "productos");
        io.sockets.emit('products', await productos.getAll("productos"));
    })

    socket.on('newMessage', async (data) => {
        await mensajes.save(data, "mensajes");
        io.sockets.emit('messages', await mensajes.getAll("mensajes"));
    })
});

httpServer.listen(3000, () => console.log('SERVER ON'));