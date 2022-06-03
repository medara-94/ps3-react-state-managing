import React, { useReducer, useEffect } from "react";
import cartReducer from "./cartReducer";

// The default value would apply if a component tries consuming the context without a provider in a parent
export const CartContext = React.createContext(null);

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; //?? coalesce operator
} catch {
  console.log("The cart could not be parsed into JSON");
  initialCart = [];
}

export function CartProvider(props) {
    // const [state, dispatch] = useReducer(reducer, initArg);
    const [cart, dispatchCart] = useReducer(cartReducer, initialCart);
    // Says: anytime cart changes, store it in localStorage as a JSON String
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

    const contextValue = { cart, dispatchCart};    
    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}