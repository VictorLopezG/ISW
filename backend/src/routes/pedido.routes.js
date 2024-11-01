"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deletePedido,
  getPedido,
  getPedidos,
  updatePedido,
} from "../controllers/pedido.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/", getPedidos)
  .get("/detail/", getPedido)
  .patch("/detail/", updatePedido)
  .delete("/detail/", deletePedido);

export default router;