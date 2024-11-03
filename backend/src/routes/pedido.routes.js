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
  .get("/allP", getPedidos)
  .get("/:idP", getPedido)
  .patch("/:idP", updatePedido)
  .delete("/:idP", deletePedido)
  .post("/:createP",createPedido);
export default router;