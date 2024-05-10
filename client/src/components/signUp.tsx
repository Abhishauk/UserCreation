import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  firstName: string;
  lastName: string;
  password: string;
  retypePassword: string;
  contactMode: string;
  email: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    password: "",
    retypePassword: "",
    contactMode: "",
    email: ""
  });

  const [otpSent, setOtpSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.retypePassword ||
      !formData.contactMode ||
      (formData.contactMode === "email" && !formData.email)
    ) {
      toast.error("Please fill in all fields.", {
        className: "toast-message"
      });
      return;
    }

    console.log("Form submitted with data:", formData);

    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:6001/signup",
        data: formData
      });

      console.log("Response from server:", response.data);
      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        retypePassword: "",
        contactMode: "",
        email: ""
      });
      setOtpSent(true);
      setSuccessMessage("OTP sent successfully.");
      console.log("==========", formData);

      navigate("/signupOTP", { state: { formData } });
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.msg === "email already exists"
      ) {
        toast.error("Email already exists. Please use a different email.", {
          className: "toast-message"
        });
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="image-container">
        <img src="/signup.png" alt="Sign Up" className="signup-image" />
      </div>
      <div className="form-container">
        <div className="form-wrapper">
          <form onSubmit={handleSendOtp}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Set Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="retypePassword"
                placeholder="Retype Password"
                value={formData.retypePassword}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <select
                name="contactMode"
                value={formData.contactMode}
                onChange={handleChange}
              >
                <option value="">Contact Mode</option>
                <option value="email">Email</option>
              </select>
            </div>
            {formData.contactMode === "email" &&
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>}

            <button className="btn" type="submit">
              Send OTP
            </button>
            {otpSent &&
              <div className="title center">
                <p>
                  An OTP has been sent to{" "}
                  <span className="emailpartial">
                    ***{formData.email.slice(3)}
                  </span>
                </p>
              </div>}
          </form>
          <div className="success">
            {successMessage}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
