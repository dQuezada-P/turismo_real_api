import { Router } from "express";

import { loginHandler, confirmAccount } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "authorization, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/login", loginHandler);
router.post("/verify-login", verifyToken);
router.post("/confirm-account", confirmAccount);

export default router;
