const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', handlebars.engine())

app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = []

// get

app.get('/', (req, res) => {
    res.render('datos', { productos })
})

// post

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log('escuchando en el puerto ' + PORT)
})
server.on("error", error => console.log(error))