import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departmentControllers.js";

const router = Router();

router.get("/all", [ verifyToken ], getDepartments);
router.get("/", getDepartment);
router.post("/", addDepartment);
router.put("/", editDepartment);
router.delete("/", deleteDepartment);
 export default router;
