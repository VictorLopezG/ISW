import { Router } from "express";
import {
    getTablaDatos,
    getPedidoListo


} from "../controllers/tabla.controller.js";

const router = Router();

router
    .get("/all", getTablaDatos)
    .get("/listo", getPedidoListo);


export default router;


