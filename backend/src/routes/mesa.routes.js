"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createMesa,
  deleteMesa,
  getMesa,
  getMesas,
  updateMesa,
} from "../controllers/mesa.controller.js";

const router = Router();

router.use(authenticateJwt);

router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getMesas) 
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getMesa) 
  .put("/:id",authorizeRoles("administrador"), updateMesa) 
  .delete("/:id",authorizeRoles("administrador"), deleteMesa) 
  .post("/createM",authorizeRoles("administrador"),createMesa);
export default router;