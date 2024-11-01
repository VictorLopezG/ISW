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
  .get("/", getMesas)
  .get("/detail/", getMesa)
  .patch("/detail/", updateMesa)
  .delete("/detail/", deleteMesa);

export default router;