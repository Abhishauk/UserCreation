import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import './style.css';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:6001/signin",
        data: formData
      });
      console.log("Response from server:", response.data);
      navigate("/mainPage");
      setFormData({ email: "", password: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleotp = () => {
    navigate("/signinotp",{ state: { formData } });
  }
  const handleForgotPassword = () => {
    navigate("/forgotpass")
  }

  return (
    <div className="signup-container">
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
                placeholder=" Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Sign In</button>
            
            <button className="btn" onClick={handleotp}>SignIn with OTP</button>
            <a onClick={handleForgotPassword}><p>forgot password</p></a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
