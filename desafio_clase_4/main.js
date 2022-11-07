const { Contenedor } = require('./contenedor.js');

const contenedor = new Contenedor('./productos.txt');


const main = async () => {

const product =
{
    title: 'Cuaderno de notas',
    price: 789,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

let save = await contenedor.save(product);
let getAll = await contenedor.getAll();
console.log(getAll);
let getById = await contenedor.getById(1);
console.log(getById);
let deleteById = await contenedor.deleteById(5); //va a lanzar el error

}

main();