// ReviewPage.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import "./Components/ReviewPage.css";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewsRef = ref(db, "reviews");
    const unsubscribe = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewList = Object.values(data).reverse(); // Latest first
        setReviews(reviewList);
      } else {
        setReviews([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="review-page">
      <h2>📝 All Reviews</h2>

      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews found.</p>
      ) : (
        <div className="review-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <h3>{r.name}</h3>
              <p className="review-email">{r.email}</p>
              <p className="review-text">“{r.text}”</p>
              <span className="review-date">
                {r.date} — {r.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
