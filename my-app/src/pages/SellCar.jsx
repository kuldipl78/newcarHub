import React, { useState } from "react";
import "../styles/sell-car.css";
import { CheckCircle, User } from "lucide-react";

// Dummy staff data
const staffList = [
  { id: 1, name: "John Doe", role: "Cleaner", available: true },
  { id: 2, name: "Mike Smith", role: "Washer", available: true },
  { id: 3, name: "Sara Lee", role: "Mechanic", available: false },
];

// Dummy bookings
const bookings = [
  { id: 1, customer: "Ravi Kumar", car: "Honda City", service: "Interior Cleaning", status: "Pending", staff: "" },
  { id: 2, customer: "Anjali Sharma", car: "Maruti Swift", service: "Full Wash", status: "In Progress", staff: "John Doe" },
  { id: 3, customer: "Amit Joshi", car: "Hyundai Creta", service: "Engine Check", status: "Pending", staff: "" },
];

const StaffManagement = () => {
  const [staff, setStaff] = useState(staffList);
  const [bookingData, setBookingData] = useState(bookings);

  const assignStaff = (bookingId, staffName) => {
    const updatedBookings = bookingData.map((b) =>
      b.id === bookingId ? { ...b, staff: staffName, status: "In Progress" } : b
    );
    setBookingData(updatedBookings);
  };

  const markCompleted = (bookingId) => {
    const updatedBookings = bookingData.map((b) =>
      b.id === bookingId ? { ...b, status: "Completed" } : b
    );
    setBookingData(updatedBookings);
  };

  return (
    <div className="staff-dashboard">
      <h1 className="dashboard-title">Staff & Booking Management</h1>

      <div className="staff-wrapper">
        {/* Staff Panel */}
        <div className="staff-panel">
          <h2 className="section-title">Staff Members</h2>
          {staff.map((s) => (
            <div key={s.id} className={`staff-card ${s.available ? "" : "unavailable"}`}>
              <User className="staff-icon" />
              <div className="staff-info">
                <p className="staff-name">{s.name}</p>
                <p className="staff-role">{s.role}</p>
                <p className={`staff-status ${s.available ? "available" : "busy"}`}>
                  {s.available ? "Available" : "Busy"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Panel */}
        <div className="booking-panel">
          <h2 className="section-title">Bookings</h2>
          {bookingData.map((b) => (
            <div key={b.id} className={`booking-card ${b.status.toLowerCase().replace(" ", "-")}`}>
              <div className="booking-details">
                <p><strong>Customer:</strong> {b.customer}</p>
                <p><strong>Car:</strong> {b.car}</p>
                <p><strong>Service:</strong> {b.service}</p>
                <p><strong>Status:</strong> {b.status}</p>
                {b.staff && <p><strong>Staff:</strong> {b.staff}</p>}
              </div>

              {b.status !== "Completed" && (
                <div className="booking-actions">
                  <select value={b.staff} onChange={(e) => assignStaff(b.id, e.target.value)}>
                    <option value="">Assign Staff</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                  {b.status === "In Progress" && (
                    <button className="complete-btn" onClick={() => markCompleted(b.id)}>
                      <CheckCircle /> Mark Completed
                    </button>
                  )}
                </div>
              )}

              {b.status === "Completed" && (
                <p className="completed-label"><CheckCircle /> Service Completed</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffManagement;
