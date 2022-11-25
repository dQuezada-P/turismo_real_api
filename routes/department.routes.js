import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import {
  getDepartments,
  getDepartment,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../controllers/department.controller.js";

const router = Router();

router.get("/all", getDepartments);
router.get("/", getDepartment);
router.post("/", addDepartment);
router.put("/", editDepartment);
router.delete("/:id", deleteDepartment);
export default router;
