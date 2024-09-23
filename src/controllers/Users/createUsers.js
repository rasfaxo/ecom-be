import { request, response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import Token from "../../utils/tokenization/createToken.js";
import bcrypt from "bcryptjs";

const createUsers = asyncHandler(async (req = request, res = response) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashPassword });

  if (!username || !email || !password) {
    res.status(400).json({ message: "Mohon isi semua field" });
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).json({ message: "Email sudah terdaftar" });
  }

  try {
    await newUser.save();
    Token(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin
    });
  } catch (error) {
    res.status(400).json({ message: "Data pengguna tidak valid" });
  }
});

export { createUsers };
