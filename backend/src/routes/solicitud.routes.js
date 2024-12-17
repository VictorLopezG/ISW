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
  getSolicitudesByPedido
} from "../controllers/solicitud.controller.js";

const router = Router();

router.use(authenticateJwt)


router
  .get("/all",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getSolicitudes)          
  .get("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getSolicitud)
  .get("/",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), getSolicitudesByPedido)           
  .patch("/:id",authorizeRoles("administrador", "mesero","usuario","cajero","cocinero"), updateSolicitud)        
  .delete("/:id",authorizeRoles("administrador", "mesero","cajero","cocinero"), deleteSolicitud)     
  .post("/create",authorizeRoles("administrador", "mesero","cajero","cocinero"),createSolicitud);  
export default router;