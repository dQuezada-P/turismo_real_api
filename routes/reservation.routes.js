import { Router } from "express";
import {
  addReservation,
  getReservation
} from "../controllers/reservation.controller.js";

const router = Router();

router.get("/all", getReservation);

router.post("/", addReservation);

export default router