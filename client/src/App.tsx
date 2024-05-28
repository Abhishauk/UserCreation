import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/signIn";
import SignUp from "./components/signUp";
import MainPage from "./components/MainPage";
import SignupOTP from "./components/signupOTP";
import SigninOTP from "./components/signinOTP";
import Forgotpass from "./components/forgotPass";
import SetPassword from "./components/setPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/signupOTP" element={<SignupOTP />} />
          <Route path="/signinOTP" element={<SigninOTP />} />
          <Route path="/forgotpass" element={<Forgotpass />} />
          <Route path="/setPassword" element={<SetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
