import { Router } from "express";
import {
  addReservation,
  getReservations,
  getReservation
} from "../controllers/reservation.controller.js";

const router = Router();

router.get("/all", getReservations);
router.get("/", getReservation);

router.post("/", addReservation);

export default router