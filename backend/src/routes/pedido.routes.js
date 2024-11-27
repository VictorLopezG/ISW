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

<<<<<<< HEAD
router
  .use(authenticateJwt)

=======
router.use(authenticateJwt)
>>>>>>> f562a39e2337b1ad71a099acacaa7c89e5228d3f

router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedidos)          //listo
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getPedido)           //listo
  .put("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), updatePedido)        //listo
  .delete("/:id",authorizeRoles("administrador","cajero","cocinero"), deletePedido)     //listo
  .post("/:createP",authorizeRoles("administrador", "mesero","cajero","cocinero"),createPedido);  //listo
export default router;