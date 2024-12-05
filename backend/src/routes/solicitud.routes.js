"use strict";
import { Router } from "express";
import { authorizeRoles } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createSolicitud,
  deleteSolicitud,
  getSolicitud,
  getSolicitudes,
  updateSolicitud,
} from "../controllers/solicitud.controller.js";

const router = Router();

router.use(authenticateJwt)


router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getSolicitudes)          //listo
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getSolicitud)           //listo
  .patch("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), updateSolicitud)        //listo
  .delete("/:id",authorizeRoles("administrador", "mesero","cajero","cocinero"), deleteSolicitud)     //listo
  .post("/create",authorizeRoles("administrador", "mesero","cajero","cocinero"),createSolicitud);  //listo
export default router;