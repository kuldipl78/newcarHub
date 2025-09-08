import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button (फक्त small devices वर दिसेल) */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar__top">
          <h2>
            <span>
              <i className="ri-taxi-line"></i>
            </span>{" "}
            Ecomy CCH
          </h2>
        </div>

        <div className="sidebar__content">
          <div className="menu">
            <ul className="nav__list">
              {navLinks.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__link" : "nav__link"
                    }
                    onClick={() => setIsOpen(false)} // mobile वर link click झाल्यावर close
                  >
                    <i className={item.icon}></i>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar__bottom">
            <span>
              <i className="ri-logout-circle-r-line"></i> Logout
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
