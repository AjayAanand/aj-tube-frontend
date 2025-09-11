import React, { useState } from "react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSendOtp = () => {
    // API call to send OTP
    console.log("OTP sent to:", email);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    // API call to verify OTP
    console.log("Verifying OTP:", otp);
    setStep(3);
  };

  const handleSavePassword = () => {
    // API call to save new password
    console.log("Saving new password:", password);
    alert("Password changed successfully!");
    setStep(1);
    setEmail("");
    setOtp("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {step === 1 && (
          <>
            <h2>Forgot Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp}>Send OTP</button>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Set New Password</h2>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSavePassword}>Save Password</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;