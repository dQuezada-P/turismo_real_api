import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { countDepartments } from "../controllers/estadisticControllers.js";

const router = Router();

router.get("/cant-deptos", countDepartments);
export default router;
