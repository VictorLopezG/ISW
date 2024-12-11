"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import pedidoRoutes from "./pedido.routes.js";
import mesaRoutes from "./mesa.routes.js";
import productoRoutes from "./producto.routes.js";
import solicitudRoutes from "./solicitud.routes.js";
import tablaRoutes from "./tabla.routes.js";
import emailRoutes from "./email.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/ped",pedidoRoutes)
    .use("/mesa",mesaRoutes)
    .use("/producto",productoRoutes)
    .use("/sol",solicitudRoutes)
    .use("/tabla", tablaRoutes)
    .use("/email", emailRoutes);
    
    
export default router;