import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
//import Detail from "./Detail";
import Detail from "./DetailRefs";
import Cart from "./Cart";
import Checkout from "./Checkout";

export default function App() {
  // Mettendo una funzione sulla chiamata dello use state viene chiamata solo una volta
  // al caricamento iniziale
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []; //?? coalesce operator
    } catch {
      console.log("The cart could not be parsed into JSON");
      return [];
    }
  });

  // Says: anytime cart changes, store it in localStorage as a JSON String
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        //Return new array with the matching item replaced
        return items.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        //Return new array with the new item appended
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? //We are telling to keep all items that aren't the one passed, whitch has qnt 0
          items.filter((i) => i.sku !== sku)
        : items.map((item) =>
            item.sku === sku ? { ...item, quantity } : item
          );
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
