import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Public Pages
import Login from "./components/Login";
import Signup from "./components/SignUp";
import NotFound from "./components/Notfound";

// Protected Pages
import Home from "./components/Home/home";
import Services from "./components/Services/service";
import Reviews from "./components/Reviews/review";
import ContactUs from "./components/ContactUs/contactus";
import BookService from "./components/BookService/bookservice";

// Dashboard Layout & Pages
import Layout from "./components/Layout/Layout"; 
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import SellCar from "./pages/SellCar";
import Settings from "./pages/Settings";

// Protected Route
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Public routes (no protection) */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ Protected routes (everything else) */}
        <Route
          path="/"
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/service"
          element={
            <ProtectRoute>
              <Services />
            </ProtectRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectRoute>
              <Reviews />
            </ProtectRoute>
          }
        />
        <Route
          path="/contactus"
          element={
            <ProtectRoute>
              <ContactUs />
            </ProtectRoute>
          }
        />
        <Route
          path="/bookservice"
          element={
            <ProtectRoute>
              <BookService />
            </ProtectRoute>
          }
        />

        {/* ✅ Protected Dashboard with nested routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectRoute>
              <Layout />
            </ProtectRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="sell-car" element={<SellCar />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ✅ Fallback for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
