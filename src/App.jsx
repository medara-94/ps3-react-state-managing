import React, { useReducer, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
//import Detail from "./DetailRefs";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";
import { CartContext } from "./cartContext";

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; //?? coalesce operator
} catch {
  console.log("The cart could not be parsed into JSON");
  initialCart = [];
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initArg);
  const [cart, dispatchCart] = useReducer(cartReducer, initialCart);

  // Says: anytime cart changes, store it in localStorage as a JSON String
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  return (
    //value props determines what will be shared via the context
    <CartContext.Provider value={{ cart, dispatchCart }}>
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
            <Route
              path="/cart"
              element={<Cart cart={cart} dispatchCart={dispatchCart} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} dispatchCart={dispatchCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </CartContext.Provider>
  );
}
