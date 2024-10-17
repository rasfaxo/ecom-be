import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import { createUsers } from "../controllers/Users/createUsers.js";
import { loginUsers } from "../controllers/Users/loginUsers.js";
import { logoutUsers } from "../controllers/Users/logoutUsers.js";
import { getUsers } from "../controllers/Users/getUsers.js";
import { getCurrentUser } from "../controllers/Users/getCurrentUser.js";
import { updateUsers } from "../controllers/Users/updateUsers.js";
import { deleteUsers } from "../controllers/Users/deleteUsers.js";
import { getUserById } from "../controllers/Users/getUserById.js";
import { updateUserById } from "../controllers/Users/updateUserById.js";
const router = express.Router();

router.route("/").post(createUsers).get(authenticate, authorizeAdmin, getUsers);

router.post("/auth", loginUsers);
router.post("/logout", logoutUsers);

router
  .route("/profile")
  .get(authenticate, getCurrentUser)
  .put(authenticate, updateUsers);

//admin
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUsers)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default router;
