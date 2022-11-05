import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {  filtroDepartamento, filtroLocalidad} from "../controllers/estadisticControllers.js";

const router = Router();

// router.get("/cant-deptos", countDepartments);
router.get("/report-by-department", filtroDepartamento);
router.get("/report-by-place", filtroLocalidad);
export default router;
