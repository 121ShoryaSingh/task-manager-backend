import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 character"),
  email: z.email("Invalid email address"),
  fullName: z.string().min(1, "Full name is required"),
  password: z.string().min(8, "Password must be at least 8 character"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 character"),
});
