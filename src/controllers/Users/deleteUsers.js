import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";

const deleteUsers = asyncHandler(async (req, res) => {
  const users = await User.findById(req.params.id);

  if (users) {
    if (users.isAdmin) {
        res.status(400).json({message: "Admin tidak dapat dihapus"})
    }

    await users.deleteOne({_id: users._id})
    res.status(200).json({message: "Pengguna berhasil dihapus"})
  } else {
    res.status(404).json({message: "Pengguna tidak ditemukan"})
  }
});

export { deleteUsers };
