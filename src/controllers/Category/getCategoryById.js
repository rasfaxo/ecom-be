import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";

const getCategoryById = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById({ _id: req.params.id });
    res.status(200).json({
      success: true,
      message: "Berhasil mengambil data kategori",
      data: category,
    });

    if (!category) {
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

export { getCategoryById };
