import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";

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
