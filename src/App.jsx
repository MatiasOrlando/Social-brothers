import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./views/Blog/Blog";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import Context from "./Context/Context";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </Context>
    </BrowserRouter>
  );
}

export default App;
