import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SigninOTP: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]); // Array to hold individual OTP digits
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSendOtp = async (): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:6001/sendotp-signin",
        {
          email
        }
      );
      console.log(response);

      setOtpSent(true);
      const partialEmail: string =
        email.slice(0, 3) + "***" + email.slice(email.indexOf("@"));
      setSuccessMessage(`An OTP has been sent to ${partialEmail}`);
    } catch (error) {}
  };

  const handleVerifyOtp = async (): Promise<void> => {
    try {
      const enteredOtp: string = otp.join("");
      console.log("3333333", enteredOtp);

      const response = await axios.post(
        "http://localhost:6001/verifyotp-signin",
        {
          email,
          otp: enteredOtp
        }
      );
      console.log(response.data); // Assuming the backend sends some response data
      // Handle response from the backend accordingly
      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully");
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid OTP");
        setSuccessMessage("");
      }
      navigate("/mainPage");
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

  return (
    <div className="otpcontainer">
      <h3>OTP Verification</h3>
      <div className="otpform">
        <div className="col-auto">
          <input
            type="email"
            className="form-control email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="col-auto">
          {!otpSent
            ? <button className="btn" onClick={handleSendOtp}>
                Send OTP
              </button>
            : <div className="success">
                {successMessage}
              </div>}
        </div>
      </div>

      {otpSent &&
        <div className="verification">
          <div className="title center">
            <p>
              An OTP has been sent to{" "}
              <span className="emailpartial">***{email.slice(3)}</span>
            </p>
          </div>
          <div className="otp-input-fields">
            {otp.map((digit, index) =>
              <input
                key={index}
                type="num"
                className={`otp_num otp_num_${index + 1}`}
                maxLength={1}
                value={digit}
                onChange={e => handleChangeOtp(index, e.target.value)}
              />
            )}
          </div>
          <div className="error">
            {errorMessage}
          </div>
          <button className="btn" onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </div>}
    </div>
  );
};

export default SigninOTP;
