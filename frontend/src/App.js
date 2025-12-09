import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./App.css";
import Home from "./components/layout/Home";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
          <div className="container">
            <Routes>
              <Route path="/" element= {<Home></Home>}> </Route>
            </Routes>
            </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
