import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const getProducts = catchAsyncErrors (async (req, res) => {

    const products = await Product.find()

    res.status(200).json({
        products,
    });
});

export const newProducts = catchAsyncErrors (async (req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    });
});

export const getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req?.params?.id);

    if (!product) {
      return next (new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        product,
    });
};

export const updateProduct = catchAsyncErrors (async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if (!product) {
        return next (new ErrorHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    })

    res.status(200).json({
        product,
    });
});

export const deleteProduct = catchAsyncErrors (async (req, res) => {
    let product = await Product.findById(req?.params?.id);

    if (!product) {
        return next (new ErrorHandler("Product not found",404));
    }

    await product.deleteOne();

    res.status(200).json({
        message:"Product Deleted"
    });
});