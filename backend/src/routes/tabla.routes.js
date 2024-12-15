import { Router } from "express";
import {
    getTablaDatos,
    getPedidoListo,
    getconsumo,
    getVentasTotal,
    getVentasAnual,
    getVentasProductos,
    getPeriodo
} from "../controllers/tabla.controller.js";

const router = Router();

router
    .get("/all", getTablaDatos)
    .get("/listo", getPedidoListo)
    .get("/consumo/:id_pedido", getconsumo)
    .get("/ventas", getVentasTotal)
    .get("/anual/:date", getVentasAnual)
    .get("/productos", getVentasProductos )
    .get("/periodo", getPeriodo);


export default router;


