import { Router } from "express";
import {
  addReservation,
  getReservations,
  getUserReservations,
  getReservation,
  checkInReservation,
  checkOutReservation,
  getServicesByReservation,
  cancelReservation
} from "../controllers/reservation.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all", getReservations);
router.get("/", getReservation);

router.get("/by-user", getUserReservations);

router.post("/", verifyToken, addReservation);

router.put("/checkin", checkInReservation);
router.put("/checkout", checkOutReservation);
router.put("/cancel", cancelReservation);
router.get("/services", getServicesByReservation);



export default router;
