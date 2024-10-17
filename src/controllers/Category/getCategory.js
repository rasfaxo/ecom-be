import asyncHandler from "express-async-handler";
import Category from "../../models/categoryModel.js";

const getCategory = asyncHandler (async (req, res) => {
    try {
        const getAllCategory = await Category.find({})

        if(!getAllCategory || getAllCategory.length === 0){
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            })
        }

        res.status(200).json({
            success: true,
            message: "Berhasil mengambil data kategori",
            data: getAllCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

export {getCategory}
