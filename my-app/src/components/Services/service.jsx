import React from "react";
import "./service.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/footer"; 

const Services = () => {
  return (
    <>
    <Navbar />

    <div className="services">
      <h2>Our Services</h2>
      <div className="service-list">
        <div className="card">Exterior Wash</div>
        <div className="card">Interior Cleaning</div>
        <div className="card">Wax & Polish</div>
        <div className="card">Engine Detailing</div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Services;
