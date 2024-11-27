"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
  createPedido,
} from "../controllers/pedido.controller.js";

const router = Router();

router.use(authenticateJwt)

router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedidos)          //listo
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedido)           //listo
  .put("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), updatePedido)        //listo
  .delete("/:id",authorizeRoles("administrador","cajero","cocinero"), deletePedido)     //listo
  .post("/:createP",authorizeRoles("administrador", "mesero","cajero","cocinero"),createPedido);  //listo
export default router;