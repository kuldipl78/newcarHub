import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom"; // adjust the path according to your folder structure
import Cookie from 'js-cookie'


const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickLogout = () => {
    const {history} = props;
    Cookie.remove("authToken");
    history.replace("/login"); // Redirect to login page after logout

  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const redirecthome=()=>{
    window.location.href="/";
  }

  return (

    <nav className="custom-navbar">

      
      
    {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-image-container">
          <img src="/images/finallogo.png" alt="Logo" className="logo" onClick={redirecthome} />

        </div>
        <div className="logo-text-container-heading">
          <h2 className="logo-text">ECOMY CLEAN CAR HUB LLP</h2>
        </div>
      </div>
    
      {/* Navigation Links */}
      <div className="nav-links-container">
        {/* For Large and Extra Large Screens */}
        <ul className="nav-links large-screen">
            <li className="link-large-large"><Link to="/">Home</Link></li>
            <li className="link-large-large"><Link to="/review">Reviews</Link></li>
            <li className="link-large-large"><Link to="/contactus">Contact Us</Link></li>
            <li className="link-large-large"><Link to="/service">Service</Link></li>
            <li className="link-large-large"><Link to="/bookService">Book Service</Link></li>
            <li className="link-large-large"><Link to="/dashboard">Dashboard</Link></li>
            <li className="link-large-large"><Link to="/login" onClick={onClickLogout} className="btn-element">Logout</Link></li>
        </ul>
        {/* Menu Toggle for Small/Medium Screens */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Dropdown Menu for Small/Medium Screens */}
        <div className={`dropdown-menu ${isOpen ? "open" : ""}`}>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/service" onClick={() => setIsOpen(false)}>Service</Link>
            <Link to="/review" onClick={() => setIsOpen(false)}>Reviews</Link>
            <Link to="/contactus" onClick={() => setIsOpen(false)}>ContactUs</Link>
            <Link to="/bookservice" onClick={() => setIsOpen(false)}>BookService</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/login" onClick={onClickLogout} className="btn-element">Logout</Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;