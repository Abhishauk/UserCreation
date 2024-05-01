import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SigninOTP: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const handleSendOtp = async (): Promise<void> => {
    try {
      const response = await axios.post("http://localhost:6001/signin-sendotp", {
        email: email
      });
      setSuccessMessage("OTP sent successfully to your email.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Error sending OTP. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleVerifyOtp = async (): Promise<void> => {
    try {
      const enteredOtp: string = otp.join("");
      const response = await axios.post("http://localhost:6001/verifyotp-signin", {
        email: email,
        otp: enteredOtp
      });
      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully");
        setErrorMessage("");
        navigate("/mainPage");
      } else {
        setErrorMessage("Invalid OTP");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Error verifying OTP. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleChangeOtp = (index: number, value: string): void => {
    const newOtp: string[] = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  return (
    <div className="otpcontainer">
      <div className="otp-form">
        <h3 className="otp-header">OTP Verification</h3>
        {successMessage && <div className="success">{successMessage}</div>}
        {errorMessage && <div className="error">{errorMessage}</div>}
        {!successMessage && (
          <div className="verification">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            <button className="otp-btn" onClick={handleSendOtp}>
              Send OTP
            </button>
          </div>
        )}
        {successMessage && !errorMessage && (
          <div className="verification">
            <div className="otp-input-fields">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="num"
                  className={`otp_num otp_num_${index + 1}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
                />
              ))}
            </div>
            <button className="otp-btn" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigninOTP;
