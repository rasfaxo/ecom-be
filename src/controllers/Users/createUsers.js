import { request, response } from "express";
import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import Token from "../../utils/tokenization/createToken.js";

const createUsers = asyncHandler(async (req = request, res = response) => {
    const { username, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashPassword });

  if (!username || !email || !password) {
    res.status(400).send("Mohon isi semua field");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400).send("Email sudah terdaftar");
  }

  try {
    await newUser.save();
    Token(res, newUser._id);
    res.status(201).send({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin

    });
  } catch (error) {
    res.status(400).send("Data pengguna tidak valid");
  }
});

export { createUsers };
