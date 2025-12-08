import Product from "../models/product.js"
import ErrorHandler from "../utils/errorHandler.js";
import APIFilters from "../utils/apiFilters.js"
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";


export const getProducts = catchAsyncErrors (async (req, res) => {

    const resPerPage = 4;
    const apiFilters = new APIFilters(Product,req.query).search().filters();

    console.log("req?.user", req?.user);

    let products = await apiFilters.query;
    let filteredProductsCount = products.length;

    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();

    res.status(200).json({
    resPerPage,
    filteredProductsCount,
    products,
    });
});

export const newProducts = catchAsyncErrors (async (req, res) => {

    req.body.user = req.user._id

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

export const createProductReview = catchAsyncErrors(async (req, res, next) => { 
    const { rating, comment, productId} = req.body;

    const review = {
        user: req?.user?._id,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const isReviewed = product?.reviews?.find(
        (r) => r.user.toString() === req?.user?._id.toString()
    );

    if(isReviewed) {
        product.reviews.forEach((review) => {
            if (review?.user?.toString() === req?.user?._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc,0) /
        product.reviews.length;

    await product.save ({validateBeforeSave: false});
    

    res.status(200).json({
        success: true,
    });
});

export const getProductReviews = catchAsyncErrors(async (req, res, next) => { 
    const product = await Product.findById(req.query.id);

    if(!product) {
        return next (new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        reviews: product.reviews,
    })
}) 

export const deleteReview = catchAsyncErrors(async (req, res, next) => { 

    let product = await Product.findById(req.query.productid);

    if(!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product?.reviews?.filter(
        (review) => review._id.toString() !== req?.query?.id.toString()
    );

    const numOfReviews = reviews.length

    const rating =
        numOfReviews === 0 ? 0 : product.reviews.reduce((acc, item) => item.rating + acc,0) / product.reviews.length;
        numOfReviews;

    product = await Product.findByIdAndUpdate(req.query.productid, { reviews, numOfReviews, rating}, {new: true})

    res.status(200).json({
        success: true,
        product
    });
});