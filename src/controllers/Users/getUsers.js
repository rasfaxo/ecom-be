import asyncHandler from "../../middlewares/asyncHandler.js";
import User from "../../models/userModel.js";

const getUsers = asyncHandler(async (req, res)=>{
  const users = await User.find({});
  res.json(users);
});

export { getUsers }; 
