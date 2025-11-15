import React from "react";
import "./Hero.css";

// Images
import leftImage from "../../assets/food/freshfruits.png";
import rightImage from "../../assets/food/organicvegitable.png";
import basketfullvegetables from "../../assets/food/basketfullvegetables.png";
import organicImg from "../../assets/food/organicicon.jpg";
import payment from "../../assets/food/payment.png"; // Make sure this file exists
import delivery from "../../assets/food/delivery .jpg"; // Payment icon

// Icons
import { Heart, Shield, Leaf, CheckCircle } from "lucide-react";

export default function Home() {
  const features = [
    {
      img: organicImg,
      title: "Fresh And Organic",
      text: "We source only the freshest, 100% organic fruits and vegetables directly from trusted local farms.",
    },
    {
      img: payment,
      title: "Free Delivery",
      text: "Enjoy fast and free delivery on all your orders — fresh produce brought right to your doorstep.",
    },
    {
      img: delivery,
      title: "Easy Payments",
      text: "We offer secure and convenient payment options to make your shopping experience effortless.",
    },
  ];

  return (
    <div>
      {/* 🌿 HERO / ORGANIC SECTION */}
      <section className="organic-section">
        <div className="organic-container">
          <div className="organic-left">
            <img src={leftImage} alt="Vegetables" />
          </div>

          <div className="organic-content">
            <h1>
              Experience the Taste of <span>Fresh</span> and <span>Organic</span> Goodness
            </h1>
            <p>
              We bring you premium organic fruits and vegetables sourced directly
              from trusted local farmers. Eat clean, live better, and make every
              meal naturally delicious.
            </p>
            <button>Shop Now</button>
          </div>

          <div className="organic-right">
            <img src={rightImage} alt="Fruits" />
          </div>
        </div>
      </section>

      {/* 💎 FEATURES SECTION */}
      <section className="features-section">
        <h2 className="features-heading">
          Our <span>Features</span>
        </h2>

        <div className="features-container">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img src={feature.img} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <button>Read More</button>
            </div>
          ))}
        </div>
      </section>

      {/* 🌱 VALUE SECTION */}
      <section className="value-section">
        <div className="value-header">
          <h2 className="value-title">
            <span className="highlight">Our</span> Value
          </h2>
          <div className="underline"></div>
        </div>

        <div className="value-desktop">
          <img
            src={basketfullvegetables}
            alt="Basket full of vegetables"
            className="basket-img"
          />

          <div className="value-item top-left">
            <div className="icon-circle">
              <Heart className="icon" />
            </div>
            <h3>Trust</h3>
            <p>It is a long established fact that a reader will be distracted.</p>
          </div>

          <div className="value-item top-right">
            <div className="icon-circle">
              <Shield className="icon" />
            </div>
            <h3>Food Safety</h3>
            <p>It is a long established fact that a reader will be distracted.</p>
          </div>

          <div className="value-item bottom-left">
            <div className="icon-circle">
              <Leaf className="icon" />
            </div>
            <h3>Always Fresh</h3>
            <p>It is a long established fact that a reader will be distracted.</p>
          </div>

          <div className="value-item bottom-right">
            <div className="icon-circle">
              <CheckCircle className="icon" />
            </div>
            <h3>100% Organic</h3>
            <p>It is a long established fact that a reader will be distracted.</p>
          </div>
        </div>

        <div className="value-mobile">
          {[Heart, Shield, Leaf, CheckCircle].map((Icon, index) => (
            <div className="mobile-item" key={index}>
              <div className="icon-circle">
                <Icon className="icon" />
              </div>
              <h3>
                {["Trust", "Food Safety", "Always Fresh", "100% Organic"][index]}
              </h3>
              <p>It is a long established fact that a reader will be distracted.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🥕 WHY WE ARE BEST SECTION */}
      <section className="why-section">
        <div className="why-left">
          <img src={leftImage} alt="Fresh Vegetables" className="why-image" />
        </div>

        <div className="why-right">
          <h2 className="why-title">Why We Are the Best?</h2>

          <div className="why-item">
            <h3>🚀 Fastest Delivery</h3>
            <p>Get your groceries delivered within 50 minutes anywhere in the city.</p>
          </div>

          <div className="why-item">
            <h3>🍃 Freshness Guaranteed</h3>
            <p>Each product is hand-picked to ensure maximum freshness and quality.</p>
          </div>

          <div className="why-item">
            <h3>💰 Affordable Prices</h3>
            <p>Enjoy top-quality produce at prices that won’t break the bank.</p>
          </div>
        </div>
      </section>

      {/* ⚡ FOOTER */}
      <footer className="footer">
        <div className="footer-columns">
          <div className="footer-about">
            <h3>DailyBasket</h3>
            <p>
              Where culinary artistry meets modern lifestyle. Experience
              handcrafted dishes made with care, right here in Bangladesh.
            </p>
            <div className="subscribe">
              <input type="email" placeholder="Enter your email" />
              <button>Join Now</button>
            </div>
          </div>

          <div className="footer-nav">
            <h4>Quick Links</h4>
            <ul>
              <li>Home</li>
              <li>Menu</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          © 2025 DailyBasket. All rights reserved. | Designed by Bosrin
        </p>
      </footer>
    </div>
  );
}
