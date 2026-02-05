import React from "react";
import {Route} from "react-router-dom"
import ProtectedRoute from "../auth/ProtectedRoute";
import Dashboard from "../admin/Dashboard";
import ListProducts from "../admin/ListProducts";
import NewProducts from "../admin/NewProducts";
import UpdateProduct from "../admin/UpdateProduct";
import UploadImages from "../admin/UploadImages";

const adminRoutes = () => {
    return (
        <>
            <Route path="/admin/dashboard" element={<ProtectedRoute admin={true}><Dashboard></Dashboard></ProtectedRoute>}></Route>
            <Route path="/admin/products" element={<ProtectedRoute admin={true}><ListProducts></ListProducts></ProtectedRoute>}></Route>
            <Route path="/admin/product/new" element={<ProtectedRoute admin={true}><NewProducts></NewProducts></ProtectedRoute>}></Route>
            <Route path="/admin/products/:id" element={<ProtectedRoute admin={true}><UpdateProduct></UpdateProduct></ProtectedRoute>}></Route>
            <Route path="/admin/products/:id/upload_images" element={<ProtectedRoute admin={true}><UploadImages></UploadImages></ProtectedRoute>}></Route>
        
        </>
    )
}

export default adminRoutes