import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

export default function SearchProduct() {
  const [query, setQuery] = useState("");
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // Map product names to categories
  const menuData = {
    Baking_Needs: ["Bakery Pack", "Brown Bread", "Butter Croissant", "Chocolate Cake", "Chocolate Donut", "Lobster", "Vanilla Muffins", "Whole Wheat Bread"],
    Chocolates: ["Classic Cho Pack", "Chocolate Bar", "Cookies", "Eclair", "Honeycomb Crunch Brittle", "Smoked Blue Chocolate"],
    Cooking: ["Barley", "Basmati Rice", "Brown Rice", "Coffee Beans", "Fresh Garlic", "Mixed Grain Pack", "Ham Slice Pack", "Fresh Onion", "Wheat Flour"],
    Drinks: ["Coca Cola", "Coconut Water", "Cola", "Energy Drink", "Fanta", "Lassi", "Pepsi", "7UP", "Mineral Water"],
    Fish: ["Along Fish", "Boitka Fish", "Fresh Fish Mix", "Red Snapper", "Salmon", "Shorputi", "Tuna"],
    Frozen: ["Butter", "Ethiopian Injera", "Focaccia Bread", "Ghee", "Paneer Soft", "Paneer Cubes", "Paneer Premium", "Pistachio Marzipan Logs", "Turkey Breast", "Whiskey Cheddar"],
    Fruit: ["Apples", "Bananas", "Grapes", "Kiwi", "Mango", "Mangosteen", "Orange Fresh", "Oranges Pack", "Papaya", "Passion Fruit", "Persimmon", "Pomelo", "Rambutan", "Star Fruit", "Strawberries"],
    Meat: ["Beef", "Beef Keema", "Beef Steak", "Chicken", "Lamb", "Lamb Steak"],
    Milk_Dairy: ["Amul Milk", "Dairy Product Pack", "Dragon Fruit", "Dragon Fruit (Variant)", "Grapes Milk Shake", "Fresh Milk"],
    Vegetables: ["Bell Peppers", "Broccoli", "Carrots", "Cucumber", "Kiwano Melon", "Lady Finger", "Potato", "Spinach", "Tomato"],
    Yogurt: ["Truffle Brie", "Yogurt Classic", "Yogurt Premium"]
  };

  const handleSearch = () => {
    const searchText = query.toLowerCase().trim();
    let foundCategory = null;

    // Check if it matches a category
    for (const category in menuData) {
      if (category.replace("_", " ").toLowerCase() === searchText) {
        foundCategory = category;
        break;
      }
      // Check if it matches any product in category
      if (menuData[category].some(item => item.toLowerCase() === searchText)) {
        foundCategory = category;
        break;
      }
    }

    if (foundCategory) {
      setNotFound(false);
      navigate("/products", { state: { category: foundCategory } });
    } else {
      setNotFound(true);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search product or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      {notFound && <p className="search-notfound">❌ Product or Category Not Found</p>}
    </div>
  );
}
