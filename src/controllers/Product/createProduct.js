import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";
import {
  validateProduct,
  createProductSchema,
} from "../../Validations/Products/Schema.js";
const createProduct = asyncHandler(async (req, res) => {
  try {
    const errorMessage = validateProduct(req.fields, createProductSchema);
    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: "data produk tidak valid",
        errors: errorMessage,
      });
    }
    const product = new Product({ ...req.fields });
    await product.save();

    res.status(201).json({
      success: true,
      message: "produk berhasil dibuat",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default createProduct;
