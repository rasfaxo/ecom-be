import asyncHandler from "../../middlewares/asyncHandler.js";

const logoutUsers = asyncHandler(async (req = request, res = response) => {
  res.clearCookie("jwt", "",{
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout berhasil" });
});

export { logoutUsers };