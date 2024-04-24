import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./signup.css"
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); 

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:6001/signup",
        data: formData
      });
      
      console.log("Response from server:", response.data);
      setFormData({
        firstName: '',
        lastName: '',
        password: '',
        retypePassword: '',
        contactMode: '',
        email: ''
       
      });
      navigate("/mainPage")
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  

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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
