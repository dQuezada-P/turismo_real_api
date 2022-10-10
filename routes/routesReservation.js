import { Router } from "express";
import { createReservation } from "../controllers/reservationControllers.js";

const router = Router();

router.post("/", createReservation);

export default router;
