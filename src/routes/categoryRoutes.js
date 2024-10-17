import express from "express";
import { createCategory } from "../controllers/Category/createCategory.js";
import { updateCategory } from "../controllers/Category/updateCategory.js";
import { deleteCategory } from "../controllers/Category/deleteCategory.js";
import { getCategoryById } from "../controllers/Category/getCategoryById.js";
import { authenticate, authorizeAdmin } from "../middlewares/auth.js";
import { getCategory } from "../controllers/Category/getCategory.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router
  .route("/:categoryId")
  .put(authenticate, authorizeAdmin, updateCategory)
  .delete(authenticate, authorizeAdmin, deleteCategory);
router.route("/categories").get(getCategory);
router.route("/:id").get(getCategoryById);


export default router;

