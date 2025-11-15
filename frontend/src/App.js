import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Reviews from "./components/Reviews/Reviews";
import Contact from "./components/Contact/Contact";
import Profile from "./components/profile/profile";
import Admin from "./components/Admin/Admin";
import Login from "./components/Loging/Loging";
import Products from "./components/products/products";
import Cart from "./components/cart/cart";
import Search from "./components/Search/Search";

const App = () => {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.name === product.name);
      if (exist) {
        return prev.map((p) =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (name, removeAll = false) => {
    setCart((prev) => {
      if (removeAll) {
        return prev.filter((item) => item.name !== name);
      }
      return prev
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  // Clear entire cart
  const clearCart = () => setCart([]);

  // Add order to order history
  const addOrder = (order) => setOrders((prev) => [...prev, order]);

  return (
    <Router>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<Hero />} />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile clearCart={clearCart} orders={orders} />}
        />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Reviews */}
        <Route path="/reviews" element={<Reviews />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Products */}
        <Route path="/products" element={<Products addToCart={addToCart} />} />

        {/* Cart */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
              addOrder={addOrder}
            />
          }
        />

        {/* Search */}
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
