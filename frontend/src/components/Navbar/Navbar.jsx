import { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen);
  const closeUserMenu = () => setUserMenuOpen(false);

  const handleCartClick = () => {
    closeMenu();
    navigate("/cart");
  };

  const handleSearchClick = () => {
    closeMenu();
    navigate("/search");
  };

  const handleUserOptionClick = (option) => {
    closeUserMenu();
    closeMenu();
    if (option === "profile") navigate("/profile");
    else if (option === "admin") navigate("/admin");
  };

  const handleLoginClick = () => {
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo" onClick={() => { closeMenu(); navigate("/"); }}>
          <div className="logo-icon">🛒</div>
          <span className="logo-text">DailyBasket</span>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="icon" /> : <Menu className="icon" />}
        </button>

        {/* Menu Links */}
        <ul className={`menu-links ${menuOpen ? "active" : ""}`}>
          <li>
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/products" onClick={closeMenu}>Products</NavLink>
          </li>
          <li>
            <NavLink to="/reviews" onClick={closeMenu}>Review</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </li>
        </ul>

        {/* Icons */}
        <div className="icons">
          <button className="icon-btn" aria-label="Search" onClick={handleSearchClick}>
            <Search className="icon" />
          </button>

          <button
            className="icon-btn"
            aria-label="Shopping Cart"
            onClick={handleCartClick}
          >
            <ShoppingCart className="icon" />
          </button>

          {/* User Dropdown + Login Button */}
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
                  <li onClick={() => handleUserOptionClick("admin")}>Admin</li>
                </ul>
              )}
            </div>

            <button className="login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
