import express from "express";
const { Router } = express;
import Contenedor from "../../contenedor.js";
import {
  postCart,
  deleteCart,
  getProductsInCart,
  postProductInCart,
  deleteProductInCart,
  isCartAvailable, 
  isProductAvailable, 
  isProductInCart 
} from "../controllers/controllerCarritos.js";

const routerCarrito = Router();

export const carContenedor = new Contenedor("./data/carritos.txt");

routerCarrito.post("/", postCart);

routerCarrito.delete("/:id?", isCartAvailable, deleteCart);

routerCarrito.get("/:id/productos", isCartAvailable, getProductsInCart);

routerCarrito.post("/:id/productos/:id_prod", isCartAvailable, isProductAvailable, postProductInCart);

routerCarrito.delete("/:id/productos/:id_prod", isCartAvailable, isProductInCart, deleteProductInCart);

export default routerCarrito;