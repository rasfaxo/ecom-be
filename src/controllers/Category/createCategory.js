import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori tidak boleh kosong",
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
