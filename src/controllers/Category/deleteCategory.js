import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { CategoryId } = req.params;

    const removedCategory = await Category.findByIdAndRemove(CategoryId);
    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
      data: removedCategory,
    });

    if (!removedCategory) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export { deleteCategory };
