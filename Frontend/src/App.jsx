import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCateogry from "./Pages/ShowCategory";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import LoginSignup from "./Pages/LoginSignUp";
import Footer from "./Components/Footer/Footer";
import men_banner from './Components/assets/banner_mens.webp'
import women_banner from './Components/assets/banner_womens.webp'
import kid_bannner from './Components/assets/banner_kids.webp'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<ShopCateogry banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCateogry banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCateogry banner={kid_bannner} category="kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
