"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
  createPedido,
} from "../controllers/pedido.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/all", getPedidos)          //listo
  .get("/:id", getPedido)           //listo
  .put("/:id", updatePedido)        //listo
  .delete("/:id", deletePedido)     //listo
  .post("/:createP",createPedido);  //listo
export default router;