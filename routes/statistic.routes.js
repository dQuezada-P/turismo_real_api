import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { filtroDepartamento, filtroLocalidad } from "../controllers/stadistic.controller.js";


const router = Router();

// router.get("/cant-deptos", getCantDepartments);
router.get("/report-by-department", filtroDepartamento);
router.get("/report-by-location", filtroLocalidad);
export default router;
