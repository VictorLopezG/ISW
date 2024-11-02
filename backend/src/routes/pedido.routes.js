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
  .get("/all", getPedidos)
  .get("/id:/", getPedido)
  .patch("/id:/", updatePedido)
  .delete("/id:/", deletePedido)
  .post("/create/",createPedido);
export default router;