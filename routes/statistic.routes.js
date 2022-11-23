import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getCantDepartmentsDisp, getCantDepartmentsRes, getCantTour, getCantTransport, getGananciaTotal, filtroDepartamento, filtroLocalidad } from "../controllers/stadistic.controller.js";


const router = Router();

router.get("/cant-deptos-disp", getCantDepartmentsDisp);
router.get("/cant-deptos-res", getCantDepartmentsRes);
router.get("/ganancia-total", getGananciaTotal);
router.get("/cant-tour", getCantTour);
router.get("/cant-transport", getCantTransport);
router.get("/report-by-department", filtroDepartamento);
router.get("/report-by-location", filtroLocalidad);
export default router;
