import mongoose from "mongoose";

const productShema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        maxLenght:[200, "Product name cannot excees 5 digits"],
    },
    price: {
        type:Number,
        required:[true,"Please enter product price"],
        maxLenght:[200, "Product price cannot excees 5 digits"],
    },
    description: {
        type:String,
        required:[true,"Please enter product description"],
    },
    rating: {
        type:Number,
        default:0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
            values: [
                "Apple",
                "Samsung",
                "Huawei",
                "Xiaomi",
                "Honor",
                "Sony"
            ],
            message:"Please select correct category",
        },
    },
    seller:{
        type:String,
         required: [true, "Please enter product seller"],
    },
    stock: {
        type:Number,
         required: [true, "Please enter product stock"],
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type:mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    user: {
                type:mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: false,
        },
    },
    {timestamps: true}
);

export default mongoose.model("Product", productShema);