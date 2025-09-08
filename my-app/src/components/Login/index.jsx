import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";
import googleLogo from "../../assets/images/google-logo-transparent-free-png.png";
import Cookies from 'js-cookie'

const Login = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(true);
  const [message, setMessage] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [serverOtp, setServerOtp] = useState(null);
  const [serverToken, setServerToken] = useState(null);

  const navigate = useNavigate();
  

 useEffect(() => {
  const token = Cookies.get("authToken");
  if (token) {
    navigate("/", { replace: true });
  }

  const interval = setInterval(() => {
    if (window.google && window.google.accounts) {
      console.log("Google API is ready!");

      window.google.accounts.id.initialize({
        client_id:
          "1043834580073-n5b9u5onbjfc2om8fdvg8e9bv5pnh7e8.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      clearInterval(interval);
    }
  }, 100);

  return () => clearInterval(interval);
}, [navigate]);


  const handleGoogleResponse = (response) => {
  console.log("Google response received:", response);
  alert("Google Sign-In successful!");
};


  const handleGoogleLogin = () => {
  if (window.google && window.google.accounts) {
    console.log("Prompting Google login...");
    window.google.accounts.id.prompt();
  } else {
    console.error("Google API is not loaded yet.");
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((useOtp && !phone.trim()) || (!useOtp && !email.trim())) {
      setMessage("Please fill the required fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: !useOtp ? email : undefined,
          phone_number: useOtp ? phone : undefined,
          otp: undefined,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`OTP sent successfully! Your OTP is: ${data.otp}`);
        setServerOtp(String(data.otp ?? ""));
        setServerToken(data.token);
        setShowOtpInput(true);
        setMessage("");
      } else {
        setMessage(
          (data && (data.message || data.error || data)) ||
            "Invalid credentials"
        );
      }
    } catch (err) {
      setMessage(`Something went wrong: ${err.message}`);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setMessage("Please enter the OTP");
      return;
    }
    if (String(otp).trim() === String(serverOtp).trim()) {
      Cookies.set("authToken", serverToken);
      navigate("/", { replace: true }); // ✅ Navigate after OTP is verified
    } else {
      setMessage("Incorrect OTP");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          {useOtp ? (
            <>
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          ) : (
            <>
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}

          {showOtpInput && (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                type="button"
                className="login-button"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </>
          )}

          {!showOtpInput && (
            <button type="submit" className="login-button">
              Get OTP
            </button>
          )}

          {message && <p className="error-message">{message}</p>}
        </form>

        <p className="switch-login">
          {useOtp ? (
            <>
              Prefer email login?{" "}
              <span
                onClick={() => {
                  setUseOtp(false);
                  setShowOtpInput(false);
                  setMessage("");
                  setOtp("");
                }}
                className="login-link"
              >
                Use Email
              </span>
            </>
          ) : (
            <>
              Prefer mobile login?{" "}
              <span
                onClick={() => {
                  setUseOtp(true);
                  setShowOtpInput(false);
                  setMessage("");
                  setOtp("");
                }}
                className="login-link"
              >
                Use Mobile OTP
              </span>
            </>
          )}
        </p>

        <div className="google-login">
          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
          >
            <img src={googleLogo} alt="Google" className="google-logo" />
            Continue with Google
          </button>
        </div>

        <div className="signup-redirect">
          If not registered, please{" "}
          <Link to="/signup">
            <button className="signup-button" type="button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
