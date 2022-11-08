import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { countDepartments, filtroDepartamento, filtroLocalidad } from "../controllers/stadistic.controller.js";

const router = Router();

router.get("/cant-deptos", countDepartments);
router.get("/report-by-department", filtroDepartamento);
router.get("/report-by-location", filtroLocalidad);
export default router;
