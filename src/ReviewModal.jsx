import React, { useState } from "react";
import "./Components/ReviewModal.css";
import { db } from "./firebase"; // ✅ Import Firebase config
import { ref, push } from "firebase/database"; // ✅ Import Realtime DB methods

export default function ReviewModal({ close, user }) {
  const [review, setReview] = useState("");
  const [popup, setPopup] = useState({ type: "", message: "" }); // ✅ Popup state

  // ✅ Helper function to show popup messages
  const showPopup = (type, message, duration = 2000) => {
    setPopup({ type, message });
    setTimeout(() => setPopup({ type: "", message: "" }), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
      showPopup("error", "⚠️ Please write your review before submitting.");
      return;
    }

    try {
      // ✅ Save review to Firebase Realtime Database
      const reviewsRef = ref(db, "reviews");
      const newReview = {
        name: user?.name || "Unknown User",
        email: user?.email || "N/A",
        text: review.trim(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        timestamp: new Date().toISOString(),
      };

      await push(reviewsRef, newReview);

      // ✅ Show success popup
      showPopup("success", "✅ Review submitted successfully!");

      // ✅ Reset textarea
      setReview("");

      // ✅ Auto-close after 2 seconds
      setTimeout(close, 1500);
    } catch (error) {
      console.error("❌ Error submitting review:", error);
      showPopup("error", "❌ Failed to submit review. Try again!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>📝 Submit Your Review</h3>

        <form onSubmit={handleSubmit}>
          <textarea
            className="review-textarea"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            rows="5"
            required
          ></textarea>

          <div className="modal-actions">
            <button type="submit" className="primary-btn5">
              Submit
            </button>
            <button type="button" className="cancel-btn" onClick={close}>
              Cancel
            </button>
          </div>
        </form>

        {/* ✅ Popup Message */}
        {popup.message && (
          <div
            className={`popup-message8 ${
              popup.type === "success" ? "success-popup" : "error-popup"
            }`}
          >
            {popup.message}
          </div>
        )}
      </div>
    </div>
  );
}
