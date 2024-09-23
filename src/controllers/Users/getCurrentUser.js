import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";

const getCurrentUser = asyncHandler(async (req, res)=>{
    const users = await User.findById(req.user._id);

    if (users) {
        res.json({
            _id: users._id,
            username: users.username,
            email: users.email
        });
    } else {
        res.status(404).json({messages: "Pengguna tidak ditemukan"})
    }


})

export { getCurrentUser };