import { Router } from "express";

import { loginHandler } from "../controllers/authControllers.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "authorization, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/login", loginHandler);

export default router;
