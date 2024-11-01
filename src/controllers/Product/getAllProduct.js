import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({})
      .populate("category")
      .limit(10)
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default getAllProduct;
