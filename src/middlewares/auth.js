import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;
  // Get token from header
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.exp < Date.now() / 1000) {
        return res
          .status(401)
          .json({ messages: "token sudah kadaluarsa, silahkan login kembali" });
      }
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      return res
        .status(401)
        .json({ messages: "tidak terotorisasi, token tidak valid" });
    }
  } else {
    return res
      .status(401)
      .json({ messages: "tidak terotorisasi, token tidak ada" });
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ messages: "tidak terotorisasi, bukan admin" });
  }
};

export { authenticate, authorizeAdmin };
