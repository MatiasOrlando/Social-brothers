import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "../Context/Context";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./views/Blog/Blog";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";

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
