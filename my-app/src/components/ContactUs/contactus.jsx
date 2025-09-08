import React, { useState } from "react";
import "./contactus.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";
import Cookies from "js-cookie";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    message: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("authToken"); // or however you store it after login
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(data.message);
        setFormData({ name: "", phone_number: "", email: "", message: "" });
      } else {
        setErrorMsg(data.error || "❌ Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setErrorMsg("⚠ Something went wrong, please try again later");
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phone_number"
            placeholder="Enter Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Enter Message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn">Send</button>

          {errorMsg && <p className="error-message">{errorMsg}</p>}
          {successMsg && <p className="success-message">{successMsg}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;