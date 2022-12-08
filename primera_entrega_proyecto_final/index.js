import { Router } from "express";
import routerCarritos from "./src/routers/routerCarritos.js"
import routerProductos from "./src/routers/routerProductos.js"


const router = Router();

router.use("/productos", routerProductos);
router.use("/carrito", routerCarritos);

export default router;