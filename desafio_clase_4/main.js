const { Contenedor } = require('./contenedor.js');

const contenedor = new Contenedor('./productos.txt');

const product =
{
    title: 'Cuaderno de notas',
    price: 789,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}

contenedor.save(product)
    .then(
        data => {
            console.log(data);
            contenedor.getAll()
                .then(
                    data => {
                        console.log(data);
                        contenedor.getById(1)
                            .then(data => {
                                console.log(data);
                                contenedor.deleteById(5)
                                    .then(data => {
                                        console.log(data);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    })
                .catch(err => {
                    console.log(err);
                });
        })
    .catch(err => {
        console.log(err);
    });
