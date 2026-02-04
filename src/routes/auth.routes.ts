import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controllers.js";
import { validateRequest } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);
router.post("/login", validateRequest(loginSchema), login);

export default router;
