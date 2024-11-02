"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteMesa,
  getMesa,
  getMesas,
  updateMesa,
} from "../controllers/mesa.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/all", getMesas)
  .get("/id:/", getMesa)
  .patch("/id:/", updateMesa)
  .delete("/id:/", deleteMesa);

export default router;