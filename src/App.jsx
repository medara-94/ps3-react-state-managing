import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
//import Detail from "./DetailRefs";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  return (
    //value props determines what will be shared via the context
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail dispatchCart={dispatchCart} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatchCart={dispatchCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
