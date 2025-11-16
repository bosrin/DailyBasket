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
  const [isForgot, setIsForgot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [signupInfo, setSignupInfo] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [signinInfo, setSigninInfo] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const [resetEmail, setResetEmail] = useState("");

  const ADMIN_USERNAME = "DailyBasketAdmin";
  const ADMIN_EMAIL = "admin@dailybasket.com";
  const ADMIN_PASSWORD = "admin123";

  // Signup
  const handleSignUp = () => {
    const { username, email, password, role } = signupInfo;

    if (!username || !email || !password) {
      alert("⚠️ All fields are required.");
      return;
    }

    if (role === "admin") {
      alert("🚫 Admin account cannot be created manually.");
      return;
    }

    const userData = { username, email, password, role };
    localStorage.setItem("dailybasket_user", JSON.stringify(userData));

    alert(`✅ Signup successful as ${role}!`);
    setIsSignUp(false);
    setSignupInfo({ username: "", email: "", password: "", role: "user" });
  };

  // Sign in
  const handleSignIn = () => {
    const { email, password, role } = signinInfo;

    if (!email || !password) {
      alert("⚠️ Please fill all fields.");
      return;
    }

    if (role === "admin") {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        alert("❌ Invalid admin credentials.");
        return;
      }
      localStorage.setItem("dailybasket_role", "admin");
      localStorage.setItem("dailybasket_admin", ADMIN_USERNAME);
      alert("🎉 Welcome Admin!");
      navigate("/admin/dashboard");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("dailybasket_user"));
    if (!storedUser) {
      alert("❌ No user found. Please sign up first.");
      return;
    }

    if (storedUser.email !== email || storedUser.password !== password) {
      alert("❌ Invalid email or password.");
      return;
    }

    localStorage.setItem("dailybasket_role", "user");
    alert("🎉 Welcome back, User!");
    navigate("/account");
  };

  // Forgot Password
  const handleForgotPassword = () => {
    const storedUser = JSON.parse(localStorage.getItem("dailybasket_user"));

    if (!resetEmail) {
      alert("⚠️ Please enter your email.");
      return;
    }

    if (!storedUser || storedUser.email !== resetEmail) {
      alert("❌ No user found with this email.");
      return;
    }

    const newPass = prompt("Enter new password:");

    if (newPass && newPass.length >= 4) {
      storedUser.password = newPass;
      localStorage.setItem("dailybasket_user", JSON.stringify(storedUser));
      alert("✅ Password reset successful!");
      setIsForgot(false);
    } else {
      alert("❌ Password must be at least 4 characters.");
    }
  };

  return (
    <div className="account-container">
      <div className="account-box">
        <h2 className="account-title">
          {isForgot
            ? "Reset Password"
            : isSignUp
            ? "Create Account"
            : "DailyBasket Login"}
        </h2>

        {/* ============= FORGOT PASSWORD UI ============= */}
        {isForgot ? (
          <>
            <div className="input-box">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder="Enter Registered Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
              />
            </div>

            <button className="main-btn" onClick={handleForgotPassword}>
              Reset Password
            </button>

            {/* BACK LINK FIXED */}
            <div className="toggle-wrap">
              <p className="toggle-link" onClick={() => setIsForgot(false)}>
                <FaArrowLeft /> Back To Login
              </p>
            </div>
          </>
        ) : isSignUp ? (
          <>
            {/* ============= SIGNUP UI ============= */}
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

            {/* BACK LINK FIXED */}
            <div className="toggle-wrap">
              <p className="toggle-link" onClick={() => setIsSignUp(false)}>
                <FaArrowLeft /> Back To Login
              </p>
            </div>
          </>
        ) : (
          <>
            {/* ============= LOGIN UI ============= */}
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

            {/* WRAP LINKS FOR PERFECT GAP */}
            <div className="toggle-wrap">
              <p className="toggle-link" onClick={() => setIsForgot(true)}>
                Forgot Password?
              </p>

              <p className="toggle-link" onClick={() => setIsSignUp(true)}>
                <FaUserPlus /> Create New Account
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
