import { Router } from "express";
import {
  login,
  logout,
  registerUser,
} from "../controllers/auth.controllers.js";
import { validateRequest } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", verifyToken, logout);

export default router;
