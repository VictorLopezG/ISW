"use strict";
import { Router } from "express";
import { isAdmin, isCocinero } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createSolicitud,
  deleteSolicitud,
  getSolicitud,
  getSolicitudes,
  updateSolicitud,
} from "../controllers/solicitud.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin)
  .use(isCocinero);

router
  .get("/all", getSolicitudes)          //listo
  .get("/:id", getSolicitud)           //listo
  .put("/:id", updateSolicitud)        //listo
  .delete("/:id", deleteSolicitud)     //listo
  .post("/create",createSolicitud);  //listo
export default router;