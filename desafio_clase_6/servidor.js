const express = require('express')
const app = express()
const { Contenedor } = require('./contenedor.js');

const contenedor = new Contenedor('./productos.txt');

app.get("/productos", (req, res) => {
        contenedor.getAll()
        .then(products => {
            res.send(JSON.stringify(products));
        })
        .catch(error => {
            throw new Error(error);
        })

    })

app.get("/productoRandom", (req, res) => {
    contenedor.getAll()
    .then(
        products => {
        const productsLength = Object.keys(products).length;
        const randomNumber = Math.floor(Math.random() * (productsLength - 0) + 0);
        res.send(JSON.stringify(products[randomNumber]));
    })
    .catch(error => {
        throw new Error(error);
    })
})

const server = app.listen(8080, () => {console.log('escuchando en el 8080')})
server.on("error", error => console.log(`Error en servidor ${error}`))



