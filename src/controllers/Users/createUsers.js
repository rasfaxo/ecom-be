import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import Token from "../../utils/tokenization/createToken.js";
import bcrypt from "bcryptjs";
import {
  createUserSchema,
  validateUser,
} from "../../Validations/Users/schema.js";

const createUsers = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const errorMessage = validateUser(req.body, createUserSchema);

  if (errorMessage) {
    return res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json({ message: "Email sudah terdaftar" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    Token(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json({ message: "Kesalahan server saat membuat pengguna" });
  }
});

export { createUsers };
