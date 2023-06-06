import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Context from "../Context/Context";
import Home from "./views/Home";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./views/Blog/Blog";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
