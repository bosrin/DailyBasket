import React, { useState, useEffect } from "react";
import "./Reviews.css"; 

export default function DailyBasketDemo() {
  const [reviews, setReviews] = useState(() => {
    try {
      const raw = localStorage.getItem("dailybasket_reviews");
      return raw ? JSON.parse(raw) : sampleReviews;
    } catch {
      return sampleReviews;
    }
  });

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    localStorage.setItem("dailybasket_reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating: Number(rating),
      date: new Date().toISOString(),
    };
    setReviews((r) => [newReview, ...r]);
    setName("");
    setText("");
    setRating(5);
  };

  const removeReview = (id) => {
    if (!window.confirm("Remove this review?")) return;
    setReviews((r) => r.filter((x) => x.id !== id));
  };

  const averageRating = () => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((s, r) => s + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  const sortedReviews = () => {
    const copy = [...reviews];
    if (sortBy === "newest") copy.sort((a, b) => b.id - a.id);
    if (sortBy === "oldest") copy.sort((a, b) => a.id - b.id);
    if (sortBy === "highest") copy.sort((a, b) => b.rating - a.rating);
    if (sortBy === "lowest") copy.sort((a, b) => a.rating - b.rating);
    return copy;
  };

  return (
    <div className="dailybasket">
      <header className="header">
        <div>
          <h1>DailyBasket</h1>
          <p>Fresh & Organic — fruits and vegetables delivered with care</p>
        </div>
        <div className="rating-summary">
          <small>Average rating</small>
          <div className="rating-summary-stars">
            <StarRow value={averageRating()} size={18} />
            <span>{averageRating()} / 5</span>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Hero Section */}
        <section class="hero">
  <div class="hero-box">
    <h2>Freshness Delivered to Your Door</h2>
    <p>DailyBasket brings you organic fruits and vegetables sourced directly from local farms. Eat healthy, live fresh!</p>
  </div>

  <div class="hero-text">
    <h3>Why Customers Love DailyBasket</h3>
    <ul>
      <li>Locally sourced, seasonal produce.</li>
      <li>Hand-picked for freshness — delivered within 24 hours.</li>
      <li>Plastic-free packaging and recyclable boxes.</li>
    </ul>
            <a href="#reviews" className="btn-green">Read reviews</a>
          </div>
        </section>

        {/* Review Form */}
        <aside className="review-form">
          <h3>Leave a review</h3>
          <form onSubmit={addReview}>
            <label>
              Your name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Farin"
              />
            </label>

            <label>
              Rating
              <StarInput value={rating} onChange={setRating} />
            </label>

            <label>
              Review
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What did you like? any suggestions?"
                rows={4}
              />
            </label>

            <div className="form-buttons">
              <button className="btn-green" type="submit">
                Submit review
              </button>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setText("");
                  setRating(5);
                }}
              >
                Reset
              </button>
            </div>
          </form>
          <small>Reviews are stored locally in your browser for this demo.</small>
        </aside>

        {/* Review List */}
       <section id="reviews" className="reviews">
  <div className="review-header">
    <h3>Customer Reviews ({reviews.length})</h3>
    <div className="review-sort">
      <label htmlFor="sort">Sort</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>
    </div>
  </div>

  {sortedReviews().length ? (
    sortedReviews().map((r) => (
      <article key={r.id} className="review-item">
        <div className="review-user">
          <div className="avatar">
            {r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <strong>{r.name}</strong>
            <small className="review-date">
              {new Date(r.date).toLocaleString()}
            </small>
          </div>
        </div>

        <p className="review-text">{r.text}</p>

        <div className="review-meta">
          <div className="star-section">
            <StarRow value={r.rating} size={16} />
            <span>{r.rating} / 5</span>
          </div>
          <button
            className="remove-btn"
            onClick={() => removeReview(r.id)}
          >
            Remove
          </button>
        </div>
      </article>
    ))
  ) : (
    <p className="no-reviews">No reviews yet — be the first!</p>
  )}
</section>

      </main>

     
    </div>
  );
}

// ----- Helpers -----

const sampleReviews = [
  {
    id: 1,
    name: "Ayesha",
    text: "Excellent quality — mangoes were sweet and ripe. Fast delivery!",
    rating: 5,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 2,
    name: "Rafi",
    text: "Good produce, but one item arrived slightly bruised. Still happy overall.",
    rating: 4,
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

function StarRow({ value = 5, size = 20 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} viewBox="0 0 24 24" width={size} height={size}>
        <path
          fill={i <= value ? "#16a34a" : "#ccc"}
          d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.555L19.335 24 12 19.897 4.665 24l1.634-8.695L.6 9.75l7.732-1.732z"
        />
      </svg>
    );
  }
  return <div className="star-row">{stars}</div>;
}

function StarInput({ value = 5, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-input">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          className="star-btn"
        >
          <svg viewBox="0 0 24 24" width={20} height={20}>
            <path
              fill={n <= (hover || value) ? "#16a34a" : "#ccc"}
              d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.555L19.335 24 12 19.897 4.665 24l1.634-8.695L.6 9.75l7.732-1.732z"
            />
          </svg>
        </button>
      ))}
    </div>
    
  );
}
