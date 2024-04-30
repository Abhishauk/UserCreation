import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const SetPassword = () => {

  const [newpass, setNewpass] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  console.log("xxxxxxxxxx",email);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>): void => {
    setNewpass(e.target.value);
  }
  const handlesetpass = async() => {
    try {
      const response = await axios.post(
        "http://localhost:6001/setpassword",
        {
          email: email,
          newpass : newpass,
        }
      )
      console.log(response.data);
      navigate('/signin')
      
      
    } catch (error) {
      
    }
  }
  return (
    <div className='setcontainer'>
      <h4>Set Password</h4>

      <div>
        <input
        type='text'
        placeholder='Enter New Password'
        value={newpass}
        onChange={handleChange}
        />
      </div>
      <button className='btn' onClick={handlesetpass}>Set Password</button>

          
    </div>
  )
}

export default SetPassword
