import React, { useState, useCallback } from "react";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaShoppingBasket,
  FaUserAlt,
  FaHome,
} from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    product: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle form submission
  const handleSubmit = useCallback(() => {
    const { name, phone, email, address, product, message } = formData;

    // Basic validation
    if (!name || !phone || !email || !address || !product || !message) {
      alert("Please fill in all fields before submitting!");
      return;
    }

    if (status === "sending") return;
    setStatus("sending");

    // Simulate sending message
    setTimeout(() => {
      console.log("✅ Sent message:", formData);
      setStatus("sent");

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
        product: "",
        message: "",
      });

      // Clear status after 4 seconds
      setTimeout(() => setStatus(""), 4000);
    }, 1500);
  }, [formData, status]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="contact-section" id="contact">
      <h1 className="contact-title">Get In Touch With GroceryShop</h1>

      <div className="contact-container">
        {/* Left Info */}
        <div className="contact-info">
          <div className="contact-card">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h3>Our Main Store</h3>
              <p>House 00, Road 7, Mirpur-2, Dhaka, Bangladesh</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon green">
              <FaPhoneAlt />
            </div>
            <div>
              <h3>Contact Numbers</h3>
              <p>+880 1788-123456</p>
            </div>
          </div>

          <div className="contact-card">
            <div className="icon orange">
              <FaEnvelope />
            </div>
            <div>
              <h3>Email Address</h3>
              <p>support@dailybasket.com</p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="contact-form">
          <form>
            <label>Full Name</label>
            <div className="input-box">
              <FaUserAlt />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <label>Phone Number</label>
            <div className="input-box">
              <FaPhoneAlt />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1XXXXXXXXX"
                required
              />
            </div>

            <label>Email Address</label>
            <div className="input-box">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <label>Delivery Address</label>
            <div className="input-box">
              <FaHome />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                required
              />
            </div>

            <label>Product Name</label>
            <div className="input-box">
              <FaShoppingBasket />
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={handleChange}
                placeholder="Enter grocery item name (e.g., Fresh Tomatoes)"
                required
              />
            </div>

            <label>Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your query or feedback here..."
              required
            />

            <button
              type="button"
              onClick={handleSubmit}
              className="btn"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "sent" && (
              <p className="success-text">✅ Message Sent Successfully!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
