import { Router } from "express";
import healthRoutes from "../routes/healthcheck.routes.js";
import authRoutes from "../routes/auth.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);

export default router;
