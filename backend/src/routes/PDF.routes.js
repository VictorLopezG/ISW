"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import { generatorPDFDiaController } from "../controllers/PDF.controller.js";

const router = Router();

router
    .use(authenticateJwt);

router
    .get("/Dia",authorizeRoles("administrador"), generatorPDFDiaController);

export default router;