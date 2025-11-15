import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowLeft,
  FaUserPlus,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Loging.css";

export default function Account() {
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
    role: "user", // default role
  });

  // ✅ Local admin credentials
  const ADMIN_USERNAME = "FoodyFlyAdmin";
  const ADMIN_EMAIL = "admin@foodyfly.com";
  const ADMIN_PASSWORD = "admin123";

  // 🧾 Handle Local Sign Up
  const handleSignUp = () => {
    const { username, email, password, role } = signupInfo;

    if (!username || !email || !password) {
      alert("⚠️ All fields are required.");
      return;
    }

    // Prevent admin account creation
    if (role === "admin") {
      alert("🚫 Admin account cannot be created manually.");
      return;
    }

    const userData = { username, email, password, role };
    localStorage.setItem("foodyfly_user", JSON.stringify(userData));

    alert(`✅ Signup successful as ${role}!`);
    setIsSignUp(false);
    setSignupInfo({ username: "", email: "", password: "", role: "user" });
  };

  // 🔐 Handle Local Sign In
  const handleSignIn = () => {
    const { email, password, role } = signinInfo;

    if (!email || !password) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    // 🛡️ Admin login
    if (role === "admin") {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        alert("❌ Invalid admin credentials.");
        return;
      }
      localStorage.setItem("foodyfly_role", "admin");
      localStorage.setItem("foodyfly_admin", ADMIN_USERNAME);
      alert("🎉 Welcome Admin!");
      navigate("/admin/dashboard");
      return;
    }

    // 👤 User login
    const storedUser = JSON.parse(localStorage.getItem("foodyfly_user"));
    if (!storedUser) {
      alert("❌ No user found. Please sign up first.");
      return;
    }

    if (storedUser.email !== email || storedUser.password !== password) {
      alert("❌ Invalid email or password.");
      return;
    }

    localStorage.setItem("foodyfly_role", "user");
    alert("🎉 Welcome back, User!");
    navigate("/account");
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2 className="account-title">
          {isSignUp ? "Create Account" : "FoodyFly Login"}
        </h2>

        {isSignUp ? (
          <>
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder="Username"
                value={signupInfo.username}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, username: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={signupInfo.email}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signupInfo.password}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, password: e.target.value })
                }
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <div className="role-select">
              <FaUserShield className="icon" />
              <select
                value={signupInfo.role}
                onChange={(e) =>
                  setSignupInfo({ ...signupInfo, role: e.target.value })
                }
              >
                <option value="user">User</option>
              </select>
            </div>

            <button className="main-btn" onClick={handleSignUp}>
              Sign Up
            </button>

            <p className="toggle-link" onClick={() => setIsSignUp(false)}>
              <FaArrowLeft /> Back To Login
            </p>
          </>
        ) : (
          <>
            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={signinInfo.email}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, email: e.target.value })
                }
              />
            </div>

            <div className="input-box">
              <FaLock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={signinInfo.password}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, password: e.target.value })
                }
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </span>
            </div>

            <div className="role-select">
              <FaUserShield className="icon" />
              <select
                value={signinInfo.role}
                onChange={(e) =>
                  setSigninInfo({ ...signinInfo, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="main-btn" onClick={handleSignIn}>
              Sign In →
            </button>

            <p className="toggle-link" onClick={() => setIsSignUp(true)}>
              <FaUserPlus /> Create New Account
            </p>
          </>
        )}
      </div>
    </div>
  );
}
