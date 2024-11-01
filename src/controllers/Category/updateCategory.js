import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";
import {
  validateCategory,
  updateCategorySchema,
} from "../../Validations/Category/schema.js";

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    const errorMessage = validateCategory(req.body, updateCategorySchema);

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
    category.name = name;
    const updatedCategory = await category.save();
    res.status(200).json({
      success: true,
      message: "Kategori berhasil diupdate",
      data: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { updateCategory };
