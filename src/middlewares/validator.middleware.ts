import { NextFunction, Request, Response } from "express";
import { z, ZodObject } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const validateRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ApiError(
          422,
          "Validation Failed",
          error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        );
      }
      next();
    }
  };
};
