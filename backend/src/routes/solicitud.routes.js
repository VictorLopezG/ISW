"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  deleteSolicitud,
  getSolicitud,
  getSolicitudes,
  updateSolicitud,
  createSolicitud,
} from "../controllers/solicitud.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router
  .get("/all", getSolicitudes)          //listo
  .get("/:id", getSolicitud)           //listo
  .put("/:id", updateSolicitud)        //listo
  .delete("/:id", deleteSolicitud)     //listo
  .post("/create",createSolicitud);  //listo
export default router;