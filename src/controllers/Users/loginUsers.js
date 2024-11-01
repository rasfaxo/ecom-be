import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import Token from "../../utils/tokenization/createToken.js";
import {
  loginUserSchema,
  validateUser,
} from "../../Validations/Users/schema.js";

const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const errorMessage = validateUser(req.body, loginUserSchema);

  if (errorMessage) {
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      Token(res, existingUser._id);
      res.status(200).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      });
      return;
    }
  }
  res.status(401).json({ message: "Email atau password salah" });
});

export { loginUsers };
