import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";
import {
  createCategorySchema,
  validateCategory,
} from "../../Validations/Category/schema.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const errorMessage = validateCategory(req.body, createCategorySchema);

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori sudah ada",
      });
    }

    const category = await Category.create({ name });

    res.status(201).json({
      success: true,
      message: "Kategori berhasil ditambahkan",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { createCategory };
