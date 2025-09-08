import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />
        <div className="content">
          <Outlet /> {/* ✅ This renders nested dashboard pages */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
