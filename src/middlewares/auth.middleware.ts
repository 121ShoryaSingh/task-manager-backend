import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const veryfyToken = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Unauthorized request", []);
  }
  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    ) as JwtPayload;

    const userData = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationTokenExpiry -emailVerificationToken",
    );

    if (!token) {
      throw new ApiError(401, "Invaled access token", []);
    }

    req.user = userData;
  } catch (error) {
    throw new ApiError(401, "Invaled access token", []);
  }
});
