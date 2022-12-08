import express from "express";
import Contenedor from "../../contenedor.js";
import admin from "../../index.js"
import { getProducts, postProduct, putProduct, deleteProduct, isProductAvailable } from "../controllers/controllerProductos.js";

const { Router } = express;
const prodRouter = Router();

export const prodContenedor = new Contenedor("./data/productos.txt");

prodRouter.get("/:id?", getProducts);

prodRouter.post("/", isAdmin , postProduct);

prodRouter.put("/:id", isAdmin, isProductAvailable, putProduct);

prodRouter.delete("/:id", isAdmin, isProductAvailable, deleteProduct);

export default prodRouter;

function isAdmin(req, res, next){
    admin 
        ? next() 
        : res.status(401).json({error: -1, descripcion: `ruta \'${req.originalUrl}\' método \'${req.method}\' no autorizada`});
    }

