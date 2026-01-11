import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";
import Home from "./components/layout/Home";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ForgotPassword from "./components/auth/ForgotPassword";
import UpdatePassword from "./components/user/UpdatePassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import PaymentMethod from "./components/cart/PaymentMethod";
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";
import Invoice from "./components/invoice/Invoice";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"></Toaster>
        <Header></Header>
          <div className="container">
            <Routes>
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

            </Routes>
            </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
