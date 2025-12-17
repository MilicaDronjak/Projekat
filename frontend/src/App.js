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
import UpdatePassword from "./components/user/UpdatePassword";


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
              <Route path="/me/profile" element={<ProtectedRoute><Profile></Profile></ProtectedRoute>}></Route>
              <Route path="/me/update_profile" element={<ProtectedRoute><UpdateProfile></UpdateProfile></ProtectedRoute>}></Route>
              <Route path="/me/update_password" element={<ProtectedRoute><UpdatePassword></UpdatePassword></ProtectedRoute>}></Route>

            </Routes>
            </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
