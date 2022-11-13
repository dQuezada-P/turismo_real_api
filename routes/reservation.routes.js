import { Router } from "express";
import {
  addReservation,
  getReservations,
  getReservation,
  checkInReservation,
  checkOutReservation
} from "../controllers/reservation.controller.js";

const router = Router();

router.get("/all", getReservations);
router.get("/", getReservation);

router.post("/", addReservation);

router.put("/checkin", checkInReservation);
router.put("/checkout", checkOutReservation);

export default router