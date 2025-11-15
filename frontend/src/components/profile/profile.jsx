import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCamera,
  FaShoppingBag,
  FaCalendarAlt,
  FaTags,
} from "react-icons/fa";
import "./profile.css";

export default function Profile({ userInfo, setUserInfo, orderHistory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [localUser, setLocalUser] = useState({
    name: "",
    email: "",
    profilePic: "",
    favoriteCategory: "DailyBasket",
    memberSince: "2023",
  });

  // Load user info from localStorage or props
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("foodyfly_userInfo"));
    if (savedUser) {
      setLocalUser(savedUser);
      setUserInfo?.(savedUser);
    } else if (userInfo) {
      setLocalUser(userInfo);
    }
  }, [userInfo, setUserInfo]);

  // Save profile
  const handleSave = () => {
    if (!localUser.name || !localUser.email) {
      alert("Name and Email are required!");
      return;
    }
    setIsEditing(false);
    setUserInfo?.(localUser);
    localStorage.setItem("foodyfly_userInfo", JSON.stringify(localUser));
    alert("✅ Profile updated successfully!");
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalUser((prev) => ({ ...prev, [name]: value }));
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLocalUser((prev) => ({ ...prev, profilePic: imageUrl }));

      // Clean up URL on unmount
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // Filter user orders by name
  const userOrders =
    orderHistory?.filter(
      (order) =>
        order.userName?.toLowerCase() === localUser?.name?.toLowerCase()
    ) || [];

  return (
    <div className="personal-info-container">
      <h2 className="section-title"> My  Profile</h2>

      <div className="profile-card grocery-theme">
        {/* Profile Picture */}
        <div className="profile-pic-wrapper">
          <div className="profile-pic-bg">
            <img
              src={
                localUser?.profilePic ||
                "https://cdn-icons-png.flaticon.com/512/415/415733.png"
              }
              alt="Profile"
              className="profile-pic"
            />
          </div>

          {isEditing && (
            <>
              <label htmlFor="file-upload" className="upload-icon">
                <FaCamera />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </>
          )}
        </div>

        {/* Info Fields */}
        <div className="info-section">
          <div className="info-row">
            <FaUser className="info-icon" />
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={localUser?.name || ""}
                onChange={handleChange}
                className="info-input"
                required
              />
            ) : (
              <p>{localUser?.name || "Name not set"}</p>
            )}
          </div>

          <div className="info-row">
            <FaEnvelope className="info-icon" />
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={localUser?.email || ""}
                onChange={handleChange}
                className="info-input"
                required
              />
            ) : (
              <p>{localUser?.email || "Email not set"}</p>
            )}
          </div>

          <div className="info-row">
            <FaTags className="info-icon" />
            {isEditing ? (
              <input
                type="text"
                name="favoriteCategory"
                value={localUser?.favoriteCategory}
                onChange={handleChange}
                className="info-input"
              />
            ) : (
              <p>{localUser?.favoriteCategory}</p>
            )}
          </div>

          <div className="info-row">
            <FaCalendarAlt className="info-icon" />
            <p>Member Since: {localUser?.memberSince}</p>
          </div>
        </div>

        {/* Edit / Save Buttons */}
        <div className="button-section">
          {isEditing ? (
            <button type="button" className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Order History */}
      <div className="order-history-section">
        <h2 className="section-title">
          <FaShoppingBag /> My Orders
        </h2>

        {userOrders.length > 0 ? (
          <div className="order-list">
            {userOrders.map((order) => (
              <div key={order.id} className="order-card grocery-card">
                <div className="order-header">
                  <strong>🛍️ Order #{order.id}</strong>
                  <span className="order-date">{order.date}</span>
                </div>
                <p>
                  <strong>Items:</strong> {order.items.join(", ")}
                </p>
                <p>
                  <strong>Total:</strong>{" "}
                  <span className="price">৳{order.total}</span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-orders">No grocery orders found yet.</p>
        )}
      </div>
    </div>
  );
}
