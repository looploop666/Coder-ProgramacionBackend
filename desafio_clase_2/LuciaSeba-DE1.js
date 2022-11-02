
class Usuario {

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [libros];
        this.mascotas = [mascotas];
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }

    countMascotas(){
        return this.mascotas.length;
    }
    
    addBook(nombre, autor){

        const libro = {
            nombre: nombre,
            autor: autor
        }

        this.libros.push(libro);

    }

    getBookNames(){
        const librosPorNombre = this.libros.map(libro => libro.nombre);
        return librosPorNombre;
      
    }

}

const nuevoLibro1 = {
    nombre:'Evangelion 1.0',
    autor: 'Ikari Gendo'
};
const nuevaMascota = 'gato';
const usuario1 = new Usuario('Rei', 'Ayanami', nuevoLibro1, nuevaMascota);

usuario1.addBook('Evangelion 2.0','Ikari Gendo');
usuario1.addBook('Evangelion 3.0','Ikari Gendo');
usuario1.addMascota('perro');
usuario1.addMascota('hamster');

const cantMascotasUsuario1 = usuario1.countMascotas();

const librosPorNombreUsuario1 = usuario1.getBookNames();

const usuario1NombreCompleto = usuario1.getFullName();

console.log(usuario1);
console.log("Nombre Completo: " + usuario1NombreCompleto);
console.log("Libros según Nombre: " + librosPorNombreUsuario1);
console.log("# de Mascotas: " + cantMascotasUsuario1);


