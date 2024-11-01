import asyncHandler from "../../middlewares/asyncHandler.js";
import Product from "../../models/productModel.js";

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "produk berhasil dihapus",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default deleteProduct;
