"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
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
    .get("/:id/",getProducto)
    .put("/:id/",updateProducto)
    .delete("/:id/",deleteproducto)

export default router;