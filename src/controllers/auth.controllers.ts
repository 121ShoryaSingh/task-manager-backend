import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
});
