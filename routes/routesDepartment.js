import { Router } from "express";
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/departmentControllers.js";

const router = Router();

router.get("/all", getDepartments);
router.get("/", getDepartment);
router.post("/", addDepartment);
router.put("/", editDepartment);
router.delete("/", deleteDepartment);
 export default router;
