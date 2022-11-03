import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {  filtroAnno } from "../controllers/estadisticControllers.js";

const router = Router();

// router.get("/cant-deptos", countDepartments);
router.get("/report-by-date", filtroAnno);
export default router;
