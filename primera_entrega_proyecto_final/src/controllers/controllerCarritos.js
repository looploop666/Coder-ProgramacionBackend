import { carContenedor } from "../routers/routerCarritos.js";
import { prodContenedor } from "../routers/routerProductos.js";

export async function postCart(req, res) {
    const newCart = { timestamp: Date.now(), productos: [] };
    const idNewCart = await carContenedor.save(newCart);
    res.status(201).json({ id: idNewCart });
}

export async function deleteCart(req, res) {
    await carContenedor.deleteById(req.params.id);
    res.status(200).json({  message: "Carrito eliminado correctamente" });
}

export async function getProductsInCart(req, res) {
    const cart = await carContenedor.getById(req.params.id);
    res.status(200).json(cart.productos);
}

export async function postProductInCart(req, res) {
    const cartId = req.params.id;
    const productId = req.params.id_prod;

    const cart = await carContenedor.getById(cartId);
    const product = await prodContenedor.getById(productId);

    cart.productos.push(product);
    await carContenedor.updateById(cartId, cart);
    res.status(201).json({message: "Productos agregados exitosamente al carrito"});
}


export async function deleteProductInCart(req, res) {
    const { id, id_prod } = req.params;
    const cart = await carContenedor.getById(id);

    const newCart = cart.productos.filter((producto) => {
        return producto.id != id_prod;
    });
    cart.productos = newCart;
    await carContenedor.updateById(id, cart);
    res.status(201).json({message: "Producto eliminado correctamente del carrito"});
}

export function isCartAvailable(req, res, next) {
    carContenedor.getById(req.params.id)
        ? next()
        : res
            .status(401)
            .json({ error: -3, descripcion: "El carrito no existe" });
}

export function isProductAvailable(req, res, next) {
    prodContenedor.getById(req.params.id_prod) === null
        ? res.status(401).json({ error: -3, descripcion: "El producto no existe" })
        : next();
}

export async function isProductInCart(req, res, next) {
    const cart = await carContenedor.getById(req.params.id);
    const cartProducts = cart.productos;
    const prod = cartProducts.filter((product) => product.id == req.params.id_prod);
    prod.length == 0
        ? res.status(401).json({ error: -3, descripcion: "El producto no se encuentra agregado al carrito" })
        : next();
}