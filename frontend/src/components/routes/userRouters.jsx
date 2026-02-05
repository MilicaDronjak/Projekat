import React from "react";
import {Route} from "react-router-dom"
import ProductDetails from "../product/ProductDetails";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Profile from "../user/Profile";
import UpdateProfile from "../user/UpdateProfile";
import ProtectedRoute from "../auth/ProtectedRoute";
import ForgotPassword from "../auth/ForgotPassword";
import UpdatePassword from "../user/UpdatePassword";
import ResetPassword from "../auth/ResetPassword";
import Cart from "../cart/Cart";
import Shipping from "../cart/Shipping";
import ConfirmOrder from "../cart/ConfirmOrder";
import PaymentMethod from "../cart/PaymentMethod";
import MyOrders from "../order/MyOrders";
import OrderDetails from "../order/OrderDetails";
import Invoice from "../invoice/Invoice";
import Home from "../layout/Home";
const userRoutes = () => {
    return (
        <>
        <Route path="/" element= {<Home></Home>}> </Route>
              <Route path="/product/:id" element={<ProductDetails></ProductDetails>}></Route>
              <Route path="/login" element={<Login></Login>}></Route>
              <Route path="/register" element={<Register></Register>}></Route>
              <Route path="/password/forgot" element={<ForgotPassword></ForgotPassword>}></Route>
              <Route path="/password/reset/:token" element={<ResetPassword></ResetPassword>}></Route>
              <Route path="/me/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
              <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile></UpdateProfile></ProtectedRoute>}></Route>
              <Route path="/me/update_password" element={<ProtectedRoute><UpdatePassword></UpdatePassword></ProtectedRoute>}></Route>
              <Route path="/cart" element={<Cart></Cart>}></Route>
              <Route path="/shipping" element={<ProtectedRoute><Shipping></Shipping></ProtectedRoute>}></Route>
              <Route path="/confirm_order" element={<ProtectedRoute><ConfirmOrder></ConfirmOrder></ProtectedRoute>}></Route>
              <Route path="/payment_method" element={<ProtectedRoute><PaymentMethod></PaymentMethod></ProtectedRoute>}></Route>
              <Route path="/me/orders" element={<ProtectedRoute><MyOrders></MyOrders></ProtectedRoute>}></Route>
              <Route path="/me/order/:id" element={<ProtectedRoute><OrderDetails></OrderDetails></ProtectedRoute>}></Route>
              <Route path="/invoice/order/:id" element={<ProtectedRoute><Invoice></Invoice></ProtectedRoute>}></Route>
        </>
    )
}

export default userRoutes