import React, { useState, useEffect } from "react";
import "./review.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Cookies from "js-cookie";

const Reviews = () => {
  const [formData, setFormData] = useState({
    customer_name: "",
    car_model: "",
    rating: "",
    comment: "",
  });

  const [reviews, setReviews] = useState([]);

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("http://localhost:3000/reviews");
      if (response.ok) {
        console.log("Fetched reviews successfully");
        const data = await response.json();
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("authToken"); // or however you store it after login
      const response = await fetch("http://localhost:3000/reviews", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`   // ✅ add token
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        alert("✅ Review submitted successfully!");
        setFormData({
          customer_name: "",
          car_model: "",
          rating: "",
          comment: "",
        });
        fetchReviews();
      } else {
        alert("❌ Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("⚠ Something went wrong, please try again later");
    }
  };

  // Function to display star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "½"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <>
      <Navbar />

      <div className="customers">
        <h2>Our Happy Customers</h2>

        {/* Review List */}
        <div className="reviews-container">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.review_id} className="review-box">
                <h4>{review.customer_name}</h4>
                <p className="car-model">{review.car_model}</p>
                <div className="stars">{renderStars(review.rating)}</div>
                <p className="comment">"{review.comment}"</p>
                <small>{new Date(review.created_at).toLocaleDateString()}</small>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to add one!</p>
          )}
        </div>

        {/* Review Form */}
        <div className="review-form">
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customer_name"
              placeholder="Your Name"
              value={formData.customer_name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="car_model"
              placeholder="Car Model"
              value={formData.car_model}
              onChange={handleChange}
            />
            <select
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="4.5">4.5 - Excellent</option>
              <option value="5">5 - Outstanding</option>
            </select>
            <textarea
              name="comment"
              placeholder="Your Review"
              value={formData.comment}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Reviews;