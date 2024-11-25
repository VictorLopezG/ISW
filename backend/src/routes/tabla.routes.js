import { Router } from "express";
import { getTablaDatos } from "../controllers/tabla.controller.js";

const router = Router();

router.get("/all", getTablaDatos);

export default router;


