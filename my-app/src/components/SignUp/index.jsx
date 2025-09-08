import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone_number: '',
    gender: '',
  });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      if (res.ok) {
        setIsSuccess(true);
        setMessage("✅ Signup successful!");
        // optional: redirect after 2s
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setIsSuccess(false);
        setMessage(`❌ ${data.message || data}`);
      }
    } catch (err) {
      setIsSuccess(false);
      setMessage(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} required />

          <label>Email</label>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />

          <label>Address</label>
          <input type="text" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />

          <label>phone_number</label>
          <input type="text" name="phone_number" placeholder="Enter Mobile Number" value={formData.phone_number} onChange={handleChange} required />

          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          {/* Success/Error Message */}
          {message && (
            <p className={`message ${isSuccess ? "success" : "error"}`}>
              {message}
            </p>
          )}
        </form>

        <p className="redirect-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
