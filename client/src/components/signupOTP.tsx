import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
const SignupOTP: React.FC = () => {

  const [otp, setOtp] = useState<string[]>(['', '', '', '']); 
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const location = useLocation();
  const formData = location.state?.formData;
  console.log("00000",formData);
  
  const handleVerifyOtp = async (): Promise<void> => {
    try {
      const enteredOtp: string = otp.join('');
      console.log("Entered OTP:", enteredOtp);
  
      const response = await axios.post('http://localhost:6001/verifyotp-signup', {
        otp: enteredOtp,
        data:formData
      });
  
      console.log(response.data); 
      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully');
        setErrorMessage('');
      } else {
        setErrorMessage('Invalid OTP');
        setSuccessMessage('');
      }
      navigate('/mainPage')
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Error verifying OTP. Please try again.');
      setSuccessMessage('');
    }
  };
  

  const handleChangeOtp = (index: number, value: string): void => {
    const newOtp: string[] = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className='otpcontainer'>
      <h3>OTP Verification</h3>
      

      <div className='success'>{successMessage}</div>
        <div className='verification'>
         
          <div className='otp-input-fields'>
            {otp.map((digit, index) => (
              <input
                key={index}
                type='num'
                className={`otp_num otp_num_${index + 1}`}
                maxLength={1}
                value={digit}
                onChange={(e) => handleChangeOtp(index, e.target.value)}
              />
            ))}
          </div>
          <div className='error'>{errorMessage}</div>
          <button className='btn' onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </div>
      
    </div>
  );
};

export default SignupOTP;
