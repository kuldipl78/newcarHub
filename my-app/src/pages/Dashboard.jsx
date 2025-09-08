import React from "react";
import "../styles/dashboard.css";
import { Bell, Car, CheckCircle, Clock, Users } from "lucide-react";

// Dummy Data
const bookingsToday = [
  {
    id: 1,
    time: "10:00 AM",
    customer: "Ravi Kumar",
    car: "Honda City",
    service: "Interior Cleaning",
    urgent: false,
  },
  {
    id: 2,
    time: "12:30 PM",
    customer: "Anjali Sharma",
    car: "Maruti Swift",
    service: "Full Wash",
    urgent: true,
  },
  {
    id: 3,
    time: "3:00 PM",
    customer: "Amit Joshi",
    car: "Hyundai Creta",
    service: "Engine Check",
    urgent: false,
  },
];

const stats = [
  { label: "Bookings Today", value: 12, icon: <Car /> },
  { label: "Pending Services", value: 5, icon: <Clock /> },
  { label: "Completed Services", value: 6, icon: <CheckCircle /> },
  { label: "Staff Available", value: 4, icon: <Users /> },
];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div>
              <p className="stat-label">{stat.label}</p>
              <h2 className="stat-value">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Content Section */}
      <div className="content-grid">
        {/* Upcoming Bookings */}
        <div className="bookings">
          <h2 className="section-title">Upcoming Bookings Today</h2>
          <ul className="booking-list">
            {bookingsToday.map((booking) => (
              <li
                key={booking.id}
                className={`booking-item ${
                  booking.urgent ? "urgent" : ""
                }`}
              >
                <div>
                  <p className="booking-time">{booking.time}</p>
                  <p className="booking-customer">
                    {booking.customer} - {booking.car}
                  </p>
                  <p className="booking-service">{booking.service}</p>
                </div>
                {booking.urgent && <Bell className="urgent-icon" />}
              </li>
            ))}
          </ul>
        </div>

        {/* Alerts / Notifications */}
        <div className="alerts">
          <h2 className="section-title">Alerts & Notifications</h2>
          <div className="alert alert-pending">
            <Clock />
            <p>Booking #102 is pending confirmation.</p>
          </div>
          <div className="alert alert-success">
            <CheckCircle />
            <p>Booking #98 has been completed successfully.</p>
          </div>
          <div className="alert alert-danger">
            <Bell />
            <p>Urgent! Booking #110 was cancelled last minute.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
