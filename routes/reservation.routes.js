import { Router } from "express";
import {
  addReservation,
  getReservations,
  getReservation,
  checkInReservation
} from "../controllers/reservation.controller.js";

const router = Router();

// router.get("/all", getReservations);
router.get("/all", getReservations);
router.get("/", getReservation);

router.post("/", addReservation);

router.put("/checkin", checkInReservation);

export default router