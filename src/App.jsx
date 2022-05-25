import React, {useState} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products"
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import { getRoles } from "@testing-library/react";

export default function App() {
  const [cart, setCart] = useState([]);
  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((item) => item.sku === sku);
      if (itemInCart) {
        //Return new array with the matching item replaced
        return items.map((item) => 
          item.sku === sku ? {...item, quantity: item.quantity +1} : item );
      } else {
        //Return new array with the new item appended
        return [...items, {id, sku, quantity: 1}];
      }
    })
  }

  function updateQuantity(sku, quantity){
    setCart((items) => {
      return quantity === 0
        //We are telling to keep all items that aren't the one passed, whitch has qnt 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((item)=> item.sku === sku ? {...item, quantity } : item )
    })
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products/>} />
            <Route path="/:category/:id" element={<Detail  addToCart={addToCart}/>} />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity}/>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
