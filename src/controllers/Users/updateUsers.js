import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";

const updateUsers = asyncHandler(async (req, res) => {
  const users = await User.findById(req.user.id);

  if (users) {
    users.username = req.body.username || users.username;
    users.email = req.body.email || users.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      users.password = hashedPassword;
    }

    const updatedUser = await users.save();
    
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ messages: "Pengguna tidak ditemukan" });
  }
});

export { updateUsers };
    