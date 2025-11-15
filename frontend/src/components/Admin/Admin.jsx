import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaTrash,
  FaEdit,
  FaPlusCircle,
  FaShoppingBasket,
  FaClipboardList,
} from "react-icons/fa";
import "./Adnim.css";

export default function AdminDashboard() {
  // --- Product Management ---
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  // --- Order Management ---
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [notifications, setNotifications] = useState([]);

  // --- Dashboard Tabs ---
  const [activeTab, setActiveTab] = useState("products");

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();

    // Load orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orderHistory")) || {};
    const allOrdersArray = Object.values(allOrders).flat();
    setOrders(allOrdersArray);
  }, []);

  // ✅ Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, formData);
        alert("✅ Product updated successfully!");
      } else {
        await axios.post("/api/products", formData);
        alert("🛒 New product added!");
      }
      setFormData({ name: "", price: "", category: "", stock: "", image: "" });
      setEditId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`/api/products/${id}`);
        alert("🗑️ Product removed successfully!");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // ✅ Edit product
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      stock: item.stock,
      image: item.image,
    });
  };

  // ✅ Order Status Update
  const updateStatus = (index, status) => {
    const newOrders = [...orders];
    newOrders[index].status = status;
    setOrders(newOrders);

    // Save to localStorage
    localStorage.setItem(
      "orderHistory",
      JSON.stringify(
        newOrders.reduce((acc, order) => {
          if (!acc[order.userEmail]) acc[order.userEmail] = [];
          acc[order.userEmail].push(order);
          return acc;
        }, {})
      )
    );

    addNotification(`Order #${newOrders[index].id} marked as ${status}`);
  };

  // ✅ Notifications
  const addNotification = (msg) => {
    setNotifications((prev) => [...prev, msg]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 4000);
  };

  // ✅ Filter Orders
  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  return (
    <div className="admin-dashboard">
      <h2 className="dashboard-title"> Admin Dashboard</h2>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "products" ? "active-tab" : ""}
          onClick={() => setActiveTab("products")}
        >
          <FaShoppingBasket /> Product Management
        </button>
        <button
          className={activeTab === "orders" ? "active-tab" : ""}
          onClick={() => setActiveTab("orders")}
        >
          <FaClipboardList /> Order Management
        </button>
      </div>

      {/* --- Product Management --- */}
      {activeTab === "products" && (
        <>
          <h3 className="dashboard-subtitle">Manage Grocery Products</h3>
          <form className="menu-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Snacks">Snacks</option>
              <option value="Beverages">Beverages</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <button type="submit" className="submit-btn">
              {editId ? (
                <>
                  <FaEdit /> Update Product
                </>
              ) : (
                <>
                  <FaPlusCircle /> Add Product
                </>
              )}
            </button>
          </form>

          <table className="menu-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price (৳)</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img src={item.image} alt={item.name} className="menu-img" />
                    </td>
                    <td>{item.name}</td>
                    <td>৳{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(item)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}

      {/* --- Order Management --- */}
      {activeTab === "orders" && (
        <>
          <h3 className="dashboard-subtitle">Manage Orders</h3>

          <div className="menu-form">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="delivered">Delivered</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          <table className="menu-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="6">No orders found.</td>
                </tr>
              )}
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.userEmail}</td>
                  <td>
                    {order.items.map((i) => (
                      <div key={i.name}>
                        {i.name} x {i.quantity}
                      </div>
                    ))}
                  </td>
                  <td>৳{order.total.toFixed(2)}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => updateStatus(index, "preparing")}
                    >
                      Preparing
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => updateStatus(index, "delivered")}
                    >
                      Delivered
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => updateStatus(index, "canceled")}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="notifications">
            {notifications.map((note, i) => (
              <div key={i} className="notification">
                🔔 {note}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
