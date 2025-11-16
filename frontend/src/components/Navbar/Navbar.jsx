import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setUserMenuOpen(false);
  };

  // Toggle user dropdown
  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
    setMenuOpen(false);
  };

  // Close all menus
  const closeMenu = () => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  // Navigation handlers
  const handleNavigate = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleUserOptionClick = (option) => {
    if (option === "profile") navigate("/profile");
    if (option === "admin") navigate("/admin");
    closeMenu();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo" onClick={() => handleNavigate("/")}>
          <div className="logo-icon">🛒</div>
          <span className="logo-text">DailyBasket</span>
        </div>

        {/* Hamburger Menu */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>

        {/* Navigation Links */}
        <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" onClick={closeMenu}>
              Review
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Side Icons */}
        <div className="icons">
          {/* Search */}
          <button
            className="icon-btn"
            aria-label="Search"
            onClick={() => handleNavigate("/search")}
          >
            <Search className="icon" />
          </button>

          {/* Cart */}
          <button
            className="icon-btn"
            aria-label="Shopping Cart"
            onClick={() => handleNavigate("/cart")}
          >
            <ShoppingCart className="icon" />
          </button>

          {/* User Dropdown + Login */}
          <div className="user-section">
            <div className="user-dropdown">
              <button
                className="icon-btn"
                aria-label="User Account"
                onClick={toggleUserMenu}
              >
                <User className="icon" />
              </button>

              {userMenuOpen && (
                <ul className="dropdown-menu">
                  <li onClick={() => handleUserOptionClick("profile")}>
                    User Profile
                  </li>
                  <li onClick={() => handleUserOptionClick("admin")}>
                    Admin
                  </li>
                </ul>
              )}
            </div>

            <button className="login-btn" onClick={() => handleNavigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
