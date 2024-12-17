"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createProducto,
    deleteproducto,
    getProducto,
    getProductos,
    updateProducto,
} from "../controllers/producto.controller.js";

const router = Router();

router.use(authenticateJwt);


router
    .get("/all/",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"),getProductos)
    .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"),getProducto) 
    .post("/crearProducto",authorizeRoles("administrador","cajero","cocinero"),createProducto)
    .put("/:id",authorizeRoles("administrador","cajero", "cocinero"),updateProducto) 
    .delete("/eliminarProductoID/:id",authorizeRoles("administrador", "cocinero"),deleteproducto)

export default router;