import { Router } from "express";
import {
    getTablaDatos,
    getPedidoListo,
    getconsumo,
    getVentasTotal,
    getVentasAnual
} from "../controllers/tabla.controller.js";

const router = Router();

router
    .get("/all", getTablaDatos)
    .get("/listo", getPedidoListo)
    .get("/consumo/:id_pedido", getconsumo)
    .get("/ventas", getVentasTotal)
    .get("/anual", getVentasAnual);


export default router;


