import express from "express";
import {getProductDetails, getProducts, newProducts, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, canUserReview, getAdminProduct, uploadProductImages, deleteProductImage} from "../controllers/productControllers.js";
import { isAuthenticatedUser, authorizeRoles } from "../middlewares/auth.js";
const router = express.Router();

router.route("/products").get(getProducts);

router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"),newProducts).
get(isAuthenticatedUser, authorizeRoles("admin"),getAdminProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products").post(isAuthenticatedUser, authorizeRoles("admin"),newProducts)

router.route("/admin/products/:id/upload_images").put(isAuthenticatedUser, authorizeRoles("admin"),uploadProductImages);

router.route("/admin/products/:id/delete_image").put(isAuthenticatedUser, authorizeRoles("admin"),deleteProductImage);

router.route("/admin/products/:id").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteProduct);

router.route("/reviews").put(isAuthenticatedUser, createProductReview)
                        .get(isAuthenticatedUser, getProductReviews);

router.route("/admin/reviews").delete(isAuthenticatedUser, authorizeRoles("admin"),deleteReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;