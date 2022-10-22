import { Router } from "express";
import { payMercadoPago, webHook } from "../utils/mercadoPago.js";

const router = Router();

router.post("/", payMercadoPago);
router.post('/webhook',webHook)
export default router;
