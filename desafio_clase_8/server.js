const express = require ('express');
const { Router } = express;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const productos = [];

const routerProductos = new Router();

routerProductos.get('/', (req, res) => {
    res.json(productos);
})

routerProductos.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const productFound = productos.find((p)=> p.id === id);

    if (productFound) res.json(productFound)
    else res.json({ error : 'producto no encontrado' });
})

routerProductos.post('/', (req, res) => {

    let productosLength = productos.length;
    if (productosLength > 0) {
        let lastProduct = productos[productosLength-1];
        let idMax = lastProduct.id;
        let newId = idMax + 1;

        const newProduct = {...req.body, id: newId};
   
        productos.push(newProduct);  
        res.json(newProduct);
    }else{
        let idMax = 1;
        const newProduct = {...req.body, id: idMax};

        productos.push(newProduct);
        res.json(newProduct);
    }
});

routerProductos.put('/:id', (req, res) => {
    const  id  = parseInt(req.params.id);
    const productFound = productos.find((ele) => ele.id === id)
    if(!productFound) {
        res.json({error : 'producto no encontrado'});
    }else{
        const indexProductFound = productos.indexOf(productFound);
        productos.splice(indexProductFound, 1, {...productFound,...req.body, id : id});
        res.json("Producto modificado correctamente");
    }
})

routerProductos.delete('/:id', (req, res) => {

    const id  = parseInt(req.params.id);

    const productFound = productos.find((p)=> p.id === id);

    if (!productFound) {
        res.json({ error : 'producto no encontrado' })
    }else{
        const indexProductFound = productos.indexOf(productFound);
        productos.splice(indexProductFound, 1);
        res.json("Producto eliminado correctamente");
    }
})


app.use ("/api/productos/", routerProductos)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('escuchando en el puerto ' + PORT)
})
server.on("error", error => console.log(error))

