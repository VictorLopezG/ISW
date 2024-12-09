import { Router } from "express";
import {
    getTablaDatos,
    getPedidoListo,
    getconsumo
} from "../controllers/tabla.controller.js";

const router = Router();

router
    .get("/all", getTablaDatos)
    .get("/listo", getPedidoListo)
    .get("/consumo/:id_pedido", getconsumo);


export default router;


