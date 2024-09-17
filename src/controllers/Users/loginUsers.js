import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import Token from "../../utils/tokenization/createToken.js";

const loginUsers = asyncHandler(async (req = request, res = response) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isMatch = bcrypt.compare(password, existingUser.password);
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
});

export { loginUsers };
