import React from "react";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6"; // ✅ New Twitter "X" logo
import { IoLogoYoutube } from "react-icons/io5";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer-page fade-in">
      {/* Social Media */}
      <div className="link-social-media">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare size={30} className="social-icon fb" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={30} className="social-icon insta" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FaXTwitter size={30} className="social-icon twitter" /> {/* ✅ New Logo */}
        </a>
        <a
          href="https://www.youtube.com/channel/UCIp-_-vAXW5fWxz11-If-bg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoYoutube size={30} className="social-icon yt" />
        </a>
      </div>

      {/* Footer Content */}
      <div className="footer-container">
        <div className="footer-box">
          <h2 className="footer-heading">📍 Address</h2>
          <p className="footer-para">
            Unit 18, 3rd Floor, KK Market, Pune City, Pune (CB), Dhankawadi,
            Dhankawadi Police Station, Pune City, Pune - 411043, Maharashtra,
            India.
          </p>
          <address>
            <div className="addess-map-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30275.216436493007!2d73.81852805614474!3d18.465438919641088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eab6cecfb251%3A0x5ea40037b00f3bd3!2sDhankawadi%20Police%20Station!5e0!3m2!1sen!2sin!4v1757056051841!5m2!1sen!2sin"
                 allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                
               </iframe>
            </div>
          </address>
        </div>

        {/* Hours of Operation */}
        <div className="hours-box space-y-4 hidden md:block text-right">
          <div className="space-y-4 hidden md:block text-right">
            <h3 className="text-3xl font-bold">Hours of Operation</h3>
            <div className="space-y-1">
              <p className="font-bold">Open 7 Days a Week!</p>
              <p className="font-normal">8:00AM - 7:00 PM</p>
              <p className="font-bold">Closed on: Saturday Sunday</p>
              <p className="font-normal">Two Eids</p>
            </div>
          </div>

          <div className="footer-box">
            <h2 className="footer-heading">⚡ Quick Links</h2>
            <p className="footer-para link">Privacy Policy</p>
            <p className="footer-para link">Accessibility Statement</p>
            <p className="footer-para link">Terms & Conditions</p>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="footer-bottom">
        <p>©2025 Shekru Labs pvt. Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;