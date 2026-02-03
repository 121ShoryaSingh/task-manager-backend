import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";
import { validateRequest } from "../middlewares/validator.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), registerUser);

export default router;
