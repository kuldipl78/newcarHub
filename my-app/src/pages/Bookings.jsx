import React, { useState } from "react";
import "../styles/bookings.css";
import { Bell } from "lucide-react";

const dummyBookings = [
  {
    id: 1,
    time: "10:00 AM",
    customer: "Ravi Kumar",
    car: "Honda City",
    service: "Interior Cleaning",
    status: "Pending",
    staff: "",
    urgent: false,
  },
  {
    id: 2,
    time: "12:30 PM",
    customer: "Anjali Sharma",
    car: "Maruti Swift",
    service: "Full Wash",
    status: "In Progress",
    staff: "John",
    urgent: true,
  },
  {
    id: 3,
    time: "3:00 PM",
    customer: "Amit Joshi",
    car: "Hyundai Creta",
    service: "Engine Check",
    status: "Completed",
    staff: "Mike",
    urgent: false,
  },
];

const BookingManagement = () => {
  const [bookings, setBookings] = useState(dummyBookings);
  const [filter, setFilter] = useState("All");

  const updateStatus = (id, status) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const updateStaff = (id, staff) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, staff } : b)));
  };

  const filteredBookings =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  return (
    <div className="bookings-container">
      <div className="bookings-wrapper">
        <h1 className="booking-title">Booking Management</h1>

        {/* Filter */}
        <div className="booking-filters">
          {["All", "Pending", "In Progress", "Completed"].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="booking-table">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className={`booking-row ${b.urgent ? "urgent" : ""}`}
            >
              <div className="booking-info">
                <p className="booking-time">{b.time}</p>
                <p className="booking-customer">{b.customer}</p>
                <p className="booking-car">{b.car}</p>
                <p className="booking-service">{b.service}</p>
              </div>

              <div className="booking-actions">
                <select
                  value={b.staff}
                  onChange={(e) => updateStaff(b.id, e.target.value)}
                >
                  <option value="">Assign Staff</option>
                  <option value="John">John</option>
                  <option value="Mike">Mike</option>
                  <option value="Sara">Sara</option>
                </select>

                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {b.urgent && <Bell className="urgent-icon" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingManagement;
