import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";

export default function App() {
  const [size, setSize] = useState("");

  const { data: products, loading, error } = useFetch(
    "products?category=shoes"
  );


   function renderProduct(p) {
     return (
       <div key={p.id} className="product">
         <a href="/">
           <img src={`/images/${p.image}`} alt={p.name} />
           <h3>{p.name}</h3>
           <p>${p.price}</p>
         </a>
       </div>
     );
   }

  //Se size valorizzato allora ritorno un nuovo array filtrato, altrimenti ritorno quello standard
  const filteredProducts = size
    ? products.filter((prod) => prod.skus.find ((sk) => sk.size === parseInt(size)))
    : products; 

  if (error) 
    throw error;

  if (loading) 
    return <Spinner />  

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select 
                id="size" 
                value = {size} 
                onChange={(event) => setSize(event.target.value) }>
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            { size && <h2> Found {filteredProducts.length} items </h2>}
          </section>
          <section id="products">{filteredProducts.map(renderProduct)}</section>
        </main>
      </div>
      <Footer />
    </>
  );
}
