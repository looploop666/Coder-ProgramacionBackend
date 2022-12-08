import { prodContenedor } from "../routers/routerProductos.js";

export async function getProducts(req, res) {
  const id = req.params.id;
  res.status(200).json(
      id? await prodContenedor.getById(id)
        : prodContenedor.getAll()
    );
}


export async function postProduct(req, res) {
  const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
  const newProduct = {
    timestamp: Date.now(),
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock,
  };
  await prodContenedor.save(newProduct);
  res.status(201).json({ message: "Nuevo producto creado"});
}

export async function putProduct(req, res) {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const newProduct = {
      timestamp: Date.now(),
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };
    await prodContenedor.updateById(req.params.id, newProduct);
    res.status(200).json({ message: "Producto actualizado correctamente"});
  }

  export async function deleteProduct(req, res) {
    await prodContenedor.deleteById(req.params.id);
    res.status(200).json({ message: "Producto eliminado correctamente" });
  }

  
  export function isProductAvailable(req, res, next) {
    prodContenedor.getById(req.params.id) == null
      ? res.status(404).json({error: -3, descripcion: "El producto no existe"})
      : next();
  }
