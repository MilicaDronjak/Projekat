import React from "react";
import {Route} from "react-router-dom"
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProducts from "../admin/NewProducts";
import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";
import ListOrders from "../admin/ListOrders";
import ProcessOrder from "../admin/ProcessOrder";
import ListUsers from "../admin/ListUsers";
import UpdateUser from "../admin/UpdateUser";
import ProductReviews from "../admin/ProductReviews.jsx";

const adminRoutes = () => {
    return (
        <>
            <Route path="/admin/dashboard" element={<ProtectedRoute admin={true}><Dashboard></Dashboard></ProtectedRoute>}></Route>
            <Route path="/admin/products" element={<ProtectedRoute admin={true}><ListProducts></ListProducts></ProtectedRoute>}></Route>
            <Route path="/admin/product/new" element={<ProtectedRoute admin={true}><NewProducts></NewProducts></ProtectedRoute>}></Route>
            <Route path="/admin/products/:id" element={<ProtectedRoute admin={true}><UpdateProduct></UpdateProduct></ProtectedRoute>}></Route>
            <Route path="/admin/products/:id/upload_images" element={<ProtectedRoute admin={true}><UploadImages></UploadImages></ProtectedRoute>}></Route>
            <Route path="/admin/orders" element={<ProtectedRoute admin={true}><ListOrders></ListOrders></ProtectedRoute>}></Route>
            <Route path="/admin/orders/:id" element={<ProtectedRoute admin={true}><ProcessOrder></ProcessOrder></ProtectedRoute>}></Route>
            <Route path="/admin/users/" element={<ProtectedRoute admin={true}><ListUsers></ListUsers></ProtectedRoute>}></Route>
            <Route path="/admin/users/:id" element={<ProtectedRoute admin={true}><UpdateUser></UpdateUser></ProtectedRoute>}></Route>
            <Route path="/admin/reviews" element={<ProtectedRoute admin={true}><ProductReviews></ProductReviews></ProtectedRoute>}></Route>

        </>
    )
}

export default adminRoutes