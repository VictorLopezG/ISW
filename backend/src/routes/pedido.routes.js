"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createPedido,
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,

} from "../controllers/pedido.controller.js";

const router = Router();


router.use(authenticateJwt)


router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedidos)          
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedido)           
  .put("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), updatePedido)        
  .delete("/:id",authorizeRoles("administrador","cajero","cocinero"), deletePedido)     
  .post("/:createP",authorizeRoles("administrador", "mesero","cajero","cocinero"),createPedido) 

export default router;