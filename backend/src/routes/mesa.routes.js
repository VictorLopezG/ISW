"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteMesa,
  getMesa,
  getMesas,
  updateMesa,
  createMesa,
} from "../controllers/mesa.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/all", getMesas) //listo
  .get("/:id", getMesa) //listo
  .put("/:id", updateMesa) //
  .delete("/:id", deleteMesa) // listo
  .post("/createM",createMesa); //listo
export default router;