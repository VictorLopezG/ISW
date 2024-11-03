"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import pedidoRoutes from "./pedido.routes.js";
import mesaRoutes from "./mesa.routes.js";
import productoRoutes from "./producto.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/ped",pedidoRoutes)
    .use("/mesa",mesaRoutes)
    .use("/producto",productoRoutes);
export default router;