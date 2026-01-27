import express, { type Request, type Response } from "express";
import cors from "cors";

// import routes
import healthCheckRouter from "./routes/healthcheck.routes.js";

let app = express();

//Basic config
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Cors config
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/v1/healthCheck", healthCheckRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World from TypeScript!");
});

export default app;
