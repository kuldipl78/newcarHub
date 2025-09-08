import React, { useState } from "react";
import "./bookservice.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer";


const BookService = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    vehicleName: "",
    vehicleNumber: "",
    mobileNumber: "",
    bookingDate: "",
    serviceType: "",
    workDetails: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost:3000/book_service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: formData.customerName,
          vehicle_name: formData.vehicleName,
          vehicle_number: formData.vehicleNumber,
          mobile_number: formData.mobileNumber,
          booking_date: formData.bookingDate,
          service_type: formData.serviceType,
          work_details: formData.workDetails,
        }),
      });

      if (response.ok) {
        setMessage({ text: "✅ Booking successful!", type: "success" });
        setFormData({
          customerName: "",
          vehicleName: "",
          vehicleNumber: "",
          mobileNumber: "",
          bookingDate: "",
          serviceType: "",
          workDetails: "",
        });
      } else {
        setMessage({ text: "❌ Failed to book service. Try again.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: `❌ Error: ${error.message}`, type: "error" });
    }
  };
  return (
    <>
      <Navbar />
      <div className="book-service">
        <h2 className="form-title">Book Your Service</h2>

        <form className="form-box" onSubmit={handleSubmit}>
          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="vehicleName"
            placeholder="Vehicle Name"
            value={formData.vehicleName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="vehicleNumber"
            placeholder="Vehicle Number"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            required
          />

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            required
            className="service-type-select"
          >
            <option className="m-4" value="">Select Service</option>
            <option value="exterior">Exterior Wash</option>
            <option value="interior">Interior Cleaning</option>
            <option value="wax">Wax & Polish</option>
          </select>

          <textarea
            name="workDetails"
            placeholder="Work Details (optional)"
            rows="4"
            value={formData.workDetails}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="btn">
            Submit
          </button>

          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookService;
