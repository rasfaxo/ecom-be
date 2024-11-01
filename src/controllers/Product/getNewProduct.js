import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";

const getNewProduct = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(5);

    res.status(200).json({
      success: true,
      message: "New products fetched successfully",
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default getNewProduct;
