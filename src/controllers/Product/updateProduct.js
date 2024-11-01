import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";
import {
  validateProduct,
  updateProductSchema,
} from "../../Validations/Products/Schema.js";

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const errorMessage = validateProduct(req.fields, updateProductSchema);
    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: "data produk tidak valid",
        errors: errorMessage,
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.fields,
      },
      { new: true }
    );
    await product.save();
    res.status(200).json({
      success: true,
      message: "produk berhasil diubah",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default updateProduct;
