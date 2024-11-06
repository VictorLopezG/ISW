"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProducto,
    deleteproducto,
    getProducto,
    getProductos,
    updateProducto,
} from "../controllers/producto.controller.js";

const router = Router();

router
    .use(authenticateJwt)
    .use(isAdmin);


router
    .get("/all/",getProductos)
    .get("/detail/id/:id",getProducto) // Ids Funciona
    .post("/detail/crearProducto",createProducto)
    .put("/detail/actualizarProducto/id/:id",updateProducto) // Ids
    .delete("/detail/eliminarProductoID/:id",deleteproducto) // Id

export default router;