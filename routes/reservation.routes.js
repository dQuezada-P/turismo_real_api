import { Router } from "express";
import {
  addReservation,
  getReservations,
  getReservation,
  checkInReservation,
  checkOutReservation
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all", getReservations);
router.get("/", getReservation);

router.post("/", verifyToken, addReservation);

router.put("/checkin", checkInReservation);
router.put("/checkout", checkOutReservation);

export default router;
