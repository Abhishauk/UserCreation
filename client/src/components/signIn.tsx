import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password fields.", {
        className: "toast-message"
      });
      return;
    }

    console.log("Form submitted with data:", formData);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:6001/signin",
        data: formData
      });
      console.log("Response from server:", response.data);
      toast.success("Login successful!", {
        className: "toast-message"
      });
      navigate("/mainPage");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Incorrect password. Please try again.", {
        className: "toast-message"
      });
    }
  };

  const handleotp = () => {
    // Show toast message
    toast.success("OTP sent successfully!", {
      className: "toast-message"
    });
    navigate("/signinotp", { state: { formData } });
  };

  const handleForgotPassword = () => {
    navigate("/forgotpass");
  };

  return (
    <div className="signup-container">
      <ToastContainer />
      <div className="image-container">
        <img src="/signup.png" alt="Sign Up" className="signup-image" />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Sign In</button>

            <button className="btn" onClick={handleotp}>
              SignIn with OTP
            </button>
            <span
              className="forgot-password-link"
              onClick={handleForgotPassword}
            >
              Forgot password
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
