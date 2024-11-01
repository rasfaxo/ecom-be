import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";

const getTopProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);

    res.status(200).json({
      success: true,
      message: "Top products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default getTopProduct;
