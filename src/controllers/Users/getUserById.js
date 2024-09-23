import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";

const getUserById = asyncHandler (async (req, res)=>{
    const users = await User.findById(req.params.id).select('-password');
    
    if(users){
        res.json(users);
    } else {
        res.status(404).json({messages: "Pengguna tidak ditemukan"});
    }
})

export { getUserById };