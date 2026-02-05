import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";

import {BrowserRouter as Router, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"

import useUserRoutes from "./components/routes/userRouters";
import useAdminRoutes from "./components/routes/adminRoutes";

function App() {

  const userRoutes = useUserRoutes()
  const adminRoutes = useAdminRoutes()

  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"></Toaster>
        <Header></Header>
          <div className="container">
            <Routes>
              {userRoutes}
              {adminRoutes}
            </Routes>
            </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
